/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '/'
  },
  env: {
    BACK_EC2: process.env.BACK_EC2,
    KAKAO_LOGIN: process.env.KAKAO_LOGIN,
  },
  api_domain: "http://i6a601.p.ssafy.io"
}

const withImages = require('next-images');

module.exports = nextConfig, withImages;
