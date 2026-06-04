import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/home.module.css'

const TABS = ['about', 'writing', 'building']

export default function Home({ tabs, initialTab = 0 }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(initialTab)
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
    router.push('/' + TABS[i])
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
