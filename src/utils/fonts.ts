import { Cairo, Poppins } from 'next/font/google';

export const poppins = Poppins({
    display: 'swap',
    subsets: ['latin'],
    weight: '400',
});

export const cairo = Cairo({
    display: 'swap',
    subsets: ['latin'],
});