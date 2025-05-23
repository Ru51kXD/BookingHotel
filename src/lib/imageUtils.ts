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

// Градиентные placeholder для разных категорий отелей
export const getCategoryPlaceholder = (category: string, width: number = 400, height: number = 200) => {
  const colors = {
    luxury: { start: '#667eea', end: '#764ba2' },
    business: { start: '#f093fb', end: '#f5576c' },
    budget: { start: '#4facfe', end: '#00f2fe' },
    resort: { start: '#43e97b', end: '#38f9d7' },
    boutique: { start: '#fa709a', end: '#fee140' }
  };

  const categoryColors = colors[category as keyof typeof colors] || colors.luxury;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${categoryColors.start};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${categoryColors.end};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy=".3em">Hotel Image</text>
    </svg>
  `;
  
  try {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  } catch (error) {
    // Fallback на простой цветной блок
    return getSimplePlaceholder(category);
  }
};

// Создание надежного обработчика ошибок изображений
export const createImageErrorHandler = (category: string, width: number = 400, height: number = 200) => {
  return (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    
    // Проверяем, не пытаемся ли мы уже загрузить placeholder
    if (target.src.startsWith('data:image/svg+xml')) {
      console.warn('Placeholder image failed to load, using fallback');
      return;
    }
    
    // Устанавливаем placeholder
    target.src = getCategoryPlaceholder(category, width, height);
    
    // Предотвращаем дальнейшие попытки загрузки
    target.onerror = null;
  };
}; 