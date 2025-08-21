import App from './App'
import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
      <App />
    </StaticRouter>
  )
}