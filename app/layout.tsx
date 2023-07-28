
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { Flex, Box, Image, Text } from "@chakra-ui/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "SPS Project"
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
