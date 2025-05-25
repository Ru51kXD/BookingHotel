import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import { kazakhstanHotelsData, generateAdditionalKazakhstanHotels } from '@/lib/kazakhstanHotels';
import { initializeDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    console.log('🇰🇿 Начинаем загрузку казахстанских отелей...');
    
    // Инициализируем базу данных
    const dbPath = path.join(process.cwd(), 'hotels.db');
    const db = new Database(dbPath);

    // Инициализируем структуру БД если нужно
    await initializeDatabase();

    // Очищаем существующие отели
    console.log('🧹 Очистка существующих отелей...');
    db.prepare('DELETE FROM hotels WHERE city IN (?, ?, ?, ?, ?, ?, ?, ?)').run(
      'Астана', 'Алматы', 'Шымкент', 'Актобе', 'Караганда', 'Тараз', 'Павлодар', 'Усть-Каменогорск'
    );

    // Подготавливаем запрос для вставки
    const insertHotel = db.prepare(`
      INSERT INTO hotels (
        name, category, city, address, price_per_night, 
        rating, image_url, description, amenities
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Вставляем основные казахстанские отели
    console.log('🏨 Загружаем основные отели...');
    let hotelCount = 0;

    for (const hotel of kazakhstanHotelsData) {
      try {
        insertHotel.run(
          hotel.name,
          hotel.category,
          hotel.city,
          hotel.address,
          hotel.price_per_night,
          hotel.rating,
          hotel.image_url,
          hotel.description,
          hotel.amenities
        );
        hotelCount++;
      } catch (error) {
        console.warn(`Пропускаем дублирующийся отель: ${hotel.name}`);
      }
    }

    // Генерируем и добавляем дополнительные отели
    console.log('🏨 Генерируем дополнительные отели...');
    const additionalHotels = generateAdditionalKazakhstanHotels();
    
    for (const hotel of additionalHotels) {
      try {
        insertHotel.run(
          hotel.name,
          hotel.category,
          hotel.city,
          hotel.address,
          hotel.price_per_night,
          hotel.rating,
          hotel.image_url,
          hotel.description,
          hotel.amenities
        );
        hotelCount++;
      } catch (error) {
        console.warn(`Пропускаем дублирующийся отель: ${hotel.name}`);
      }
    }

    db.close();

    // Статистика по городам
    console.log('\n📊 Статистика загрузки:');
    console.log(`  🏛️ Астана: отели разных категорий`);
    console.log(`  🏔️ Алматы: отели с видом на горы`);
    console.log(`  🌆 Шымкент: южная столица`);
    console.log(`  🏢 Актобе: деловые отели`);
    console.log(`  ⛏️ Караганда: промышленный центр`);
    console.log(`  🏛️ Тараз: исторический город`);
    console.log(`  🌲 Павлодар: отели у природы`);
    console.log(`  🏔️ Усть-Каменогорск: горные отели`);
    console.log(`\n✅ Всего загружено отелей: ${hotelCount}`);

    return NextResponse.json({ 
      success: true, 
      message: `Успешно загружено ${hotelCount} казахстанских отелей`,
      hotels_loaded: hotelCount,
      cities: ['Астана', 'Алматы', 'Шымкент', 'Актобе', 'Караганда', 'Тараз', 'Павлодар', 'Усть-Каменогорск']
    });

  } catch (error) {
    console.error('❌ Ошибка при загрузке казахстанских отелей:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при загрузке отелей' },
      { status: 500 }
    );
  }
} 