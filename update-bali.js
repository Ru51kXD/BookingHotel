const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Путь к базе данных
const dbPath = path.join(__dirname, 'hotels.db');

// Подключаемся к базе данных
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Ошибка подключения к базе данных:', err.message);
    return;
  }
  console.log('✅ Подключение к базе данных SQLite установлено');
});

// Дополнительные отели Бали с английскими названиями
const additionalBaliHotels = [
  {
    name: 'The Mulia Bali Resort',
    category: 'resort',
    city: 'Bali',
    address: 'Jl. Raya Nusa Dua Selatan, Benoa, Kec. Kuta Sel., Bali 80363',
    price_per_night: 4200,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop&auto=format',
    description: 'Luxury beachfront resort with pristine white sand and crystal clear waters.',
    amenities: 'Wi-Fi,SPA,Restaurant,Bar,Fitness,Swimming Pools,Private Beach,Diving'
  },
  {
    name: 'Four Seasons Ubud',
    category: 'resort',
    city: 'Bali',
    address: 'Sayan, Ubud, Gianyar Regency, Bali 80571',
    price_per_night: 5200,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
    description: 'Tropical paradise in the Ayung River valley in Ubud, surrounded by jungle.',
    amenities: 'Wi-Fi,SPA,Restaurant,Bar,Fitness,Swimming Pool,Yoga,Jungle Excursions'
  },
  {
    name: 'COMO Shambhala Estate Bali',
    category: 'luxury',
    city: 'Bali',
    address: 'Banjar Begawan, Payangan, Gianyar Regency, Bali 80571',
    price_per_night: 6800,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
    description: 'Wellness retreat in tropical forests with individual villas.',
    amenities: 'Wi-Fi,SPA,Restaurant,Bar,Fitness,Wellness Programs,Yoga,Meditation'
  },
  {
    name: 'Alila Uluwatu Bali',
    category: 'luxury',
    city: 'Bali',
    address: 'Jl. Belimbing Sari, Pecatu, Kec. Kuta Sel., Bali 80361',
    price_per_night: 4800,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
    description: 'Modern villas on cliffs with stunning ocean views.',
    amenities: 'Wi-Fi,SPA,Restaurant,Bar,Fitness,Swimming Pool,Ocean View,Surfing'
  },
  {
    name: 'Seminyak Beach Resort',
    category: 'resort',
    city: 'Bali',
    address: 'Jl. Kayu Aya, Seminyak, Kec. Kuta, Bali 80361',
    price_per_night: 3200,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
    description: 'Stylish resort on the famous Seminyak beach.',
    amenities: 'Wi-Fi,SPA,Restaurant,Bar,Fitness,Beach Access,Swimming Pool,Surfing'
  }
];

// Добавляем дополнительные отели Бали
const addAdditionalBaliHotels = () => {
  const stmt = db.prepare(`
    INSERT INTO hotels (name, category, city, address, price_per_night, rating, image_url, description, amenities)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  let addedCount = 0;
  additionalBaliHotels.forEach((hotel) => {
    stmt.run([
      hotel.name,
      hotel.category,
      hotel.city,
      hotel.address,
      hotel.price_per_night,
      hotel.rating,
      hotel.image_url,
      hotel.description,
      hotel.amenities
    ], (err) => {
      if (err) {
        console.error('❌ Ошибка добавления отеля:', hotel.name, err.message);
      } else {
        addedCount++;
        console.log(`✅ Добавлен отель: ${hotel.name} (${hotel.city})`);
        
        if (addedCount === additionalBaliHotels.length) {
          console.log(`🎉 Успешно добавлено ${addedCount} дополнительных отелей Bali!`);
          console.log('🔍 Теперь поиск будет работать для:');
          console.log('   • "Бали" (русский)');
          console.log('   • "Bali" (английский)');
          console.log('   • "бали" (в любом регистре)');
          db.close();
        }
      }
    });
  });
  
  stmt.finalize();
};

// Запускаем добавление отелей
addAdditionalBaliHotels(); 