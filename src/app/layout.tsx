import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wall Calendar',
  description: 'Interactive wall calendar with date range selection and notes',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}