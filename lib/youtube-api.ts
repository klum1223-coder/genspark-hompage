// 유튜브 채널에서 최신 영상 가져오기
// YouTube Data API v3 사용 (API 키 필요)

const YOUTUBE_CHANNEL_ID = 'UC-주성성결교회채널ID' // 실제 채널 ID로 교체 필요
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || ''

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration: string
  viewCount: string
  url: string
}

// YouTube 최신 영상 가져오기
export async function getLatestSermons(maxResults: number = 12): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API 키가 설정되지 않았습니다.')
    return getMockSermons()
  }

  try {
    // YouTube Data API v3: 채널의 최신 업로드 가져오기
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${YOUTUBE_API_KEY}&` +
      `channelId=${YOUTUBE_CHANNEL_ID}&` +
      `part=snippet&` +
      `order=date&` +
      `maxResults=${maxResults}&` +
      `type=video`,
      { next: { revalidate: 3600 } } // 1시간마다 재검증
    )

    if (!searchResponse.ok) {
      throw new Error('YouTube API 요청 실패')
    }

    const searchData = await searchResponse.json()
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',')

    // 비디오 상세 정보 가져오기
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
      `key=${YOUTUBE_API_KEY}&` +
      `id=${videoIds}&` +
      `part=snippet,contentDetails,statistics`,
      { next: { revalidate: 3600 } }
    )

    if (!videosResponse.ok) {
      throw new Error('YouTube 비디오 정보 요청 실패')
    }

    const videosData = await videosResponse.json()

    return videosData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      duration: formatDuration(item.contentDetails.duration),
      viewCount: item.statistics.viewCount,
      url: `https://www.youtube.com/watch?v=${item.id}`,
    }))
  } catch (error) {
    console.error('YouTube API 에러:', error)
    return getMockSermons()
  }
}

// YouTube 채널 정보 가져오기
export async function getChannelInfo() {
  if (!YOUTUBE_API_KEY) {
    return getMockChannelInfo()
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?` +
      `key=${YOUTUBE_API_KEY}&` +
      `id=${YOUTUBE_CHANNEL_ID}&` +
      `part=snippet,statistics`,
      { next: { revalidate: 86400 } } // 24시간마다 재검증
    )

    if (!response.ok) {
      throw new Error('YouTube 채널 정보 요청 실패')
    }

    const data = await response.json()
    const channel = data.items[0]

    return {
      title: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.high.url,
      subscriberCount: channel.statistics.subscriberCount,
      videoCount: channel.statistics.videoCount,
      viewCount: channel.statistics.viewCount,
    }
  } catch (error) {
    console.error('YouTube 채널 정보 에러:', error)
    return getMockChannelInfo()
  }
}

// ISO 8601 duration을 읽기 쉬운 형식으로 변환
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return '0:00'

  const hours = (match[1] || '').replace('H', '')
  const minutes = (match[2] || '').replace('M', '')
  const seconds = (match[3] || '').replace('S', '')

  const parts = []
  if (hours) parts.push(hours)
  parts.push(minutes.padStart(2, '0') || '00')
  parts.push(seconds.padStart(2, '0') || '00')

  return parts.join(':')
}

// Mock 데이터 (API 키가 없을 때)
function getMockSermons(): YouTubeVideo[] {
  return [
    {
      id: '1',
      title: '20251228 주일예배',
      description: '2024년 마지막 주일 예배',
      thumbnail: 'https://via.placeholder.com/640x360?text=20251228+주일예배',
      publishedAt: '2024-12-28T11:00:00Z',
      duration: '29:39',
      viewCount: '3',
      url: 'https://www.youtube.com/@주성성결교회',
    },
    {
      id: '2',
      title: '20251221 주일예배',
      description: '성탄절 특별 예배',
      thumbnail: 'https://via.placeholder.com/640x360?text=20251221+주일예배',
      publishedAt: '2024-12-21T11:00:00Z',
      duration: '23:46',
      viewCount: '3',
      url: 'https://www.youtube.com/@주성성결교회',
    },
    {
      id: '3',
      title: '20251214 주일예배',
      description: '대강절 셋째 주일',
      thumbnail: 'https://via.placeholder.com/640x360?text=20251214+주일예배',
      publishedAt: '2024-12-14T11:00:00Z',
      duration: '23:12',
      viewCount: '5',
      url: 'https://www.youtube.com/@주성성결교회',
    },
  ]
}

function getMockChannelInfo() {
  return {
    title: '주성성결교회',
    description: '하나님의 사랑으로 함께하는 공동체',
    thumbnail: '',
    subscriberCount: '17',
    videoCount: '118',
    viewCount: '1000',
  }
}
