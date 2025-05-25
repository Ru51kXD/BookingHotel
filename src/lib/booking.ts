import { Hotel } from './database';
import { User } from './auth';
import { useState, useCallback } from 'react';

// Интерфейсы для бронирования
export interface BookingData {
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  userId: string;
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: PaymentMethod;
  specialRequests?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface PaymentData {
  method: PaymentMethod;
  amount: number;
  currency: string;
  bookingId: string;
}

// Временное хранилище бронирований
const bookings: Map<string, Booking> = new Map();

export class BookingService {
  // Рассчитать общую стоимость бронирования
  static calculateTotalPrice(bookingData: BookingData): number {
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return bookingData.hotel.price_per_night * nights * bookingData.rooms;
  }

  // Создать новое бронирование
  static async createBooking(
    user: User, 
    bookingData: BookingData
  ): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    try {
      // Используем более уникальный ID с timestamp для избежания конфликтов
      const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      const totalPrice = this.calculateTotalPrice(bookingData);

      const booking: Booking = {
        id: bookingId,
        userId: user.id,
        hotel: bookingData.hotel,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        rooms: bookingData.rooms,
        totalPrice,
        status: 'pending',
        paymentStatus: 'pending',
        specialRequests: bookingData.specialRequests,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Сохраняем только в localStorage, убираем дублирование с Map
      if (typeof window !== 'undefined') {
        const existingBookings = this.getUserBookings(user.id);
        // Проверяем, что такого бронирования еще нет
        const isDuplicate = existingBookings.some(existing => 
          existing.hotel.id === booking.hotel.id &&
          existing.checkIn === booking.checkIn &&
          existing.checkOut === booking.checkOut &&
          existing.userId === booking.userId
        );
        
        if (isDuplicate) {
          return { success: false, error: 'Бронирование уже существует' };
        }
        
        localStorage.setItem(`bookings_${user.id}`, JSON.stringify([...existingBookings, booking]));
      }
      
      // Сохраняем в Map только для быстрого доступа
      bookings.set(bookingId, booking);

      return { success: true, booking };
    } catch (error) {
      return { success: false, error: 'Ошибка при создании бронирования' };
    }
  }

  // Получить бронирования пользователя
  static getUserBookings(userId: string): Booking[] {
    // Сначала проверяем localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`bookings_${userId}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          localStorage.removeItem(`bookings_${userId}`);
        }
      }
    }

    // Возвращаем из памяти
    return Array.from(bookings.values()).filter(booking => booking.userId === userId);
  }

  // Обработать платеж
  static async processPayment(
    bookingId: string, 
    paymentData: PaymentData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const booking = bookings.get(bookingId);
      if (!booking) {
        return { success: false, error: 'Бронирование не найдено' };
      }

      // Симуляция обработки платежа
      await new Promise(resolve => setTimeout(resolve, 2000));

      // В реальном проекте здесь будет интеграция с платежной системой
      const paymentSuccess = Math.random() > 0.1; // 90% успешных платежей

      if (paymentSuccess) {
        booking.paymentStatus = 'paid';
        booking.status = 'confirmed';
        booking.paymentMethod = paymentData.method;
        booking.updated_at = new Date().toISOString();

        bookings.set(bookingId, booking);

        // Обновляем localStorage
        if (typeof window !== 'undefined') {
          const userBookings = this.getUserBookings(booking.userId);
          const updatedBookings = userBookings.map(b => b.id === bookingId ? booking : b);
          localStorage.setItem(`bookings_${booking.userId}`, JSON.stringify(updatedBookings));
        }

        return { success: true };
      } else {
        booking.paymentStatus = 'failed';
        booking.updated_at = new Date().toISOString();
        bookings.set(bookingId, booking);

        return { success: false, error: 'Ошибка при обработке платежа. Попробуйте еще раз.' };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка при обработке платежа' };
    }
  }

  // Отменить бронирование
  static async cancelBooking(
    bookingId: string, 
    userId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const booking = bookings.get(bookingId);
      if (!booking) {
        return { success: false, error: 'Бронирование не найдено' };
      }

      if (booking.userId !== userId) {
        return { success: false, error: 'Нет доступа к этому бронированию' };
      }

      if (booking.status === 'completed' || booking.status === 'cancelled') {
        return { success: false, error: 'Нельзя отменить это бронирование' };
      }

      booking.status = 'cancelled';
      booking.updated_at = new Date().toISOString();

      // Если платеж был проведен, помечаем возврат
      if (booking.paymentStatus === 'paid') {
        booking.paymentStatus = 'refunded';
      }

      bookings.set(bookingId, booking);

      // Обновляем localStorage
      if (typeof window !== 'undefined') {
        const userBookings = this.getUserBookings(userId);
        const updatedBookings = userBookings.map(b => b.id === bookingId ? booking : b);
        localStorage.setItem(`bookings_${userId}`, JSON.stringify(updatedBookings));
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Ошибка при отмене бронирования' };
    }
  }

  // Получить детали бронирования
  static getBooking(bookingId: string): Booking | null {
    return bookings.get(bookingId) || null;
  }

  // Валидация данных бронирования
  static validateBookingData(bookingData: BookingData): { valid: boolean; error?: string } {
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const now = new Date();

    if (checkIn < now) {
      return { valid: false, error: 'Дата заезда не может быть в прошлом' };
    }

    if (checkOut <= checkIn) {
      return { valid: false, error: 'Дата выезда должна быть позже даты заезда' };
    }

    if (bookingData.guests < 1 || bookingData.guests > 10) {
      return { valid: false, error: 'Количество гостей должно быть от 1 до 10' };
    }

    if (bookingData.rooms < 1 || bookingData.rooms > 5) {
      return { valid: false, error: 'Количество номеров должно быть от 1 до 5' };
    }

    return { valid: true };
  }
}

// Хук для управления бронированиями
export function useBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserBookings = useCallback((userId: string) => {
    setIsLoading(true);
    try {
      const userBookings = BookingService.getUserBookings(userId);
      setBookings(userBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (user: User, bookingData: BookingData) => {
    setIsLoading(true);
    try {
      const result = await BookingService.createBooking(user, bookingData);
      if (result.success) {
        loadUserBookings(user.id);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [loadUserBookings]);

  const processPayment = useCallback(async (bookingId: string, paymentData: PaymentData) => {
    setIsLoading(true);
    try {
      const result = await BookingService.processPayment(bookingId, paymentData);
      if (result.success) {
        const booking = BookingService.getBooking(bookingId);
        if (booking) {
          loadUserBookings(booking.userId);
        }
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [loadUserBookings]);

  const cancelBooking = useCallback(async (bookingId: string, userId: string) => {
    setIsLoading(true);
    try {
      const result = await BookingService.cancelBooking(bookingId, userId);
      if (result.success) {
        loadUserBookings(userId);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [loadUserBookings]);

  return {
    bookings,
    isLoading,
    loadUserBookings,
    createBooking,
    processPayment,
    cancelBooking
  };
} 