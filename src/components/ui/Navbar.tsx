'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from '@/lib/motion';
import { Menu, X, User, Search } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { name: 'Контакты', path: '/contacts' },
  ];

  return (
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
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/search">
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
            <Link href="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                }`}
              >
                <User size={20} />
                <span>Кабинет</span>
              </motion.button>
            </Link>
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
              <Link href="/search">
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
                  <span>Поиск</span>
                </motion.button>
              </Link>
              <Link href="/profile">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700' 
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>Личный кабинет</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
} 