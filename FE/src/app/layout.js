import './globals.css'

import PropTypes from 'prop-types'

import { Providers } from '@/components'

export const metadata = {
  title: 'LenSights - AI-Driven Credit Risk & Insurance Management',
  description: 'AI-Driven Credit Risk & Insurance Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.isRequired,
}
