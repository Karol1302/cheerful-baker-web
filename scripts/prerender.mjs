import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { render } from '../dist/server/entry-server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

const routes = [
  {
    url: '/',
    title: 'Pierniczki KiM – R\u0119cznie dekorowane pierniczki na zam\u00f3wienie',
    description: 'Pierniczki KiM – r\u0119cznie dekorowane pierniczki na zam\u00f3wienie na \u015bwi\u0119ta, urodziny i inne okazje.'
  },
  {
    url: '/gallery',
    title: 'Galeria pierniczk\u00f3w – Pierniczki KiM',
    description: 'Zobacz galeri\u0119 dekorowanych pierniczk\u00f3w.'
  },
  {
    url: '/sets',
    title: 'Oferta pierniczk\u00f3w – Pierniczki KiM',
    description: 'Aktualna oferta zestaw\u00f3w pierniczk\u00f3w na r\u00f3\u017cne okazje.'
  },
  {
    url: '/contact',
    title: 'Kontakt – Pierniczki KiM',
    description: 'Skontaktuj si\u0119, aby zam\u00f3wi\u0107 r\u0119cznie dekorowane pierniczki.'
  }
]

for (const { url, title, description } of routes) {
  const appHtml = render(url)
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  html = html.replace(/<title>.*<\/title>/, `<title>${title}<\/title>`)
  html = html.replace(/<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${description.replace(/"/g, '&quot;')}"`)
  const filePath = path.join(distDir, url === '/' ? 'index.html' : `${url.slice(1)}.html`)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, html)
}

console.log('Prerendering complete.')