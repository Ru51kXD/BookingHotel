'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from '@/lib/motion';
import { Menu, X, User, Search, LogOut, Calendar, CreditCard } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, logout, isLoading } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Отслеживание скролла
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          setIsScrolled(scrollPosition > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрытие меню пользователя при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  const menuItems = [
    { name: 'Главная', path: '/' },
    { name: 'Отели', path: '/hotels' },
    { name: 'Направления', path: '/destinations' },
    { name: 'О нас', path: '/about' },
    { name: 'Контакты', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
            : 'bg-gradient-to-r from-white/10 via-white/5 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-indigo-600' : 'text-white'
              }`}
            >
              <Link href="/" className="flex items-center gap-2">
                <motion.span 
                  className="text-3xl"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3 
                  }}
                >
                  ✨
                </motion.span>
                <span>StayEasy</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    href={item.path}
                    className={`transition-all duration-300 font-medium relative group ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-indigo-600' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-indigo-600' : 'bg-white'
                    }`}></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Поиск */}
              <Link href="/hotels">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Search size={20} />
                  <span>Поиск</span>
                </motion.button>
              </Link>

              {/* Авторизация или профиль */}
              {isLoading ? (
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg ${
                      isScrolled 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                    }`}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span>{user.name.split(' ')[0]}</span>
                  </motion.button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50"
                        ref={userMenuRef}
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        
                        <div className="py-2">
                          <Link 
                            href="/account"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <User className="w-4 h-4 mr-3" />
                            Личный кабинет
                          </Link>
                          <Link 
                            href="/account/bookings"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Calendar className="w-4 h-4 mr-3" />
                            Мои бронирования
                          </Link>
                          <Link 
                            href="/account/payments"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <CreditCard className="w-4 h-4 mr-3" />
                            Способы оплаты
                          </Link>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Выйти
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLoginModal(true)}
                    className={`transition-all duration-300 px-4 py-2 rounded-lg font-medium ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Войти
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRegisterModal(true)}
                    className={`flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg font-medium ${
                      isScrolled 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                    }`}
                  >
                    <User size={20} />
                    <span>Регистрация</span>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden border-t backdrop-blur-xl ${
                isScrolled 
                  ? 'bg-white/95 border-gray-200' 
                  : 'bg-white/10 border-white/20'
              }`}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={menuItemVariants}
                  >
                    <Link
                      href={item.path}
                      className={`block py-3 px-4 rounded-lg transition-colors duration-300 ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className={`pt-4 border-t flex flex-col space-y-4 ${
                  isScrolled ? 'border-gray-200' : 'border-white/20'
                }`}>
                  <Link href="/hotels">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Search size={20} />
                      <span>Поиск отелей</span>
                    </motion.button>
                  </Link>
                  
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt="Profile" 
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className={`font-semibold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>{user.name}</p>
                          <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-white/70'}`}>{user.email}</p>
                        </div>
                      </div>
                      
                      <Link 
                        href="/account"
                        className={`block py-3 px-4 rounded-lg transition-colors duration-300 ${
                          isScrolled 
                            ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Личный кабинет
                      </Link>
                      <Link 
                        href="/account/bookings"
                        className={`block py-3 px-4 rounded-lg transition-colors duration-300 ${
                          isScrolled 
                            ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Мои бронирования
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className={`block w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                          isScrolled 
                            ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                            : 'text-red-300 hover:text-red-200 hover:bg-red-500/20'
                        }`}
                      >
                        Выйти
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          setIsMenuOpen(false);
                        }}
                        className={`block w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                          isScrolled 
                            ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        Войти
                      </button>
                      <button
                        onClick={() => {
                          setShowRegisterModal(true);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                          isScrolled 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700' 
                            : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                        }`}
                      >
                        <User size={20} />
                        <span>Регистрация</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
} 