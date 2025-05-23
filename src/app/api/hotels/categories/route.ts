import { NextResponse } from 'next/server';
import { HOTEL_CATEGORIES } from '@/lib/database';

export async function GET() {
  try {
    const categories = [
      { 
        value: HOTEL_CATEGORIES.LUXURY, 
        label: 'Роскошные', 
        description: 'Отели класса люкс с премиум сервисом',
        icon: '⭐'
      },
      { 
        value: HOTEL_CATEGORIES.BUSINESS, 
        label: 'Бизнес', 
        description: 'Отели для деловых поездок',
        icon: '💼'
      },
      { 
        value: HOTEL_CATEGORIES.BUDGET, 
        label: 'Бюджетные', 
        description: 'Экономичные варианты размещения',
        icon: '💰'
      },
      { 
        value: HOTEL_CATEGORIES.RESORT, 
        label: 'Курортные', 
        description: 'Отели для отдыха и релаксации',
        icon: '🏖️'
      },
      { 
        value: HOTEL_CATEGORIES.BOUTIQUE, 
        label: 'Бутик', 
        description: 'Уникальные отели с особой атмосферой',
        icon: '🎨'
      }
    ];

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ошибка при получении категорий' 
      },
      { status: 500 }
    );
  }
} 