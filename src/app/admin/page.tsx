'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { motion } from '@/lib/motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Hotel,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Settings,
  BarChart3,
  TrendingUp,
  Calendar,
  DollarSign,
  Star,
  MapPin
} from 'lucide-react';

interface AdminHotel {
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

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  created_at: string;
  last_login?: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hotels, setHotels] = useState<AdminHotel[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Проверка прав доступа
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Загружаем отели из localStorage
      const storedHotels = localStorage.getItem('admin_hotels');
      let hotelsFromStorage = storedHotels ? JSON.parse(storedHotels) : [];
      
      // Также загружаем отели из API
      try {
        const hotelsResponse = await fetch('/api/hotels');
        const hotelsData = await hotelsResponse.json();
        if (hotelsData.success) {
          const apiHotels = hotelsData.data.map((hotel: any) => ({
            ...hotel,
            status: 'active',
            created_at: hotel.created_at || new Date().toISOString()
          }));
          
          // Объединяем отели из localStorage и API
          const allHotels = [...hotelsFromStorage, ...apiHotels];
          // Удаляем дубликаты по id (приоритет у localStorage)
          const uniqueHotels = allHotels.filter((hotel, index, self) => 
            index === self.findIndex((h) => h.id === hotel.id)
          );
          setHotels(uniqueHotels);
        } else {
          setHotels(hotelsFromStorage);
        }
      } catch (apiError) {
        // Если API недоступно, используем только localStorage
        console.log('API недоступно, загружаем отели из localStorage');
        setHotels(hotelsFromStorage);
      }

      // Симуляция загрузки пользователей
      setUsers([
        {
          id: '1',
          name: 'Анна Петрова',
          email: 'anna@example.com',
          phone: '+7 999 123 45 67',
          role: 'user',
          status: 'active',
          created_at: '2024-01-15',
          last_login: '2024-03-20'
        },
        {
          id: '2',
          name: 'Иван Иванов',
          email: 'ivan@example.com',
          phone: '+7 999 987 65 43',
          role: 'user',
          status: 'active',
          created_at: '2024-02-10',
          last_login: '2024-03-19'
        },
        {
          id: 'admin-001',
          name: 'Администратор',
          email: 'admin@rulit.com',
          role: 'admin',
          status: 'active',
          created_at: '2024-01-01'
        }
      ]);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHotel = async (id: number | string) => {
    if (confirm('Вы уверены, что хотите удалить этот отель?')) {
      // Удаляем из состояния
      const updatedHotels = hotels.filter(hotel => hotel.id !== id);
      setHotels(updatedHotels);
      
      // Удаляем из localStorage
      try {
        const storedHotels = localStorage.getItem('admin_hotels');
        if (storedHotels) {
          const hotelsFromStorage = JSON.parse(storedHotels);
          const filteredHotels = hotelsFromStorage.filter((hotel: any) => hotel.id !== id);
          localStorage.setItem('admin_hotels', JSON.stringify(filteredHotels));
        }
      } catch (error) {
        console.error('Ошибка удаления отеля из localStorage:', error);
      }
    }
  };

  const handleBlockUser = async (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } 
        : user
    ));
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка админ-панели...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const tabs = [
    { id: 'dashboard', label: 'Панель управления', icon: BarChart3 },
    { id: 'hotels', label: 'Управление отелями', icon: Hotel },
    { id: 'users', label: 'Управление пользователями', icon: Users },
    { id: 'settings', label: 'Настройки', icon: Settings }
  ];

  const stats = [
    {
      title: 'Всего отелей',
      value: hotels.length,
      icon: Hotel,
      color: 'from-blue-500 to-blue-600',
      change: '+5% за месяц'
    },
    {
      title: 'Активных пользователей',
      value: users.filter(u => u.status === 'active').length,
      icon: Users,
      color: 'from-green-500 to-green-600',
      change: '+12% за месяц'
    },
    {
      title: 'Средний рейтинг',
      value: (hotels.reduce((sum, h) => sum + h.rating, 0) / hotels.length).toFixed(1),
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      change: '+0.2 за месяц'
    },
    {
      title: 'Средняя цена',
      value: Math.round(hotels.reduce((sum, h) => sum + h.price_per_night, 0) / hotels.length),
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      change: '+8% за месяц',
      suffix: '₸/ночь'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                ← Вернуться на сайт
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Добро пожаловать, {user.name}</span>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}{stat.suffix}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние отели</h3>
                <div className="space-y-4">
                  {hotels.slice(0, 5).map((hotel) => (
                    <div key={hotel.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={hotel.image_url} 
                        alt={hotel.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{hotel.name}</p>
                        <p className="text-sm text-gray-600">{hotel.city}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{hotel.price_per_night}₸</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{hotel.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Активные пользователи</h3>
                <div className="space-y-4">
                  {users.filter(u => u.status === 'active').slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hotels Management */}
        {activeTab === 'hotels' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Hotels Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Управление отелями</h2>
                  <p className="text-gray-600">Всего отелей: {hotels.length}</p>
                </div>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Поиск отелей..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Link href="/admin/hotels/new">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Добавить отель</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img 
                      src={hotel.image_url} 
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        hotel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {hotel.status === 'active' ? 'Активен' : 'Неактивен'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hotel.city}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{hotel.price_per_night}₸/ночь</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/hotel/${hotel.id}`} className="flex-1">
                        <button className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>Просмотр</span>
                        </button>
                      </Link>
                      <Link href={`/admin/hotels/${hotel.id}/edit`} className="flex-1">
                        <button className="w-full bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1">
                          <Edit className="w-4 h-4" />
                          <span>Редактировать</span>
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteHotel(hotel.id)}
                        className="bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Users Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Управление пользователями</h2>
                  <p className="text-gray-600">Всего пользователей: {users.length}</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Поиск пользователей..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Пользователь
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Роль
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Последний вход
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              {user.phone && (
                                <div className="text-sm text-gray-500">{user.phone}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.last_login ? new Date(user.last_login).toLocaleDateString('ru-RU') : '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {user.id !== 'admin-001' && (
                            <button
                              onClick={() => handleBlockUser(user.id)}
                              className={`${
                                user.status === 'active' 
                                  ? 'text-red-600 hover:text-red-900' 
                                  : 'text-green-600 hover:text-green-900'
                              }`}
                            >
                              {user.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Настройки системы</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Общие настройки</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название сайта
                    </label>
                    <input
                      type="text"
                      defaultValue="Hotel Booking"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email поддержки
                    </label>
                    <input
                      type="email"
                      defaultValue="support@hotelbooking.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Валютные настройки</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Базовая валюта: Казахстанский тенге (KZT)<br />
                  Валюта по умолчанию: Казахстанский тенге (KZT)
                </p>
              </div>

              <div className="pt-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Сохранить настройки
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 