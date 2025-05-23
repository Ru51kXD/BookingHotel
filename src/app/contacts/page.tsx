'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from '@/lib/motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  HelpCircle,
  CheckCircle
} from 'lucide-react';

// Динамический импорт компонентов
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });
const ParallaxBackground = dynamic(() => import('@/components/ui/ParallaxBackground'), { ssr: false });

// Контактная информация
const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Телефон',
    info: '+7 (495) 123-45-67',
    subInfo: 'Звонки принимаются 24/7',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email',
    info: 'info@stayeasy.ru',
    subInfo: 'Ответим в течение 2 часов',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Адрес',
    info: 'г. Москва, ул. Тверская, 1',
    subInfo: 'БЦ "Премиум", 15 этаж',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Часы работы',
    info: 'Круглосуточно',
    subInfo: 'Поддержка 24/7/365',
    color: 'from-orange-500 to-red-500'
  }
];

// Офисы в разных городах
const offices = [
  {
    city: 'Москва',
    address: 'ул. Тверская, 1, БЦ "Премиум"',
    phone: '+7 (495) 123-45-67',
    email: 'moscow@stayeasy.ru',
    color: 'from-blue-500 to-blue-700'
  },
  {
    city: 'Санкт-Петербург',
    address: 'Невский пр., 28, оф. 301',
    phone: '+7 (812) 987-65-43',
    email: 'spb@stayeasy.ru',
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    city: 'Екатеринбург',
    address: 'ул. Ленина, 15, БЦ "Высоцкий"',
    phone: '+7 (343) 555-77-88',
    email: 'ekb@stayeasy.ru',
    color: 'from-green-500 to-green-700'
  }
];

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <ParallaxBackground intensity={2} className="relative">
        <motion.section 
          ref={heroRef}
          className="relative bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-800 text-white py-32 overflow-hidden"
        >
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-20 bg-center"></div>
          </motion.div>

          {/* Анимированные частицы */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100, -20],
                  opacity: [0.1, 0.5, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.span 
                className="inline-block bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20 mb-8"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderColor: 'rgba(255,255,255,0.3)'
                }}
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <MessageCircle className="inline w-4 h-4 mr-2" />
                Свяжитесь с нами
              </motion.span>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight"
                whileInView={{ scale: [0.9, 1] }}
              >
                <motion.span 
                  className="block bg-gradient-to-r from-white via-purple-100 to-indigo-100 bg-clip-text text-transparent"
                  whileInView={{
                    backgroundImage: [
                      'linear-gradient(to right, #ffffff, #e9d5ff, #e0e7ff)',
                      'linear-gradient(to right, #c084fc, #8b5cf6, #6366f1)',
                      'linear-gradient(to right, #ffffff, #e9d5ff, #e0e7ff)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Контакты
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  whileInView={{
                    backgroundImage: [
                      'linear-gradient(to right, #fbbf24, #a855f7, #ec4899)',
                      'linear-gradient(to right, #f59e0b, #8b5cf6, #be185d)',
                      'linear-gradient(to right, #fbbf24, #a855f7, #ec4899)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  и поддержка
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Мы всегда готовы помочь вам с бронированием и ответить на любые вопросы. 
                Свяжитесь с нами удобным способом!
              </motion.p>

              {/* Быстрые контакты */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.a
                  href="tel:+74951234567"
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Phone className="w-8 h-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-white font-bold">Позвонить</div>
                  <div className="text-white/80 text-sm">+7 (495) 123-45-67</div>
                </motion.a>

                <motion.a
                  href="mailto:info@stayeasy.ru"
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-white font-bold">Написать</div>
                  <div className="text-white/80 text-sm">info@stayeasy.ru</div>
                </motion.a>

                <motion.div
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <HelpCircle className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-white font-bold">Онлайн чат</div>
                  <div className="text-white/80 text-sm">Доступен 24/7</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </ParallaxBackground>

      {/* Контактная информация */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Как с нами связаться
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Выберите удобный способ связи или посетите один из наших офисов
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden"
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl text-white mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {contact.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{contact.title}</h3>
                <p className="text-gray-900 font-semibold mb-2">{contact.info}</p>
                <p className="text-gray-600 text-sm">{contact.subInfo}</p>

                {/* Декоративный элемент */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full transform translate-x-16 -translate-y-16 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Форма обратной связи и карта */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Форма */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Напишите нам</h3>
              
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-6"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="block text-gray-700 font-medium mb-2">Ваше имя</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
                      placeholder="Введите ваше имя"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
                      placeholder="your@email.com"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">Тема сообщения</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
                    required
                  >
                    <option value="">Выберите тему</option>
                    <option value="booking">Вопрос по бронированию</option>
                    <option value="technical">Техническая поддержка</option>
                    <option value="partnership">Партнерство</option>
                    <option value="other">Другое</option>
                  </select>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">Сообщение</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all bg-white/80 backdrop-blur-sm resize-none"
                    placeholder="Опишите ваш вопрос подробнее..."
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-white flex items-center justify-center shadow-lg transition-all ${
                    isSubmitted 
                      ? 'bg-green-500' 
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                  }`}
                  whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Сообщение отправлено!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Отправить сообщение
                    </>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>

            {/* Карта и офисы */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Наши офисы</h3>
              
              {/* Карта-заглушка */}
              <motion.div 
                className="w-full h-64 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20"></div>
                <div className="text-center z-10">
                  <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <p className="text-purple-800 font-medium">Интерактивная карта</p>
                  <p className="text-purple-600 text-sm">Москва, ул. Тверская, 1</p>
                </div>
              </motion.div>

              {/* Список офисов */}
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{office.city}</h4>
                        <p className="text-gray-600 mb-1">{office.address}</p>
                        <p className="text-gray-600 mb-1">{office.phone}</p>
                        <p className="text-gray-600">{office.email}</p>
                      </div>
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${office.color} rounded-xl flex items-center justify-center`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ секция */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Часто задаваемые вопросы
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Ответы на самые популярные вопросы наших клиентов
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                question: 'Как отменить бронирование?',
                answer: 'Вы можете отменить бронирование в личном кабинете или связавшись с нашей поддержкой. Условия отмены зависят от типа тарифа.'
              },
              {
                question: 'Возможна ли оплата при заселении?',
                answer: 'Да, многие отели предлагают оплату при заселении. Эта информация указана в описании каждого отеля.'
              },
              {
                question: 'Как получить счет для юридических лиц?',
                answer: 'Обратитесь в наш отдел корпоративных продаж по телефону или email, и мы оформим все необходимые документы.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100"
                whileHover={{ scale: 1.01 }}
              >
                <h4 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </>
  );
} 