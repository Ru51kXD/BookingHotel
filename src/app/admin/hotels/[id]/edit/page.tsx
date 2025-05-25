'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { motion } from '@/lib/motion';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Car,
  Waves,
  Utensils,
  Airplay,
  Dumbbell,
  Spa,
  Trash2
} from 'lucide-react';

interface HotelData {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  category: string;
  price_per_night: number;
  rating: number;
  image_url: string;
  amenities: string[];
  images: string[];
}

const availableAmenities = [
  { id: 'wifi', name: 'Бесплатный Wi-Fi', icon: Wifi },
  { id: 'breakfast', name: 'Завтрак включен', icon: Coffee },
  { id: 'parking', name: 'Бесплатная парковка', icon: Car },
  { id: 'pool', name: 'Бассейн', icon: Waves },
  { id: 'restaurant', name: 'Ресторан', icon: Utensils },
  { id: 'tv', name: 'Телевизор', icon: Airplay },
  { id: 'gym', name: 'Фитнес-центр', icon: Dumbbell },
  { id: 'spa', name: 'СПА', icon: Spa }
];

const categories = [
  { value: 'hotel', label: 'Отель' },
  { value: 'hostel', label: 'Хостел' },
  { value: 'apartment', label: 'Апартаменты' },
  { value: 'resort', label: 'Курорт' },
  { value: 'villa', label: 'Вилла' },
  { value: 'guesthouse', label: 'Гостевой дом' }
];

export default function EditHotelPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const hotelId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hotelData, setHotelData] = useState<HotelData | null>(null);

  // Проверка прав доступа
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Доступ запрещен</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadHotelData();
  }, [hotelId]);

  const loadHotelData = async () => {
    try {
      // Симуляция загрузки данных отеля
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // В реальном приложении здесь будет API вызов
      const mockHotelData: HotelData = {
        id: parseInt(hotelId),
        name: 'Тестовый отель',
        description: 'Описание тестового отеля с множеством удобств и отличным сервисом.',
        address: 'ул. Тестовая, 123',
        city: 'Алматы',
        country: 'Казахстан',
        category: 'hotel',
        price_per_night: 25000,
        rating: 4.5,
        image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        amenities: ['wifi', 'breakfast', 'parking'],
        images: [
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400'
        ]
      };
      
      setHotelData(mockHotelData);
    } catch (error) {
      console.error('Ошибка загрузки данных отеля:', error);
      alert('Ошибка загрузки данных отеля');
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof HotelData, value: any) => {
    if (!hotelData) return;
    
    setHotelData(prev => ({
      ...prev!,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    if (!hotelData) return;
    
    setHotelData(prev => ({
      ...prev!,
      amenities: prev!.amenities.includes(amenityId)
        ? prev!.amenities.filter(id => id !== amenityId)
        : [...prev!.amenities, amenityId]
    }));
  };

  const handleAddImage = () => {
    const imageUrl = prompt('Введите URL изображения:');
    if (imageUrl && hotelData) {
      setHotelData(prev => ({
        ...prev!,
        images: [...prev!.images, imageUrl]
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!hotelData) return;
    
    setHotelData(prev => ({
      ...prev!,
      images: prev!.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelData) return;
    
    setSaving(true);

    try {
      // Валидация
      if (!hotelData.name || !hotelData.city || !hotelData.address) {
        alert('Пожалуйста, заполните все обязательные поля');
        setSaving(false);
        return;
      }

      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Обновление отеля:', hotelData);

      alert('Отель успешно обновлен!');
      router.push('/admin');
    } catch (error) {
      console.error('Ошибка обновления отеля:', error);
      alert('Произошла ошибка при обновлении отеля');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!hotelData) return;
    
    if (confirm(`Вы уверены, что хотите удалить отель "${hotelData.name}"? Это действие нельзя отменить.`)) {
      try {
        // Симуляция API вызова
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Отель успешно удален!');
        router.push('/admin');
      } catch (error) {
        console.error('Ошибка удаления отеля:', error);
        alert('Произошла ошибка при удалении отеля');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных отеля...</p>
        </div>
      </div>
    );
  }

  if (!hotelData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Отель не найден</p>
          <Link href="/admin" className="text-blue-600 hover:underline">
            Вернуться к админ-панели
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-blue-600 hover:text-blue-700 flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад к админ-панели
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Редактировать отель</h1>
            </div>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Удалить отель</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Основная информация</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название отеля *
                    </label>
                    <input
                      type="text"
                      value={hotelData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Введите название отеля"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание
                    </label>
                    <textarea
                      value={hotelData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Опишите отель..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Категория
                      </label>
                      <select
                        value={hotelData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Рейтинг
                      </label>
                      <input
                        type="number"
                        value={hotelData.rating}
                        onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                        min="1"
                        max="5"
                        step="0.1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цена за ночь (₸)
                    </label>
                    <input
                      type="number"
                      value={hotelData.price_per_night}
                      onChange={(e) => handleInputChange('price_per_night', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Расположение</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Полный адрес *
                    </label>
                    <input
                      type="text"
                      value={hotelData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Улица, дом, район"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Город *
                      </label>
                      <input
                        type="text"
                        value={hotelData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Название города"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Страна
                      </label>
                      <input
                        type="text"
                        value={hotelData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Название страны"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Удобства</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableAmenities.map((amenity) => (
                    <motion.div
                      key={amenity.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        hotelData.amenities.includes(amenity.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleAmenityToggle(amenity.id)}
                    >
                      <amenity.icon className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">{amenity.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Главное изображение</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL изображения
                  </label>
                  <input
                    type="url"
                    value={hotelData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {hotelData.image_url && (
                  <div className="mt-4">
                    <img
                      src={hotelData.image_url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </motion.div>

              {/* Additional Images */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Дополнительные фото</h3>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {hotelData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="flex-1 text-sm text-gray-600 truncate">{image}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Предварительный просмотр</h3>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  {hotelData.image_url && (
                    <img
                      src={hotelData.image_url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {hotelData.name}
                  </h4>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{hotelData.city}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{hotelData.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      {hotelData.price_per_night}₸/ночь
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Сохранить изменения
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 