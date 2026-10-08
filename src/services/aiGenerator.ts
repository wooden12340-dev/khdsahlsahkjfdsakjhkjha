import { SiteData, ThemeStyle, ColorPalette } from '../types/site';
import { parseDocumentToSiteData } from '../utils/documentParser';

export interface GenerateResult {
  data: SiteData;
  source: 'ai' | 'smart-heuristic';
  message?: string;
}

export async function generateSiteFromMaterial(
  documentText: string,
  options: {
    siteGoal?: string;
    themeStyle?: ThemeStyle;
    colorPalette?: ColorPalette;
    useAiFirst?: boolean;
  } = {}
): Promise<GenerateResult> {
  const { siteGoal, themeStyle = 'modern-saas', colorPalette = 'indigo', useAiFirst = true } = options;

  if (useAiFirst) {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentText,
          siteGoal,
          colorTheme: colorPalette,
        }),
      });

      if (response.ok) {
        const rawJson = await response.json();
        if (rawJson && rawJson.hero && rawJson.siteTitle) {
          const formatted: SiteData = {
            siteTitle: rawJson.siteTitle || '문서 기반 생성 사이트',
            brandName: rawJson.brandName || '브랜드',
            tagline: rawJson.tagline || '핵심 가치 제안',
            category: rawJson.category || '웹사이트',
            themeStyle: themeStyle,
            colorPalette: colorPalette,
            hero: {
              badge: rawJson.hero?.badge || '✨ 2026 최신 자료 기반 사이트',
              headline: rawJson.hero?.headline || rawJson.siteTitle,
              subheadline: rawJson.hero?.subheadline || '원문 내용을 바탕으로 재구성되었습니다.',
              primaryCta: rawJson.hero?.primaryCta || '자세히 보기',
              secondaryCta: rawJson.hero?.secondaryCta || '상세 자료 보기',
              highlights: rawJson.hero?.highlights || [],
            },
            overview: {
              title: rawJson.overview?.title || '개요 및 핵심 요약',
              summary: rawJson.overview?.summary || '',
              keyTakeaways: rawJson.overview?.keyTakeaways || [],
            },
            features: rawJson.features || [],
            deepDives: rawJson.deepDives || [],
            metrics: rawJson.metrics || [],
            timelineOrSteps: rawJson.timelineOrSteps || [],
            pricingOrTiers: rawJson.pricingOrTiers || [],
            testimonialsOrQuotes: rawJson.testimonialsOrQuotes || [],
            faqs: rawJson.faqs || [],
            contact: {
              title: rawJson.contact?.title || '문의 및 참여 안내',
              description: rawJson.contact?.description || '언제든 문의해 주시기 바랍니다.',
              ctaText: rawJson.contact?.ctaText || '문의하기',
              email: rawJson.contact?.email || 'contact@example.com',
              phone: rawJson.contact?.phone || '02-1234-5678',
              address: rawJson.contact?.address || '서울특별시 강남구 테헤란로',
            },
            footer: {
              copyright: rawJson.footer?.copyright || `© 2026 ${rawJson.brandName || 'Doc2Site'}. All rights reserved.`,
              note: rawJson.footer?.note || '제공된 원본 자료를 바탕으로 생성된 사이트입니다.',
            },
            visibleSections: {
              hero: true,
              overview: true,
              features: (rawJson.features?.length ?? 0) > 0,
              deepDives: (rawJson.deepDives?.length ?? 0) > 0,
              metrics: (rawJson.metrics?.length ?? 0) > 0,
              timeline: (rawJson.timelineOrSteps?.length ?? 0) > 0,
              pricing: (rawJson.pricingOrTiers?.length ?? 0) > 0,
              testimonials: (rawJson.testimonialsOrQuotes?.length ?? 0) > 0,
              faqs: (rawJson.faqs?.length ?? 0) > 0,
              contact: true,
            },
          };

          return {
            data: formatted,
            source: 'ai',
            message: 'Gemini 3.8 Flash 인공지능이 자료를 심층 분석하여 웹사이트를 생성했습니다.',
          };
        }
      }
    } catch (e) {
      console.warn('AI API call failed or timed out, falling back to smart heuristic parser', e);
    }
  }

  // Graceful fallback to Smart Heuristic Parser
  const parsed = parseDocumentToSiteData(documentText, {
    themeStyle,
    colorPalette,
    goal: siteGoal,
  });

  return {
    data: parsed,
    source: 'smart-heuristic',
    message: '스마트 파서가 원문의 문맥과 구조를 고속 분석하여 웹사이트를 구성했습니다.',
  };
}
