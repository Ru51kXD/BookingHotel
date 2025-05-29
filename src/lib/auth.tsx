'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SavedCard {
  id: string;
  cardNumber: string; // masked, like "**** **** **** 1234"
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'user' | 'admin';
  savedCards?: SavedCard[];
  likedHotels?: string[]; // Массив ID лайкнутых отелей
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string; user?: User }>;
  register: (userData: { name: string; email: string; password: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  addSavedCard: (cardData: { cardNumber: string; cardHolder: string; expiryDate: string; cvv: string }) => Promise<{ success: boolean; error?: string }>;
  removeSavedCard: (cardId: string) => Promise<{ success: boolean; error?: string }>;
  setDefaultCard: (cardId: string) => Promise<{ success: boolean; error?: string }>;
  verifyUserForPasswordReset: (email: string, phoneLastDigits: string) => Promise<{ success: boolean; error?: string; userId?: string }>;
  resetPassword: (userId: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  toggleLikeHotel: (hotelId: string) => Promise<{ success: boolean; isLiked: boolean }>;
  getLikedHotels: () => string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Предустановленный админ
const ADMIN_USER: User = {
  id: 'admin-001',
  name: 'Администратор',
  email: 'admin@rulit.com',
  role: 'admin',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Демо пользователь
const DEMO_USER: User = {
  id: 'demo-001',
  name: 'Демо Пользователь',
  email: 'demo@example.com',
  role: 'user',
  savedCards: [
    {
      id: 'card-001',
      cardNumber: '**** **** **** 1234',
      cardHolder: 'DEMO ПОЛЬЗОВАТЕЛЬ',
      expiryDate: '12/28',
      isDefault: true,
      created_at: new Date().toISOString()
    }
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const ADMIN_PASSWORD = 'chetam2025';
const DEMO_PASSWORD = 'demo123';

// Отладка: проверяем значения паролей
console.log('ADMIN_PASSWORD установлен как:', ADMIN_PASSWORD);
console.log('DEMO_PASSWORD установлен как:', DEMO_PASSWORD);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('hotel_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('hotel_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<{ success: boolean; error?: string; user?: User }> => {
    setIsLoading(true);
    
    const { email, password } = credentials;
    
    try {
      // Отладочная информация
      console.log('Попытка входа:', { email, password });
      console.log('Ожидаемые данные админа:', { 
        expectedEmail: 'admin@rulit.com', 
        expectedPassword: ADMIN_PASSWORD 
      });
      console.log('Ожидаемые данные демо:', { 
        expectedEmail: 'demo@example.com', 
        expectedPassword: DEMO_PASSWORD 
      });
      console.log('Сравнение email админа:', email === 'admin@rulit.com');
      console.log('Сравнение пароля админа:', password === ADMIN_PASSWORD);
      console.log('Сравнение email демо:', email === 'demo@example.com');
      console.log('Сравнение пароля демо:', password === DEMO_PASSWORD);
      
      // Проверяем админский логин
      if (email === 'admin@rulit.com' && password === ADMIN_PASSWORD) {
        console.log('Админ вошел успешно!');
        setUser(ADMIN_USER);
        localStorage.setItem('hotel_user', JSON.stringify(ADMIN_USER));
        setIsLoading(false);
        return { success: true, user: ADMIN_USER };
      }

      // Проверяем демо-аккаунт
      if (email === 'demo@example.com' && password === DEMO_PASSWORD) {
        console.log('Демо пользователь вошел успешно!');
        setUser(DEMO_USER);
        localStorage.setItem('hotel_user', JSON.stringify(DEMO_USER));
        setIsLoading(false);
        return { success: true, user: DEMO_USER };
      }

      // Симуляция API вызова для обычных пользователей
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверяем зарегистрированных пользователей
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          role: foundUser.role || 'user',
          likedHotels: foundUser.likedHotels || [],
          created_at: foundUser.created_at,
          updated_at: foundUser.updated_at
        };
        
        setUser(userData);
        localStorage.setItem('hotel_user', JSON.stringify(userData));
        setIsLoading(false);
        return { success: true, user: userData };
      }
      
      // Mock login logic - в реальном приложении здесь будет API вызов
      if (email === 'user@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          name: 'Тестовый пользователь',
          email: email,
          role: 'user',
          likedHotels: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setUser(userData);
        localStorage.setItem('hotel_user', JSON.stringify(userData));
        setIsLoading(false);
        return { success: true, user: userData };
      }
      
      console.log('Неверные данные для входа');
      setIsLoading(false);
      return { success: false, error: 'Неверный email или пароль' };
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setIsLoading(false);
      return { success: false, error: 'Произошла ошибка при входе' };
    }
  };

  const register = async (userData: { name: string; email: string; password: string; phone?: string }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверяем, не существует ли уже пользователь с таким email
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const existingUser = registeredUsers.find((u: any) => u.email === userData.email);
      
      if (existingUser) {
        setIsLoading(false);
        return { success: false, error: 'Пользователь с таким email уже существует' };
      }
      
      // Mock registration logic
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'user',
        likedHotels: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Сохраняем пользователя с паролем для восстановления
      const userWithPassword = {
        ...newUser,
        password: userData.password
      };
      
      registeredUsers.push(userWithPassword);
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      
      setUser(newUser);
      localStorage.setItem('hotel_user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Произошла ошибка при регистрации' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotel_user');
  };

  const updateUser = async (userData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };
    
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        ...userData,
        updated_at: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('hotel_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Произошла ошибка при обновлении данных' };
    }
  };

  const addSavedCard = async (cardData: { cardNumber: string; cardHolder: string; expiryDate: string; cvv: string }): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };
    
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const maskedCardNumber = `**** **** **** ${cardData.cardNumber.slice(-4)}`;
      const newCard: SavedCard = {
        id: `card-${Date.now()}`,
        cardNumber: maskedCardNumber,
        cardHolder: cardData.cardHolder,
        expiryDate: cardData.expiryDate,
        isDefault: (user.savedCards?.length || 0) === 0, // Первая карта - по умолчанию
        created_at: new Date().toISOString()
      };
      
      const updatedUser = {
        ...user,
        savedCards: [...(user.savedCards || []), newCard],
        updated_at: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('hotel_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Произошла ошибка при добавлении карты' };
    }
  };

  const removeSavedCard = async (cardId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };
    
    try {
      const updatedCards = (user.savedCards || []).filter(card => card.id !== cardId);
      
      // Если удалили карту по умолчанию, сделаем первую оставшуюся картой по умолчанию
      if (updatedCards.length > 0 && !updatedCards.some(card => card.isDefault)) {
        updatedCards[0].isDefault = true;
      }
      
      const updatedUser = {
        ...user,
        savedCards: updatedCards,
        updated_at: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('hotel_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Произошла ошибка при удалении карты' };
    }
  };

  const setDefaultCard = async (cardId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };
    
    try {
      const updatedCards = (user.savedCards || []).map(card => ({
        ...card,
        isDefault: card.id === cardId
      }));
      
      const updatedUser = {
        ...user,
        savedCards: updatedCards,
        updated_at: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('hotel_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Произошла ошибка при установке карты по умолчанию' };
    }
  };

  const verifyUserForPasswordReset = async (email: string, phoneLastDigits: string): Promise<{ success: boolean; error?: string; userId?: string }> => {
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверяем встроенных пользователей
      if (email === 'admin@rulit.com') {
        // У админа нет номера телефона, поэтому используем специальный код
        if (phoneLastDigits === '2025') {
          return { success: true, userId: 'admin-001' };
        }
        return { success: false, error: 'Неверные данные для восстановления пароля' };
      }
      
      if (email === 'demo@example.com') {
        // У демо пользователя проверяем последние цифры номера
        if (phoneLastDigits === '1234') {
          return { success: true, userId: 'demo-001' };
        }
        return { success: false, error: 'Неверные данные для восстановления пароля' };
      }
      
      // Проверяем зарегистрированных пользователей из localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const foundUser = registeredUsers.find((u: any) => {
        if (u.email !== email) return false;
        if (!u.phone) return false;
        
        // Извлекаем последние 4 цифры из номера телефона
        const phoneDigits = u.phone.replace(/\D/g, '');
        const lastFourDigits = phoneDigits.slice(-4);
        
        return lastFourDigits === phoneLastDigits;
      });
      
      if (foundUser) {
        return { success: true, userId: foundUser.id };
      }
      
      return { success: false, error: 'Пользователь с такими данными не найден' };
    } catch (error) {
      return { success: false, error: 'Произошла ошибка при проверке данных' };
    }
  };

  const resetPassword = async (userId: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновляем пароль для встроенных пользователей
      if (userId === 'admin-001') {
        // В реальном приложении здесь бы обновлялся пароль в базе данных
        // Для демонстрации просто возвращаем успех
        return { success: true };
      }
      
      if (userId === 'demo-001') {
        // В реальном приложении здесь бы обновлялся пароль в базе данных
        return { success: true };
      }
      
      // Обновляем пароль для зарегистрированных пользователей
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === userId);
      
      if (userIndex !== -1) {
        registeredUsers[userIndex].password = newPassword;
        registeredUsers[userIndex].updated_at = new Date().toISOString();
        localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
        return { success: true };
      }
      
      return { success: false, error: 'Пользователь не найден' };
    } catch (error) {
      return { success: false, error: 'Произошла ошибка при сбросе пароля' };
    }
  };

  const toggleLikeHotel = async (hotelId: string): Promise<{ success: boolean; isLiked: boolean }> => {
    if (!user) return { success: false, isLiked: false };
    
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentLikes = user.likedHotels || [];
      const isCurrentlyLiked = currentLikes.includes(hotelId);
      
      let updatedLikes: string[];
      if (isCurrentlyLiked) {
        // Удаляем лайк
        updatedLikes = currentLikes.filter(id => id !== hotelId);
      } else {
        // Добавляем лайк
        updatedLikes = [...currentLikes, hotelId];
      }
      
      const updatedUser = {
        ...user,
        likedHotels: updatedLikes,
        updated_at: new Date().toISOString()
      };
      
      // Обновляем пользователя в localStorage
      setUser(updatedUser);
      localStorage.setItem('hotel_user', JSON.stringify(updatedUser));
      
      // Также обновляем в registered_users если это зарегистрированный пользователь
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex].likedHotels = updatedLikes;
        registeredUsers[userIndex].updated_at = new Date().toISOString();
        localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      }
      
      return { success: true, isLiked: !isCurrentlyLiked };
    } catch (error) {
      return { success: false, isLiked: false };
    }
  };

  const getLikedHotels = () => {
    if (!user || !user.likedHotels) return [];
    return user.likedHotels;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      updateUser,
      addSavedCard,
      removeSavedCard,
      setDefaultCard,
      verifyUserForPasswordReset,
      resetPassword,
      toggleLikeHotel,
      getLikedHotels
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 