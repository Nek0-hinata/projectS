'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { StyleProvider } from '@ant-design/cssinjs';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id={'app'} className={`${inter.className} antialiased`}>
        <SessionProvider>
          <StyleProvider hashPriority={'high'}>
            <AntdRegistry>{children}</AntdRegistry>
            <Analytics />
            <SpeedInsights />
          </StyleProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
