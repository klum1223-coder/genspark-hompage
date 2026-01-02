import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'popup',
  title: '팝업 공지',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: '내용',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'image',
      title: '이미지 (선택사항)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'linkUrl',
      title: '링크 URL (선택사항)',
      type: 'url',
    }),
    defineField({
      name: 'linkText',
      title: '링크 버튼 텍스트',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: '노출 시작일',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: '노출 종료일',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: '활성화',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: '우선순위 (높을수록 먼저 표시)',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'image',
    },
    prepare(selection) {
      const { title, isActive, startDate, endDate, media } = selection
      const status = isActive ? '🟢 활성' : '🔴 비활성'
      const start = startDate ? new Date(startDate).toLocaleDateString('ko-KR') : ''
      const end = endDate ? new Date(endDate).toLocaleDateString('ko-KR') : ''
      
      return {
        title: `${status} ${title}`,
        subtitle: `${start} ~ ${end}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: '우선순위 (높은순)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: '시작일 (최신순)',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
})
