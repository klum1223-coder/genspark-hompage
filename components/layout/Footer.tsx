import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <span>✝️</span>
              <span>주성성결교회</span>
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              하나님의 사랑과 은혜를<br />
              나누는 신앙 공동체
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  교회 소개
                </Link>
              </li>
              <li>
                <Link 
                  href="/ministry" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  교회 사역
                </Link>
              </li>
              <li>
                <Link 
                  href="/sermon" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  설교
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  교회 소식
                </Link>
              </li>
            </ul>
          </div>

          {/* Worship Times */}
          <div>
            <h3 className="text-lg font-bold mb-4">예배 시간</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>주일 1부 예배: 오전 9:00</li>
              <li>주일 2부 예배: 오전 11:00</li>
              <li>주일 찬양예배: 오후 2:00</li>
              <li>수요 예배: 오후 7:30</li>
              <li>금요 기도회: 오후 7:30</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">연락처</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span>서울시 강남구 테헤란로 123</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📞</span>
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📠</span>
                <span>02-1234-5679</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>✉️</span>
                <span>info@joosungchurch.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-light">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © {currentYear} 주성성결교회. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.youtube.com/@주성성결교회"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="YouTube"
                title="유튜브 채널"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://blog.naver.com/joosung0416"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Naver Blog"
                title="네이버 블로그"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
                </svg>
              </a>
              <a
                href="/admin"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Admin"
                title="관리자 페이지"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
