import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://westwoodbangkok.com'),
  title: {
    default: 'Westwood Restaurant Bangkok | Premium European Dining',
    template: '%s | Westwood Restaurant Bangkok',
  },
  description: 'Westwood Restaurant — premium European dining in the heart of Bangkok. Exceptional food, craft cocktails and warm Thai hospitality. Reserve your table today.',
  keywords: ['Westwood Restaurant', 'Bangkok restaurant', 'European restaurant Bangkok', 'fine dining Bangkok', 'restaurant Bangkok'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://westwoodbangkok.com',
    siteName: 'Westwood Restaurant Bangkok',
    title: 'Westwood Restaurant Bangkok | Premium European Dining',
    description: 'Premium European dining in the heart of Bangkok. Exceptional cuisine, craft cocktails, and warm Thai hospitality.',
    images: [{ url: '/images/dish-lamb-chops.webp', width: 768, height: 1024, alt: 'Westwood Restaurant Bangkok' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Westwood Restaurant Bangkok',
    description: 'Premium European dining in the heart of Bangkok.',
    images: ['/images/dish-lamb-chops.webp'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://westwoodbangkok.com' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Westwood Restaurant',
  description: 'Premium European dining in the heart of Bangkok.',
  url: 'https://westwoodbangkok.com',
  telephone: '+66-62-242-0044',
  email: 'info@westwoodbangkok.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bangkok',
    addressLocality: 'Bangkok',
    addressCountry: 'TH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.7103552,
    longitude: 100.5119635,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday'], opens: '11:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday','Saturday'], opens: '11:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '10:00', closes: '22:00' },
  ],
  servesCuisine: ['European', 'International'],
  priceRange: '฿฿฿',
  hasMap: 'https://www.google.com/maps/place/Westwood+Restaurant/@13.7103552,100.5119635,17z',
  image: 'https://westwoodbangkok.com/images/dish-lamb-chops.webp',
  sameAs: [
    'https://facebook.com/westwoodbangkok',
    'https://instagram.com/westwoodbangkok',
    'https://tiktok.com/@westwoodbangkok',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
