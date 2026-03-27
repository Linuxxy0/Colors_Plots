import type { Language, LocalizedText } from '@/types/app';

export function t(text: LocalizedText, language: Language) {
  return text[language];
}
