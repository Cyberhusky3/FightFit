import './globals.css';import type { Metadata } from 'next';import { Nav } from '@/components/nav';
export const metadata:Metadata={title:'FightFit AI',description:'The Duolingo for martial arts and fitness beginners.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className="dark"><body><Nav/>{children}</body></html>}
