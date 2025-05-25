// Утилита для создания placeholder изображений
export const createPlaceholderImage = (width: number = 400, height: number = 200, text: string = 'Hotel') => {
  // Заменяем русские символы на безопасный текст
  const safeText = text.replace(/[^\x00-\x7F]/g, "Hotel");
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">${safeText}</text>
    </svg>
  `;
  
  try {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  } catch (error) {
    // Fallback если btoa не работает
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
};

// Простые цветные блоки как запасной вариант
export const getSimplePlaceholder = (category: string) => {
  const colors = {
    luxury: '#8B5CF6',     // Фиолетовый
    business: '#3B82F6',   // Синий  
    budget: '#10B981',     // Зеленый
    resort: '#F59E0B',     // Оранжевый
    boutique: '#EF4444'    // Красный
  };
  
  const color = colors[category as keyof typeof colors] || colors.luxury;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/></svg>`)}`;
};

// Создание SVG заглушки для отелей
export const createHotelPlaceholder = (width: number = 400, height: number = 300, title: string = 'Hotel') => {
  const colors = [
    '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', 
    '#EC4899', '#EF4444', '#F59E0B', '#10B981',
    '#059669', '#0891B2', '#0284C7', '#7C3AED'
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${randomColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${randomColor}88;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <circle cx="${width/2}" cy="${height/2 - 30}" r="30" fill="white" opacity="0.3"/>
      <rect x="${width/2 - 40}" y="${height/2 - 10}" width="80" height="40" fill="white" opacity="0.3" rx="5"/>
      <text x="50%" y="${height/2 + 40}" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" font-weight="bold">${title}</text>
      <text x="50%" y="${height/2 + 60}" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" opacity="0.8">🏨</text>
    </svg>
  `;
  
  try {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  } catch (error) {
    // Fallback если btoa не работает
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
};

// Создание SVG заглушки для хостелов
export const createHostelPlaceholder = (width: number = 400, height: number = 300, title: string = 'Hostel') => {
  const colors = [
    '#16A34A', '#059669', '#0D9488', '#0891B2',
    '#7C3AED', '#9333EA', '#C026D3', '#DB2777'
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${randomColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${randomColor}66;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect x="${width/2 - 25}" y="${height/2 - 35}" width="20" height="30" fill="white" opacity="0.3" rx="2"/>
      <rect x="${width/2}" y="${height/2 - 35}" width="20" height="30" fill="white" opacity="0.4" rx="2"/>
      <rect x="${width/2 + 25}" y="${height/2 - 35}" width="20" height="30" fill="white" opacity="0.3" rx="2"/>
      <rect x="${width/2 - 30}" y="${height/2 - 5}" width="60" height="8" fill="white" opacity="0.3" rx="4"/>
      <text x="50%" y="${height/2 + 40}" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" font-weight="bold">${title}</text>
      <text x="50%" y="${height/2 + 60}" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" opacity="0.8">🏠</text>
    </svg>
  `;
  
  try {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  } catch (error) {
    // Fallback если btoa не работает
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
};

// Получение заглушки по категории
export const getCategoryPlaceholder = (category: string, width: number = 400, height: number = 300, name?: string) => {
  const title = name || category;
  
  switch (category.toLowerCase()) {
    case 'hostel':
    case 'hostels':
    case 'budget':
      return createHostelPlaceholder(width, height, title);
    case 'hotel':
    case 'hotels':
    case 'luxury':
    case 'business':
    case 'boutique':
    case 'resort':
    default:
      return createHotelPlaceholder(width, height, title);
  }
};

// Создание обработчика ошибок изображений
export const createImageErrorHandler = (category: string, width: number = 400, height: number = 300, name?: string) => {
  return (event: any) => {
    if (event.target) {
      event.target.src = getCategoryPlaceholder(category, width, height, name);
    }
  };
}; 