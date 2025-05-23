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