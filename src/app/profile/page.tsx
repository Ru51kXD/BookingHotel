'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/lib/motion';
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Settings,
  Bell,
  Lock,
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Camera,
  Eye,
  Download,
  Shield,
  Save,
  X
} from 'lucide-react';

// Динамический импорт компонентов
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });

// Данные пользователя
const userData = {
  name: 'Анна Петрова',
  email: 'anna.petrova@example.com',
  phone: '+7 (999) 123-45-67',
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSI3NSIgZmlsbD0iIzQ0NDA1OSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QVA8L3RleHQ+PC9zdmc+',
  memberSince: '2022',
  totalBookings: 12,
  favoriteHotels: 8,
  rewards: 2450,
  loyaltyLevel: 'Золотой',
  location: 'Москва, Россия',
  birthDate: '1990-05-15'
};

// История бронирований с заглушками
const bookingHistory = [
  {
    id: 1,
    hotelName: 'Гранд Плаза',
    location: 'Москва, центр',
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    nights: 3,
    price: 19500,
    status: 'completed',
    rating: 5,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdyYW5kIFBsYXphPC90ZXh0Pjwvc3ZnPg==',
    roomType: 'Делюкс номер'
  },
  {
    id: 2,
    hotelName: 'Хостел Метро',
    location: 'Санкт-Петербург',
    checkIn: '2024-02-10',
    checkOut: '2024-02-12',
    nights: 2,
    price: 2400,
    status: 'completed',
    rating: 4,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhvc3RlbCBNZXRybzwvdGV4dD48L3N2Zz4=',
    roomType: 'Кровать в общем номере'
  },
  {
    id: 3,
    hotelName: 'Панорама Отель',
    location: 'Сочи',
    checkIn: '2024-05-20',
    checkOut: '2024-05-25',
    nights: 5,
    price: 29000,
    status: 'upcoming',
    rating: null,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZGZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBhbm9yYW1hIEhvdGVsPC90ZXh0Pjwvc3ZnPg==',
    roomType: 'Номер с видом на море'
  },
  {
    id: 4,
    hotelName: 'Комфорт Инн',
    location: 'Казань',
    checkIn: '2024-01-05',
    checkOut: '2024-01-07',
    nights: 2,
    price: 8400,
    status: 'cancelled',
    rating: null,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2Y0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWZvcnQgSW5uPC90ZXh0Pjwvc3ZnPg==',
    roomType: 'Стандартный номер'
  }
];

// Избранные отели с заглушками
const favoriteHotels = [
  {
    id: 1,
    name: 'Гранд Плаза',
    location: 'Москва',
    rating: 4.8,
    price: 6500,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdyYW5kIFBsYXphPC90ZXh0Pjwvc3ZnPg==',
    description: 'Роскошный отель в центре'
  },
  {
    id: 2,
    name: 'BackPacker Hub',
    location: 'Санкт-Петербург',
    rating: 4.6,
    price: 950,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJhY2tQYWNrZXIgSHViPC90ZXh0Pjwvc3ZnPg==',
    description: 'Современный хостел'
  },
  {
    id: 3,
    name: 'Панорама Отель',
    location: 'Сочи',
    rating: 4.7,
    price: 5800,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZGZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBhbm9yYW1hIEhvdGVsPC90ZXh0Pjwvc3ZnPg==',
    description: 'Отель с видом на море'
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(userData);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    promotions: false,
    recommendations: true,
    newsletters: false
  });

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: User },
    { id: 'bookings', label: 'Мои бронирования', icon: Calendar },
    { id: 'favorites', label: 'Избранное', icon: Heart },
    { id: 'settings', label: 'Настройки', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'upcoming': return 'Предстоящее';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'upcoming': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleSaveProfile = () => {
    // Здесь будет логика сохранения профиля
    setIsEditing(false);
    alert('Профиль успешно обновлен!');
  };

  const handleRemoveFavorite = (hotelId: number) => {
    // Здесь будет логика удаления из избранного
    console.log('Removing favorite hotel:', hotelId);
  };

  const handleCancelBooking = (bookingId: number) => {
    // Здесь будет логика отмены бронирования
    console.log('Cancelling booking:', bookingId);
  };

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-800 text-white py-16 pt-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Аватар */}
            <div className="relative">
              <Image
                src={userData.avatar}
                alt={userData.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-white/20"
              />
              <motion.button
                className="absolute bottom-0 right-0 bg-white text-slate-700 p-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Информация о пользователе */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{userData.name}</h1>
              <p className="text-white/80 mb-4">{userData.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Участник с {userData.memberSince}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {userData.location}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400" />
                  {userData.loyaltyLevel} статус
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">{userData.totalBookings}</div>
                <div className="text-white/70 text-sm">Бронирований</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userData.favoriteHotels}</div>
                <div className="text-white/70 text-sm">Избранных</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userData.rewards}</div>
                <div className="text-white/70 text-sm">Баллов</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Навигация по табам */}
      <motion.section 
        className="bg-white shadow-sm sticky top-20 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-emerald-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Контент табов */}
      <motion.section 
        className="py-12 bg-gray-50 min-h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          {/* Обзор */}
          {activeTab === 'overview' && (
            <motion.div variants={itemVariants} className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Обзор аккаунта</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Статистические карточки */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="h-8 w-8 text-emerald-600" />
                    <span className="text-2xl font-bold text-gray-800">{userData.totalBookings}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700">Всего бронирований</h3>
                  <p className="text-gray-600 text-sm">За все время</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <Heart className="h-8 w-8 text-red-500" />
                    <span className="text-2xl font-bold text-gray-800">{userData.favoriteHotels}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700">Избранные отели</h3>
                  <p className="text-gray-600 text-sm">В вашем списке</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <Star className="h-8 w-8 text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-800">{userData.rewards}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700">Бонусные баллы</h3>
                  <p className="text-gray-600 text-sm">Доступно к использованию</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <span className="text-lg font-bold text-gray-800">{userData.loyaltyLevel}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700">Статус лояльности</h3>
                  <p className="text-gray-600 text-sm">Текущий уровень</p>
                </div>
              </div>

              {/* Последние бронирования */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Последние бронирования</h3>
                  <button onClick={() => setActiveTab('bookings')} className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Смотреть все
                  </button>
                </div>
                <div className="space-y-4">
                  {bookingHistory.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <Image
                        src={booking.image}
                        alt={booking.hotelName}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{booking.hotelName}</h4>
                        <p className="text-gray-600 text-sm">{booking.location}</p>
                        <p className="text-gray-600 text-sm">{booking.checkIn} - {booking.checkOut}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{getStatusText(booking.status)}</span>
                        </div>
                        <div className="text-lg font-bold text-gray-800 mt-1">₽{booking.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Бронирования */}
          {activeTab === 'bookings' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Мои бронирования</h2>
                <Link href="/search">
                  <motion.button
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Новое бронирование
                  </motion.button>
                </Link>
              </div>

              <div className="grid gap-6">
                {bookingHistory.map((booking) => (
                  <motion.div 
                    key={booking.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 md:h-auto relative">
                        <Image
                          src={booking.image}
                          alt={booking.hotelName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{booking.hotelName}</h3>
                            <p className="text-gray-600 flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {booking.location}
                            </p>
                          </div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-2">{getStatusText(booking.status)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-gray-600 text-sm">Заезд</p>
                            <p className="font-semibold">{booking.checkIn}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Выезд</p>
                            <p className="font-semibold">{booking.checkOut}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Ночей</p>
                            <p className="font-semibold">{booking.nights}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm">Тип номера</p>
                            <p className="font-semibold">{booking.roomType}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-emerald-600">₽{booking.price.toLocaleString()}</p>
                            <p className="text-gray-600 text-sm">за {booking.nights} {booking.nights === 1 ? 'ночь' : 'ночи'}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                          <div className="flex space-x-2">
                            <motion.button
                              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Подробнее
                            </motion.button>
                            <motion.button
                              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Скачать
                            </motion.button>
                          </div>
                          
                          <div className="flex space-x-2">
                            {booking.status === 'upcoming' && (
                              <motion.button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Отменить
                              </motion.button>
                            )}
                            {booking.status === 'completed' && booking.rating && (
                              <div className="flex items-center">
                                <span className="text-gray-600 text-sm mr-2">Ваша оценка:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < booking.rating! ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Избранное */}
          {activeTab === 'favorites' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Избранные отели</h2>
                <p className="text-gray-600">{favoriteHotels.length} отелей в избранном</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteHotels.map((hotel) => (
                  <motion.div 
                    key={hotel.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <motion.button
                        onClick={() => handleRemoveFavorite(hotel.id)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{hotel.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-semibold">{hotel.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 flex items-center mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hotel.location}
                      </p>
                      
                      <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-emerald-600">₽{hotel.price.toLocaleString()}</span>
                          <span className="text-gray-600 text-sm ml-1">/ночь</span>
                        </div>
                        <Link href={`/hotel/${hotel.id}`}>
                          <motion.button
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Подробнее
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Настройки */}
          {activeTab === 'settings' && (
            <motion.div variants={itemVariants} className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Настройки аккаунта</h2>

              {/* Профиль */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Личная информация</h3>
                  <motion.button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Отменить' : 'Редактировать'}
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Имя</label>
                    <input
                      type="text"
                      value={isEditing ? editedUser.name : userData.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={isEditing ? editedUser.email : userData.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Телефон</label>
                    <input
                      type="tel"
                      value={isEditing ? editedUser.phone : userData.phone}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Дата рождения</label>
                    <input
                      type="date"
                      value={isEditing ? editedUser.birthDate : userData.birthDate}
                      onChange={(e) => setEditedUser({...editedUser, birthDate: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Местоположение</label>
                    <input
                      type="text"
                      value={isEditing ? editedUser.location : userData.location}
                      onChange={(e) => setEditedUser({...editedUser, location: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4 mt-6">
                    <motion.button
                      onClick={handleSaveProfile}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Сохранить
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedUser(userData);
                      }}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Отменить
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Безопасность */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Безопасность</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-800">Пароль</p>
                        <p className="text-gray-600 text-sm">Последнее изменение: 3 месяца назад</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowChangePassword(!showChangePassword)}
                      className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Изменить
                    </motion.button>
                  </div>

                  {showChangePassword && (
                    <motion.div 
                      className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Текущий пароль"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                        />
                        <input
                          type="password"
                          placeholder="Новый пароль"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                        />
                        <input
                          type="password"
                          placeholder="Подтвердите новый пароль"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                        />
                        <div className="flex space-x-2">
                          <motion.button
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Сохранить
                          </motion.button>
                          <motion.button
                            onClick={() => setShowChangePassword(false)}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Отменить
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Уведомления */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Уведомления</h3>
                
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {key === 'bookingUpdates' && 'Обновления бронирований'}
                            {key === 'promotions' && 'Рекламные предложения'}
                            {key === 'recommendations' && 'Рекомендации'}
                            {key === 'newsletters' && 'Новостная рассылка'}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {key === 'bookingUpdates' && 'Уведомления о статусе бронирований'}
                            {key === 'promotions' && 'Специальные предложения и скидки'}
                            {key === 'recommendations' && 'Персональные рекомендации отелей'}
                            {key === 'newsletters' && 'Еженедельные новости и советы'}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => setNotifications({...notifications, [key]: !value})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-emerald-600' : 'bg-gray-200'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      <Footer />
    </>
  );
} 