'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { MessageCircle, Phone, Mail, Clock, HelpCircle, FileText, Send, CheckCircle2, Sparkles } from 'lucide-react';
import Footer from '@/components/ui/Footer';

interface SupportFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function SupportPage() {
  const [formData, setFormData] = useState<SupportFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Телефон',
      description: '+7 (717) 123-45-67',
      availability: 'Круглосуточно',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      description: 'support@stayeasy.kz',
      availability: 'Ответ в течение 2 часов',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Онлайн чат',
      description: 'Мгновенная помощь',
      availability: '24/7',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const faqItems = [
    {
      question: 'Как отменить бронирование?',
      answer: 'Вы можете отменить бронирование в личном кабинете или связавшись с поддержкой. Условия отмены зависят от политики конкретного отеля.'
    },
    {
      question: 'Когда списываются деньги?',
      answer: 'Оплата происходит сразу после подтверждения бронирования. Мы используем безопасные платежные системы для защиты ваших данных.'
    },
    {
      question: 'Можно ли изменить даты?',
      answer: 'Да, изменение дат возможно в зависимости от политики отеля и наличия свободных номеров на новые даты.'
    },
    {
      question: 'Как получить чек об оплате?',
      answer: 'Чек автоматически отправляется на ваш email после оплаты. Также вы можете скачать его в личном кабинете.'
    }
  ];

  const stats = [
    { number: '24/7', label: 'Поддержка' },
    { number: '2 мин', label: 'Среднее время ответа' },
    { number: '99%', label: 'Решенных вопросов' },
    { number: '4.9', label: 'Рейтинг поддержки' }
  ];

  const handleInputChange = (field: keyof SupportFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
    
    setTimeout(() => setParticles([]), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);

    try {
      // Отправляем сообщение в API
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Сохраняем сообщение в localStorage для отображения в админ панели
        if (result.data) {
          try {
            const existingMessages = JSON.parse(localStorage.getItem('support_messages') || '[]');
            existingMessages.push(result.data);
            localStorage.setItem('support_messages', JSON.stringify(existingMessages));
          } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
          }
        }

        // Создаем красивую анимацию успеха
        createParticles();
        setShowSuccess(true);
        
        // Очищаем форму
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Скрываем уведомление об успехе через 5 секунд
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        alert('Ошибка при отправке сообщения. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке сообщения');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20 relative overflow-hidden">
        {/* Анимированные частицы */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                opacity: 0, 
                scale: 0, 
                x: `${particle.x}%`, 
                y: `${particle.y}%` 
              }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                y: `${particle.y - 20}%`
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 3, 
                ease: "easeOut",
                delay: particle.id * 0.1 
              }}
              className="absolute pointer-events-none z-50"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          ))}
        </AnimatePresence>

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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-6"
              >
                <HelpCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Поддержка</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Наша команда поддержки работает круглосуточно, чтобы решить любые ваши вопросы. 
                Мы всегда готовы помочь вам в путешествии.
              </p>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <p className="font-semibold">Сообщение отправлено!</p>
                    <p className="text-sm opacity-90">Мы ответим вам в ближайшее время</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white`}>
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{method.title}</h3>
                  <p className="text-gray-600 text-lg mb-2">{method.description}</p>
                  <p className="text-sm text-indigo-600 font-medium">{method.availability}</p>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
                <FileText className="w-8 h-8 mr-3 text-indigo-600" />
                Часто задаваемые вопросы
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">{item.question}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Форма обратной связи</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Введите ваше имя"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Введите ваш email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Тема обращения</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Кратко опишите тему"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Опишите вашу проблему или вопрос подробно"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
} 