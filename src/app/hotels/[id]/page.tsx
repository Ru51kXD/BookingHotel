'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from '@/lib/motion';
import { useCurrency } from '@/lib/currency';
import { 
  Star, 
  MapPin, 
  Users, 
  Wifi, 
  Coffee, 
  Car, 
  Waves,
  Utensils,
  Airplay,
  Heart,
  Share,
  Check,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

// Динамический импорт компонентов
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });

// Заглушка данных для отеля (в реальном приложении данные будут загружаться с сервера)
const hotelData = {
  id: 1,
  name: 'Гранд Плаза',
  description: 'Элегантный отель в центре города, предлагающий роскошные номера с панорамным видом, бассейн, спа-центр и изысканный ресторан. Идеальное место как для бизнес-поездок, так и для отдыха.',
  fullDescription: `
    <p>Добро пожаловать в Гранд Плаза - один из самых престижных отелей в центре города. Наш отель предлагает идеальное сочетание элегантности, комфорта и первоклассного обслуживания.</p>
    <p>Все номера оформлены в современном стиле с использованием высококачественных материалов и оснащены по последнему слову техники. Из окон открывается захватывающий вид на городской пейзаж или живописный парк.</p>
    <p>В отеле Гранд Плаза вы найдете все необходимое для незабываемого отдыха: спа-центр с широким спектром процедур, крытый бассейн, современный фитнес-центр и изысканный ресторан, предлагающий блюда высокой кухни.</p>
    <p>Удобное расположение отеля позволяет легко добраться до основных достопримечательностей, торговых центров и бизнес-районов города. Наша команда профессионалов всегда готова обеспечить вам комфортное пребывание и помочь с любыми вопросами.</p>
  `,
  location: 'Москва, Пресненская набережная, 12',
  mainImage: '/images/hotel-1.jpg',
  images: [
    '/images/hotel-room-1.jpg',
    '/images/hotel-room-2.jpg',
    '/images/hotel-room-3.jpg',
    '/images/hotel-spa.jpg',
    '/images/hotel-restaurant.jpg',
  ],
  rating: 4.8,
  reviewCount: 426,
  price: 6500,
  amenities: [
    { name: 'Бесплатный Wi-Fi', icon: <Wifi /> },
    { name: 'Завтрак включен', icon: <Coffee /> },
    { name: 'Бесплатная парковка', icon: <Car /> },
    { name: 'Бассейн', icon: <Waves /> },
    { name: 'Ресторан', icon: <Utensils /> },
    { name: 'Телевизор', icon: <Airplay /> },
  ],
  roomTypes: [
    {
      id: 1,
      name: 'Стандартный номер',
      price: 6500,
      priceDiscount: null,
      description: 'Комфортный номер с двуспальной кроватью, рабочей зоной и всеми необходимыми удобствами.',
      image: '/images/hotel-room-standard.jpg',
      capacity: 2,
    },
    {
      id: 2,
      name: 'Полулюкс',
      price: 9800,
      priceDiscount: 8500,
      description: 'Просторный номер с гостиной зоной, панорамным видом и расширенным набором удобств.',
      image: '/images/hotel-room-deluxe.jpg',
      capacity: 2,
    },
    {
      id: 3,
      name: 'Люкс',
      price: 15000,
      priceDiscount: null,
      description: 'Роскошный номер с отдельной гостиной, спальней, джакузи и панорамным видом на город.',
      image: '/images/hotel-room-suite.jpg',
      capacity: 4,
    },
  ],
};

export default function HotelDetailPage() {
  const { formatPrice } = useCurrency();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  
  const [selectedTab, setSelectedTab] = useState('description');
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  
  // Параллакс эффекты
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Плавные анимации
  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 });
  
  // Анимационные варианты
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };
  
  const imageVariants = {
    hover: { 
      scale: 1.1,
      rotateX: 5,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };
  
  const tabVariants = {
    inactive: { 
      color: '#4B5563', 
      borderColor: 'transparent',
      scale: 1,
      backgroundColor: 'transparent'
    },
    active: { 
      color: '#4F46E5', 
      borderColor: '#4F46E5',
      scale: 1.05,
      backgroundColor: 'rgba(79, 70, 229, 0.05)',
      transition: { duration: 0.3 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    hover: {
      y: -10,
      scale: 1.02,
      rotateX: 2,
      boxShadow: '0 20px 40px -12px rgba(79, 70, 229, 0.25)',
      transition: { duration: 0.3 }
    }
  };
  
  // Обработчики событий
  const handleRoomSelect = (roomId: number) => {
    setSelectedRoomId(roomId === selectedRoomId ? null : roomId);
  };
  
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  
  // Вычисляемые значения
  const selectedRoom = selectedRoomId 
    ? hotelData.roomTypes.find(room => room.id === selectedRoomId)
    : null;
  
  const totalPrice = selectedRoom
    ? (selectedRoom.priceDiscount || selectedRoom.price) * 3 // Пример: 3 ночи
    : 0;
  
  return (
    <>
      <Navbar />
      
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="bg-gray-50 min-h-screen pb-16"
      >
        {/* Hero Section с параллакс */}
        <motion.div 
          ref={heroRef}
          className="w-full h-[50vh] md:h-[60vh] relative bg-gray-900 overflow-hidden"
        >
          {/* Параллакс фон */}
          <motion.div
            style={{ y: smoothHeroY, scale: heroScale }}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <Image
              src={hotelData.mainImage}
              alt={hotelData.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          
          {/* Динамические градиенты */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            style={{ opacity: smoothOpacity }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-transparent to-purple-900/30"
            animate={{ 
              background: [
                'linear-gradient(to right, rgba(67, 56, 202, 0.3), transparent, rgba(147, 51, 234, 0.3))',
                'linear-gradient(to right, rgba(147, 51, 234, 0.3), transparent, rgba(67, 56, 202, 0.3))',
                'linear-gradient(to right, rgba(67, 56, 202, 0.3), transparent, rgba(147, 51, 234, 0.3))'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Контент Hero */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full p-8 md:p-12"
            style={{ y: smoothTextY }}
          >
            <div className="container mx-auto">
              <div className="flex flex-wrap items-end justify-between">
                <div className="max-w-3xl">
                  <motion.h1 
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                  >
                    <motion.span
                      className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                      whileInView={{ 
                        backgroundImage: [
                          'linear-gradient(to right, #ffffff, #e5e7eb)',
                          'linear-gradient(to right, #a5b4fc, #c084fc)',
                          'linear-gradient(to right, #ffffff, #e5e7eb)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {hotelData.name}
                    </motion.span>
                  </motion.h1>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="flex items-center text-white/90 mb-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <MapPin size={20} className="mr-2" />
                    </motion.div>
                    <span className="text-lg">{hotelData.location}</span>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="flex items-center"
                  >
                    <motion.div 
                      className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl text-lg font-bold mr-4 shadow-lg"
                      whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star size={18} className="mr-1 text-yellow-300" fill="currentColor" />
                      {hotelData.rating}
                    </motion.div>
                    <span className="text-white/80 text-lg">
                      {hotelData.reviewCount} отзывов
                    </span>
                  </motion.div>
                </div>
                
                <motion.div 
                  variants={itemVariants}
                  className="mt-6 md:mt-0 flex space-x-4"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.1, 
                      rotateY: 10,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-xl text-white px-6 py-3 rounded-xl hover:bg-white/30 transition border border-white/30 font-semibold"
                  >
                    <Heart size={20} />
                    <span>Сохранить</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ 
                      scale: 1.1, 
                      rotateY: -10,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-xl text-white px-6 py-3 rounded-xl hover:bg-white/30 transition border border-white/30 font-semibold"
                  >
                    <Share size={20} />
                    <span>Поделиться</span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Main Content */}
        <div ref={contentRef} className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hotel Details */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2"
            >
              {/* Content Tabs */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-8 border border-white/50"
                whileInView={{ y: [50, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
              >
                <div className="border-b border-gray-200/50">
                  <div className="flex">
                    {['description', 'photos', 'map', 'reviews'].map((tab) => (
                      <motion.button
                        key={tab}
                        variants={tabVariants}
                        initial="inactive"
                        animate={selectedTab === tab ? "active" : "inactive"}
                        whileHover={{ 
                          backgroundColor: 'rgba(79, 70, 229, 0.05)',
                          scale: 1.02
                        }}
                        className={`px-8 py-5 focus:outline-none capitalize text-base font-semibold border-b-2 transition-all ${
                          selectedTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600'
                        }`}
                        onClick={() => handleTabChange(tab)}
                      >
                        {tab === 'description' && 'Описание'}
                        {tab === 'photos' && 'Фотографии'}
                        {tab === 'map' && 'На карте'}
                        {tab === 'reviews' && 'Отзывы'}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="p-8"
                  >
                    {selectedTab === 'description' && (
                      <motion.div>
                        <motion.h3 
                          className="text-2xl font-bold text-gray-800 mb-6"
                          whileInView={{ scale: [0.9, 1] }}
                        >
                          О {hotelData.name}
                        </motion.h3>
                        <motion.div 
                          className="prose prose-lg text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: hotelData.fullDescription }}
                          whileInView={{ opacity: [0, 1], y: [20, 0] }}
                          transition={{ duration: 0.6, staggerChildren: 0.1 }}
                        />
                        
                        {/* Улучшенная секция удобств */}
                        <motion.div 
                          className="mt-8"
                          whileInView={{ opacity: [0, 1], y: [30, 0] }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <h4 className="text-xl font-bold text-gray-800 mb-6">Удобства</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {hotelData.amenities.map((amenity, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                                whileHover={{
                                  scale: 1.05,
                                  backgroundColor: '#e0e7ff',
                                  borderColor: '#a5b4fc'
                                }}
                                whileInView={{ 
                                  opacity: [0, 1], 
                                  x: [-20, 0] 
                                }}
                                transition={{ 
                                  duration: 0.4, 
                                  delay: index * 0.1 
                                }}
                              >
                                <motion.div
                                  className="text-indigo-600 mr-3"
                                  whileHover={{ rotate: 360, scale: 1.2 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  {amenity.icon}
                                </motion.div>
                                <span className="text-gray-700 font-medium">{amenity.name}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                    
                    {selectedTab === 'photos' && (
                      <motion.div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Фотогалерея</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {hotelData.images.map((image, index) => (
                            <motion.div
                              key={index}
                              className="relative h-48 rounded-xl overflow-hidden shadow-lg group"
                              variants={imageVariants}
                              whileHover="hover"
                              whileInView={{ 
                                opacity: [0, 1], 
                                scale: [0.8, 1] 
                              }}
                              transition={{ 
                                duration: 0.6, 
                                delay: index * 0.1 
                              }}
                            >
                              <Image
                                src={image}
                                alt={`Hotel image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <motion.div
                                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ opacity: 1 }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Room Selection */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50"
                whileInView={{ y: [50, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-gray-800 mb-8"
                  whileInView={{ scale: [0.9, 1] }}
                >
                  Выберите номер
                </motion.h3>
                
                <div className="space-y-6">
                  {hotelData.roomTypes.map((room, index) => (
                    <motion.div
                      key={room.id}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                        selectedRoomId === room.id
                          ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50'
                          : 'border-gray-200 bg-white/50 hover:border-indigo-300'
                      }`}
                      onClick={() => handleRoomSelect(room.id)}
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <motion.div 
                          className="md:w-1/3"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="relative h-48 rounded-xl overflow-hidden">
                            <Image
                              src={room.image}
                              alt={room.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </motion.div>
                        
                        <div className="md:w-2/3 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <motion.h4 
                                className="text-xl font-bold text-gray-800"
                                whileHover={{ color: '#4f46e5' }}
                              >
                                {room.name}
                              </motion.h4>
                              <div className="text-right">
                                {room.priceDiscount && (
                                  <motion.span 
                                    className="text-gray-500 line-through text-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    ₽{room.price.toLocaleString()}
                                  </motion.span>
                                )}
                                <motion.div 
                                  className="text-2xl font-bold text-indigo-600"
                                  whileInView={{ scale: [0.8, 1.1, 1] }}
                                  transition={{ duration: 0.5 }}
                                >
                                  {formatPrice(room.priceDiscount || room.price)}
                                  <span className="text-sm font-normal text-gray-500">/ночь</span>
                                </motion.div>
                              </div>
                            </div>
                            
                            <motion.p 
                              className="text-gray-600 mb-4"
                              whileInView={{ opacity: [0, 1], y: [10, 0] }}
                            >
                              {room.description}
                            </motion.p>
                            
                            <motion.div 
                              className="flex items-center text-gray-500"
                              whileInView={{ opacity: [0, 1] }}
                              transition={{ delay: 0.2 }}
                            >
                              <Users size={16} className="mr-1" />
                              <span>до {room.capacity} гостей</span>
                            </motion.div>
                          </div>
                          
                          <motion.div 
                            className="mt-4"
                            whileInView={{ opacity: [0, 1], y: [20, 0] }}
                            transition={{ delay: 0.4 }}
                          >
                            <motion.button
                              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                                selectedRoomId === room.id
                                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                              }`}
                              whileHover={{ 
                                scale: 1.05,
                                boxShadow: selectedRoomId === room.id 
                                  ? "0 10px 20px rgba(79, 70, 229, 0.4)"
                                  : "0 5px 15px rgba(0, 0, 0, 0.1)"
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {selectedRoomId === room.id ? 'Выбрано' : 'Выбрать номер'}
                            </motion.button>
                          </motion.div>
                        </div>
                      </div>
                      
                      {selectedRoomId === room.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.4 }}
                          className="mt-6 pt-6 border-t border-indigo-200"
                        >
                          <div className="flex items-center text-green-600">
                            <Check size={20} className="mr-2" />
                            <span className="font-semibold">Номер выбран для бронирования</span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Booking Sidebar */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sticky top-24 border border-white/50"
                whileInView={{ 
                  scale: [0.9, 1],
                  opacity: [0, 1],
                  rotateY: [10, 0]
                }}
                transition={{ duration: 0.6 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-gray-800 mb-6"
                  whileInView={{ scale: [0.9, 1] }}
                >
                  Бронирование
                </motion.h3>
                
                {/* Booking Form */}
                <motion.div 
                  className="space-y-6"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Дата заезда
                    </label>
                    <motion.input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Дата выезда
                    </label>
                    <motion.input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Количество гостей
                    </label>
                    <motion.select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm"
                      whileFocus={{ scale: 1.02 }}
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'гость' : 'гостя'}</option>
                      ))}
                    </motion.select>
                  </motion.div>
                </motion.div>
                
                {selectedRoom && (
                  <motion.div 
                    className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.h4 
                      className="font-bold text-gray-800 mb-4"
                      whileInView={{ scale: [0.95, 1] }}
                    >
                      Выбранный номер
                    </motion.h4>
                    <motion.div 
                      className="text-sm text-gray-600 mb-2"
                      whileInView={{ opacity: [0, 1], x: [-10, 0] }}
                    >
                      {selectedRoom.name}
                    </motion.div>
                    <motion.div 
                      className="text-lg font-bold text-indigo-600"
                      whileInView={{ scale: [0.9, 1.05, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      {formatPrice(totalPrice)} за 3 ночи
                    </motion.div>
                  </motion.div>
                )}
                
                <motion.button
                  className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedRoom}
                  whileHover={selectedRoom ? { 
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(79, 70, 229, 0.4)"
                  } : {}}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  <motion.div 
                    className="flex items-center justify-center"
                    whileHover={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <CreditCard className="mr-2" size={20} />
                    Забронировать сейчас
                  </motion.div>
                </motion.button>
                
                <motion.div 
                  className="mt-6 flex items-center justify-center text-sm text-gray-500"
                  variants={itemVariants}
                >
                  <ShieldCheck size={16} className="mr-1 text-green-500" />
                  Безопасная оплата
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </>
  );
}