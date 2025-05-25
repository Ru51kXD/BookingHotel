import { HOTEL_CATEGORIES } from './database';

// База отелей Казахстана
export const kazakhstanHotelsData = [
  // АСТАНА (НУР-СУЛТАН)
  {
    name: 'The Ritz-Carlton Almaty',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Алматы',
    address: 'пр. Достык, 36, Алматы, 050051',
    price_per_night: 45000,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель в центре Алматы с видом на горы Заилийского Алатау.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Вид на горы'
  },
  {
    name: 'Rixos President Astana',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Астана',
    address: 'пр. Мангилик Ел, 24, Астана, 010000',
    price_per_night: 42000,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
    description: 'Премиальный отель в деловом центре столицы Казахстана.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Конференц-залы,Дворецкий'
  },
  {
    name: 'Hilton Astana',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Астана',
    address: 'ул. Достык, 5/1, Астана, 010000',
    price_per_night: 25000,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
    description: 'Современный бизнес-отель в центре Астаны.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Конференц-залы,Парковка'
  },
  {
    name: 'InterContinental Almaty',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Алматы',
    address: 'ул. Жолдасбекова, 2, Алматы, 050051',
    price_per_night: 38000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
    description: 'Международный отель премиум-класса в Алматы.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий,Бассейн'
  },
  {
    name: 'Ramada Plaza Almaty',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Алматы',
    address: 'ул. Гагарина, 127, Алматы, 050012',
    price_per_night: 18000,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
    description: 'Комфортабельный отель в деловом районе Алматы.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Конференц-залы,Парковка,Бассейн'
  },

  // ШЫМКЕНТ
  {
    name: 'Rixos Khadisha Shymkent',
    category: HOTEL_CATEGORIES.LUXURY,
    city: 'Шымкент',
    address: 'пр. Республики, 32, Шымкент, 160012',
    price_per_night: 32000,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Роскошный отель в южной столице Казахстана.',
    amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Бассейн,Дворецкий'
  },
  {
    name: 'Dostyk Hotel Shymkent',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Шымкент',
    address: 'ул. Казыбек би, 40, Шымкент, 160012',
    price_per_night: 15000,
    rating: 4.2,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
    description: 'Уютный отель в центре Шымкента.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Парковка,Конференц-залы'
  },

  // АКТОБЕ
  {
    name: 'Best Western Plus Dostyk Hotel',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Актобе',
    address: 'пр. Абилкайыр хана, 68, Актобе, 030000',
    price_per_night: 16000,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&auto=format',
    description: 'Современный отель международного уровня в Актобе.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Конференц-залы,Парковка,Бассейн'
  },

  // КАРАГАНДА
  {
    name: 'Nomad Hotel Karaganda',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Караганда',
    address: 'ул. Ерубаева, 14, Караганда, 100008',
    price_per_night: 14000,
    rating: 4.1,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
    description: 'Комфортабельный отель в центре Караганды.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Парковка,Сауна'
  },

  // ТАРАЗ
  {
    name: 'Zhambyl Hotel Taraz',
    category: HOTEL_CATEGORIES.ECONOMY,
    city: 'Тараз',
    address: 'пр. Жамбыла, 40, Тараз, 080000',
    price_per_night: 8000,
    rating: 3.9,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
    description: 'Бюджетный отель в историческом центре Тараза.',
    amenities: 'Wi-Fi,Ресторан,Парковка,Кондиционер'
  },

  // ПАВЛОДАР
  {
    name: 'Сосновый бор Resort',
    category: HOTEL_CATEGORIES.RESORT,
    city: 'Павлодар',
    address: 'зона отдыха "Сосновый бор", Павлодар, 140000',
    price_per_night: 12000,
    rating: 4.3,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
    description: 'Загородный курорт в сосновом бору у реки Иртыш.',
    amenities: 'Wi-Fi,Ресторан,Бар,Пляж,Баня,Бассейн,Природа,Рыбалка'
  },

  // УСТЬ-КАМЕНОГОРСК
  {
    name: 'Казахстан Hotel',
    category: HOTEL_CATEGORIES.BUSINESS,
    city: 'Усть-Каменогорск',
    address: 'ул. Казахстан, 38, Усть-Каменогорск, 070000',
    price_per_night: 13000,
    rating: 4.0,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
    description: 'Центральный отель в восточном Казахстане.',
    amenities: 'Wi-Fi,Ресторан,Бар,Фитнес,Парковка,Конференц-залы'
  }
];

// Популярные направления Казахстана
export const kazakhstanDestinations = [
  { name: 'Астана', country: 'Казахстан' },
  { name: 'Алматы', country: 'Казахстан' },
  { name: 'Шымкент', country: 'Казахстан' },
  { name: 'Актобе', country: 'Казахстан' },
  { name: 'Караганда', country: 'Казахстан' },
  { name: 'Тараз', country: 'Казахстан' },
  { name: 'Павлодар', country: 'Казахстан' },
  { name: 'Усть-Каменогорск', country: 'Казахстан' }
];

// Функция для генерации дополнительных отелей
export const generateAdditionalKazakhstanHotels = () => {
  const categories = Object.values(HOTEL_CATEGORIES);
  const cities = ['Астана', 'Алматы', 'Шымкент', 'Актобе', 'Караганда', 'Тараз', 'Павлодар', 'Усть-Каменогорск'];
  const hotelChains = ['Hilton', 'Marriott', 'Radisson', 'Holiday Inn', 'Sheraton', 'Novotel', 'Dostyk', 'Kazakh'];
  const streetNames = ['пр. Абая', 'ул. Назарбаева', 'пр. Мангилик Ел', 'ул. Достык', 'пр. Республики', 'ул. Тауелсиздик'];

  const additionalHotels = [];

  for (let i = 0; i < 30; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const chain = hotelChains[Math.floor(Math.random() * hotelChains.length)];
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    
    let basePrice;
    switch (category) {
      case HOTEL_CATEGORIES.LUXURY:
        basePrice = 35000 + Math.floor(Math.random() * 20000);
        break;
      case HOTEL_CATEGORIES.BUSINESS:
        basePrice = 15000 + Math.floor(Math.random() * 15000);
        break;
      case HOTEL_CATEGORIES.BOUTIQUE:
        basePrice = 20000 + Math.floor(Math.random() * 10000);
        break;
      case HOTEL_CATEGORIES.RESORT:
        basePrice = 18000 + Math.floor(Math.random() * 12000);
        break;
      default:
        basePrice = 8000 + Math.floor(Math.random() * 7000);
    }

    additionalHotels.push({
      name: `${chain} ${city}`,
      category,
      city,
      address: `${street}, ${Math.floor(Math.random() * 200) + 1}, ${city}`,
      price_per_night: basePrice,
      rating: 3.5 + Math.random() * 1.5,
      image_url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 200000000)}?w=800&h=400&fit=crop&auto=format`,
      description: `Отличный ${category.toLowerCase()} отель в ${city} с современными удобствами.`,
      amenities: getRandomAmenities()
    });
  }

  return additionalHotels;
};

function getRandomAmenities(): string {
  const allAmenities = [
    'Wi-Fi', 'SPA', 'Ресторан', 'Бар', 'Фитнес', 'Бассейн', 'Парковка', 
    'Консьерж', 'Конференц-залы', 'Дворецкий', 'Сауна', 'Кондиционер',
    'Прачечная', 'Трансфер', 'Детская площадка', 'Терраса'
  ];
  
  const count = 4 + Math.floor(Math.random() * 4); // 4-7 удобств
  const selected = [];
  const available = [...allAmenities];
  
  for (let i = 0; i < count && available.length > 0; i++) {
    const index = Math.floor(Math.random() * available.length);
    selected.push(available.splice(index, 1)[0]);
  }
  
  return selected.join(',');
} 