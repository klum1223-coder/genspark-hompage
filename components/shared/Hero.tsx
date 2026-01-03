'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeroContent {
  title: string
  subtitle: string
  description: string
}

export default function Hero() {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '하나님의 사랑으로\n함께하는 공동체',
    subtitle: '예수 그리스도의 복음으로 세워진',
    description: '생명과 소망이 넘치는 교회'
  })

  useEffect(() => {
    const savedHero = localStorage.getItem('hero_content')
    if (savedHero) {
      setHeroContent(JSON.parse(savedHero))
    }
  }, [])

  // 제목을 \n 기준으로 분리
  const titleParts = heroContent.title.split('\\n')

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary-light overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-beige rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight animate-fade-in">
            {titleParts.map((part, index) => (
              <span key={index}>
                {part}
                {index < titleParts.length - 1 && <br />}
              </span>
            ))}
          </h1>
          
          {/* Sub Message */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-gray-100 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
            {heroContent.subtitle}
            <br className="hidden sm:block" />
            {heroContent.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto animate-fade-in-delay-2">
            <Link 
              href="/about" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-beige hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
            >
              교회 소개
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-4 border-2 border-white bg-transparent text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300 text-center"
            >
              오시는 길
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2 text-white/80">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <svg 
              className="w-6 h-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
