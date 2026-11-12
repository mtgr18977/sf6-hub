const https = require('node:https')
const fs = require('node:fs')
const path = require('node:path')

const SOURCE_ROOT = 'https://sf6combo.kagewebsite.com/'
const OFFICIAL_UPDATE_DATE = '2026-10-13'
const SNAPSHOT_DATE = new Date().toISOString().slice(0, 10)
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sf6-community-combos.js')

const CHARACTERS = [
  { id: 'aki', name: 'A.K.I.' },
  { id: 'akuma', name: 'Akuma' },
  { id: 'alex', name: 'Alex' },
  { id: 'arjun', name: 'Arjun' },
  { id: 'blanka', name: 'Blanka' },
  { id: 'c-viper', name: 'C.Viper' },
  { id: 'cammy', name: 'Cammy' },
  { id: 'chun-li', name: 'Chun-Li' },
  { id: 'deejay', name: 'Dee Jay' },
  { id: 'dhalsim', name: 'Dhalsim' },
  { id: 'e-honda', name: 'E. Honda' },
  { id: 'ed', name: 'Ed' },
  { id: 'elena', name: 'Elena' },
  { id: 'guile', name: 'Guile' },
  { id: 'ingrid', name: 'Ingrid' },
  { id: 'jamie', name: 'Jamie' },
  { id: 'jp', name: 'JP' },
  { id: 'juri', name: 'Juri' },
  { id: 'ken', name: 'Ken' },
  { id: 'kimberly', name: 'Kimberly' },
  { id: 'lily', name: 'Lily' },
  { id: 'luke', name: 'Luke' },
  { id: 'm-bison', name: 'M. Bison' },
  { id: 'mai', name: 'Mai' },
  { id: 'manon', name: 'Manon' },
  { id: 'marisa', name: 'Marisa' },
  { id: 'rashid', name: 'Rashid' },
  { id: 'ryu', name: 'Ryu' },
  { id: 'sagat', name: 'Sagat' },
  { id: 'terry', name: 'Terry' },
  { id: 'yasmine', name: 'Yasmine' },
  { id: 'zangief', name: 'Zangief' },
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function fetchText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      { headers: { 'user-agent': 'SF6Hub-data-attribution/1.0' } },
      (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          response.resume()
          if (redirects >= 4) return reject(new Error(`Too many redirects for ${url}`))
          const redirectUrl = new URL(response.headers.location, url).toString()
          return resolve(fetchText(redirectUrl, redirects + 1))
        }

        if (response.statusCode !== 200) {
          response.resume()
          return reject(new Error(`HTTP ${response.statusCode} for ${url}`))
        }

        const chunks = []
        response.on('data', (chunk) => chunks.push(chunk))
        response.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
        response.on('error', reject)
      },
    )

    request.setTimeout(15000, () => request.destroy(new Error(`Timeout fetching ${url}`)))
    request.on('error', reject)
  })
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
}

function textFromHtml(value) {
  return decodeHtml(value.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeCharacter(value) {
  return value.toLowerCase().replace(/\bcombo\b/gi, '').replace(/[^a-z0-9]/g, '')
}

function extractCharacterPages(homeHtml) {
  const pages = new Map()
  const links = homeHtml.matchAll(/<a\b[^>]*href=["']([^"']*combos-[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)

  for (const [, href, labelHtml] of links) {
    const label = textFromHtml(labelHtml)
    const key = normalizeCharacter(label)
    const character = CHARACTERS.find((entry) => normalizeCharacter(entry.name) === key)
    if (character && !pages.has(character.id)) {
      pages.set(character.id, new URL(href, SOURCE_ROOT).toString())
    }
  }

  return pages
}

function parseDate(value) {
  const match = value.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (!match) return null
  const [, month, day, year] = match
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function formatDatePt(value) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value
}

function countSourceCards(html) {
  return [...html.matchAll(/<(?:div|li|article)\b[^>]*id=[\"']combo-(\d+)[\"'][^>]*>/gi)].length
}

function parseCards(html, character, pageUrl) {
  const starts = [...html.matchAll(/<(?:div|li|article)\b[^>]*id=[\"']combo-(\d+)[\"'][^>]*>/gi)]
  return starts.map((match, index) => {
    const start = match.index
    const end = starts[index + 1]?.index ?? html.length
    const card = html.slice(start, end)
    const authorBlock = card.match(/<span\b[^>]*class=["'][^"']*author[^"']*["'][^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? ''
    const author = textFromHtml(authorBlock.match(/<strong\b[^>]*>([\s\S]*?)<\/strong>/i)?.[1] ?? '')
    const dateText = textFromHtml(authorBlock.match(/<item\b[^>]*dateCreated[^>]*>([\s\S]*?)<\/item>/i)?.[1] ?? '')
    const sourceDateDisplay = dateText.replace(/^\(?Added on\s*/i, '').replace(/\)?$/, '').trim()
    const sourceDate = parseDate(sourceDateDisplay)
    const sourceDateDisplayPt = sourceDate ? formatDatePt(sourceDate) : sourceDateDisplay
    const notationHtml = card.match(/<p\b[^>]*class=["'][^"']*comboTxt[^"']*["'][^>]*>([\s\S]*?)(?:<\/p>|<\/div>)/i)?.[1] ?? ''
    const notation = textFromHtml(notationHtml)
    const badgesHtml = card.match(/<p\b[^>]*class=["'][^"']*comboBadges[^"']*["'][^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? ''
    const badges = [...badgesHtml.matchAll(/<span\b[^>]*class=["'][^"']*badge[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi)]
      .map((badge) => textFromHtml(badge[1]))
    const hitCount = Number(badges.find((badge) => /\bhits?\b/i.test(badge))?.match(/\d+/)?.[0]) || null
    const damage = Number(badges.find((badge) => /\bdamages?\b/i.test(badge))?.match(/[\d,]+/)?.[0]?.replace(/,/g, '')) || null
    const sourceId = Number(match[1])

    if (!notation || !author || !sourceDate) return null

    const patchStatus = sourceDate >= OFFICIAL_UPDATE_DATE
      ? 'post-update-date-patch-unconfirmed'
      : 'pre-update-patch-unknown'
    const flags = ['PUNISH COUNTER', 'COUNTER HIT', 'DRIVE RUSH', 'DRIVE IMPACT', 'JUMP', 'AIR', 'ON BLOCKED']
      .filter((flag) => notation.toUpperCase().includes(flag))
    const situationEn = flags.length ? flags.join(' · ') : 'Community-submitted route'
    const situationPt = flags.length ? flags.join(' · ') : 'Rota enviada pela comunidade'
    const damageTextPt = damage ? `${damage} de dano` : 'dano não informado'
    const damageTextEn = damage ? `${damage} damage` : 'damage not reported'
    const hitsTextPt = hitCount ? `${hitCount} golpes` : 'contagem de golpes não informada'
    const hitsTextEn = hitCount ? `${hitCount} hits` : 'hit count not reported'

    return {
      id: `kage-${sourceId}`,
      starter: { 'pt-BR': 'Não informado na fonte', en: 'Not reported by source' },
      combo: { 'pt-BR': `Rota comunitária #${sourceId}`, en: `Community route #${sourceId}` },
      notation,
      damage: damage ? String(damage) : '—',
      difficulty: { 'pt-BR': 'Sem classificação', en: 'Unrated' },
      situation: { 'pt-BR': situationPt, en: situationEn },
      notes: {
        'pt-BR': `Enviado por ${author} em ${sourceDateDisplayPt}; ${hitsTextPt}; ${damageTextPt}. Patch não informado e não validado em jogo.`,
        en: `Submitted by ${author} on ${sourceDateDisplay}; ${hitsTextEn}; ${damageTextEn}. Patch not stated and not verified in-game.`, 
      },
      sourceUrl: pageUrl,
      sourceAuthor: author,
      sourceDate,
      sourceDateDisplay,
      sourceDateDisplayPt,
      sourceId,
      sourceHitCount: hitCount,
      sourceDamage: damage,
      sourcePatchStatus: patchStatus,
      sourceCheckedAt: SNAPSHOT_DATE,
      verificationStatus: 'community-unverified',
    }
  }).filter(Boolean)
}

async function main() {
  const homeHtml = await fetchText(SOURCE_ROOT)
  const sourcePages = extractCharacterPages(homeHtml)
  const characters = {}
  const routes = {}
  const errors = []

  for (const character of CHARACTERS) {
    await delay(180)
    const pageUrl = sourcePages.get(character.id)
    if (!pageUrl) {
      characters[character.id] = {
        url: SOURCE_ROOT,
        checkedAt: SNAPSHOT_DATE,
        status: 'character-page-not-found',
        publishedRouteCount: 0,
        importedRouteCount: 0,
        latestSourceDate: null,
      }
      errors.push(`${character.id}: no character page link on source homepage`)
      continue
    }

    try {
      const html = await fetchText(pageUrl)
      const publishedRouteCount = countSourceCards(html)
      const parsedRoutes = parseCards(html, character, pageUrl)
        .sort((a, b) => (b.sourceDate || '').localeCompare(a.sourceDate || '') || b.sourceId - a.sourceId)
      const selectedRoute = parsedRoutes[0] ?? null

      characters[character.id] = {
        url: pageUrl,
        checkedAt: SNAPSHOT_DATE,
        status: selectedRoute ? 'submission-found' : publishedRouteCount === 0 ? 'no-submissions' : 'parse-incomplete',
        publishedRouteCount,
        importedRouteCount: selectedRoute ? 1 : 0,
        latestSourceDate: selectedRoute?.sourceDate ?? null,
        parsedRouteCount: parsedRoutes.length,
      }

      if (selectedRoute) routes[character.id] = [selectedRoute]
      if (!selectedRoute && publishedRouteCount > 0) errors.push(`${character.id}: page reports ${publishedRouteCount} routes but none parsed`)
    } catch (error) {
      characters[character.id] = {
        url: pageUrl,
        checkedAt: SNAPSHOT_DATE,
        status: 'fetch-error',
        publishedRouteCount: null,
        importedRouteCount: 0,
        latestSourceDate: null,
      }
      errors.push(`${character.id}: ${error.message}`)
    }
  }

  const output = {
    sourceName: 'Street Fighter 6 Combo Database (community submissions)',
    sourceUrl: SOURCE_ROOT,
    checkedAt: SNAPSHOT_DATE,
    officialUpdateDate: OFFICIAL_UPDATE_DATE,
    policy: 'One latest dated community route per character is imported with author and source URL. Source submissions are not presented as in-game verified; patch version is not supplied by the source.',
    characters,
    routes,
  }

  fs.writeFileSync(OUTPUT_PATH, `const SF6_COMMUNITY_COMBOS = ${JSON.stringify(output, null, 2)};\n`)
  const summary = {
    output: OUTPUT_PATH,
    charactersChecked: Object.keys(characters).length,
    pagesWithSubmissions: Object.values(characters).filter((entry) => entry.status === 'submission-found').length,
    pagesWithoutSubmissions: Object.values(characters).filter((entry) => entry.status === 'no-submissions').length,
    routesImported: Object.values(routes).reduce((count, entries) => count + entries.length, 0),
    errors,
  }
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`)
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`)
  process.exitCode = 1
})
