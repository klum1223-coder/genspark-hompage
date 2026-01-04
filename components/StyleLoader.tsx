'use client'

import { useEffect } from 'react'

interface SiteStyles {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  fontSize: string
  sectionSpacing: string
  borderRadius: string
  customCSS: string
}

export default function StyleLoader() {
  useEffect(() => {
    const loadStyles = () => {
      const savedStyles = localStorage.getItem('site_styles')
      if (savedStyles) {
        try {
          const styles: SiteStyles = JSON.parse(savedStyles)
          applyStyles(styles)
        } catch (error) {
          console.error('Failed to load styles:', error)
        }
      }
    }

    const applyStyles = (styles: SiteStyles) => {
      const root = document.documentElement
      root.style.setProperty('--primary-color', styles.primaryColor)
      root.style.setProperty('--secondary-color', styles.secondaryColor)
      root.style.setProperty('--bg-color', styles.backgroundColor)
      root.style.setProperty('--text-color', styles.textColor)
      root.style.setProperty('--font-size', styles.fontSize + 'px')
      root.style.setProperty('--section-spacing', styles.sectionSpacing + 'px')
      root.style.setProperty('--border-radius', styles.borderRadius + 'px')
      
      // 커스텀 CSS 적용
      let styleElement = document.getElementById('custom-css')
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'custom-css'
        document.head.appendChild(styleElement)
      }
      styleElement.textContent = styles.customCSS
    }

    loadStyles()
  }, [])

  return null
}
