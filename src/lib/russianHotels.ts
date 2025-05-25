import { HOTEL_CATEGORIES } from './database';

// Международная база отелей
export const internationalHotelsData = [
  // РОССИЯ
  {
    name: 'Four Seasons Hotel Moscow',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Москва',
    address: 'ул. Охотный Ряд, 2, Москва, 109012',
    price_per_night: 4500,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель в самом сердце Москвы, рядом с Красной площадью.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Русская баня'
  },
  {
    name: 'The Ritz-Carlton Moscow',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Москва',
    address: 'ул. Тверская, 3, Москва, 125009',
    price_per_night: 4000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Элитный отель на Тверской улице с видом на Кремль.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на Кремль'
  },
  {
    name: 'Four Seasons Hotel Lion Palace St. Petersburg',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Санкт-Петербург',
    address: 'Адмиралтейская наб., 2, Санкт-Петербург, 190000',
    price_per_night: 3800,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Дворцовый отель на набережной с видом на Исаакиевский собор.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на Неву'
  },
  {
    name: 'Swissotel Resort Sochi Kamelia',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Сочи',
    address: 'Курортный пр., 89, Сочи, 354002',
    price_per_night: 2500,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Курортный отель на берегу Черного моря.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Частный пляж,Бассейн,Детский клуб'
  },

  // США
  {
    name: 'The Plaza New York',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Нью-Йорк',
    address: 'Fifth Avenue at Central Park South, New York, NY 10019',
    price_per_night: 8500,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный отель на Пятой авеню напротив Центрального парка.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Центральный парк'
  },
  {
    name: 'The Beverly Hills Hotel',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лос-Анджелес',
    address: '9641 Sunset Blvd, Beverly Hills, CA 90210',
    price_per_night: 7200,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Розовый дворец Голливуда с легендарной историей.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Консьерж,Дворецкий'
  },
  {
    name: 'Times Square EDITION',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Нью-Йорк',
    address: '701 7th Ave, New York, NY 10036',
    price_per_night: 4500,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
    description: 'Современный бутик-отель в сердце Таймс-сквер.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Террасса,Дизайн-отель'
  },
  {
    name: 'Fontainebleau Miami Beach',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Майами',
    address: '4441 Collins Ave, Miami Beach, FL 33140',
    price_per_night: 3800,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный курорт на знаменитом пляже Майами.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Частный пляж,Бассейн,Ночные клубы'
  },

  // ИСПАНИЯ
  {
    name: 'Hotel Arts Barcelona',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Барселона',
    address: 'Carrer de la Marina, 19-21, 08005 Barcelona',
    price_per_night: 4200,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Небоскреб на берегу Средиземного моря с видом на город.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Частный пляж,Бассейн,Консьерж'
  },
  {
    name: 'Hotel Alfonso XIII Sevilla',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Севилья',
    address: 'Calle San Fernando, 2, 41004 Sevilla',
    price_per_night: 3500,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
    description: 'Исторический дворец в стиле мудехар в центре Севильи.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Историческое здание,Андалузская кухня'
  },
  {
    name: 'W Barcelona',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Барселона',
    address: 'Placa de la Rosa del Vents, 1, 08039 Barcelona',
    price_per_night: 3200,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
    description: 'Знаменитый отель-парус на пляже Барселонета.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Частный пляж,Дизайн-отель,Терраса'
  },
  {
    name: 'Hotel Villa Magna Madrid',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Мадрид',
    address: 'Paseo de la Castellana, 22, 28046 Madrid',
    price_per_night: 3800,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантный отель на главном проспекте Мадрида.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Мишленовский ресторан'
  },

  // ФРАНЦИЯ
  {
    name: 'The Ritz Paris',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '15 Place Vendôme, 75001 Paris',
    price_per_night: 9500,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный отель на Place Vendôme, символ французской роскоши.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Эсколье де Кристаль'
  },
  {
    name: 'Le Bristol Paris',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '112 Rue du Faubourg Saint-Honoré, 75008 Paris',
    price_per_night: 8200,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Дворец на улице Фобур Сент-Оноре с садом на крыше.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Сад на крыше'
  },
  {
    name: 'Hotel Martinez Cannes',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Канны',
    address: '73 Boulevard de la Croisette, 06400 Cannes',
    price_per_night: 4800,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
    description: 'Дворец на знаменитой Круазетте во время Каннского фестиваля.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Частный пляж,Консьерж,Art Deco'
  },

  // ИТАЛИЯ
  {
    name: 'Hotel Danieli Venice',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Венеция',
    address: 'Riva degli Schiavoni, 4196, 30122 Venezia',
    price_per_night: 6500,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Дворец XIV века с видом на лагуну и остров Сан-Джорджо.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Венецианские виды'
  },
  {
    name: 'Hotel de Russie Rome',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Рим',
    address: 'Via del Babuino, 9, 00187 Roma',
    price_per_night: 5200,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантный отель между Пьяцца дель Пополо и Испанской лестницей.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Сад,Консьерж,Дворецкий'
  },
  {
    name: 'Villa San Martino Positano',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Позитано',
    address: 'Via Pasitea, 318, 84017 Positano SA',
    price_per_night: 3800,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Бутик-отель на скалах Амальфитанского побережья.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Бассейн,Вид на море,Терраса'
  },

  // ГЕРМАНИЯ
  {
    name: 'Hotel Adlon Kempinski Berlin',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Берлин',
    address: 'Unter den Linden 77, 10117 Berlin',
    price_per_night: 4500,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный отель рядом с Бранденбургскими воротами.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Историческое место'
  },
  {
    name: 'Brenners Park-Hotel & Spa',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Баден-Баден',
    address: 'Schillerstraße 4/6, 76530 Baden-Baden',
    price_per_night: 3500,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Знаменитый SPA-отель в термальном курорте Баден-Баден.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Термальные источники,Парк'
  },

  // ЯПОНИЯ
  {
    name: 'Park Hyatt Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: '3-7-1-2 Nishi Shinjuku, Shinjuku City, Tokyo 163-1055',
    price_per_night: 6800,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Минималистичная роскошь с видом на Токио и гору Фудзи.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на Фудзи'
  },
  {
    name: 'Aman Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: 'The Otemachi Tower, 1-5-6 Otemachi, Chiyoda City, Tokyo 100-0004',
    price_per_night: 8500,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
    description: 'Оазис спокойствия в небоскребе с традиционным японским дизайном.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Дзен-сад'
  },

  // ВЕЛИКОБРИТАНИЯ
  {
    name: 'The Savoy London',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лондон',
    address: 'Strand, London WC2R 0EU',
    price_per_night: 7500,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный отель на Стрэнде с видом на Темзу.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Английские традиции'
  },
  {
    name: 'Claridge\'s London',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лондон',
    address: 'Brook St, London W1K 4HR',
    price_per_night: 6800,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
    description: 'Арт-деко отель в Мейфэр, любимое место королевской семьи.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Art Deco'
  },

  // БАЛИ (ИНДОНЕЗИЯ)
  {
    name: 'The Mulia Bali',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Jl. Raya Nusa Dua Selatan, Benoa, Kec. Kuta Sel., Bali 80363',
    price_per_night: 4200,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный пляжный курорт с белоснежным песком и кристально чистой водой.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейны,Частный пляж,Дайвинг'
  },
  {
    name: 'Four Seasons Resort Bali at Sayan',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Sayan, Ubud, Gianyar Regency, Bali 80571',
    price_per_night: 5200,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
    description: 'Тропический рай в долине реки Аюнг в Убуде, окруженный джунглями.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Йога,Экскурсии в джунгли'
  },
  {
    name: 'COMO Shambhala Estate',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Бали',
    address: 'Banjar Begawan, Payangan, Gianyar Regency, Bali 80571',
    price_per_night: 6800,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
    description: 'Wellness retreat в тропических лесах с индивидуальными виллами.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Wellness программы,Йога,Медитация'
  },
  {
    name: 'Alila Villas Uluwatu',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Бали',
    address: 'Jl. Belimbing Sari, Pecatu, Kec. Kuta Sel., Bali 80361',
    price_per_night: 4800,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Современные виллы на утесах с потрясающим видом на океан.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Вид на океан,Серфинг'
  },
  {
    name: 'The St. Regis Bali Resort',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Strand Beach, Nusa Dua, Bali 80363',
    price_per_night: 3800,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантный пляжный курорт в Нуса-Дуа с дворецким сервисом.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Частный пляж,Бассейн,Дворецкий'
  },
  {
    name: 'Padma Resort Ubud',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Banjar Carik, Puhu, Payangan, Gianyar Regency, Bali 80571',
    price_per_night: 2800,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Курорт среди тропических садов и рисовых террас в Убуде.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Йога,Культурные программы'
  },
  {
    name: 'The Seminyak Beach Resort & Spa',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Jl. Kayu Aya, Seminyak, Kec. Kuta, Bali 80361',
    price_per_night: 3200,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
    description: 'Стильный курорт на знаменитом пляже Семиньяк.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Пляж,Бассейн,Серфинг'
  },
  {
    name: 'Bali Beach Hostel',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Бали',
    address: 'Jl. Pantai Kuta, Kuta, Kec. Kuta, Bali 80361',
    price_per_night: 800,
    rating: 4.2,
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
    description: 'Бюджетный хостел рядом с пляжем Кута для молодых путешественников.',
    amenities: 'Wi-Fi,Общая кухня,Общие пространства,Прокат досок для серфинга'
  },

  // БЮДЖЕТНЫЕ ОПЦИИ
  {
    name: 'Pod Hotels Times Square',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Нью-Йорк',
    address: '400 W 42nd St, New York, NY 10036',
    price_per_night: 1200,
    rating: 4.1,
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
    description: 'Современный бюджетный отель в Таймс-сквер.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Компактные номера'
  },
  {
    name: 'Generator Hostel Barcelona',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Барселона',
    address: 'Carrer de Còrsega, 377, 08037 Barcelona',
    price_per_night: 800,
    rating: 4.0,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Стильный хостел для молодых путешественников.',
    amenities: 'Wi-Fi,Ресторан,Бар,Терраса,Общие пространства'
  }
];

// Функция для генерации дополнительных отелей по городам
export const generateAdditionalInternationalHotels = () => {
  const additionalHotels = [];
  const cities = [
    { name: 'Москва', country: 'Россия' },
    { name: 'Санкт-Петербург', country: 'Россия' },
    { name: 'Нью-Йорк', country: 'США' },
    { name: 'Лос-Анджелес', country: 'США' },
    { name: 'Париж', country: 'Франция' },
    { name: 'Барселона', country: 'Испания' },
    { name: 'Рим', country: 'Италия' },
    { name: 'Лондон', country: 'Великобритания' },
    { name: 'Токио', country: 'Япония' },
    { name: 'Берлин', country: 'Германия' }
  ];
  
  cities.forEach((city, cityIndex) => {
    for (let i = 1; i <= 5; i++) {
      additionalHotels.push({
        name: `${city.name} Hotel ${i}`,
        category: i <= 1 ? HOTEL_CATEGORIES.LUXURY : i <= 3 ? HOTEL_CATEGORIES.BUSINESS : HOTEL_CATEGORIES.BUDGET,
        city: city.name,
        address: `Central Street ${i}, ${city.name}, ${city.country}`,
        price_per_night: i <= 1 ? 3000 + (cityIndex * 200) : i <= 3 ? 1500 + (cityIndex * 100) : 500 + (cityIndex * 50),
        rating: 3.5 + (i * 0.2) + (Math.random() * 0.5),
        image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
        description: `Отличный отель в ${city.name} с современными удобствами и прекрасным сервисом.`,
        amenities: 'Wi-Fi,Ресторан,Бар,Фитнес'
      });
    }
  });
  
  return additionalHotels;
};

// Объединенные данные - сначала международные, потом дополнительные
export const allRussianHotelsData = [...internationalHotelsData, ...generateAdditionalInternationalHotels()];
export const allInternationalHotelsData = allRussianHotelsData; 