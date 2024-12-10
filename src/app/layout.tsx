import "~/app/globals.css";
import { Metadata } from "next";
import { Providers } from "~/app/providers";

const appUrl = process.env.NEXT_PUBLIC_URL;

export const metadata: Metadata = {
  title: "POD Play v2",
  description: "A Farcaster Frames v2 demo app",
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: `${appUrl}/icon.png`,
      buttons: [
        {
          label: "Play game",
          action: {
            type: "post_redirect",
            url: "https://podplayv2demo.vercel.app/"
          }
        },
        {
          label: "Open Warpcast",
          action: {
            type: "post_redirect",
            url: "https://warpcast.com/~/compose"
          }
        },
        {
          label: "Add Frame",
          action: {
            type: "post",
            url: `${appUrl}/api/frame/add`
          }
        }
      ]
    })
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md px-4">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}