import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import Link from "next/link"
import { FaEnvelope, FaGithub } from "react-icons/fa"
import "./globals.css"

const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-outfit",
	display: "swap",
})

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-inter",
	display: "swap",
})

export const metadata: Metadata = {
	metadataBase: new URL(process.env.SITE_URL || "https://jarediscoding.com"),
	title: "Jared Is Coding",
	description: "Jared is a software developer creating exceptional digital solutions across web and app platforms.",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "Jared Is Coding",
		description:
			"Jared is a software developer creating exceptional digital solutions across web and app platforms.",
		url: "https://jarediscoding.com",
		siteName: "Jared Is Coding",
		images: [
			{
				url: "/images/favicon.ico",
				width: 64,
				height: 64,
				alt: "Jared Is Coding Icon",
			},
		],
		locale: "en_US",
		type: "website",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={`${outfit.variable} ${inter.variable}`}>
			<body className="layout-wrapper">
				<header>
					<div className="header-container">
						<Link href="/" className="logo-link">
							JaredIs<span>Coding</span>
						</Link>
						<nav>
							<Link href="/" className="nav-link">
								Home
							</Link>
						</nav>
					</div>
				</header>

				<main className="container animate-fade-in">{children}</main>

				<footer>
					<a
						href="mailto:jared@jarediscoding.com?subject=Inquiry from Website JaredIsCoding.com"
						target="_blank"
						rel="noopener noreferrer"
						className="footer-icon"
						title="Send me an email">
						<FaEnvelope size="1.2em" title="Send me an email" />
					</a>
					<a
						href="https://github.com/Jared-Is-Coding"
						target="_blank"
						rel="noopener noreferrer"
						className="footer-icon"
						title="Find me on GitHub.com">
						<FaGithub size="1.2em" title="Find me on GitHub.com" />
					</a>
				</footer>
			</body>
		</html>
	)
}
