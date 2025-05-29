import { NextRequest, NextResponse } from 'next/server';
import dbManager from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const city = searchParams.get('city') || '';

    let hotels;
    
    if (query || category || city) {
      hotels = await dbManager.searchHotels(query, category || undefined, city || undefined);
    } else {
      hotels = await dbManager.getAllHotels();
    }

    return NextResponse.json({
      success: true,
      data: hotels,
      count: hotels.length
    });
  } catch (error) {
    console.error('Ошибка при получении отелей:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ошибка при получении отелей' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      category, 
      city, 
      address, 
      price_per_night, 
      rating, 
      image_url, 
      description, 
      amenities 
    } = body;

    // Валидация
    if (!name || !category || !city || !address) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Не все обязательные поля заполнены' 
        },
        { status: 400 }
      );
    }

    // Создаем отель в базе данных
    const hotel = await dbManager.createHotel({
      name,
      category,
      city,
      address,
      price_per_night,
      rating,
      image_url,
      description,
      amenities: JSON.stringify(amenities || [])
    });

    return NextResponse.json({
      success: true,
      data: hotel,
      message: 'Отель успешно создан'
    });
  } catch (error) {
    console.error('Ошибка при создании отеля:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ошибка при создании отеля' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      name, 
      category, 
      city, 
      address, 
      price_per_night, 
      rating, 
      image_url, 
      description, 
      amenities 
    } = body;

    // Валидация
    if (!id || !name || !category || !city || !address) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Не все обязательные поля заполнены' 
        },
        { status: 400 }
      );
    }

    // Обновляем отель в базе данных
    const hotel = await dbManager.updateHotel(id, {
      name,
      category,
      city,
      address,
      price_per_night,
      rating,
      image_url,
      description,
      amenities: JSON.stringify(amenities || [])
    });

    return NextResponse.json({
      success: true,
      data: hotel,
      message: 'Отель успешно обновлен'
    });
  } catch (error) {
    console.error('Ошибка при обновлении отеля:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ошибка при обновлении отеля' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID отеля не указан' 
        },
        { status: 400 }
      );
    }

    // Удаляем отель из базы данных
    await dbManager.deleteHotel(parseInt(id));

    return NextResponse.json({
      success: true,
      message: 'Отель успешно удален'
    });
  } catch (error) {
    console.error('Ошибка при удалении отеля:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ошибка при удалении отеля' 
      },
      { status: 500 }
    );
  }
} 