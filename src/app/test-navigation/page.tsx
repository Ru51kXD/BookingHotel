'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestNavigationPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `${timestamp}: ${message}`]);
  };

  const testDestinations = [
    { name: 'Париж', id: 1 },
    { name: 'Токио', id: 2 },
    { name: 'Нью-Йорк', id: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Тест навигации</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Тестовые ссылки */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Тестовые ссылки</h2>
            
            <div className="space-y-4">
              <Link href="/destinations">
                <button 
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => addLog('Клик: Все направления')}
                >
                  Посмотреть все направления
                </button>
              </Link>

              {testDestinations.map(dest => (
                <Link key={dest.id} href={`/hotels?city=${encodeURIComponent(dest.name)}`}>
                  <button 
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => addLog(`Клик: Отели в ${dest.name}`)}
                  >
                    Отели в {dest.name}
                  </button>
                </Link>
              ))}

              <Link href="/hotels">
                <button 
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  onClick={() => addLog('Клик: Все отели')}
                >
                  Все отели
                </button>
              </Link>

              <a href="#footer">
                <button 
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => addLog('Клик: Якорь к футеру')}
                >
                  Перейти к футеру (якорь)
                </button>
              </a>
            </div>
          </div>

          {/* Логи */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Логи навигации</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-sm bg-gray-100 p-2 rounded">
                  {log}
                </div>
              ))}
            </div>
            <button 
              onClick={() => setLogs([])}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Очистить логи
            </button>
          </div>
        </div>

        {/* Информация о текущем URL */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Информация о странице</h2>
          <p><strong>Текущий URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Загрузка...'}</p>
          <p><strong>Pathname:</strong> {typeof window !== 'undefined' ? window.location.pathname : 'Загрузка...'}</p>
          <p><strong>Search:</strong> {typeof window !== 'undefined' ? window.location.search : 'Загрузка...'}</p>
        </div>

        {/* Тестовый футер */}
        <div id="footer" className="mt-16 bg-gray-800 text-white p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Тестовый футер</h2>
          <p>Если вы попали сюда после клика на кнопку "Посмотреть", значит есть проблема с навигацией.</p>
        </div>
      </div>
    </div>
  );
} 