import PropTypes from 'prop-types'

export function akamaiLoader({ src, width }) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${src}?imwidth=${width}`
}

akamaiLoader.PropTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
}

export default akamaiLoader
