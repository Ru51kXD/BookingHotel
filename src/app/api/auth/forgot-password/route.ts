import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phoneLastDigits, newPassword, step = 'verify' } = body;

    // Валидация
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email обязателен' },
        { status: 400 }
      );
    }

    if (step === 'verify') {
      // Этап проверки данных пользователя
      if (!phoneLastDigits || phoneLastDigits.length !== 4) {
        return NextResponse.json(
          { success: false, error: 'Введите последние 4 цифры номера телефона' },
          { status: 400 }
        );
      }

      // Встроенные пользователи
      const builtInUsers = [
        { email: 'admin@stayeasy.kz', code: '2025', userId: 'admin-001' },
        { email: 'demo@example.com', code: '1234', userId: 'demo-001' },
        { email: 'admin@rulit.com', code: '2025', userId: 'admin-002' }
      ];

      const builtInUser = builtInUsers.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.code === phoneLastDigits
      );

      if (builtInUser) {
        return NextResponse.json({
          success: true,
          userId: builtInUser.userId,
          message: 'Данные подтверждены'
        });
      }

      // В реальном приложении здесь была бы проверка в базе данных
      // Для демонстрации используем localStorage logic

      return NextResponse.json({
        success: false,
        error: 'Пользователь с такими данными не найден'
      }, { status: 404 });

    } else if (step === 'reset') {
      // Этап сброса пароля
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: 'Пароль должен содержать минимум 6 символов' },
          { status: 400 }
        );
      }

      const { userId } = body;
      if (!userId) {
        return NextResponse.json(
          { success: false, error: 'ID пользователя обязателен' },
          { status: 400 }
        );
      }

      // В реальном приложении здесь был бы UPDATE в базе данных
      // Для демонстрации просто возвращаем успех
      return NextResponse.json({
        success: true,
        message: 'Пароль успешно изменен'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Неверный этап восстановления пароля' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Ошибка API восстановления пароля:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 