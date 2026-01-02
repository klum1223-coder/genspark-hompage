// Sanity 문서 타입 정의

export interface SanityPopup {
  _id: string
  title: string
  content: any[] // Portable Text
  imageUrl?: string
  linkUrl?: string
  linkText?: string
  startDate: string
  endDate: string
  priority: number
}

export interface SanityMinistry {
  _id: string
  name: string
  category: '예배' | '교육' | '선교' | '친교' | '기타'
  description: string
  details?: string
  imageUrl?: string
  meetingTime: string
  meetingPlace: string
  leader: string
  contact?: string
  order: number
}

export interface SanitySermon {
  _id: string
  title: string
  pastor: string
  date: string
  verse: string
  category: '주일 설교' | '수요 설교' | '특별 설교'
  series?: string
  summary?: string
  content?: any[] // Portable Text
  thumbnailUrl?: string
  audioUrl?: string
  videoUrl?: string
  attachments?: string[]
}

export interface SanityNews {
  _id: string
  title: string
  category: '공지' | '행사' | '소식'
  date: string
  author: string
  excerpt: string
  content: any[] // Portable Text
  thumbnailUrl?: string
  isFeatured: boolean
  views: number
}

export interface SanityAlbum {
  _id: string
  title: string
  date: string
  category: '예배' | '행사' | '선교' | '교육' | '친교'
  description?: string
  coverImageUrl: string
  imageCount: number
  year?: string
  images?: {
    url: string
    caption?: string
  }[]
}

// Gallery 타입 (기존 gallery 스키마용)
export interface SanityGallery {
  _id: string
  title: string
  date: string
  category: '예배' | '행사' | '선교' | '교육' | '친교'
  description?: string
  coverImageUrl: string
  imageCount: number
  year?: string
  images?: {
    url: string
    caption?: string
    alt?: string
  }[]
}
