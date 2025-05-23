import { HOTEL_CATEGORIES } from './database';

// Расширенная база отелей для мировых направлений
export const expandedHotelsData = [
  // ПАРИЖ - 25 отелей
  {
    name: 'Le Meurice',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '228 Rue de Rivoli, 1er, 75001 Paris',
    price_per_night: 35000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный дворец-отель в самом сердце Парижа с видом на Тюильри.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Мишлен ресторан'
  },
  {
    name: 'Four Seasons Hotel George V',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '31 Avenue George V, 8e, 75008 Paris',
    price_per_night: 40000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель рядом с Елисейскими полями и Эйфелевой башней.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Терраса'
  },
  {
    name: 'Hotel Plaza Athénée',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '25 Avenue Montaigne, 8e, 75008 Paris',
    price_per_night: 38000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Икона французской элегантности на престижной авеню Монтень.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Красные навесы'
  },
  {
    name: 'Le Bristol Paris',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '112 Rue du Faubourg Saint-Honoré, 8e, 75008 Paris',
    price_per_night: 42000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
    description: 'Дворцовый отель с собственным садом в центре Парижа.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Сад,Мишлен ресторан'
  },
  {
    name: 'Shangri-La Hotel Paris',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '10 Avenue d\'Iéna, 16e, 75116 Paris',
    price_per_night: 36000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
    description: 'Бывший дворец принца Роланда Бонапарта с видом на Эйфелеву башню.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на Эйфелеву башню'
  },
  {
    name: 'Hotel Malte Opera',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Париж',
    address: '63 Rue de Richelieu, 2e, 75002 Paris',
    price_per_night: 8500,
    rating: 4.2,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Бутик-отель рядом с Лувром и Оперой Гарнье.',
    amenities: 'Wi-Fi,Бизнес-центр,Бар,Фитнес,Консьерж'
  },
  {
    name: 'Le Relais Saint Honoré',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Париж',
    address: '308 Rue Saint-Honoré, 1er, 75001 Paris',
    price_per_night: 12000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop&auto=format',
    description: 'Шарминг бутик-отель на улице Сент-Оноре.',
    amenities: 'Wi-Fi,Ресторан,Бар,Консьерж,Дизайнерские номера'
  },
  {
    name: 'Hotel des Grands Boulevards',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Париж',
    address: '17 Boulevard Poissonnière, 2e, 75002 Paris',
    price_per_night: 9800,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
    description: 'Стильный отель на больших бульварах Парижа.',
    amenities: 'Wi-Fi,Ресторан,Бар,Терраса,Дизайнерские номера'
  },
  {
    name: 'Hotel Victoires Opera',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Париж',
    address: '56 Rue Montorgueil, 2e, 75002 Paris',
    price_per_night: 5500,
    rating: 4.0,
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
    description: 'Уютный отель в пешей доступности от главных достопримечательностей.',
    amenities: 'Wi-Fi,Ресторан,Бар'
  },
  {
    name: 'Hotel de la Place du Louvre',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Париж',
    address: '21 Rue des Prêtres-Saint-Germain-l\'Auxerrois, 1er',
    price_per_night: 6200,
    rating: 4.1,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
    description: 'Недорогой отель с видом на Лувр.',
    amenities: 'Wi-Fi,Ресторан'
  },

  // ТОКИО - 25 отелей
  {
    name: 'The Ritz-Carlton Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: '9-7-1 Akasaka, Minato City, Tokyo 107-6245',
    price_per_night: 28000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный небоскреб-отель в центре Токио с панорамными видами.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на Фуджи'
  },
  {
    name: 'Aman Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: '1-5-6 Otemachi, Chiyoda City, Tokyo 100-0004',
    price_per_night: 32000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Минималистский люксовый отель в деловом районе Отемачи.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дзен-сад,Онсен'
  },
  {
    name: 'The Peninsula Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: '1-8-1 Yurakucho, Chiyoda City, Tokyo 100-0006',
    price_per_night: 26000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантный отель напротив Императорского дворца.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Террасы'
  },
  {
    name: 'Park Hyatt Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: '3-7-1-2 Nishi Shinjuku, Shinjuku City, Tokyo 163-1055',
    price_per_night: 24000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Знаменитый отель из фильма "Трудности перевода" в небоскребе.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Библиотека,Арт-галерея'
  },
  {
    name: 'Mandarin Oriental Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: '2-1-1 Nihonbashi Muromachi, Chuo City, Tokyo 103-8328',
    price_per_night: 27000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель в историческом районе Нихонбаши.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Мишлен рестораны'
  },
  {
    name: 'Hotel Okura Tokyo',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Токио',
    address: '2-10-4 Toranomon, Minato City, Tokyo 105-0001',
    price_per_night: 15000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Классический японский отель с традиционным дизайном.',
    amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Бар,Фитнес,Японский сад'
  },
  {
    name: 'Shibuya Excel Hotel Tokyu',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Токио',
    address: '1-12-2 Dogenzaka, Shibuya City, Tokyo 150-0043',
    price_per_night: 12000,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
    description: 'Современный отель в сердце Сибуи с видом на перекресток.',
    amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Бар,Фитнес'
  },
  {
    name: 'Andaz Tokyo Toranomon Hills',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Токио',
    address: '1-23-4 Toranomon, Minato City, Tokyo 105-0001',
    price_per_night: 18000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
    description: 'Дизайнерский отель в новом небоскребе Торанномон.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Террасы'
  },
  {
    name: 'Capsule Hotel Anshin Oyado',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Токио',
    address: '2-9-7 Nippori, Arakawa City, Tokyo 116-0013',
    price_per_night: 3500,
    rating: 3.8,
    image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=400&fit=crop&auto=format',
    description: 'Традиционный капсульный отель с современными удобствами.',
    amenities: 'Wi-Fi,Общие ванны,Автоматы'
  },
  {
    name: 'Hotel Sunroute Shimbashi',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Токио',
    address: '4-23-1 Shimbashi, Minato City, Tokyo 105-0004',
    price_per_night: 4800,
    rating: 4.0,
    image_url: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=400&fit=crop&auto=format',
    description: 'Удобный бюджетный отель рядом с JR станцией Симбаси.',
    amenities: 'Wi-Fi,Ресторан'
  },

  // НЬЮ-ЙОРК - 25 отелей
  {
    name: 'The Plaza New York',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Нью-Йорк',
    address: '768 5th Ave, New York, NY 10019',
    price_per_night: 40000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный отель на Пятой авеню напротив Центрального парка.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Магазины'
  },
  {
    name: 'The St. Regis New York',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Нью-Йорк',
    address: '2 E 55th St, New York, NY 10022',
    price_per_night: 38000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
    description: 'Классическая элегантность в самом сердце Манхэттена.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Исторический бар'
  },
  {
    name: 'The Carlyle New York',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Нью-Йорк',
    address: '35 E 76th St, New York, NY 10021',
    price_per_night: 35000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&auto=format',
    description: 'Изысканный отель Верхнего Ист-Сайда с джаз-кафе.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Джаз-клуб'
  },
  {
    name: 'The Pierre New York',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Нью-Йорк',
    address: '2 E 61st St, New York, NY 10065',
    price_per_night: 33000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель с видом на Центральный парк.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на парк'
  },
  {
    name: 'The Lowell New York',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Нью-Йорк',
    address: '28 E 63rd St, New York, NY 10065',
    price_per_night: 22000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
    description: 'Интимный бутик-отель на Верхнем Ист-Сайде.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Консьерж,Камины'
  },
  {
    name: 'The High Line Hotel',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Нью-Йорк',
    address: '180 10th Ave, New York, NY 10011',
    price_per_night: 15000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Стильный отель в историческом здании рядом с Хай-Лайн.',
    amenities: 'Wi-Fi,Ресторан,Бар,Сад,Дизайнерские номера'
  },
  {
    name: 'Marriott Marquis',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Нью-Йорк',
    address: '1535 Broadway, New York, NY 10036',
    price_per_night: 18000,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop&auto=format',
    description: 'Большой отель в самом сердце Таймс-сквер.',
    amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Бар,Фитнес,Конференц-залы'
  },
  {
    name: 'Pod Hotels Times Square',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Нью-Йорк',
    address: '400 W 42nd St, New York, NY 10036',
    price_per_night: 8500,
    rating: 4.1,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
    description: 'Современный бюджетный отель с компактными номерами.',
    amenities: 'Wi-Fi,Ресторан,Бар,Терраса'
  },
  {
    name: 'HI New York City Hostel',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Нью-Йорк',
    address: '891 Amsterdam Ave, New York, NY 10025',
    price_per_night: 4500,
    rating: 3.9,
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
    description: 'Молодежный хостел на Верхнем Вест-Сайде.',
    amenities: 'Wi-Fi,Общая кухня,Общая комната'
  },

  // ЛОНДОН - 20 отелей
  {
    name: 'The Savoy London',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лондон',
    address: 'Strand, London WC2R 0EU',
    price_per_night: 32000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный отель на берегу Темзы с богатой историей.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Театр'
  },
  {
    name: 'Claridge\'s',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лондон',
    address: 'Brook St, London W1K 4HR',
    price_per_night: 35000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
    description: 'Икона британской элегантности в Мейфэре.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Afternoon Tea'
  },
  {
    name: 'The Langham London',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лондон',
    address: '1C Portland Pl, Regent St, London W1B 1JA',
    price_per_night: 28000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Первый грандиозный отель Европы рядом с Оксфорд-стрит.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Пальмовый суд'
  },
  {
    name: 'Shangri-La The Shard',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лондон',
    address: '31 St Thomas St, London SE1 9QU',
    price_per_night: 30000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
    description: 'Отель в небоскребе Shard с панорамными видами на Лондон.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Панорамные виды'
  },
  {
    name: 'The Zetter Townhouse',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Лондон',
    address: '49-50 St John\'s Square, London EC1V 4JJ',
    price_per_night: 12000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Очаровательный бутик-отель в районе Кларкенуэлл.',
    amenities: 'Wi-Fi,Ресторан,Бар,Дизайнерские номера,Коктейльный бар'
  },

  // ДУБАЙ - 20 отелей
  {
    name: 'Burj Al Arab Jumeirah',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Дубай',
    address: 'Jumeirah St, Dubai, UAE',
    price_per_night: 50000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&auto=format',
    description: 'Самый роскошный отель в мире в форме паруса.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вертолетная площадка,Частный пляж'
  },
  {
    name: 'Atlantis The Palm',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Дубай',
    address: 'Crescent Rd, Dubai, UAE',
    price_per_night: 35000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Тематический курорт на искусственном острове Пальма.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Аквапарк,Дельфинарий,Частный пляж'
  },
  {
    name: 'Armani Hotel Dubai',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Дубай',
    address: 'Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Dubai',
    price_per_night: 42000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
    description: 'Дизайнерский отель от Джорджио Армани в Бурдж-Халифе.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Дизайн от Armani'
  },

  // РИМ - 18 отелей
  {
    name: 'Hotel de Russie Rome',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Рим',
    address: 'Via del Babuino, 9, 00187 Roma RM, Italy',
    price_per_night: 25000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантный отель между Пьяцца дель Пополо и Испанской лестницей.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Сад,Терраса'
  },
  {
    name: 'The St. Regis Rome',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Рим',
    address: 'Via Vittorio Emanuele Orlando, 3, 00185 Roma RM',
    price_per_night: 28000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель рядом с фонтаном Треви.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Фреска'
  },

  // БАЛИ - 18 отелей
  {
    name: 'The Mulia Bali',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Jl. Raya Nusa Dua Selatan, Benoa, Kec. Kuta Sel., Bali 80363',
    price_per_night: 18000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный пляжный курорт с белоснежным песком.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейны,Частный пляж,Дайвинг'
  },
  {
    name: 'Four Seasons Resort Bali at Sayan',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Sayan, Ubud, Gianyar Regency, Bali 80571',
    price_per_night: 22000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
    description: 'Тропический рай в долине реки Аюнг в Убуде.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Йога,Экскурсии в джунгли'
  },

  // СИДНЕЙ - 18 отелей
  {
    name: 'Park Hyatt Sydney',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Сидней',
    address: '7 Hickson Rd, The Rocks NSW 2000, Australia',
    price_per_night: 24000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель с видом на Оперный театр и мост Харбор.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на гавань'
  },
  {
    name: 'The Langham Sydney',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Сидней',
    address: '89-113 Kent St, Sydney NSW 2000, Australia',
    price_per_night: 20000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантный отель в историческом здании в центре города.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дневной SPA'
  },

  // БАРСЕЛОНА - 18 отелей
  {
    name: 'Hotel Casa Fuster',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Барселона',
    address: 'Passeig de Gràcia, 132, 08008 Barcelona, Spain',
    price_per_night: 22000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=400&fit=crop&auto=format',
    description: 'Модернистский отель на элитном Пасео де Грасия.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Терраса,Джаз-клуб'
  },

  // СТАМБУЛ - 18 отелей
  {
    name: 'Four Seasons Hotel Sultanahmet',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Стамбул',
    address: 'Tevkifhane Sk. No:1, 34122 Fatih/İstanbul, Turkey',
    price_per_night: 18000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=400&fit=crop&auto=format',
    description: 'Бывшая тюрьма, превращенная в роскошный отель в Старом городе.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на Босфор'
  },

  // СИНГАПУР - 18 отелей
  {
    name: 'Marina Bay Sands',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Сингапур',
    address: '10 Bayfront Ave, Singapore 018956',
    price_per_night: 26000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=400&fit=crop&auto=format',
    description: 'Икнический отель с бесконечным бассейном на крыше.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Казино,Бассейн на крыше,Торговый центр'
  },

  // МАЛЬДИВЫ - 15 отелей
  {
    name: 'Conrad Maldives Rangali Island',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Мальдивы',
    address: 'Rangali Island, 20026 Maldives',
    price_per_night: 60000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный курорт с подводным рестораном и водными виллами.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Дайвинг,Водные виллы,Подводный ресторан,Трансферы на гидросамолете'
  },
  {
    name: 'One&Only Reethi Rah',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Мальдивы',
    address: 'Reethi Rah, North Malé Atoll, Maldives',
    price_per_night: 55000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Эксклюзивный курорт на частном острове с белоснежными пляжами.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Дайвинг,Водные виллы,Частный остров,Йога'
  }
];

// Дополнительные отели по 6 на каждое направление (всего +72 отеля)
const additionalHotelsPerDestination = [
  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - ПАРИЖ (+6)
  {
    name: 'Hotel Ritz Paris',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '15 Place Vendôme, 1er, 75001 Paris',
    price_per_night: 45000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный отель на площади Вандом, символ парижской роскоши.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Ювелирный бутик,Кулинарная школа'
  },
  {
    name: 'Hôtel des Invalides',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Париж',
    address: '129 Rue de Grenelle, 7e, 75007 Paris',
    price_per_night: 14000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
    description: 'Бутик-отель рядом с Домом Инвалидов и музеем Орсе.',
    amenities: 'Wi-Fi,Ресторан,Бар,Консьерж,Терраса,Дизайнерские номера'
  },
  {
    name: 'Hotel Lutetia Paris',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '45 Boulevard Raspail, 6e, 75006 Paris',
    price_per_night: 32000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
    description: 'Исторический отель в Сен-Жермен-де-Пре в стиле ар-деко.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Джаз-бар'
  },
  {
    name: 'Hotel Montalembert',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Париж',
    address: '3 Rue de Montalembert, 7e, 75007 Paris',
    price_per_night: 16000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантный отель рядом с Лувром и Орсе.',
    amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Бар,Фитнес,Консьерж'
  },
  {
    name: 'Hotel des Grands Augustins',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Париж',
    address: '19 Quai des Grands Augustins, 6e, 75006 Paris',
    price_per_night: 7200,
    rating: 4.2,
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
    description: 'Уютный отель на набережной Сены в Латинском квартале.',
    amenities: 'Wi-Fi,Ресторан,Бар,Вид на Сену'
  },
  {
    name: 'Hotel de Crillon',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Париж',
    address: '10 Place de la Concorde, 8e, 75008 Paris',
    price_per_night: 50000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop&auto=format',
    description: 'Дворцовый отель XVIII века на площади Согласия.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Rosewood SPA'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - ТОКИО (+6)
  {
    name: 'Imperial Hotel Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: '1-1-1 Uchisaiwaicho, Chiyoda City, Tokyo 100-8558',
    price_per_night: 30000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop&auto=format',
    description: 'Исторический отель напротив Императорского дворца.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,17 ресторанов'
  },
  {
    name: 'Grand Hyatt Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: '6-10-3 Roppongi, Minato City, Tokyo 106-0032',
    price_per_night: 25000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Современный отель в комплексе Roppongi Hills.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на город'
  },
  {
    name: 'Hoshinoya Tokyo',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Токио',
    address: '1-9-1 Otemachi, Chiyoda City, Tokyo 100-0004',
    price_per_night: 35000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
    description: 'Традиционный японский рёкан в современном исполнении.',
    amenities: 'Wi-Fi,SPA,Ресторан,Онсен,Татами,Кайсеки,Чайная церемония'
  },
  {
    name: 'Conrad Tokyo',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Токио',
    address: '1-9-1 Higashi-Shimbashi, Minato City, Tokyo 105-7337',
    price_per_night: 22000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантный отель с видом на залив Токио.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бизнес-центр,Консьерж'
  },
  {
    name: 'Sakura Hotel Hatagaya',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Токио',
    address: '2-21-4 Hatagaya, Shibuya City, Tokyo 151-0072',
    price_per_night: 5500,
    rating: 4.1,
    image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
    description: 'Бюджетный отель с домашней атмосферой.',
    amenities: 'Wi-Fi,Общая кухня,Прачечная,Велосипеды'
  },
  {
    name: 'Shangri-La Tokyo',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Токио',
    address: 'Marunouchi Trust Tower Main, 1-8-3 Marunouchi',
    price_per_night: 28000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель в башне Маруноучи с видом на Императорский дворец.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,CHI SPA'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - НЬЮ-ЙОРК (+6)
  {
    name: 'The Mark New York',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Нью-Йорк',
    address: '25 E 77th St, New York, NY 10075',
    price_per_night: 42000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель на Верхнем Ист-Сайде напротив Метрополитен-музея.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Фредерик Пакард бар'
  },
  {
    name: 'The Greenwich Hotel',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Нью-Йорк',
    address: '377 Greenwich St, New York, NY 10013',
    price_per_night: 28000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
    description: 'Интимный бутик-отель в Трайбеке с уникальным дизайном.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Японская баня'
  },
  {
    name: 'The Bowery Hotel',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Нью-Йорк',
    address: '335 Bowery, New York, NY 10003',
    price_per_night: 25000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&auto=format',
    description: 'Стильный отель в историческом районе Нолита.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Консьерж,Терраса,Итальянский ресторан'
  },
  {
    name: 'Hudson New York',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Нью-Йорк',
    address: '356 W 58th St, New York, NY 10019',
    price_per_night: 15000,
    rating: 4.2,
    image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=400&fit=crop&auto=format',
    description: 'Современный отель рядом с Центральным парком.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Бизнес-центр,Консьерж'
  },
  {
    name: 'YMCA West Side',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Нью-Йорк',
    address: '5 W 63rd St, New York, NY 10023',
    price_per_night: 6500,
    rating: 3.8,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
    description: 'Бюджетное размещение рядом с Линкольн-центром.',
    amenities: 'Wi-Fi,Фитнес,Бассейн,Прачечная'
  },
  {
    name: 'The Beekman New York',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Нью-Йорк',
    address: '123 Nassau St, New York, NY 10038',
    price_per_night: 36000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Исторический отель 1881 года в Финансовом районе.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Атриум'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - ЛОНДОН (+6)
  {
    name: 'The Connaught London',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лондон',
    address: 'Carlos Pl, London W1K 2AL',
    price_per_night: 40000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop&auto=format',
    description: 'Эдвардианский отель в самом сердце Мейфэра.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Мишлен рестораны'
  },
  {
    name: 'The Ned London',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Лондон',
    address: '27 Poultry, London EC2R 8AJ',
    price_per_night: 18000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
    description: 'Стильный отель в бывшем здании банка в Сити.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,9 ресторанов'
  },
  {
    name: 'Covent Garden Hotel',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Лондон',
    address: '10 Monmouth St, London WC2H 9HB',
    price_per_night: 22000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Дизайнерский отель в театральном районе Ковент-Гарден.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Домашний кинотеатр'
  },
  {
    name: 'Premier Inn London County Hall',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Лондон',
    address: 'Belvedere Rd, London SE1 7PB',
    price_per_night: 12000,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
    description: 'Удобный отель рядом с Лондонским глазом.',
    amenities: 'Wi-Fi,Ресторан,Бар,Бизнес-центр'
  },
  {
    name: 'Generator London',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Лондон',
    address: '37 Tavistock Pl, London WC1H 9SE',
    price_per_night: 4500,
    rating: 4.0,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Молодежный хостел в Блумсбери рядом с Британским музеем.',
    amenities: 'Wi-Fi,Бар,Общая кухня,Игровая комната'
  },
  {
    name: 'Corinthia London',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Лондон',
    address: 'Whitehall Pl, London SW1A 2BD',
    price_per_night: 38000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
    description: 'Величественный отель между Трафальгарской площадью и Темзой.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,ESPA Life'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - ДУБАЙ (+6)
  {
    name: 'Emirates Palace Abu Dhabi',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Дубай',
    address: 'West Corniche Road, Abu Dhabi, UAE',
    price_per_night: 45000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&auto=format',
    description: 'Дворцовый отель на берегу Персидского залива.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Частный пляж,Марина'
  },
  {
    name: 'Four Seasons Resort Dubai at Jumeirah Beach',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Дубай',
    address: 'Jumeirah Beach Rd, Dubai, UAE',
    price_per_night: 40000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный пляжный курорт с видом на Персидский залив.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейны,Частный пляж,Детский клуб'
  },
  {
    name: 'Address Downtown Dubai',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Дубай',
    address: 'Mohammed Bin Rashid Blvd, Dubai, UAE',
    price_per_night: 25000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
    description: 'Современный отель в центре Дубая рядом с Бурдж-Халифой.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бизнес-центр,Бассейн'
  },
  {
    name: 'XVA Art Hotel',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Дубай',
    address: 'Al Fahidi Historical Neighbourhood, Dubai, UAE',
    price_per_night: 15000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=400&fit=crop&auto=format',
    description: 'Арт-отель в историческом квартале Аль-Фахиди.',
    amenities: 'Wi-Fi,Ресторан,Галерея,Терраса,Культурные программы'
  },
  {
    name: 'Citymax Hotel Bur Dubai',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Дубай',
    address: 'Mankhool Rd, Dubai, UAE',
    price_per_night: 8500,
    rating: 4.1,
    image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=400&fit=crop&auto=format',
    description: 'Современный бюджетный отель в Бур-Дубае.',
    amenities: 'Wi-Fi,Ресторан,Фитнес,Бассейн'
  },
  {
    name: 'One&Only Royal Mirage',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Дубай',
    address: 'Al Sufouh Rd, Dubai, UAE',
    price_per_night: 32000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный курорт в арабском стиле на берегу залива.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Частный пляж,Марина,Сады'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - РИМ (+6)
  {
    name: 'Hotel Hassler Roma',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Рим',
    address: 'Piazza Trinità dei Monti, 6, 00187 Roma RM, Italy',
    price_per_night: 35000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный отель на вершине Испанской лестницы.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Панорамная терраса'
  },
  {
    name: 'The First Roma Dolce',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Рим',
    address: 'Via del Corso, 126, 00186 Roma RM, Italy',
    price_per_night: 18000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Стильный бутик-отель на главной торговой улице Рима.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Терраса'
  },
  {
    name: 'Hotel Artemide Roma',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Рим',
    address: 'Via Nazionale, 22, 00184 Roma RM, Italy',
    price_per_night: 14000,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: '4-звездочный отель рядом с вокзалом Термини.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бизнес-центр'
  },
  {
    name: 'Generator Rome',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Рим',
    address: 'Via Principe Amedeo, 257, 00185 Roma RM, Italy',
    price_per_night: 5500,
    rating: 4.0,
    image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
    description: 'Молодежный хостел в центре Рима рядом с Колизеем.',
    amenities: 'Wi-Fi,Бар,Терраса,Общая кухня,Прачечная'
  },
  {
    name: 'Villa San Pio',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Рим',
    address: 'Via di Santa Melania, 19, 00153 Roma RM, Italy',
    price_per_night: 16000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
    description: 'Элегантная вилла на холме Авентин с садом.',
    amenities: 'Wi-Fi,Ресторан,Бар,Сад,Терраса,Консьерж'
  },
  {
    name: 'Palazzo Naiadi Rome',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Рим',
    address: 'Piazza della Repubblica, 47, 00185 Roma RM, Italy',
    price_per_night: 30000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель на площади Республики с античными банями.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Римские бани'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - БАЛИ (+6)
  {
    name: 'COMO Shambhala Estate',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Banjar Begawan, Melinggih Kelod, Payangan, Bali 80571',
    price_per_night: 35000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop&auto=format',
    description: 'Эко-курорт для здоровья и велнесса в тропических джунглях.',
    amenities: 'Wi-Fi,SPA,Ресторан,Йога,Фитнес,Медитация,Органическая еда,Натуропатия'
  },
  {
    name: 'The Oberoi Bali',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Бали',
    address: 'Kayu Aya, Seminyak, Bali 80361',
    price_per_night: 28000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный пляжный курорт в Семиньяке.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Частный пляж,Йога'
  },
  {
    name: 'Alaya Resort Ubud',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Бали',
    address: 'Jl. Raya Ubud, Ubud, Bali 80571',
    price_per_night: 12000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&auto=format',
    description: 'Современный курорт в центре Убуда с видом на рисовые террасы.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Бассейн,Йога,Велосипеды'
  },
  {
    name: 'Potato Head Suites & Studios',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Бали',
    address: 'Jl. Petitenget No.51B, Seminyak, Bali 80361',
    price_per_night: 15000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=400&fit=crop&auto=format',
    description: 'Креативный отель с эко-дизайном на пляже Семиньяк.',
    amenities: 'Wi-Fi,Ресторан,Бар,Бассейн,Пляжный клуб,Эко-дизайн'
  },
  {
    name: 'Kosta Hostel Canggu',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Бали',
    address: 'Jl. Pantai Batu Bolong, Canggu, Bali 80351',
    price_per_night: 3500,
    rating: 4.2,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
    description: 'Серф-хостел рядом с пляжем в Чангу.',
    amenities: 'Wi-Fi,Бар,Бассейн,Серф-школа,Прокат досок'
  },
  {
    name: 'Hanging Gardens of Bali',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Бали',
    address: 'Desa Buahan, Payangan, Gianyar, Bali 80571',
    price_per_night: 42000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный курорт с знаменитым двухуровневым бассейном в джунглях.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Многоуровневый бассейн,Хелипад,Бутик'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - СИДНЕЙ (+6)
  {
    name: 'Four Seasons Hotel Sydney',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Сидней',
    address: '199 George St, Sydney NSW 2000, Australia',
    price_per_night: 30000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель с панорамным видом на гавань Сиднея.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на гавань'
  },
  {
    name: 'The Rocks Sydney Harbour YHA',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Сидней',
    address: '110 Cumberland St, The Rocks NSW 2000, Australia',
    price_per_night: 4500,
    rating: 4.1,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Молодежный хостел в историческом районе Рокс.',
    amenities: 'Wi-Fi,Общая кухня,Прачечная,Терраса с видом на гавань'
  },
  {
    name: 'QT Sydney',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Сидней',
    address: '49 Market St, Sydney NSW 2000, Australia',
    price_per_night: 18000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Дизайнерский бутик-отель в центре Сиднея.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Современный дизайн'
  },
  {
    name: 'Shangri-La Hotel Sydney',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Сидней',
    address: '176 Cumberland St, The Rocks NSW 2000, Australia',
    price_per_night: 32000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
    description: 'Премиальный отель с лучшими видами на Оперный театр.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Панорамные виды'
  },
  {
    name: 'Ovolo Woolloomooloo',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Сидней',
    address: '6 Cowper Wharf Roadway, Woolloomooloo NSW 2011',
    price_per_night: 16000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Креативный отель на пристани Вуллумулу.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Современное искусство,Марина'
  },
  {
    name: 'Hilton Sydney',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Сидней',
    address: '488 George St, Sydney NSW 2000, Australia',
    price_per_night: 22000,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
    description: 'Центральный бизнес-отель в сердце Сиднея.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бизнес-центр,Консьерж'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - БАРСЕЛОНА (+6)
  {
    name: 'Hotel Arts Barcelona',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Барселона',
    address: 'Carrer de la Marina, 19-21, 08005 Barcelona, Spain',
    price_per_night: 35000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный небоскреб-отель на берегу Средиземного моря.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Пляжный клуб,Бассейн'
  },
  {
    name: 'El Palace Barcelona',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Барселона',
    address: 'Gran Via de les Corts Catalanes, 668, 08010 Barcelona',
    price_per_night: 28000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
    description: 'Исторический дворец 1919 года на Гран Виа.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Терраса'
  },
  {
    name: 'Casa Bonay',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Барселона',
    address: 'Gran Via de les Corts Catalanes, 700, 08013 Barcelona',
    price_per_night: 14000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop&auto=format',
    description: 'Хипстерский бутик-отель в модном районе Побленоу.',
    amenities: 'Wi-Fi,Ресторан,Бар,Терраса,Коворкинг,Велосипеды'
  },
  {
    name: 'Generator Barcelona',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Барселона',
    address: 'Carrer de Còrsega, 377, 08037 Barcelona, Spain',
    price_per_night: 4200,
    rating: 4.2,
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
    description: 'Современный хостел рядом с Саграда Фамилия.',
    amenities: 'Wi-Fi,Бар,Терраса,Общая кухня,Прачечная,Игровая комната'
  },
  {
    name: 'Hotel Omm Barcelona',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Барселона',
    address: 'Carrer del Rosselló, 265, 08008 Barcelona, Spain',
    price_per_night: 20000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
    description: 'Авангардный дизайн-отель в районе Эшампле.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Терраса'
  },
  {
    name: 'NH Collection Barcelona Torre Agbar',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Барселона',
    address: 'Av. Diagonal, 201, 08018 Barcelona, Spain',
    price_per_night: 16000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
    description: 'Современный бизнес-отель рядом с башней Агбар.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Бизнес-центр,Конференц-залы'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - СТАМБУЛ (+6)
  {
    name: 'Çırağan Palace Kempinski',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Стамбул',
    address: 'Çırağan Cd. No:32, 34349 Beşiktaş/İstanbul, Turkey',
    price_per_night: 32000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=400&fit=crop&auto=format',
    description: 'Османский дворец XIX века на берегу Босфора.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Босфор,Дворец'
  },
  {
    name: 'Pera Palace Hotel',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Стамбул',
    address: 'Meşrutiyet Cd. No:52, 34430 Beyoğlu/İstanbul, Turkey',
    price_per_night: 25000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Исторический отель 1892 года, где останавливалась Агата Кристи.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Музей,Терраса'
  },
  {
    name: 'Georges Hotel Galata',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Стамбул',
    address: 'Serdar-ı Ekrem Sk. No:24, 34430 Beyoğlu/İstanbul',
    price_per_night: 12000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Бутик-отель в районе Галата с видом на Золотой Рог.',
    amenities: 'Wi-Fi,Ресторан,Бар,Терраса,Вид на Золотой Рог'
  },
  {
    name: 'Vault Karakoy The House Hotel',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Стамбул',
    address: 'Bankalar Cd. No:5, 34420 Beyoğlu/İstanbul, Turkey',
    price_per_night: 15000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Стильный отель в бывшем здании банка в Каракёе.',
    amenities: 'Wi-Fi,Ресторан,Бар,Терраса,Дизайнерские номера'
  },
  {
    name: 'Cheers Hostel',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Стамбул',
    address: 'Akbıyık Cd. No:21, 34122 Fatih/İstanbul, Turkey',
    price_per_night: 3200,
    rating: 4.0,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
    description: 'Дружелюбный хостел в районе Султанахмет.',
    amenities: 'Wi-Fi,Общая кухня,Терраса,Прачечная,Экскурсии'
  },
  {
    name: 'Swissotel The Bosphorus',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Стамбул',
    address: 'Vişnezade Mah, Acısu Sk. No:19, 34357 Beşiktaş/İstanbul',
    price_per_night: 20000,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Современный отель с видом на Босфор и деловыми удобствами.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бизнес-центр,Конференц-залы'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - СИНГАПУР (+6)
  {
    name: 'Raffles Singapore',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Сингапур',
    address: '1 Beach Rd, Singapore 189673',
    price_per_night: 35000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=400&fit=crop&auto=format',
    description: 'Легендарный колониальный отель, где изобрели коктейль Сингапур Слинг.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Long Bar,Музей'
  },
  {
    name: 'The Fullerton Hotel Singapore',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Сингапур',
    address: '1 Fullerton Square, Singapore 049178',
    price_per_night: 28000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель в здании бывшей почты с видом на залив.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на залив'
  },
  {
    name: 'Capella Singapore',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Сингапур',
    address: '1 The Knolls, Sentosa Island, Singapore 098297',
    price_per_night: 32000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Эксклюзивный курорт на острове Сентоза в тропических садах.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Частный пляж,Сады'
  },
  {
    name: 'The Clan Hotel',
    category: HOTEL_CATEGORIES.BOUTIQUE,
    city: 'Сингапур',
    address: '10 Cross St, Singapore 048417',
    price_per_night: 15000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
    description: 'Бутик-отель в историческом Чайнатауне.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Дизайнерские номера'
  },
  {
    name: 'Rucksack Inn @ Lavender Street',
    category: HOTEL_CATEGORIES.BUDGET,
    city: 'Сингапур',
    address: '201B Lavender St, Singapore 338735',
    price_per_night: 4800,
    rating: 4.1,
    image_url: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=400&fit=crop&auto=format',
    description: 'Современный хостел рядом с MRT станцией.',
    amenities: 'Wi-Fi,Общая кухня,Прачечная,Кондиционер'
  },
  {
    name: 'Mandarin Oriental Singapore',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Сингапур',
    address: '5 Raffles Ave, Singapore 039797',
    price_per_night: 24000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=400&fit=crop&auto=format',
    description: 'Премиальный бизнес-отель в Marina Bay с видом на гавань.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бизнес-центр,Консьерж'
  },

  // ДОПОЛНИТЕЛЬНЫЕ ОТЕЛИ - МАЛЬДИВЫ (+6)
  {
    name: 'Cheval Blanc Randheli',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Мальдивы',
    address: 'Randheli Island, Noonu Atoll, Maldives',
    price_per_night: 70000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
    description: 'Ультра-роскошный курорт с виллами на воде и персональными дворецкими.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Дайвинг,Водные виллы,Дворецкий,Яхта,Детский клуб'
  },
  {
    name: 'Soneva Jani',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Мальдивы',
    address: 'Medhufaru, Noonu Atoll, Maldives',
    price_per_night: 65000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Эко-курорт с водными виллами и обсерваторией.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Дайвинг,Водные виллы,Обсерватория,Кинотеатр,Эко-лагуна'
  },
  {
    name: 'COMO Maalifushi',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Мальдивы',
    address: 'Maalifushi Island, Thaa Atoll, Maldives',
    price_per_night: 45000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный курорт для дайвинга и серфинга.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Дайвинг,Серфинг,Водные виллы,Йога'
  },
  {
    name: 'Six Senses Laamu',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Мальдивы',
    address: 'Olhuveli Island, Laamu Atoll, Maldives',
    price_per_night: 48000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
    description: 'Эко-курорт с устойчивым туризмом и сёрфингом.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Дайвинг,Серфинг,Водные виллы,Центр морской биологии'
  },
  {
    name: 'Anantara Kihavah Maldives Villas',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Мальдивы',
    address: 'Kihavah Huravalhi Island, Baa Atoll, Maldives',
    price_per_night: 52000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошные виллы с подводным рестораном и спа.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Дайвинг,Водные виллы,Подводный ресторан,Обсерватория'
  },
  {
    name: 'Waldorf Astoria Maldives Ithaafushi',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Мальдивы',
    address: 'Ithaafushi Island, South Male Atoll, Maldives',
    price_per_night: 58000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=400&fit=crop&auto=format',
    description: 'Частный остров с роскошными виллами и персональными яхтами.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Дайвинг,Водные виллы,Частная яхта,11 ресторанов'
  }
];

// Объединяем все отели
export const allExpandedHotelsData = [...expandedHotelsData, ...additionalHotelsPerDestination];

// Функция для генерации дополнительных отелей для каждого города
export function generateAdditionalHotels() {
  const additionalHotels = [];
  const cities = ['Париж', 'Токио', 'Нью-Йорк', 'Лондон', 'Дубай', 'Рим', 'Бали', 'Сидней', 'Барселона', 'Стамбул', 'Сингапур', 'Мальдивы'];
  
  // Добавляем по 10-15 дополнительных отелей для каждого города
  cities.forEach(city => {
    for (let i = 0; i < 12; i++) {
      const categories = Object.values(HOTEL_CATEGORIES);
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      let price_per_night;
      switch (category) {
        case HOTEL_CATEGORIES.LUXURY:
          price_per_night = 15000 + Math.floor(Math.random() * 25000);
          break;
        case HOTEL_CATEGORIES.BUSINESS:
          price_per_night = 8000 + Math.floor(Math.random() * 10000);
          break;
        case HOTEL_CATEGORIES.BOUTIQUE:
          price_per_night = 6000 + Math.floor(Math.random() * 15000);
          break;
        case HOTEL_CATEGORIES.RESORT:
          price_per_night = 12000 + Math.floor(Math.random() * 30000);
          break;
        default:
          price_per_night = 3000 + Math.floor(Math.random() * 8000);
      }

      const hotelNames = {
        'Париж': ['Hotel Paris Centre', 'Le Petit Palace', 'Boutique Marais', 'Hotel Champs Elysees', 'Palace Louvre'],
        'Токио': ['Tokyo Grand Hotel', 'Shibuya Central', 'Ginza Palace', 'Harajuku Inn', 'Tokyo Bay Hotel'],
        'Нью-Йорк': ['Manhattan Plaza', 'Brooklyn Bridge Hotel', 'Central Park Inn', 'Times Square Palace', 'Hudson River Hotel'],
        'Лондон': ['London Bridge Hotel', 'Hyde Park Inn', 'Thames View', 'Covent Garden Hotel', 'Westminster Palace'],
        'Дубай': ['Dubai Marina Hotel', 'Palm Jumeirah Resort', 'Downtown Dubai', 'Emirates Palace', 'Desert Oasis'],
        'Рим': ['Roman Forum Hotel', 'Colosseum Palace', 'Vatican View', 'Trastevere Inn', 'Spanish Steps Hotel'],
        'Бали': ['Ubud Resort', 'Seminyak Beach', 'Canggu Surf Hotel', 'Sanur Palace', 'Nusa Dua Resort'],
        'Сидней': ['Harbour View Hotel', 'Bondi Beach Resort', 'Opera House Inn', 'Darling Harbour', 'Circular Quay Hotel'],
        'Барселона': ['Gothic Quarter Hotel', 'Park Guell Inn', 'Sagrada Familia', 'Barcelona Beach', 'Las Ramblas Hotel'],
        'Стамбул': ['Bosphorus View', 'Sultanahmet Palace', 'Galata Tower Hotel', 'Golden Horn Inn', 'Asian Side Resort'],
        'Сингапур': ['Marina Bay Hotel', 'Orchard Road Inn', 'Sentosa Resort', 'Chinatown Palace', 'Little India Hotel'],
        'Мальдивы': ['Coral Island Resort', 'Sunset Villa', 'Ocean Paradise', 'Lagoon Hotel', 'Tropical Resort']
      };

      const name = hotelNames[city][i % hotelNames[city].length] + ` ${i + 1}`;
      
      additionalHotels.push({
        name,
        category,
        city,
        address: `${city} Address ${i + 1}`,
        price_per_night,
        rating: 3.5 + Math.random() * 1.5,
        image_url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=800&h=400&fit=crop&auto=format`,
        description: `Отличный ${category} отель в ${city} с современными удобствами.`,
        amenities: 'Wi-Fi,Ресторан,Бар,Фитнес'
      });
    }
  });
  
  return additionalHotels;
} 