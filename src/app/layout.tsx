import "./globals.css";

export const metadata = {
    title: "CosmoQuiz",
    description: "A quiz app for the Cosmo community.",
};

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={inter.style}>{children}</body>
        </html>
    );
}
