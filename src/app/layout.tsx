import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Lichess Tournament Perfs",
    description: "A website for querying a user's Lichess tournament performances",
    applicationName: "lichess-tournament-perfs",
    authors: {name: "qpwoeirut"},
    keywords: ["lichess", "tournament", "rankings", "chess", "variants", "titles"],
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
