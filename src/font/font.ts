import { Inter, Space_Grotesk, Poppins } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: '--font-poppins',
  display: 'swap',
}); 