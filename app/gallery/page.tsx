export const metadata = {
  title: '활동 사진 | 교회 이름',
  description: '우리 교회의 활동 사진을 공유합니다',
}

export default function GalleryPage() {
  // 임시 갤러리 데이터
  const galleries = [
    { id: 1, title: '2024 신년 부흥회', date: '2024.01.15', images: 12 },
    { id: 2, title: '어린이 여름성경학교', date: '2023.08.10', images: 24 },
    { id: 3, title: '가을 수련회', date: '2023.10.20', images: 18 },
    { id: 4, title: '성탄절 축하 행사', date: '2023.12.24', images: 30 },
    { id: 5, title: '청년부 MT', date: '2023.11.05', images: 15 },
    { id: 6, title: '지역 봉사 활동', date: '2023.09.15', images: 20 },
  ]

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-beige py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            활동 사진
          </h1>
          <p className="text-lg text-gray-600">
            함께한 소중한 순간들을 나눕니다
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <article key={gallery.id} className="card overflow-hidden group cursor-pointer">
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/30 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                    📷
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl mb-2">🔍</div>
                      <p className="text-sm">앨범 보기</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{gallery.date}</span>
                    <span className="text-sm bg-beige px-3 py-1 rounded-full text-primary font-medium">
                      {gallery.images}장
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary group-hover:text-primary-light transition-colors">
                    {gallery.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              더 보기
            </button>
          </div>
        </div>
      </section>

      {/* Upload Info */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">
              사진 업로드 안내
            </h2>
            <p className="text-gray-700 mb-6">
              교회 행사나 활동 사진을 공유하고 싶으시면
              <br />
              아래 이메일로 사진을 보내주세요.
            </p>
            <a 
              href="mailto:gallery@church.com"
              className="inline-block btn-primary"
            >
              📧 gallery@church.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
