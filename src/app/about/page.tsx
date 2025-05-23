'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useScroll, useTransform } from '@/lib/motion';
import { 
  Award, 
  Users, 
  Globe, 
  Heart, 
  Shield, 
  TrendingUp,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Sparkles
} from 'lucide-react';

// Динамический импорт компонентов
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });
const ParallaxBackground = dynamic(() => import('@/components/ui/ParallaxBackground'), { ssr: false });
const AnimatedStats = dynamic(() => import('@/components/ui/AnimatedStats'), { ssr: false });

// Данные команды
const teamMembers = [
  {
    name: 'Анна Петрова',
    role: 'Генеральный директор',
    image: '/images/team-1.jpg',
    description: 'Эксперт в туризме с 15-летним стажем',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Михаил Сидоров',
    role: 'Технический директор',
    image: '/images/team-2.jpg',
    description: 'Создатель инновационных решений для путешествий',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Елена Козлова',
    role: 'Директор по развитию',
    image: '/images/team-3.jpg',
    description: 'Специалист по клиентскому сервису и качеству',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Дмитрий Волков',
    role: 'Директор по маркетингу',
    image: '/images/team-4.jpg',
    description: 'Эксперт в области цифрового маркетинга',
    social: { linkedin: '#', twitter: '#' }
  }
];

// Наши ценности
const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Забота о клиентах',
    description: 'Мы всегда ставим потребности наших клиентов на первое место',
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Надежность',
    description: 'Гарантируем безопасность и качество каждого бронирования',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Инновации',
    description: 'Постоянно развиваемся и внедряем новые технологии',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Глобальность',
    description: 'Объединяем лучшие отели и хостелы по всему миру',
    color: 'from-purple-500 to-indigo-500'
  }
];

// Достижения
const achievements = [
  { icon: <Award className="w-6 h-6" />, text: 'Лучший сервис 2023 года' },
  { icon: <Star className="w-6 h-6" />, text: '4.9 звезд в App Store' },
  { icon: <Users className="w-6 h-6" />, text: '2M+ довольных клиентов' },
  { icon: <CheckCircle className="w-6 h-6" />, text: 'ISO 27001 сертификат' },
];

export default function AboutPage() {
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

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <ParallaxBackground intensity={2} className="relative">
        <motion.section 
          ref={heroRef}
          className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-32 overflow-hidden"
        >
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-20 bg-center"></div>
          </motion.div>

          {/* Анимированные частицы */}
          <div className="absolute inset-0">
            {[...Array(40)].map((_, i) => (
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
                <Sparkles className="inline w-4 h-4 mr-2" />
                Узнайте больше о нашей миссии
              </motion.span>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight"
                whileInView={{ scale: [0.9, 1] }}
              >
                <motion.span 
                  className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
                  whileInView={{
                    backgroundImage: [
                      'linear-gradient(to right, #ffffff, #dbeafe, #e9d5ff)',
                      'linear-gradient(to right, #a5b4fc, #c084fc, #f472b6)',
                      'linear-gradient(to right, #ffffff, #dbeafe, #e9d5ff)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  О нашей
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                  whileInView={{
                    backgroundImage: [
                      'linear-gradient(to right, #fbbf24, #fb923c, #f87171)',
                      'linear-gradient(to right, #f59e0b, #ea580c, #dc2626)',
                      'linear-gradient(to right, #fbbf24, #fb923c, #f87171)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  компании
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Мы создаем незабываемые путешествия уже более <span className="font-bold text-yellow-300">10 лет</span>, 
                объединяя лучшие отели и хостелы мира в одной платформе
              </motion.p>

              {/* Достижения */}
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      rotateY: 5 
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                  >
                    <div className="flex justify-center mb-2 text-yellow-300">
                      {achievement.icon}
                    </div>
                    <div className="text-white/90 text-sm font-medium">{achievement.text}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </ParallaxBackground>

      {/* История компании */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Наша история
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              От небольшого стартапа до лидера в сфере онлайн-бронирования
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={itemVariants}>
              <div className="space-y-8">
                <motion.div
                  className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2014</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Основание StayEasy</h3>
                  </div>
                  <p className="text-gray-600">
                    Компания была основана группой энтузиастов путешествий с целью упростить процесс бронирования жилья.
                  </p>
                </motion.div>

                <motion.div
                  className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2018</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Международная экспансия</h3>
                  </div>
                  <p className="text-gray-600">
                    Расширение на международные рынки, добавление 10,000+ отелей по всему миру.
                  </p>
                </motion.div>

                <motion.div
                  className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2023</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Технологический прорыв</h3>
                  </div>
                  <p className="text-gray-600">
                    Запуск ИИ-помощника для персонализированных рекомендаций и мобильного приложения нового поколения.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-white">
                  <h3 className="text-3xl font-bold mb-6">Сегодня StayEasy - это:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 mr-3 text-yellow-300" />
                      <span className="text-lg">50,000+ отелей в 180+ странах</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-6 h-6 mr-3 text-green-300" />
                      <span className="text-lg">2.5M+ довольных клиентов</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 mr-3 text-blue-300" />
                      <span className="text-lg">Поддержка 24/7 на 12 языках</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-6 h-6 mr-3 text-purple-300" />
                      <span className="text-lg">Рейтинг 4.9/5 от клиентов</span>
                    </div>
                  </div>
                </div>
                
                {/* 3D эффект тени */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl blur-xl opacity-50 -z-10 transform translate-y-4"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Наши ценности */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Наши ценности
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Принципы, которые направляют нас в создании лучшего сервиса для путешественников
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden"
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Анимированный фон */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl text-white mb-6 relative z-10`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {value.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 relative z-10">{value.title}</h3>
                <p className="text-gray-600 relative z-10">{value.description}</p>

                {/* Декоративные элементы */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Команда */}
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
              Наша команда
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Профессионалы, которые создают будущее путешествий
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100"
                whileHover={{ 
                  y: -15,
                  rotateY: 5,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>

                {/* Декоративная рамка при ховере */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-indigo-500 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Статистика */}
      <AnimatedStats />
      
      <Footer />
    </>
  );
} 