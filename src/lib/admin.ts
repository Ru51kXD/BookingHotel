export interface PartnerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  propertyType: string;
  location: string;
  rooms: string;
  experience: string;
  message: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface GiftCardPurchase {
  id: string;
  purchaserId: string;
  purchaserEmail: string;
  cardType: string;
  amount: number;
  recipientName: string;
  recipientEmail: string;
  message: string;
  giftCardCode: string;
  purchasedAt: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface OfferUsage {
  id: string;
  userId: string;
  userEmail: string;
  offerCode: string;
  offerTitle: string;
  discountAmount: number;
  orderAmount: number;
  usedAt: string;
  hotelName?: string;
}

// Получение заявок партнеров
export const getPartnerApplications = (): PartnerApplication[] => {
  const stored = localStorage.getItem('partner_applications');
  return stored ? JSON.parse(stored) : [];
};

// Добавление заявки партнера
export const addPartnerApplication = (application: Omit<PartnerApplication, 'id' | 'submittedAt' | 'status'>): PartnerApplication => {
  const applications = getPartnerApplications();
  const newApplication: PartnerApplication = {
    ...application,
    id: `app_${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };
  
  applications.push(newApplication);
  localStorage.setItem('partner_applications', JSON.stringify(applications));
  return newApplication;
};

// Обновление статуса заявки
export const updateApplicationStatus = (id: string, status: PartnerApplication['status']): void => {
  const applications = getPartnerApplications();
  const index = applications.findIndex(app => app.id === id);
  if (index !== -1) {
    applications[index].status = status;
    localStorage.setItem('partner_applications', JSON.stringify(applications));
  }
};

// Получение покупок сертификатов
export const getGiftCardPurchases = (): GiftCardPurchase[] => {
  const stored = localStorage.getItem('gift_card_purchases');
  return stored ? JSON.parse(stored) : [];
};

// Добавление покупки сертификата
export const addGiftCardPurchase = (purchase: Omit<GiftCardPurchase, 'id' | 'purchasedAt' | 'status'>): GiftCardPurchase => {
  const purchases = getGiftCardPurchases();
  const newPurchase: GiftCardPurchase = {
    ...purchase,
    id: `purchase_${Date.now()}`,
    purchasedAt: new Date().toISOString(),
    status: 'completed'
  };
  
  purchases.push(newPurchase);
  localStorage.setItem('gift_card_purchases', JSON.stringify(purchases));
  return newPurchase;
};

// Получение использований предложений
export const getOfferUsages = (): OfferUsage[] => {
  const stored = localStorage.getItem('offer_usages');
  return stored ? JSON.parse(stored) : [];
};

// Добавление использования предложения
export const addOfferUsage = (usage: Omit<OfferUsage, 'id' | 'usedAt'>): OfferUsage => {
  const usages = getOfferUsages();
  const newUsage: OfferUsage = {
    ...usage,
    id: `usage_${Date.now()}`,
    usedAt: new Date().toISOString()
  };
  
  usages.push(newUsage);
  localStorage.setItem('offer_usages', JSON.stringify(usages));
  return newUsage;
}; 