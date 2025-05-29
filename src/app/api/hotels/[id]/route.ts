import { NextRequest, NextResponse } from 'next/server';
import dbManager from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Неверный ID отеля' 
        },
        { status: 400 }
      );
    }

    const hotel = await dbManager.getHotelById(id);
    
    if (!hotel) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Отель не найден' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hotel
    });
  } catch (error) {
    console.error('Ошибка при получении отеля:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ошибка при получении отеля' 
      },
      { status: 500 }
    );
  }
} 