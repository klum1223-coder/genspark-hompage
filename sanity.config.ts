import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './lib/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: '교회 홈페이지 CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('콘텐츠 관리')
          .items([
            S.listItem()
              .title('팝업 공지')
              .icon(() => '🔔')
              .child(S.documentTypeList('popup').title('팝업 공지')),
            S.divider(),
            S.listItem()
              .title('교회 사역')
              .icon(() => '⛪')
              .child(S.documentTypeList('ministry').title('교회 사역')),
            S.listItem()
              .title('설교')
              .icon(() => '🎤')
              .child(S.documentTypeList('sermon').title('설교')),
            S.listItem()
              .title('교회 소식')
              .icon(() => '📰')
              .child(S.documentTypeList('news').title('교회 소식')),
            S.listItem()
              .title('사진 앨범')
              .icon(() => '📷')
              .child(S.documentTypeList('album').title('사진 앨범')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
