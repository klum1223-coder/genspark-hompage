// 팝업 데이터 - 나중에 CMS로 대체 가능
export interface PopupData {
  id: string
  title: string
  content: string
  image?: string
  linkUrl?: string
  linkText?: string
  isActive: boolean
  startDate?: string
  endDate?: string
}

// 현재 활성 팝업 데이터 (하드코딩)
export const activePopup: PopupData = {
  id: 'popup_2024_new_year',
  title: '2024년 새해 부흥회 안내',
  content: `
    <div class="space-y-4">
      <p class="text-gray-700 leading-relaxed">
        새해를 맞이하여 은혜로운 부흥회를 개최합니다.<br />
        모든 성도님들의 많은 참여를 부탁드립니다.
      </p>
      
      <div class="bg-beige p-4 rounded-lg space-y-2">
        <p><strong class="text-primary">📅 일시:</strong> 2024년 1월 15일(월) ~ 17일(수)</p>
        <p><strong class="text-primary">⏰ 시간:</strong> 매일 저녁 7시 30분</p>
        <p><strong class="text-primary">📍 장소:</strong> 본당 대예배실</p>
        <p><strong class="text-primary">🎤 강사:</strong> 김은혜 목사 (서울중앙교회)</p>
      </div>

      <p class="text-sm text-gray-600 italic">
        새해의 영적 각성과 부흥의 시간이 되시기를 기도합니다.
      </p>
    </div>
  `,
  image: '/images/popup-revival.jpg', // 이미지 경로 (선택사항)
  linkUrl: '/news',
  linkText: '자세히 보기',
  isActive: true,
  startDate: '2024-01-01',
  endDate: '2024-01-20',
}

// 팝업 표시 여부 확인 함수
export const shouldShowPopup = (popupId: string): boolean => {
  if (typeof window === 'undefined') return false
  
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const storageKey = `popup_hidden_${today}`
  const hiddenPopups = localStorage.getItem(storageKey)
  
  if (!hiddenPopups) return true
  
  try {
    const hiddenList = JSON.parse(hiddenPopups)
    return !hiddenList.includes(popupId)
  } catch {
    return true
  }
}

// 팝업 숨김 처리 함수
export const hidePopupForToday = (popupId: string): void => {
  if (typeof window === 'undefined') return
  
  const today = new Date().toISOString().split('T')[0]
  const storageKey = `popup_hidden_${today}`
  const hiddenPopups = localStorage.getItem(storageKey)
  
  let hiddenList: string[] = []
  
  if (hiddenPopups) {
    try {
      hiddenList = JSON.parse(hiddenPopups)
    } catch {
      hiddenList = []
    }
  }
  
  if (!hiddenList.includes(popupId)) {
    hiddenList.push(popupId)
    localStorage.setItem(storageKey, JSON.stringify(hiddenList))
  }
}

// 오래된 팝업 데이터 정리 (선택사항)
export const cleanupOldPopupData = (): void => {
  if (typeof window === 'undefined') return
  
  const today = new Date()
  const keys = Object.keys(localStorage)
  
  keys.forEach(key => {
    if (key.startsWith('popup_hidden_')) {
      const dateStr = key.replace('popup_hidden_', '')
      const storedDate = new Date(dateStr)
      const daysDiff = Math.floor((today.getTime() - storedDate.getTime()) / (1000 * 60 * 60 * 24))
      
      // 7일 이상 된 데이터 삭제
      if (daysDiff > 7) {
        localStorage.removeItem(key)
      }
    }
  })
}
