'use client'

import { useEffect, useState } from 'react'

interface ChurchInfo {
  name: string
  englishName: string
  phone: string
  email: string
  address: string
  addressDetail: string
}

export default function StructuredData() {
  const [churchInfo, setChurchInfo] = useState<ChurchInfo>({
    name: '주성성결교회',
    englishName: 'Joosung Holiness Church',
    phone: '010-8986-3965',
    email: 'klum3@naver.com',
    address: '충북 청주시 흥덕구 봉명로219번길 24',
    addressDetail: '2층'
  })

  useEffect(() => {
    const stored = localStorage.getItem('church_info')
    if (stored) {
      try {
        setChurchInfo(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to load church info:', error)
      }
    }
  }, [])

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: churchInfo.name,
    alternateName: churchInfo.englishName,
    url: 'https://joosungchurch.com',
    logo: 'https://joosungchurch.com/logo.png',
    image: 'https://joosungchurch.com/og-image.jpg',
    description: '하나님의 사랑으로 함께하는 공동체 - 주성성결교회',
    telephone: churchInfo.phone,
    email: churchInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${churchInfo.address} ${churchInfo.addressDetail}`,
      addressLocality: '청주시',
      addressRegion: '충청북도',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.6424,
      longitude: 127.4890,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:45',
        closes: '12:00',
        description: '주일 예배',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '13:00',
        closes: '14:00',
        description: '성장이 있는 소모임',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '06:30',
        closes: '07:30',
        description: '새벽 예배',
      },
    ],
    sameAs: [
      'https://www.youtube.com/@주성성결교회',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}
