/** @type {import('next').NextConfig} */

const path = require('path')
const webpack = require('webpack')

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  reactStrictMode: true,
  swcMinify: true,
  env: {},
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.ddev.site',
        // port: '',
        // pathname: '',
      },
    ],
    // domains: ['example.ddev.site']
  },
  webpack: (config, { dev, isServer })=>{
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    })

    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        React: 'react',
      })
    )

    if (!isServer){
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      }
    }

    return config
  },
  trailingSlash: false, // for exportPathMap
}

module.exports = nextConfig
