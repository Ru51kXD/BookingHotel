'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { X, Save, Upload, MapPin, Star, DollarSign, Wifi, Coffee, Car, Waves, Utensils, Tv, Dumbbell, Sparkles } from 'lucide-react';

interface Hotel {
  id: number | string;
  name: string;
  city: string;
  address: string;
  rating: number;
  price_per_night: number;
  category: string;
  image_url: string;
  status?: 'active' | 'inactive';
  created_at: string;
  description?: string;
  country?: string;
  amenities?: string[];
  images?: string[];
}

interface EditHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel | null;
  onSave: (hotel: Hotel) => void;
}

const amenityOptions = [
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'breakfast', label: 'Завтрак', icon: Coffee },
  { id: 'parking', label: 'Парковка', icon: Car },
  { id: 'pool', label: 'Бассейн', icon: Waves },
  { id: 'restaurant', label: 'Ресторан', icon: Utensils },
  { id: 'tv', label: 'ТВ', icon: Tv },
  { id: 'gym', label: 'Спортзал', icon: Dumbbell },
  { id: 'spa', label: 'СПА', icon: Sparkles }
];

const categories = [
  'Отель',
  'Хостел',
  'Апартаменты',
  'Гостевой дом',
  'Курорт',
  'Бутик-отель'
];

export default function EditHotelModal({ isOpen, onClose, hotel, onSave }: EditHotelModalProps) {
  const [formData, setFormData] = useState<Hotel>({
    id: '',
    name: '',
    city: '',
    address: '',
    rating: 4.0,
    price_per_night: 10000,
    category: 'Отель',
    image_url: '',
    status: 'active',
    created_at: new Date().toISOString(),
    description: '',
    country: 'Казахстан',
    amenities: [],
    images: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (hotel) {
      setFormData({
        ...hotel,
        amenities: hotel.amenities || [],
        images: hotel.images || []
      });
    } else {
      // Новый отель
      setFormData({
        id: Date.now().toString(),
        name: '',
        city: 'Астана',
        address: '',
        rating: 4.0,
        price_per_night: 10000,
        category: 'Отель',
        image_url: '',
        status: 'active',
        created_at: new Date().toISOString(),
        description: '',
        country: 'Казахстан',
        amenities: [],
        images: []
      });
    }
  }, [hotel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'price_per_night' ? parseFloat(value) : value
    }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities?.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...(prev.amenities || []), amenityId]
    }));
  };

  const handleImageAdd = () => {
    const imageUrl = prompt('Введите URL изображения:');
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), imageUrl]
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Валидация
      if (!formData.name || !formData.city || !formData.address) {
        throw new Error('Заполните все обязательные поля');
      }

      if (formData.rating < 1 || formData.rating > 5) {
        throw new Error('Рейтинг должен быть от 1 до 5');
      }

      if (formData.price_per_night < 0) {
        throw new Error('Цена не может быть отрицательной');
      }

      // Симуляция сохранения
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedHotel = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      onSave(updatedHotel);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Произошла ошибка при сохранении');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {hotel ? 'Редактировать отель' : 'Добавить новый отель'}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Основная информация */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название отеля *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Название отеля"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категория
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Город *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Астана"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Страна
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Казахстан"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Адрес *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Полный адрес отеля"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Рейтинг (1-5)
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="1"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цена за ночь (₸)
                    </label>
                    <input
                      type="number"
                      name="price_per_night"
                      value={formData.price_per_night}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Статус
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="active">Активный</option>
                      <option value="inactive">Неактивный</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Главное изображение (URL)
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {/* Описание */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Описание отеля..."
                  />
                </div>

                {/* Удобства */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Удобства
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {amenityOptions.map(amenity => {
                      const Icon = amenity.icon;
                      const isSelected = formData.amenities?.includes(amenity.id);
                      
                      return (
                        <motion.button
                          key={amenity.id}
                          type="button"
                          onClick={() => handleAmenityToggle(amenity.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">{amenity.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Дополнительные изображения */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Дополнительные изображения
                    </label>
                    <motion.button
                      type="button"
                      onClick={handleImageAdd}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Добавить изображение
                    </motion.button>
                  </div>
                  
                  {formData.images && formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Изображение ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleImageRemove(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ошибка */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-3"
                  >
                    <p className="text-red-600 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Кнопки */}
                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Сохранить
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Отмена
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 