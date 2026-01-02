import { PortableText as PortableTextReact, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'

// Portable Text 컴포넌트 스타일 정의
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-primary">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-6 mb-3 text-primary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-5 mb-3 text-primary-light">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed text-gray-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-primary">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || ''
      const isExternal = href.startsWith('http')
      
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            {children}
          </a>
        )
      }
      
      return (
        <Link
          href={href}
          className="text-primary hover:text-primary-light underline transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      
      return (
        <div className="my-8">
          <Image
            src={value.asset.url}
            alt={value.alt || '이미지'}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-gray-500 text-center mt-2">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
}

interface PortableTextProps {
  value: any
  className?: string
}

export default function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) return null
  
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
}
