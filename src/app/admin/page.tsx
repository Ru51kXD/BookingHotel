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
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  CreditCard,
  ShoppingCart,
  FileText,
  UserCheck,
  UserX
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
import EditUserModal from '@/components/admin/EditUserModal';

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
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [purchases, setPurchases] = useState<GiftCardPurchase[]>([]);
  const [usages, setUsages] = useState<OfferUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<AdminHotel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [userSearch, setUserSearch] = useState('');
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Универсальная функция для парсинга amenities
  const parseAmenities = (amenities: string | null | undefined): string[] => {
    if (!amenities) return [];
    
    // Пробуем распарсить как JSON
    try {
      const parsed = JSON.parse(amenities);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // Если не JSON, то обрабатываем как строку с запятыми
    }
    
    // Обрабатываем как строку с запятыми
    return amenities.split(',').filter(a => a.trim()).map(a => a.trim());
  };

  useEffect(() => {
    const initializeAdmin = async () => {
      // Ждем пока пользователь загрузится
      if (user === undefined) {
        return; // Еще загружается
      }
      
      if (user?.role === 'admin') {
        // Загружаем данные
        setApplications(getPartnerApplications());
        setPurchases(getGiftCardPurchases());
        setUsages(getOfferUsages());
        await loadHotels();
        loadUsers();
        setLoading(false); // Устанавливаем loading в false после загрузки
      } else {
        setLoading(false); // Также устанавливаем false если пользователь не админ
        if (user === null || (user && user.role !== 'admin')) {
          router.push('/');
        }
      }
    };

    initializeAdmin();
  }, [user, router]);

  const loadHotels = async () => {
    try {
      // Загружаем отели из API
      const response = await fetch('/api/hotels');
      const data = await response.json();
      
      if (data.success) {
        // Преобразуем отели из API в нужный формат
        const apiHotels = data.data.map((hotel: any) => ({
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          address: hotel.address,
          rating: hotel.rating,
          price_per_night: hotel.price_per_night,
          category: hotel.category,
          image_url: hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          status: 'active' as const,
          created_at: hotel.created_at || new Date().toISOString(),
          description: hotel.description || '',
          country: 'Казахстан',
          amenities: parseAmenities(hotel.amenities),
          images: []
        }));
        
        setHotels(apiHotels);
      } else {
        console.error('Ошибка загрузки отелей:', data.error);
        setHotels([]);
      }
    } catch (error) {
      console.error('Ошибка при загрузке отелей:', error);
      setHotels([]);
    }
  };

  const loadUsers = () => {
    // Загружаем зарегистрированных пользователей из localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    // Добавляем демо-пользователей
    const demoUsers = [
      {
        id: 'admin-1',
        name: 'Администратор',
        email: 'admin@stayeasy.kz',
        phone: '+7 777 123 4567',
        role: 'admin',
        status: 'active',
        created_at: '2024-01-01T00:00:00.000Z',
        last_login: new Date().toISOString()
      },
      {
        id: 'user-demo-1',
        name: 'Анна Иванова',
        email: 'anna.ivanova@example.com',
        phone: '+7 701 234 5678',
        role: 'user',
        status: 'active',
        created_at: '2024-01-15T10:30:00.000Z',
        last_login: '2024-01-20T14:20:00.000Z'
      },
      {
        id: 'user-demo-2',
        name: 'Максим Петров',
        email: 'maxim.petrov@example.com',
        phone: '+7 702 345 6789',
        role: 'user',
        status: 'active',
        created_at: '2024-01-18T09:15:00.000Z',
        last_login: '2024-01-19T16:45:00.000Z'
      },
      {
        id: 'user-demo-3',
        name: 'Елена Сидорова',
        email: 'elena.sidorova@example.com',
        phone: '+7 703 456 7890',
        role: 'user',
        status: 'blocked',
        created_at: '2024-01-10T08:20:00.000Z',
        last_login: '2024-01-17T12:10:00.000Z'
      },
      {
        id: 'user-demo-4',
        name: 'Алексей Козлов',
        email: 'alexey.kozlov@example.com',
        phone: '+7 704 567 8901',
        role: 'user',
        status: 'active',
        created_at: '2024-01-12T11:45:00.000Z',
        last_login: '2024-01-21T09:30:00.000Z'
      }
    ];

    // Объединяем пользователей из localStorage и демо-данные
    const formattedRegisteredUsers: AdminUser[] = registeredUsers.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role || 'user',
      status: user.status || 'active',
      created_at: user.created_at,
      last_login: user.last_login
    }));

    // Проверяем, чтобы не было дублирования по email
    const allUsers = [...demoUsers];
    formattedRegisteredUsers.forEach(regUser => {
      const isDuplicate = allUsers.some(existingUser => existingUser.email === regUser.email);
      if (!isDuplicate) {
        allUsers.push(regUser);
      }
    });

    setUsers(allUsers);
  };

  const handleDeleteHotel = async (hotelId: number | string) => {
    if (confirm('Вы уверены, что хотите удалить этот отель?')) {
      try {
        const response = await fetch(`/api/hotels?id=${hotelId}`, {
          method: 'DELETE',
        });

        const result = await response.json();
        
        if (result.success) {
          console.log('Отель успешно удален:', result.message);
          // Перезагружаем список отелей
          await loadHotels();
        } else {
          console.error('Ошибка удаления отеля:', result.error);
          alert('Ошибка при удалении отеля: ' + result.error);
        }
      } catch (error) {
        console.error('Ошибка при удалении отеля:', error);
        alert('Произошла ошибка при удалении отеля');
      }
    }
  };

  const handleBlockUser = async (id: string) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const updatedUsers = registeredUsers.map((user: any) => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } 
        : user
    );
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
    loadUsers(); // Перезагружаем пользователей из localStorage
  };

  const handleDeleteUser = async (id: string) => {
    const userToDelete = users.find(u => u.id === id);
    if (userToDelete) {
      // Проверяем, не пытается ли администратор удалить самого себя
      if (userToDelete.id === user?.id) {
        alert('Вы не можете удалить свой собственный аккаунт!');
        return;
      }
      
      // Предупреждение при удалении администратора
      if (userToDelete.role === 'admin') {
        if (!confirm('Внимание! Вы пытаетесь удалить администратора. Это может повлиять на работу системы. Продолжить?')) {
          return;
        }
      }
      
      setUserToDelete(userToDelete);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const updatedUsers = registeredUsers.filter((user: any) => user.id !== userToDelete.id);
      localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
      loadUsers(); // Перезагружаем пользователей из localStorage
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const cancelDeleteUser = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
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

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditUserModalOpen(true);
  };

  const handleSaveUser = (userData: AdminUser) => {
    // Если это демо-пользователь и мы его редактируем, не сохраняем в localStorage
    if (selectedUser && (selectedUser.id.startsWith('admin-') || selectedUser.id.startsWith('user-demo-'))) {
      alert('Демо-пользователи не могут быть изменены');
      setIsEditUserModalOpen(false);
      setSelectedUser(null);
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    if (selectedUser && !selectedUser.id.startsWith('admin-') && !selectedUser.id.startsWith('user-demo-')) {
      // Редактирование существующего пользователя
      const updatedUsers = registeredUsers.map((user: any) => 
        user.id === selectedUser.id ? { ...userData, updated_at: new Date().toISOString() } : user
      );
      localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
    } else if (!selectedUser) {
      // Создание нового пользователя
      const newUser = {
        ...userData,
        id: `user-${Date.now()}`,
        created_at: new Date().toISOString()
      };
      registeredUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    }
    
    loadUsers();
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveHotel = async (hotelData: AdminHotel) => {
    try {
      if (selectedHotel) {
        // Редактирование существующего отеля
        const response = await fetch('/api/hotels', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selectedHotel.id,
            name: hotelData.name,
            category: hotelData.category,
            city: hotelData.city,
            address: hotelData.address,
            price_per_night: hotelData.price_per_night,
            rating: hotelData.rating,
            image_url: hotelData.image_url,
            description: hotelData.description,
            amenities: hotelData.amenities || []
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          console.log('Отель успешно обновлен:', result.message);
        } else {
          console.error('Ошибка обновления отеля:', result.error);
          alert('Ошибка при обновлении отеля: ' + result.error);
        }
      } else {
        // Создание нового отеля
        const response = await fetch('/api/hotels', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: hotelData.name,
            category: hotelData.category,
            city: hotelData.city,
            address: hotelData.address,
            price_per_night: hotelData.price_per_night,
            rating: hotelData.rating,
            image_url: hotelData.image_url,
            description: hotelData.description,
            amenities: hotelData.amenities || []
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          console.log('Отель успешно создан:', result.message);
        } else {
          console.error('Ошибка создания отеля:', result.error);
          alert('Ошибка при создании отеля: ' + result.error);
        }
      }
      
      // Перезагружаем список отелей
      await loadHotels();
      setIsEditModalOpen(false);
      setSelectedHotel(null);
    } catch (error) {
      console.error('Ошибка при сохранении отеля:', error);
      alert('Произошла ошибка при сохранении отеля');
    }
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
    blockedUsers: users.filter(user => user.status === 'blocked').length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    approvedApplications: applications.filter(app => app.status === 'approved').length,
    totalPurchases: purchases.length,
    totalRevenue: purchases.reduce((sum, purchase) => sum + purchase.amount, 0),
    totalUsages: usages.length
  };

  // Функции для статусов заявок
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'В ожидании';
      case 'approved':
        return 'Одобрено';
      case 'rejected':
        return 'Отклонено';
      default:
        return 'Неизвестно';
    }
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
    { id: 'users', label: 'Пользователи', icon: Users },
    { id: 'applications', label: 'Заявки партнеров', icon: Building },
    { id: 'purchases', label: 'Покупки сертификатов', icon: Gift },
    { id: 'usages', label: 'Использования предложений', icon: Tag },
    { id: 'hotels', label: 'Отели', icon: Hotel }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Админ-панель
          </motion.h1>
          <p className="text-gray-600 mt-2">Управление системой бронирования отелей</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Дашборд', icon: BarChart3 },
              { id: 'applications', name: 'Заявки партнеров', icon: Building },
              { id: 'users', name: 'Пользователи', icon: Users },
              { id: 'hotels', name: 'Отели', icon: Building2 }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Всего заявок',
                  value: applications.length,
                  icon: FileText,
                  color: 'bg-blue-500',
                  change: '+12%'
                },
                {
                  title: 'В ожидании',
                  value: applications.filter(app => app.status === 'pending').length,
                  icon: Clock,
                  color: 'bg-yellow-500',
                  change: '+5%'
                },
                {
                  title: 'Одобренные',
                  value: applications.filter(app => app.status === 'approved').length,
                  icon: CheckCircle,
                  color: 'bg-green-500',
                  change: '+18%'
                },
                {
                  title: 'Отклоненные',
                  value: applications.filter(app => app.status === 'rejected').length,
                  icon: XCircle,
                  color: 'bg-red-500',
                  change: '-2%'
                },
                {
                  title: 'Всего пользователей',
                  value: users.length,
                  icon: Users,
                  color: 'bg-purple-500',
                  change: '+8%'
                },
                {
                  title: 'Активные пользователи',
                  value: users.filter(user => user.status === 'active').length,
                  icon: UserCheck,
                  color: 'bg-green-500',
                  change: '+15%'
                },
                {
                  title: 'Заблокированные',
                  value: users.filter(user => user.status === 'blocked').length,
                  icon: UserX,
                  color: 'bg-red-500',
                  change: '-5%'
                },
                {
                  title: 'Всего отелей',
                  value: hotels.length,
                  icon: Building2,
                  color: 'bg-indigo-500',
                  change: '+10%'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <span className={`ml-2 text-sm font-medium ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика заявок</h3>
                <div className="space-y-4">
                  {[
                    { status: 'pending', label: 'В ожидании', color: 'bg-yellow-500', count: applications.filter(app => app.status === 'pending').length },
                    { status: 'approved', label: 'Одобренные', color: 'bg-green-500', count: applications.filter(app => app.status === 'approved').length },
                    { status: 'rejected', label: 'Отклоненные', color: 'bg-red-500', count: applications.filter(app => app.status === 'rejected').length }
                  ].map((item) => (
                    <div key={item.status} className="flex items-center">
                      <div className={`w-4 h-4 ${item.color} rounded mr-3`}></div>
                      <span className="text-sm text-gray-600 flex-1">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние заявки</h3>
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{app.hotelName}</p>
                        <p className="text-sm text-gray-600">{app.contactEmail}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Заявки на партнерство</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Отель
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Контакт
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
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{app.hotelName}</div>
                            <div className="text-sm text-gray-500">{app.location}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{app.contactName}</div>
                            <div className="text-sm text-gray-500">{app.contactEmail}</div>
                            <div className="text-sm text-gray-500">{app.contactPhone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(app.submittedAt).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {app.status === 'pending' && (
                              <>
                                <motion.button
                                  onClick={() => handleStatusUpdate(app.id, 'approved')}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-green-600 hover:text-green-900"
                                  title="Одобрить"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleStatusUpdate(app.id, 'rejected')}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-red-600 hover:text-red-900"
                                  title="Отклонить"
                                >
                                  <XCircle className="w-5 h-5" />
                                </motion.button>
                              </>
                            )}
                            <motion.button
                              onClick={() => window.open(`mailto:${app.contactEmail}`, '_blank')}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Написать email"
                            >
                              <Mail className="w-5 h-5" />
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

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Поиск по имени или email..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <motion.button
                  onClick={() => setUserSearch('')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Очистить
                </motion.button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Пользователи ({filteredUsers.length})
                </h3>
                <motion.button
                  onClick={handleCreateUser}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить пользователя
                </motion.button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
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
                        Дата регистрации
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((tableUser) => (
                      <tr key={tableUser.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {tableUser.name.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{tableUser.name}</div>
                              <div className="text-sm text-gray-500">ID: {tableUser.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{tableUser.email}</div>
                          {tableUser.phone && (
                            <div className="text-sm text-gray-500">{tableUser.phone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            tableUser.role === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {tableUser.role === 'admin' ? 'Администратор' : 'Пользователь'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            tableUser.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {tableUser.status === 'active' ? 'Активен' : 'Заблокирован'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(tableUser.created_at).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {tableUser.id !== user?.id && (
                              <>
                                <motion.button
                                  onClick={() => handleBlockUser(tableUser.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className={`${
                                    tableUser.status === 'active' 
                                      ? 'text-yellow-600 hover:text-yellow-900' 
                                      : 'text-green-600 hover:text-green-900'
                                  }`}
                                  title={tableUser.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                                >
                                  {tableUser.status === 'active' ? (
                                    <UserX className="w-5 h-5" />
                                  ) : (
                                    <UserCheck className="w-5 h-5" />
                                  )}
                                </motion.button>
                                <motion.button
                                  onClick={() => handleDeleteUser(tableUser.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-red-600 hover:text-red-900"
                                  title="Удалить пользователя"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </motion.button>
                              </>
                            )}
                            <motion.button
                              onClick={() => handleEditUser(tableUser)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Редактировать"
                            >
                              <Edit className="w-5 h-5" />
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

        {/* Hotels Tab */}
        {activeTab === 'hotels' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Управление отелями</h3>
              <motion.button
                onClick={handleCreateHotel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
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

      {/* Delete User Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="text-center">
              {/* Warning Icon */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Trash2 className="w-10 h-10 text-red-600" />
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Удалить пользователя?
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-2">
                Вы действительно хотите удалить пользователя <strong>{userToDelete.name}</strong>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Это действие нельзя отменить. Все данные пользователя будут удалены навсегда.
              </p>

              {/* User Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {userToDelete.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{userToDelete.name}</div>
                    <div className="text-sm text-gray-500">{userToDelete.email}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div>ID: {userToDelete.id}</div>
                  <div>Роль: {userToDelete.role === 'admin' ? 'Администратор' : 'Пользователь'}</div>
                  <div>Статус: {userToDelete.status === 'active' ? 'Активен' : 'Заблокирован'}</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={cancelDeleteUser}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Отмена
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDeleteUser}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Удалить
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Hotel Modal */}
      {isEditModalOpen && (
        <EditHotelModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedHotel(null);
          }}
          hotel={selectedHotel}
          onSave={handleSaveHotel}
        />
      )}

      {/* Edit User Modal */}
      {isEditUserModalOpen && (
        <EditUserModal
          isOpen={isEditUserModalOpen}
          onClose={() => {
            setIsEditUserModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
} 