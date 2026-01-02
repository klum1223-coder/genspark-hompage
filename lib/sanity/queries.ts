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
    details,
    "imageUrl": image.asset->url,
    meetingTime,
    meetingPlace,
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
    details,
    "imageUrl": image.asset->url,
    meetingTime,
    meetingPlace,
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

// 앨범 쿼리
export const ALBUMS_QUERY = `
  *[_type == "album" && isActive == true] | order(date desc) {
    _id,
    title,
    date,
    category,
    description,
    "coverImageUrl": coverImage.asset->url,
    "imageCount": count(images),
    "year": dateTime(date).year
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
