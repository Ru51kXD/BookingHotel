import { NextRequest, NextResponse } from 'next/server';

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  admin_response?: string;
  admin_response_date?: string;
  admin_id?: string;
}

// Функция для получения сообщений из localStorage (эмуляция базы данных)
function getSupportMessages(): SupportMessage[] {
  if (typeof window === 'undefined') {
    // На сервере возвращаем пустой массив, реальные данные будут загружены на клиенте
    return [];
  }
  
  try {
    const stored = localStorage.getItem('support_messages');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Функция для сохранения сообщений в localStorage
function saveSupportMessage(message: SupportMessage) {
  if (typeof window === 'undefined') return;
  
  try {
    const existing = getSupportMessages();
    existing.push(message);
    localStorage.setItem('support_messages', JSON.stringify(existing));
  } catch (error) {
    console.error('Ошибка сохранения сообщения:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Валидация
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Неверный формат email' },
        { status: 400 }
      );
    }

    // Создаем новое сообщение
    const supportMessage: SupportMessage = {
      id: `support_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name,
      email,
      subject,
      message,
      status: 'new',
      priority: 'medium', // Автоматически определяем приоритет
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Автоматическое определение приоритета
    const urgentKeywords = ['срочно', 'urgent', 'помогите', 'не работает', 'ошибка оплаты', 'возврат'];
    const highKeywords = ['проблема', 'баг', 'ошибка', 'не могу', 'сломался'];
    
    const messageText = (subject + ' ' + message).toLowerCase();
    
    if (urgentKeywords.some(keyword => messageText.includes(keyword))) {
      supportMessage.priority = 'urgent';
    } else if (highKeywords.some(keyword => messageText.includes(keyword))) {
      supportMessage.priority = 'high';
    }

    // Сохраняем сообщение (эмуляция сохранения в базу данных)
    console.log('Новое сообщение поддержки:', {
      id: supportMessage.id,
      from: supportMessage.email,
      subject: supportMessage.subject,
      priority: supportMessage.priority
    });

    // Возвращаем данные включая сообщение для клиентской синхронизации
    return NextResponse.json({
      success: true,
      message: 'Сообщение успешно отправлено',
      ticket_id: supportMessage.id,
      data: supportMessage
    });

  } catch (error) {
    console.error('Ошибка при обработке сообщения поддержки:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Для GET запроса возвращаем инструкции для клиента
    // Реальные данные будут загружены на клиенте из localStorage
    return NextResponse.json({
      success: true,
      message: 'Используйте клиентский код для загрузки сообщений',
      data: [],
      total: 0,
      pagination: {
        limit,
        offset,
        total: 0
      }
    });

  } catch (error) {
    console.error('Ошибка при получении сообщений поддержки:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 