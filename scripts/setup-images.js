const fs = require('fs');
const path = require('path');
const https = require('https');

// Создаем директории для изображений если они не существуют
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Список изображений для загрузки
const images = [
  // Города
  { 
    url: 'https://images.unsplash.com/photo-1513326738677-b964603b136d',
    filename: 'moscow.jpg',
    description: 'Moscow skyline'
  },
  { 
    url: 'https://images.unsplash.com/photo-1556610961-2fecc5927173',
    filename: 'spb.jpg',
    description: 'Saint Petersburg'
  },
  { 
    url: 'https://images.unsplash.com/photo-1612866716498-39d382975e78',
    filename: 'sochi.jpg',
    description: 'Sochi'
  },
  { 
    url: 'https://images.unsplash.com/photo-1599073103792-f7f8c34b02da',
    filename: 'kazan.jpg',
    description: 'Kazan'
  },
  // Отели
  { 
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    filename: 'hotel-1.jpg',
    description: 'Luxury hotel'
  },
  { 
    url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    filename: 'hotel-2.jpg',
    description: 'Modern hotel'
  },
  { 
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    filename: 'hotel-3.jpg',
    description: 'Panorama hotel'
  },
  { 
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    filename: 'hotel-4.jpg',
    description: 'River side hotel'
  },
  { 
    url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    filename: 'hotel-5.jpg',
    description: 'Old town hotel'
  },
  { 
    url: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4',
    filename: 'hotel-6.jpg',
    description: 'Business hotel'
  },
  // Комнаты отелей
  { 
    url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    filename: 'hotel-room-1.jpg',
    description: 'Hotel room with panoramic view'
  },
  { 
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
    filename: 'hotel-room-2.jpg',
    description: 'Modern hotel room'
  },
  { 
    url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843',
    filename: 'hotel-room-3.jpg',
    description: 'Luxury hotel room'
  },
  { 
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f',
    filename: 'hotel-spa.jpg',
    description: 'Hotel spa'
  },
  { 
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    filename: 'hotel-restaurant.jpg',
    description: 'Hotel restaurant'
  },
  // Типы номеров
  { 
    url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
    filename: 'hotel-room-standard.jpg',
    description: 'Standard hotel room'
  },
  { 
    url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457',
    filename: 'hotel-room-deluxe.jpg',
    description: 'Deluxe hotel room'
  },
  { 
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
    filename: 'hotel-room-suite.jpg',
    description: 'Suite hotel room'
  },
  // Главная страница
  { 
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    filename: 'hero.jpg',
    description: 'Hero image'
  },
  // Фоновый узор
  {
    url: 'https://raw.githubusercontent.com/tailwindlabs/heropatterns/master/public/patterns/circuit-board.svg',
    filename: 'pattern.svg',
    description: 'Background pattern'
  }
];

// Функция для скачивания изображений
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(imagesDir, filename);
    
    // Проверка если файл уже существует
    if (fs.existsSync(outputPath)) {
      console.log(`File ${filename} already exists, skipping...`);
      resolve();
      return;
    }
    
    console.log(`Downloading ${filename}...`);
    const file = fs.createWriteStream(outputPath);
    
    https.get(`${url}?w=1200&q=80`, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Удаляем неполный файл
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
};

// Загружаем все изображения последовательно
const downloadAllImages = async () => {
  console.log('Starting image download...');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Failed to download ${image.filename}: ${error}`);
    }
  }
  
  console.log('All downloads completed!');
};

downloadAllImages(); 