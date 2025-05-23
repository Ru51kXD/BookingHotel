import { useState, useEffect, useCallback } from 'react';

// Система аутентификации
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Временное хранилище пользователей (в реальном проекте будет база данных)
const users: Map<string, User & { password: string }> = new Map();

// Создаем демо-пользователя для тестирования
const demoUser: User & { password: string } = {
  id: 'demo123',
  email: 'demo@example.com',
  name: 'Демо Пользователь',
  phone: '+7 (999) 123-45-67',
  password: 'demo123',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: new Date().toISOString()
};
users.set('demo123', demoUser);

// Текущий пользователь (в реальном проекте будет JWT токен)
let currentUser: User | null = null;

export class AuthService {
  // Регистрация пользователя
  static async register(data: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Проверяем, существует ли пользователь
      const existingUser = Array.from(users.values()).find(u => u.email === data.email);
      if (existingUser) {
        return { success: false, error: 'Пользователь с таким email уже существует' };
      }

      // Создаем нового пользователя
      const userId = Math.random().toString(36).substr(2, 9);
      const user: User = {
        id: userId,
        email: data.email,
        name: data.name,
        phone: data.phone,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Сохраняем пользователя
      users.set(userId, { ...user, password: data.password });
      currentUser = user;

      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: 'Ошибка при регистрации' };
    }
  }

  // Вход в систему
  static async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const user = Array.from(users.values()).find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        return { success: false, error: 'Неверный email или пароль' };
      }

      const userData: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at
      };

      currentUser = userData;

      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(userData));
      }

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: 'Ошибка при входе в систему' };
    }
  }

  // Выход из системы
  static logout(): void {
    currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  // Получить текущего пользователя
  static getCurrentUser(): User | null {
    if (currentUser) return currentUser;

    // Проверяем localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        try {
          currentUser = JSON.parse(stored);
          return currentUser;
        } catch {
          localStorage.removeItem('currentUser');
        }
      }
    }

    return null;
  }

  // Обновить профиль пользователя
  static async updateProfile(data: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      if (!currentUser) {
        return { success: false, error: 'Пользователь не авторизован' };
      }

      const user = users.get(currentUser.id);
      if (!user) {
        return { success: false, error: 'Пользователь не найден' };
      }

      // Обновляем данные
      const updatedUser: User = {
        ...currentUser,
        ...data,
        updated_at: new Date().toISOString()
      };

      users.set(currentUser.id, { ...user, ...updatedUser });
      currentUser = updatedUser;

      // Обновляем localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Ошибка при обновлении профиля' };
    }
  }

  // Проверить, авторизован ли пользователь
  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

// Хук для React компонентов
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const result = await AuthService.login(credentials);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const result = await AuthService.register(data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    const result = await AuthService.updateProfile(data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  };
} 