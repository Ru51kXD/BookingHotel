'use client';

import { motion } from '@/lib/motion';
import { Handshake, TrendingUp, Users, Award, Star, CheckCircle, ArrowRight, Building, MapPin, Phone, Mail, User, MessageSquare } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { useState } from 'react';
import { addPartnerApplication } from '@/lib/admin';
import SuccessAnimation from '@/components/ui/SuccessAnimation';

export default function PartnersPage() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    propertyType: '',
    location: '',
    rooms: '',
    experience: '',
    message: ''
  });

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Увеличение доходов',
      description: 'Получайте дополнительные бронирования через нашу платформу'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Широкая аудитория',
      description: 'Доступ к тысячам потенциальных гостей по всему Казахстану'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Маркетинговая поддержка',
      description: 'Профессиональное продвижение вашего объекта размещения'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Повышение рейтинга',
      description: 'Система отзывов и рейтингов для улучшения репутации'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Подача заявки',
      description: 'Заполните форму с информацией о вашем объекте'
    },
    {
      number: 2,
      title: 'Проверка',
      description: 'Наши специалисты проверят предоставленную информацию'
    },
    {
      number: 3,
      title: 'Подписание договора',
      description: 'Оформляем партнерское соглашение на выгодных условиях'
    },
    {
      number: 4,
      title: 'Запуск',
      description: 'Ваш объект появляется на платформе и начинает принимать бронирования'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      // Сохраняем заявку в админской системе
      addPartnerApplication(formData);
      
      // Показываем анимацию успеха
      setShowSuccessAnimation(true);
      setShowModal(false);
      
      // Очищаем форму
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        propertyType: '',
        location: '',
        rooms: '',
        experience: '',
        message: ''
      });
    } catch (error) {
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6"
              >
                <Handshake className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Партнерская программа</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Присоединяйтесь к нашей сети и увеличивайте доходы от вашего объекта размещения. 
                Мы предлагаем выгодные условия сотрудничества и профессиональную поддержку.
              </p>
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Преимущества партнерства</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Как стать партнером</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center relative"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    {index < steps.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-6 -right-4 w-6 h-6 text-gray-400" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {[
                { number: '500+', label: 'Партнеров' },
                { number: '50,000+', label: 'Довольных гостей' },
                { number: '95%', label: 'Заполняемость' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Готовы стать нашим партнером?</h2>
              <p className="text-xl text-white/90 mb-8">
                Подайте заявку сегодня и начните получать больше бронирований уже завтра!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <Handshake className="w-5 h-5 mr-2" />
                Подать заявку
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Заявка на партнерство</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Ваше имя"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="+7 (777) 123-45-67"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Название компании *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="ООО Название"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип объекта
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Выберите тип</option>
                    <option value="hotel">Отель</option>
                    <option value="hostel">Хостел</option>
                    <option value="apartment">Апартаменты</option>
                    <option value="guesthouse">Гостевой дом</option>
                    <option value="resort">Курорт</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Местоположение
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Город, область"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Количество номеров
                  </label>
                  <input
                    type="number"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Опыт работы (лет)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Дополнительная информация
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Расскажите о вашем объекте размещения..."
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Отправить заявку
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Success Animation */}
      <SuccessAnimation
        isVisible={showSuccessAnimation}
        onClose={() => setShowSuccessAnimation(false)}
        type="application"
        title="Заявка успешно отправлена!"
        message="Мы рассмотрим вашу заявку в течение 2-3 рабочих дней и свяжемся с вами"
        details="Проверьте указанный email для получения дальнейших инструкций"
      />

      <Footer />
    </>
  );
} 