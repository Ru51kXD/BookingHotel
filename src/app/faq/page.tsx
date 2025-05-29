'use client';

import { motion } from '@/lib/motion';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { useState } from 'react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData = [
    {
      category: 'Бронирование',
      questions: [
        {
          question: 'Как забронировать отель?',
          answer: 'Выберите отель, укажите даты заезда и выезда, количество гостей, затем нажмите "Забронировать". Заполните данные и произведите оплату.'
        },
        {
          question: 'Можно ли забронировать номер без предоплаты?',
          answer: 'Нет, все бронирования требуют полной предоплаты для подтверждения. Это гарантирует, что номер будет зарезервирован для вас.'
        },
        {
          question: 'Как изменить даты бронирования?',
          answer: 'Войдите в личный кабинет, найдите ваше бронирование и нажмите "Изменить". Изменение возможно в зависимости от политики отеля и наличия свободных номеров.'
        },
        {
          question: 'Можно ли забронировать номер на сегодня?',
          answer: 'Да, вы можете забронировать номер на сегодняшний день, если есть свободные номера. Бронирование подтверждается мгновенно после оплаты.'
        }
      ]
    },
    {
      category: 'Оплата',
      questions: [
        {
          question: 'Какие способы оплаты принимаются?',
          answer: 'Мы принимаем банковские карты Visa, MasterCard, а также платежи через Kaspi Pay и другие популярные платежные системы Казахстана.'
        },
        {
          question: 'Когда списываются деньги с карты?',
          answer: 'Оплата происходит сразу после подтверждения бронирования. Деньги списываются в момент завершения процесса бронирования.'
        },
        {
          question: 'Можно ли оплатить наличными в отеле?',
          answer: 'Нет, все бронирования через наш сайт требуют онлайн-оплаты. Это обеспечивает безопасность и гарантирует подтверждение бронирования.'
        },
        {
          question: 'Как получить чек об оплате?',
          answer: 'Чек автоматически отправляется на ваш email после успешной оплаты. Также вы можете скачать его в личном кабинете в разделе "Мои бронирования".'
        }
      ]
    },
    {
      category: 'Отмена и возврат',
      questions: [
        {
          question: 'Как отменить бронирование?',
          answer: 'Войдите в личный кабинет, найдите ваше бронирование и нажмите "Отменить". Условия отмены зависят от политики конкретного отеля.'
        },
        {
          question: 'Когда можно получить полный возврат?',
          answer: 'Условия возврата зависят от тарифа и политики отеля. Обычно полный возврат возможен при отмене за 24-48 часов до заезда.'
        },
        {
          question: 'Сколько времени занимает возврат денег?',
          answer: 'Возврат средств на банковскую карту может занимать от 3 до 14 рабочих дней в зависимости от вашего банка.'
        },
        {
          question: 'Можно ли отменить невозвратный тариф?',
          answer: 'Невозвратные тарифы не подлежат отмене с возвратом средств, но в исключительных случаях (болезнь, форс-мажор) возможны исключения.'
        }
      ]
    },
    {
      category: 'Подарочные сертификаты',
      questions: [
        {
          question: 'Как использовать подарочный сертификат?',
          answer: 'При бронировании введите код сертификата в специальное поле. Сумма сертификата будет автоматически вычтена из общей стоимости.'
        },
        {
          question: 'Можно ли использовать несколько сертификатов?',
          answer: 'Да, вы можете использовать несколько подарочных сертификатов для одного бронирования, если их общая сумма не превышает стоимость.'
        },
        {
          question: 'Что делать, если сертификат не активируется?',
          answer: 'Проверьте правильность ввода кода и срок действия. Если проблема сохраняется, обратитесь в службу поддержки.'
        }
      ]
    },
    {
      category: 'Специальные предложения',
      questions: [
        {
          question: 'Как воспользоваться скидкой?',
          answer: 'Выберите отель из списка участников акции и введите промокод при бронировании. Скидка применится автоматически.'
        },
        {
          question: 'Можно ли совмещать скидки?',
          answer: 'Обычно скидки не суммируются. Система автоматически применит наиболее выгодное предложение.'
        },
        {
          question: 'Как узнать о новых акциях?',
          answer: 'Подпишитесь на нашу рассылку или следите за разделом "Специальные предложения" на сайте.'
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
              >
                <HelpCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Найдите ответы на самые популярные вопросы о бронировании отелей и использовании нашего сервиса.
              </p>
            </div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск по вопросам..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                />
              </div>
            </motion.div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {filteredFAQ.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {category.questions.map((item, index) => {
                      const globalIndex = categoryIndex * 100 + index;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div key={index} className="p-6">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full text-left flex items-center justify-between hover:text-indigo-600 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-800 pr-4">
                              {item.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          
                          <motion.div
                            initial={false}
                            animate={{
                              height: isOpen ? 'auto' : 0,
                              opacity: isOpen ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4">
                              <p className="text-gray-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
              <p className="text-xl text-white/90 mb-8">
                Наша служба поддержки готова помочь вам 24/7
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Онлайн чат</div>
                    <div className="text-white/80">Мгновенная помощь</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-white/80">+7 (717) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-white/80">support@stayeasy.kz</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
} 