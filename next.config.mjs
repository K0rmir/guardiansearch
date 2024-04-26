/** @type {import('next').NextConfig} */
const nextConfig = {    
        images: {
            domains: ['static.guim.co.uk', 'media.guim.co.uk' ],
          remotePatterns: [
            {
              protocol: 'https',
              hostname: '**',
              port: '',

            },
          ],
        },
      }


export default nextConfig;
