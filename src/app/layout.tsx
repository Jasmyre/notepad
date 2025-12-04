import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "Notepad",
	description: "Simple notepad made with typescript nextjs",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en" suppressHydrationWarning>
			<body>
				<TRPCReactProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						disableTransitionOnChange
						enableSystem
					>
						{children}
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
