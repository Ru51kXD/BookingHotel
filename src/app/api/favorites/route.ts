import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID обязателен' },
        { status: 400 }
      );
    }

    // В реальном приложении здесь была бы работа с базой данных
    // Для демонстрации возвращаем успех
    return NextResponse.json({
      success: true,
      favorites: [] // Избранные отели будут храниться в localStorage/auth context
    });
  } catch (error) {
    console.error('Ошибка при получении избранных:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, hotelId, action } = body; // action: 'add' или 'remove'

    if (!userId || !hotelId || !action) {
      return NextResponse.json(
        { success: false, error: 'Не все обязательные поля заполнены' },
        { status: 400 }
      );
    }

    if (!['add', 'remove'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Неверное действие' },
        { status: 400 }
      );
    }

    // В реальном приложении здесь была бы работа с базой данных
    // Для демонстрации возвращаем успех
    return NextResponse.json({
      success: true,
      message: action === 'add' ? 'Отель добавлен в избранное' : 'Отель удален из избранного',
      isLiked: action === 'add'
    });
  } catch (error) {
    console.error('Ошибка при управлении избранными:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 