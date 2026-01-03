// 콘텐츠 관리를 위한 유틸리티 함수들

export interface NewsItem {
  id: string
  category: '공지' | '행사' | '소식'
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  views: number
  image?: string
}

export interface PrayerItem {
  id: string
  author: string
  title: string
  content: string
  category: '개인' | '가정' | '건강' | '직장' | '교회' | '기타'
  date: string
  prayCount: number
  isPrivate: boolean
}

export interface MinistryItem {
  id: string
  name: string
  category: '예배' | '교육' | '선교' | '친교' | '기타'
  description: string
  details: string
  meetingTime: string
  meetingPlace: string
  leader: string
  contact?: string
  image?: string
}

export interface GalleryAlbum {
  id: string
  title: string
  description: string
  category: '예배' | '행사' | '선교' | '교육' | '친교'
  date: string
  year: number
  coverImage?: string
  images: string[]
}

// 뉴스 관리
export const newsStorage = {
  getAll: (): NewsItem[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem('church_news')
    return data ? JSON.parse(data) : []
  },
  
  save: (news: NewsItem[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('church_news', JSON.stringify(news))
  },
  
  add: (item: Omit<NewsItem, 'id' | 'date' | 'views'>) => {
    const all = newsStorage.getAll()
    const newItem: NewsItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      views: 0,
    }
    all.unshift(newItem)
    newsStorage.save(all)
    return newItem
  },
  
  update: (id: string, item: Partial<NewsItem>) => {
    const all = newsStorage.getAll()
    const index = all.findIndex(n => n.id === id)
    if (index !== -1) {
      all[index] = { ...all[index], ...item }
      newsStorage.save(all)
    }
  },
  
  delete: (id: string) => {
    const all = newsStorage.getAll()
    const filtered = all.filter(n => n.id !== id)
    newsStorage.save(filtered)
  },
}

// 기도요청 관리
export const prayerStorage = {
  getAll: (): PrayerItem[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem('church_prayers')
    return data ? JSON.parse(data) : []
  },
  
  save: (prayers: PrayerItem[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('church_prayers', JSON.stringify(prayers))
  },
  
  add: (item: Omit<PrayerItem, 'id' | 'date' | 'prayCount'>) => {
    const all = prayerStorage.getAll()
    const newItem: PrayerItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      prayCount: 0,
    }
    all.unshift(newItem)
    prayerStorage.save(all)
    return newItem
  },
  
  incrementPray: (id: string) => {
    const all = prayerStorage.getAll()
    const index = all.findIndex(p => p.id === id)
    if (index !== -1) {
      all[index].prayCount += 1
      prayerStorage.save(all)
    }
  },
  
  delete: (id: string) => {
    const all = prayerStorage.getAll()
    const filtered = all.filter(p => p.id !== id)
    prayerStorage.save(filtered)
  },
}

// 사역 관리
export const ministryStorage = {
  getAll: (): MinistryItem[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem('church_ministries')
    return data ? JSON.parse(data) : []
  },
  
  save: (ministries: MinistryItem[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('church_ministries', JSON.stringify(ministries))
  },
  
  add: (item: Omit<MinistryItem, 'id'>) => {
    const all = ministryStorage.getAll()
    const newItem: MinistryItem = {
      ...item,
      id: Date.now().toString(),
    }
    all.push(newItem)
    ministryStorage.save(all)
    return newItem
  },
  
  update: (id: string, item: Partial<MinistryItem>) => {
    const all = ministryStorage.getAll()
    const index = all.findIndex(m => m.id === id)
    if (index !== -1) {
      all[index] = { ...all[index], ...item }
      ministryStorage.save(all)
    }
  },
  
  delete: (id: string) => {
    const all = ministryStorage.getAll()
    const filtered = all.filter(m => m.id !== id)
    ministryStorage.save(filtered)
  },
}

// 갤러리 관리
export const galleryStorage = {
  getAll: (): GalleryAlbum[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem('church_gallery')
    return data ? JSON.parse(data) : []
  },
  
  save: (albums: GalleryAlbum[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('church_gallery', JSON.stringify(albums))
  },
  
  add: (item: Omit<GalleryAlbum, 'id'>) => {
    const all = galleryStorage.getAll()
    const newItem: GalleryAlbum = {
      ...item,
      id: Date.now().toString(),
    }
    all.unshift(newItem)
    galleryStorage.save(all)
    return newItem
  },
  
  update: (id: string, item: Partial<GalleryAlbum>) => {
    const all = galleryStorage.getAll()
    const index = all.findIndex(a => a.id === id)
    if (index !== -1) {
      all[index] = { ...all[index], ...item }
      galleryStorage.save(all)
    }
  },
  
  delete: (id: string) => {
    const all = galleryStorage.getAll()
    const filtered = all.filter(a => a.id !== id)
    galleryStorage.save(filtered)
  },
}

// 이미지를 Base64로 변환
export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
