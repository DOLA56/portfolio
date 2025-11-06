import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Luka Dolidze - Étudiant en cybersécurité',
	description:
		'Bienvenue sur mon portfolio ! Je suis étudiant en cybersécurité passionné par le développement web, l’IoT et la sécurité informatique. Je cherche une alternance pour septembre 2025.',
	keywords: [
		'Cybersécurité',
		'Développement Web',
		'ESP32',
		'IoT',
		'HTML',
		'CSS',
		'JavaScript',
		'React',
		'Next.js',
		'API .NET',
		'BLE',
		'FlexDesk',
		'Luka Dolidze',
	],
	authors: [{ name: 'Luka Dolidze' }],
	creator: 'Luka Dolidze',
	openGraph: {
		title: 'Luka Dolidze - Portfolio Cybersécurité',
		description: 'Étudiant passionné par la cybersécurité, le développement web et les projets techniques modernes.',
		url: 'https://your-domain.com',
		siteName: 'Portfolio Luka Dolidze',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Portfolio Luka Dolidze',
			},
		],
		locale: 'fr_FR',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Luka Dolidze - Étudiant en cybersécurité',
		description: 'Portfolio de Luka Dolidze, étudiant en cybersécurité passionné par le développement et l’IoT.',
		creator: '@yourusername',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
