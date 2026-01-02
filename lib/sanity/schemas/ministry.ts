import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ministry',
  title: '교회 사역',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '사역명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '예배', value: 'worship' },
          { title: '교육', value: 'education' },
          { title: '선교', value: 'mission' },
          { title: '친교', value: 'fellowship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '간단한 소개',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'detailContent',
      title: '상세 내용',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'meetingTime',
      title: '모임 시간',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: '모임 장소',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leader',
      title: '담당자/부장',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contact',
      title: '연락처',
      type: 'string',
      placeholder: '010-1234-5678',
    }),
    defineField({
      name: 'order',
      title: '표시 순서',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: '활성화',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      leader: 'leader',
      isActive: 'isActive',
      media: 'image',
    },
    prepare(selection) {
      const { title, category, leader, isActive, media } = selection
      const status = isActive ? '🟢' : '🔴'
      const categoryMap: Record<string, string> = {
        worship: '예배',
        education: '교육',
        mission: '선교',
        fellowship: '친교',
      }
      
      return {
        title: `${status} ${title}`,
        subtitle: `${categoryMap[category] || category} | ${leader}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: '표시 순서',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: '이름',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
