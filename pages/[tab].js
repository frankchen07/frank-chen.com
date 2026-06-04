import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import Home from '../components/Home'

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

export default function Page({ tabs, initialTab }) {
  return <Home tabs={tabs} initialTab={initialTab} />
}

export async function getStaticPaths() {
  return {
    paths: TABS.map(tab => ({ params: { tab } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
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

  return {
    props: {
      tabs,
      initialTab: TABS.indexOf(params.tab),
    },
  }
}
