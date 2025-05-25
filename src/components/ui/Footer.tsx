'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion';
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
  ];

  const sections = [
    {
      title: 'Компания',
      links: [
        { label: 'О нас', href: '/about' },
        { label: 'Карьера', href: '/careers' },
        { label: 'Блог', href: '/blog' },
        { label: 'Партнерам', href: '/partners' },
      ],
    },
    {
      title: 'Помощь',
      links: [
        { label: 'Поддержка', href: '/support' },
        { label: 'Вопросы и ответы', href: '/faq' },
        { label: 'Правила', href: '/terms' },
        { label: 'Конфиденциальность', href: '/privacy' },
      ],
    },
    {
      title: 'Сервисы',
      links: [
        { label: 'Отели', href: '/hotels' },
        { label: 'Хостелы', href: '/hostels' },
        { label: 'Специальные предложения', href: '/offers' },
        { label: 'Подарочные сертификаты', href: '/gift-cards' },
      ],
    },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-indigo-900 text-white pt-16 pb-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Информация о компании */}
          <motion.div variants={childVariants}>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-3xl mr-2">✨</span>
              <span className="text-2xl font-bold">StayEasy</span>
            </Link>
            <p className="text-indigo-200 mb-6">
              Лучший сервис бронирования отелей и хостелов с онлайн оплатой.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, color: '#fff' }}
                  className="text-indigo-300 hover:text-white transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Разделы */}
          {sections.map((section, index) => (
            <motion.div key={index} variants={childVariants}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-indigo-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Контактная информация */}
        <motion.div
          variants={childVariants}
          className="border-t border-indigo-800 pt-8 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center text-indigo-200">
            <Mail size={18} className="mr-2" />
            <span>info@stayeasy.kz</span>
          </div>
          <div className="flex items-center text-indigo-200">
            <Phone size={18} className="mr-2" />
            <span>+7 (717) 123-45-67</span>
          </div>
          <div className="flex items-center text-indigo-200">
            <MapPin size={18} className="mr-2" />
            <span>г. Астана, пр. Мангилик Ел, 55</span>
          </div>
        </motion.div>

        {/* Копирайт */}
        <motion.div
          variants={childVariants}
          className="text-indigo-300 text-sm text-center pt-6 border-t border-indigo-800 mt-4"
        >
          <p>© {new Date().getFullYear()} StayEasy. Все права защищены.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
} 