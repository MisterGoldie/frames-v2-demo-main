import "~/app/globals.css";
import { Metadata } from "next";
import { Providers } from "~/app/providers";

const appUrl = process.env.NEXT_PUBLIC_URL;

export const metadata: Metadata = {
  title: "POD Play v2",
  description: "A Farcaster Frames v2 demo app",
  other: {
    'fc:frame': JSON.stringify({
      version: "next",
      imageUrl: `${appUrl}/opengraph-image`,
      button: {
        title: "Launch POD Play",
        action: {
          type: "launch_frame",
          name: "POD Play v2",
          url: `${appUrl}`,
          splashImageUrl: `${appUrl}/splash.png`,
          splashBackgroundColor: "#f7f7f7"
        }
      }
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