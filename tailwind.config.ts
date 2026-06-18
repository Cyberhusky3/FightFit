import type { Config } from 'tailwindcss';
const config: Config = { darkMode: ['class'], content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'], theme: { extend: { colors: { background: '#07080c', card: '#11131a', border: '#232633', primary: '#a3ff12', ring: '#a3ff12' }, borderRadius: { xl: '1rem', '2xl': '1.25rem' }, boxShadow: { glow: '0 0 40px rgba(163,255,18,.18)' } } }, plugins: [] };
export default config;
