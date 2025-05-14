import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (cookieHeader) {
    const items = cookieHeader.split(';');
    items.forEach((item: string) => {
      const [key, value] = item.split('=');
      cookies[key.trim()] = value?.trim();
    });
  }
  return cookies;
}

export function formateSkills(skill: string) {
  return skill
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
