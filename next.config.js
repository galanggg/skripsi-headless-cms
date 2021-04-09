const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const optimizedImages = require('next-optimized-images')
const allowedImageWordPressDomain = new URL(
  process.env.NEXT_PUBLIC_WORDPRESS_URL,
).hostname

//Tailwind
const withSass = require('@zeit/next-sass')
const tailwindCss = require('tailwindcss')

module.exports = withPlugins([[optimizedImages], withImages()])
module.exports = {
  images: {
    domains: [allowedImageWordPressDomain],
  },
}
