// 팝업 쿼리
export const ACTIVE_POPUP_QUERY = `
  *[_type == "popup" && isActive == true && 
    startDate <= now() && endDate >= now()
  ] | order(priority desc, _createdAt desc) [0]
  {
    _id,
    title,
    content,
    "imageUrl": image.asset->url,
    linkUrl,
    linkText,
    startDate,
    endDate,
    priority
  }
`

// 사역 쿼리
export const MINISTRIES_QUERY = `
  *[_type == "ministry" && isActive == true] | order(order asc) {
    _id,
    name,
    category,
    description,
    detailContent,
    "imageUrl": image.asset->url,
    meetingTime,
    location,
    leader,
    contact,
    order
  }
`

export const MINISTRY_BY_CATEGORY_QUERY = `
  *[_type == "ministry" && isActive == true && category == $category] | order(order asc) {
    _id,
    name,
    category,
    description,
    detailContent,
    "imageUrl": image.asset->url,
    meetingTime,
    location,
    leader,
    contact
  }
`

export const MINISTRY_BY_ID_QUERY = `
  *[_type == "ministry" && _id == $id][0] {
    _id,
    name,
    category,
    description,
    detailContent,
    "imageUrl": image.asset->url,
    meetingTime,
    location,
    leader,
    contact
  }
`

// 설교 쿼리
export const SERMONS_QUERY = `
  *[_type == "sermon" && isActive == true] | order(date desc) [0...12] {
    _id,
    title,
    pastor,
    date,
    verse,
    category,
    series,
    summary,
    "thumbnailUrl": thumbnail.asset->url,
    audioUrl,
    videoUrl
  }
`

export const SERMON_BY_ID_QUERY = `
  *[_type == "sermon" && _id == $id][0] {
    _id,
    title,
    pastor,
    date,
    verse,
    category,
    series,
    summary,
    content,
    "thumbnailUrl": thumbnail.asset->url,
    audioUrl,
    videoUrl,
    "attachments": attachments[].asset->url
  }
`

export const RECENT_SERMONS_QUERY = `
  *[_type == "sermon" && isActive == true] | order(date desc) [0...3] {
    _id,
    title,
    pastor,
    date,
    verse,
    "thumbnailUrl": thumbnail.asset->url
  }
`

// 소식 쿼리
export const NEWS_QUERY = `
  *[_type == "news" && isActive == true] | order(date desc) [0...12] {
    _id,
    title,
    category,
    date,
    author,
    excerpt,
    "thumbnailUrl": thumbnail.asset->url,
    isFeatured,
    views
  }
`

export const FEATURED_NEWS_QUERY = `
  *[_type == "news" && isActive == true && isFeatured == true] | order(date desc) [0...3] {
    _id,
    title,
    category,
    date,
    author,
    excerpt,
    "thumbnailUrl": thumbnail.asset->url,
    views
  }
`

export const NEWS_BY_ID_QUERY = `
  *[_type == "news" && _id == $id][0] {
    _id,
    title,
    category,
    date,
    author,
    excerpt,
    content,
    "thumbnailUrl": thumbnail.asset->url,
    views
  }
`

export const RECENT_NEWS_QUERY = `
  *[_type == "news" && isActive == true] | order(date desc) [0...3] {
    _id,
    title,
    category,
    date,
    excerpt,
    "thumbnailUrl": thumbnail.asset->url
  }
`

// 갤러리 쿼리
export const GALLERIES_QUERY = `
  *[_type == "gallery" && isActive == true] | order(date desc) {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images),
    "year": string::split(date, "-")[0]
  }
`

export const GALLERY_BY_ID_QUERY = `
  *[_type == "gallery" && _id == $id][0] {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "images": images[]{
      "url": asset->url,
      "caption": caption,
      "alt": alt
    }
  }
`

export const GALLERIES_BY_CATEGORY_QUERY = `
  *[_type == "gallery" && isActive == true && category == $category] | order(date desc) {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images)
  }
`

export const GALLERIES_BY_YEAR_QUERY = `
  *[_type == "gallery" && isActive == true && date match $year + "*"] | order(date desc) {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images)
  }
`

export const RECENT_GALLERIES_QUERY = `
  *[_type == "gallery" && isActive == true] | order(date desc) [0...6] {
    _id,
    title,
    date,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images)
  }
`

// 앨범 쿼리 (Album schema용)
export const ALBUMS_QUERY = `
  *[_type == "album" && isActive == true] | order(date desc) {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images),
    "year": string::split(date, "-")[0]
  }
`

export const ALBUM_BY_ID_QUERY = `
  *[_type == "album" && _id == $id][0] {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "images": images[]{
      "url": asset->url,
      "caption": caption
    }
  }
`

export const ALBUMS_BY_CATEGORY_QUERY = `
  *[_type == "album" && isActive == true && category == $category] | order(date desc) {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images)
  }
`

export const ALBUMS_BY_YEAR_QUERY = `
  *[_type == "album" && isActive == true && date match $year + "*"] | order(date desc) {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images)
  }
`

export const RECENT_ALBUMS_QUERY = `
  *[_type == "album" && isActive == true] | order(date desc) [0...6] {
    _id,
    title,
    date,
    category,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images)
  }
`
