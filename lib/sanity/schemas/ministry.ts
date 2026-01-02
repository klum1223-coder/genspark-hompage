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
          { title: '예배', value: '예배' },
          { title: '교육', value: '교육' },
          { title: '선교', value: '선교' },
          { title: '친교', value: '친교' },
          { title: '기타', value: '기타' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '간단한 소개',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'details',
      title: '상세 설명',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'meetingTime',
      title: '모임 시간',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meetingPlace',
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
      
      return {
        title: `${status} ${title}`,
        subtitle: `${category} | ${leader}`,
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
