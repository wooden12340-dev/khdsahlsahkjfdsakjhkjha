export interface HeroData {
  badge?: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta?: string;
  highlights?: string[];
}

export interface OverviewData {
  title: string;
  summary: string;
  keyTakeaways: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  highlight?: string;
}

export interface DeepDiveTab {
  tabTitle: string;
  heading: string;
  content: string;
  bulletPoints: string[];
}

export interface MetricItem {
  label: string;
  value: string;
  description: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactData {
  title: string;
  description: string;
  ctaText: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface FooterData {
  copyright: string;
  note?: string;
}

export type ThemeStyle = 'modern-saas' | 'editorial' | 'portfolio' | 'academic' | 'cyberpunk';
export type ColorPalette = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose' | 'slate';

export interface SiteData {
  siteTitle: string;
  brandName: string;
  tagline: string;
  category?: string;
  themeStyle: ThemeStyle;
  colorPalette: ColorPalette;
  hero: HeroData;
  overview: OverviewData;
  features: FeatureItem[];
  deepDives: DeepDiveTab[];
  metrics: MetricItem[];
  timelineOrSteps: TimelineStep[];
  pricingOrTiers: PricingTier[];
  testimonialsOrQuotes: TestimonialItem[];
  faqs: FaqItem[];
  contact: ContactData;
  footer: FooterData;
  visibleSections: {
    hero: boolean;
    overview: boolean;
    features: boolean;
    deepDives: boolean;
    metrics: boolean;
    timeline: boolean;
    pricing: boolean;
    testimonials: boolean;
    faqs: boolean;
    contact: boolean;
  };
}

export interface SampleMaterial {
  id: string;
  title: string;
  badge: string;
  category: string;
  summary: string;
  themeStyle: ThemeStyle;
  colorPalette: ColorPalette;
  rawText: string;
  presetData: SiteData;
}
