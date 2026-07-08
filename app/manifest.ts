import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NeedALoanToday',
    short_name: 'NeedALoanToday',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    icons: [
      { src: '/icon.png', sizes: 'any', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: 'any', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
