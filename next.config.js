/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
        AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
        AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME,
    },
    reactStrictMode: true,
    swcMinify: false,
}

module.exports = nextConfig
