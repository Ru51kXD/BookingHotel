import { NextResponse } from 'next/server';
import dbManager from '@/lib/database';
import { allRussianHotelsData } from '@/lib/russianHotels';

export async function POST() {
  try {
    // Подключаемся к базе данных и очищаем существующие данные
    const db = (dbManager as any).db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'База данных не инициализирована' },
        { status: 500 }
      );
    }

    // Очищаем таблицу отелей
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM hotels", (err: any) => {
        if (err) reject(err);
        else resolve(null);
      });
    });

    // Вставляем российские отели
    const insertStmt = db.prepare(`
      INSERT INTO hotels (name, category, city, address, price_per_night, rating, image_url, description, amenities)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const hotel of allRussianHotelsData) {
      await new Promise((resolve, reject) => {
        insertStmt.run([
          hotel.name,
          hotel.category,
          hotel.city,
          hotel.address,
          hotel.price_per_night,
          hotel.rating,
          hotel.image_url,
          hotel.description,
          hotel.amenities
        ], (err: any) => {
          if (err) reject(err);
          else resolve(null);
        });
      });
    }

    insertStmt.finalize();

    console.log(`🎉 РОССИЙСКАЯ база отелей создана! Добавлено ${allRussianHotelsData.length} отелей:`);
    console.log('🏙️ По городам:');
    console.log('  🏛️ Москва: ~18 отелей');
    console.log('  🏰 Санкт-Петербург: ~13 отелей');
    console.log('  🏖️ Сочи: ~13 отелей');
    console.log('  🕌 Казань: ~12 отелей');
    console.log('  🏢 Екатеринбург: ~10 отелей');
    console.log('  📊 + другие российские города');
    console.log('⭐ Категории: Люкс, Бизнес, Бюджет, Курорт, Бутик');
    console.log('💰 Цены: от 3,000₽ до 45,000₽ за ночь');

    return NextResponse.json({
      success: true,
      message: `База данных успешно заполнена ${allRussianHotelsData.length} российскими отелями!`,
      count: allRussianHotelsData.length,
      cities: [
        'Москва', 'Санкт-Петербург', 'Сочи', 'Казань', 'Екатеринбург',
        'Новосибирск', 'Нижний Новгород', 'Красноярск', 'Владивосток',
        'Калининград', 'Ростов-на-Дону', 'Уфа', 'Воронеж'
      ]
    });

  } catch (error) {
    console.error('Ошибка заполнения базы данных:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ошибка заполнения базы данных',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
} 