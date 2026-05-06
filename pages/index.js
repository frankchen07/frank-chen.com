import { useState, useEffect } from 'react'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import styles from '../styles/home.module.css'

const TABS = ['about', 'writing', 'building']

function parseSections(content) {
  const parts = content.split(/\n(?=## )/)
  const sectionParts = parts.filter(p => p.startsWith('## '))
  if (sectionParts.length === 0) return null
  return sectionParts.map(part => {
    const newlineIdx = part.indexOf('\n')
    const label = newlineIdx === -1 ? part.slice(3) : part.slice(3, newlineIdx).trim()
    const body = newlineIdx === -1 ? '' : part.slice(newlineIdx + 1).trim()
    return { label, body }
  })
}

export default function Home({ tabs }) {
  const [activeTab, setActiveTab] = useState(0)
  const [activeItem, setActiveItem] = useState(0)
  const [hintDismissed, setHintDismissed] = useState(false)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveTab(i => Math.max(0, i - 1))
        setActiveItem(0)
      }
      if (e.key === 'ArrowRight') {
        setActiveTab(i => Math.min(TABS.length - 1, i + 1))
        setActiveItem(0)
      }
      if (e.key === 'ArrowUp') {
        setActiveItem(i => Math.max(0, i - 1))
      }
      if (e.key === 'ArrowDown') {
        const sections = tabs[activeTab].sections
        if (sections) setActiveItem(i => Math.min(sections.length - 1, i + 1))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeTab, tabs])

  const currentTab = tabs[activeTab]
  const sections = currentTab.sections

  function handleItemClick(i) {
    setActiveItem(i)
    setHintDismissed(true)
  }

  function handleTabClick(i) {
    setActiveTab(i)
    setActiveItem(0)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>frank chen</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <h1 className={styles.name}>frank chen</h1>

      <nav className={styles.tabRow}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`${styles.tab} ${i === activeTab ? styles.tabActive : ''}`}
            onClick={() => handleTabClick(i)}
            aria-selected={i === activeTab}
          >
            {i === activeTab && <span className={styles.cursor}>❯</span>}
            {tab}
          </button>
        ))}
      </nav>

      {sections ? (
        <>
          <ul className={styles.itemList}>
            {sections.map((section, i) => (
              <li
                key={section.label}
                className={`${styles.item} ${i === activeItem ? styles.itemActive : ''}`}
                onClick={() => handleItemClick(i)}
              >
                <span className={styles.itemCursor}>
                  {i === activeItem ? '❯' : ' '}
                </span>
                {section.label}
                {i === activeItem && <span className={styles.itemBlink}>_</span>}
              </li>
            ))}
          </ul>

          {!hintDismissed && (
            <p className={styles.mobileHint}>tap to explore</p>
          )}

          <div className={styles.divider} />

          <div
            className={styles.detail}
            dangerouslySetInnerHTML={{ __html: sections[activeItem].html }}
          />
        </>
      ) : (
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: currentTab.html }}
        />
      )}

      <div className={styles.scrollHint}>↓</div>
    </div>
  )
}

export async function getStaticProps() {
  const tabsDir = path.join(process.cwd(), 'content', 'tabs')

  const processBody = async (body) => {
    const processed = await remark().use(html).process(body)
    return processed.toString()
  }

  const tabs = await Promise.all(
    TABS.map(async (tab) => {
      const fullPath = path.join(tabsDir, `${tab}.md`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { content } = matter(fileContents)

      const rawSections = parseSections(content)
      if (rawSections) {
        const sections = await Promise.all(
          rawSections.map(async ({ label, body }) => ({
            label,
            html: await processBody(body),
          }))
        )
        return { sections }
      }

      return { html: await processBody(content) }
    })
  )

  return { props: { tabs } }
}
