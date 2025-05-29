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
  MapPin,
  Gift,
  Tag,
  Mail,
  Phone,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  CreditCard,
  ShoppingCart
} from 'lucide-react';
import { 
  getPartnerApplications, 
  getGiftCardPurchases, 
  getOfferUsages,
  updateApplicationStatus,
  type PartnerApplication,
  type GiftCardPurchase,
  type OfferUsage
} from '@/lib/admin';
import EditHotelModal from '@/components/admin/EditHotelModal';

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
  const [activeTab, setActiveTab] = useState('overview');
  const [hotels, setHotels] = useState<AdminHotel[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [purchases, setPurchases] = useState<GiftCardPurchase[]>([]);
  const [usages, setUsages] = useState<OfferUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<AdminHotel | null>(null);

  // Проверка прав доступа
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      // Загружаем данные
      setApplications(getPartnerApplications());
      setPurchases(getGiftCardPurchases());
      setUsages(getOfferUsages());
      loadHotels();
    }
  }, [user]);

  const loadHotels = () => {
    // Загружаем отели из localStorage
    const storedHotels = JSON.parse(localStorage.getItem('admin_hotels') || '[]');
    
    // Также загружаем отели из API (моковые данные)
    const apiHotels = [
      {
        id: 1,
        name: 'Rixos President Astana',
        city: 'Астана',
        address: 'ул. Кунаева, 12/1',
        rating: 4.8,
        price_per_night: 45000,
        category: 'Отель',
        image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        status: 'active' as const,
        created_at: '2024-01-01T00:00:00.000Z',
        description: 'Роскошный отель в центре Астаны',
        country: 'Казахстан',
        amenities: ['wifi', 'breakfast', 'parking', 'pool', 'restaurant', 'spa'],
        images: []
      },
      {
        id: 2,
        name: 'Hilton Astana',
        city: 'Астана',
        address: 'ул. Сарыарка, 7',
        rating: 4.6,
        price_per_night: 38000,
        category: 'Отель',
        image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        status: 'active' as const,
        created_at: '2024-01-01T00:00:00.000Z',
        description: 'Современный отель с отличным сервисом',
        country: 'Казахстан',
        amenities: ['wifi', 'breakfast', 'parking', 'gym', 'restaurant'],
        images: []
      }
    ];
    
    // Объединяем отели из localStorage и API
    const allHotels = [...apiHotels, ...storedHotels];
    setHotels(allHotels);
  };

  const handleDeleteHotel = (hotelId: number | string) => {
    if (confirm('Вы уверены, что хотите удалить этот отель?')) {
      const storedHotels = JSON.parse(localStorage.getItem('admin_hotels') || '[]');
      const updatedHotels = storedHotels.filter((hotel: AdminHotel) => hotel.id !== hotelId);
      localStorage.setItem('admin_hotels', JSON.stringify(updatedHotels));
      loadHotels();
    }
  };

  const handleBlockUser = async (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } 
        : user
    ));
  };

  const handleStatusUpdate = (id: string, status: PartnerApplication['status']) => {
    updateApplicationStatus(id, status);
    setApplications(getPartnerApplications());
  };

  const handleCreateHotel = () => {
    setSelectedHotel(null);
    setIsEditModalOpen(true);
  };

  const handleEditHotel = (hotel: AdminHotel) => {
    setSelectedHotel(hotel);
    setIsEditModalOpen(true);
  };

  const handleSaveHotel = (hotelData: AdminHotel) => {
    const storedHotels = JSON.parse(localStorage.getItem('admin_hotels') || '[]');
    
    if (selectedHotel) {
      // Редактирование существующего отеля
      const updatedHotels = storedHotels.map((hotel: AdminHotel) => 
        hotel.id === selectedHotel.id ? { ...hotelData, updated_at: new Date().toISOString() } : hotel
      );
      localStorage.setItem('admin_hotels', JSON.stringify(updatedHotels));
    } else {
      // Создание нового отеля
      const newHotel = {
        ...hotelData,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      storedHotels.push(newHotel);
      localStorage.setItem('admin_hotels', JSON.stringify(storedHotels));
    }
    
    loadHotels();
    setIsEditModalOpen(false);
    setSelectedHotel(null);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    approvedApplications: applications.filter(app => app.status === 'approved').length,
    totalPurchases: purchases.length,
    totalRevenue: purchases.reduce((sum, purchase) => sum + purchase.amount, 0),
    totalUsages: usages.length
  };

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
    { id: 'overview', label: 'Обзор', icon: TrendingUp },
    { id: 'applications', label: 'Заявки партнеров', icon: Users },
    { id: 'purchases', label: 'Покупки сертификатов', icon: Gift },
    { id: 'usages', label: 'Использования предложений', icon: Tag },
    { id: 'hotels', label: 'Отели', icon: Hotel }
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
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                    <div className="text-gray-600 text-sm">Всего заявок</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-yellow-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</div>
                    <div className="text-gray-600 text-sm">Ожидают</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.approvedApplications}</div>
                    <div className="text-gray-600 text-sm">Одобрено</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <Gift className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalPurchases}</div>
                    <div className="text-gray-600 text-sm">Покупок</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} ₸</div>
                    <div className="text-gray-600 text-sm">Доход</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <Tag className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalUsages}</div>
                    <div className="text-gray-600 text-sm">Использований</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние заявки</h3>
                <div className="space-y-4">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{app.name}</div>
                        <div className="text-sm text-gray-600">{app.company}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.status === 'pending' ? 'Ожидает' :
                         app.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние покупки</h3>
                <div className="space-y-4">
                  {purchases.slice(0, 5).map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{purchase.cardType}</div>
                        <div className="text-sm text-gray-600">{purchase.purchaserEmail}</div>
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {purchase.amount.toLocaleString()} ₸
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Заявки партнеров</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">Все статусы</option>
                  <option value="pending">Ожидают</option>
                  <option value="approved">Одобрено</option>
                  <option value="rejected">Отклонено</option>
                </select>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Заявитель
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Компания
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Тип объекта
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата подачи
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{app.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {app.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {app.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{app.company}</div>
                          {app.location && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {app.location}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{app.propertyType || 'Не указан'}</div>
                          {app.rooms && (
                            <div className="text-sm text-gray-500">{app.rooms} номеров</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(app.submittedAt).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status === 'pending' ? 'Ожидает' :
                             app.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {app.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(app.id, 'approved')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(app.id, 'rejected')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <XCircle className="w-5 h-5" />
                                </button>
                              </>
                            )}
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Purchases Tab */}
        {activeTab === 'purchases' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Покупки сертификатов</h2>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Покупатель
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Тип карты
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Сумма
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Получатель
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата покупки
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Код
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchases.map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{purchase.purchaserEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{purchase.cardType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-green-600">
                            {purchase.amount.toLocaleString()} ₸
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{purchase.recipientName}</div>
                          <div className="text-sm text-gray-500">{purchase.recipientEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(purchase.purchasedAt).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                            {purchase.giftCardCode}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Usages Tab */}
        {activeTab === 'usages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Использования предложений</h2>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Пользователь
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Предложение
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Код
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Скидка
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата использования
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {usages.map((usage) => (
                      <tr key={usage.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{usage.userEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <ShoppingCart className="w-5 h-5 text-orange-600 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{usage.offerTitle}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                            {usage.offerCode}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-orange-600">
                            {usage.discountAmount}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(usage.usedAt).toLocaleDateString('ru-RU')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hotels Tab */}
        {activeTab === 'hotels' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Отели</h2>
              <motion.button
                onClick={handleCreateHotel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Добавить отель
              </motion.button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Название
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Город
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Адрес
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Рейтинг
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Цена за ночь
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Категория
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hotels.map((hotel) => (
                      <tr key={hotel.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={hotel.image_url || '/placeholder-hotel.jpg'}
                                alt={hotel.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{hotel.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{hotel.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-900">{hotel.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{hotel.price_per_night.toLocaleString()} ₸</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{hotel.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            hotel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {hotel.status === 'active' ? 'Активен' : 'Неактивен'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <motion.button
                              onClick={() => handleEditHotel(hotel)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Редактировать"
                            >
                              <Edit className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteHotel(hotel.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-600 hover:text-red-900"
                              title="Удалить"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
} 
} 