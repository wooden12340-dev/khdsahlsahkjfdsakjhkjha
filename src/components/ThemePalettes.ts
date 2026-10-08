import { ColorPalette, ThemeStyle } from '../types/site';

export interface ThemeConfig {
  accentBg: string;
  accentText: string;
  accentBorder: string;
  accentHoverBg: string;
  accentBadgeBg: string;
  accentBadgeText: string;
  accentGradient: string;
  glowShadow: string;
}

export const COLOR_THEMES: Record<ColorPalette, ThemeConfig> = {
  indigo: {
    accentBg: 'bg-indigo-600',
    accentText: 'text-indigo-400',
    accentBorder: 'border-indigo-500/40',
    accentHoverBg: 'hover:bg-indigo-500',
    accentBadgeBg: 'bg-indigo-950/80',
    accentBadgeText: 'text-indigo-300',
    accentGradient: 'from-indigo-500 to-cyan-400',
    glowShadow: 'shadow-indigo-500/20',
  },
  emerald: {
    accentBg: 'bg-emerald-600',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-500/40',
    accentHoverBg: 'hover:bg-emerald-500',
    accentBadgeBg: 'bg-emerald-950/80',
    accentBadgeText: 'text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-400',
    glowShadow: 'shadow-emerald-500/20',
  },
  violet: {
    accentBg: 'bg-violet-600',
    accentText: 'text-violet-400',
    accentBorder: 'border-violet-500/40',
    accentHoverBg: 'hover:bg-violet-500',
    accentBadgeBg: 'bg-violet-950/80',
    accentBadgeText: 'text-violet-300',
    accentGradient: 'from-violet-500 to-fuchsia-400',
    glowShadow: 'shadow-violet-500/20',
  },
  amber: {
    accentBg: 'bg-amber-600',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-500/40',
    accentHoverBg: 'hover:bg-amber-500',
    accentBadgeBg: 'bg-amber-950/80',
    accentBadgeText: 'text-amber-300',
    accentGradient: 'from-amber-500 to-orange-400',
    glowShadow: 'shadow-amber-500/20',
  },
  rose: {
    accentBg: 'bg-rose-600',
    accentText: 'text-rose-400',
    accentBorder: 'border-rose-500/40',
    accentHoverBg: 'hover:bg-rose-500',
    accentBadgeBg: 'bg-rose-950/80',
    accentBadgeText: 'text-rose-300',
    accentGradient: 'from-rose-500 to-pink-400',
    glowShadow: 'shadow-rose-500/20',
  },
  slate: {
    accentBg: 'bg-slate-700',
    accentText: 'text-slate-300',
    accentBorder: 'border-slate-500/40',
    accentHoverBg: 'hover:bg-slate-600',
    accentBadgeBg: 'bg-slate-800',
    accentBadgeText: 'text-slate-200',
    accentGradient: 'from-slate-400 to-zinc-200',
    glowShadow: 'shadow-slate-500/20',
  },
};

export const STYLE_FONTS: Record<ThemeStyle, { headingFont: string; bodyFont: string; containerBg: string }> = {
  'modern-saas': {
    headingFont: 'font-sans font-bold tracking-tight',
    bodyFont: 'font-sans',
    containerBg: 'bg-[#090b10] text-neutral-100',
  },
  editorial: {
    headingFont: 'font-serif font-normal tracking-tight',
    bodyFont: 'font-sans',
    containerBg: 'bg-[#0d0c0b] text-[#ede8e1]',
  },
  portfolio: {
    headingFont: 'font-sans font-extrabold tracking-tighter',
    bodyFont: 'font-sans',
    containerBg: 'bg-[#090812] text-neutral-100',
  },
  academic: {
    headingFont: 'font-sans font-semibold tracking-tight',
    bodyFont: 'font-sans',
    containerBg: 'bg-[#060e0a] text-neutral-100',
  },
  cyberpunk: {
    headingFont: 'font-mono font-bold tracking-tight uppercase',
    bodyFont: 'font-sans',
    containerBg: 'bg-[#080806] text-amber-50',
  },
};
