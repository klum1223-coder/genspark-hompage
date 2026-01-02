export default function Hero() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-light overflow-hidden mt-20">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Optional: Background Image */}
      {/* <Image 
        src="/images/hero-bg.jpg" 
        alt="Church Background"
        fill
        className="object-cover"
        priority
      /> */}

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            하나님의 사랑으로<br />
            <span className="text-beige">함께하는 공동체</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
            예수 그리스도의 복음으로 세워진<br />
            생명과 소망이 넘치는 교회
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/about" 
              className="btn-primary bg-white text-primary hover:bg-beige w-full sm:w-auto text-center"
            >
              교회 소개
            </a>
            <a 
              href="/contact" 
              className="btn-secondary border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary w-full sm:w-auto text-center"
            >
              오시는 길
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-white" 
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
    </section>
  )
}
