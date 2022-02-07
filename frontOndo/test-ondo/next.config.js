/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KAKAO_LOGIN: process.env.KAKAO_LOGIN,
    BACK_EC2: process.env.BACK_EC2
  }
}

const withImages = require('next-images');

module.exports = nextConfig, withImages;
