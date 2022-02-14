/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://ondobucket.s3.ap-northeast-2.amazonaws.com/static'
  },
  env: {
    BACK_EC2: process.env.BACK_EC2,
    KAKAO_LOGIN: process.env.KAKAO_LOGIN,
  }
}

const withImages = require('next-images');

module.exports = nextConfig, withImages;
