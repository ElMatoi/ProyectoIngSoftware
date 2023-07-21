import React from 'react';

export const metadata = {
  title: 'Elki Magic',
  description: 'Reservas Elki Magic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://i.postimg.cc/6qFmZsMk/logo-elkimagic-06.png"
        />
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
