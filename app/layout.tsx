'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { StyleProvider } from '@ant-design/cssinjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StyleProvider hashPriority={'high'}>
          <AntdRegistry>{children}</AntdRegistry>
        </StyleProvider>
      </body>
    </html>
  );
}
