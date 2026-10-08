import React, { useState } from 'react';
import {
  SiteData,
  FeatureItem,
  DeepDiveTab,
  MetricItem,
  TimelineStep,
  PricingTier,
  FaqItem,
} from '../types/site';
import { COLOR_THEMES, STYLE_FONTS } from './ThemePalettes';
import {
  Check,
  ChevronDown,
  ArrowRight,
  Search,
  ExternalLink,
  Send,
  Zap,
  Shield,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  Calendar,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from 'lucide-react';

interface LiveWebsiteViewProps {
  siteData: SiteData;
  isEditMode: boolean;
  onUpdateSiteData: (newData: SiteData) => void;
}

export const LiveWebsiteView: React.FC<LiveWebsiteViewProps> = ({
  siteData,
  isEditMode,
  onUpdateSiteData,
}) => {
  const theme = COLOR_THEMES[siteData.colorPalette] || COLOR_THEMES.indigo;
  const fontStyle = STYLE_FONTS[siteData.themeStyle] || STYLE_FONTS['modern-saas'];

  // Interactive states
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [featureCategory, setFeatureCategory] = useState<string>('전체');
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);
  const [interactiveTabDemo, setInteractiveTabDemo] = useState<'preview' | 'flow' | 'raw'>('preview');

  // Contact form submission
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Helper for inline text edits
  const handleTextChange = (path: string[], value: string) => {
    const copy = JSON.parse(JSON.stringify(siteData));
    let cur = copy;
    for (let i = 0; i < path.length - 1; i++) {
      cur = cur[path[i]];
    }
    cur[path[path.length - 1]] = value;
    onUpdateSiteData(copy);
  };

  // Editable text wrapper
  const EditableText = ({
    value,
    path,
    className = '',
    as = 'span',
  }: {
    value: string;
    path: string[];
    className?: string;
    as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  }) => {
    if (!isEditMode) {
      const Tag = as;
      return <Tag className={className}>{value}</Tag>;
    }

    return (
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={e => handleTextChange(path, e.currentTarget.textContent || '')}
        className={`${className} outline-none ring-1 ring-amber-500/80 bg-amber-500/10 rounded px-1 cursor-text hover:bg-amber-500/20 transition-colors inline-block`}
        title="클릭하여 텍스트 직접 수정"
      >
        {value}
      </span>
    );
  };

  // Filter features
  const uniqueCategories = ['전체', ...Array.from(new Set(siteData.features.map(f => f.category || '기타')))];
  const filteredFeatures = siteData.features.filter(
    f => featureCategory === '전체' || (f.category || '기타') === featureCategory
  );

  // Filter FAQs
  const filteredFaqs = siteData.faqs.filter(
    f =>
      f.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4500);
  };

  return (
    <div className={`min-h-screen ${fontStyle.containerBg} ${fontStyle.bodyFont} transition-colors duration-200 selection:bg-indigo-600 selection:text-white`}>
      {/* 1. Global Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${theme.accentBg}`} />
            <span className={`text-lg font-bold tracking-tight text-white ${fontStyle.headingFont}`}>
              <EditableText value={siteData.brandName} path={['brandName']} />
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-neutral-400 font-medium">
            {siteData.visibleSections.overview && (
              <a href="#overview" className="hover:text-white transition-colors">
                개요
              </a>
            )}
            {siteData.visibleSections.features && (
              <a href="#features" className="hover:text-white transition-colors">
                특징
              </a>
            )}
            {siteData.visibleSections.deepDives && (
              <a href="#deep-dives" className="hover:text-white transition-colors">
                심층 분석
              </a>
            )}
            {siteData.visibleSections.metrics && (
              <a href="#metrics" className="hover:text-white transition-colors">
                지표
              </a>
            )}
            {siteData.visibleSections.pricing && (
              <a href="#pricing" className="hover:text-white transition-colors">
                요금제
              </a>
            )}
            {siteData.visibleSections.faqs && (
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            {siteData.visibleSections.contact && (
              <a
                href="#contact"
                className={`px-4 py-2 text-xs font-bold rounded-lg text-white ${theme.accentBg} ${theme.accentHoverBg} transition-all shadow-sm`}
              >
                <EditableText value={siteData.hero.primaryCta} path={['hero', 'primaryCta']} />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      {siteData.visibleSections.hero && (
        <section className="relative pt-20 pb-24 px-6 border-b border-neutral-800/80 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-4xl mx-auto text-center">
            {/* Category/Badge without pill slop: subtle top kicker */}
            {siteData.hero.badge && (
              <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-5 flex items-center justify-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.accentBg}`} />
                <EditableText value={siteData.hero.badge} path={['hero', 'badge']} />
              </div>
            )}

            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6 ${fontStyle.headingFont}`}>
              <EditableText value={siteData.hero.headline} path={['hero', 'headline']} />
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              <EditableText value={siteData.hero.subheadline} path={['hero', 'subheadline']} />
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <a
                href="#contact"
                className={`px-6 py-3.5 rounded-xl font-bold text-sm text-white ${theme.accentBg} ${theme.accentHoverBg} transition-all shadow-lg ${theme.glowShadow} flex items-center gap-2`}
              >
                <EditableText value={siteData.hero.primaryCta} path={['hero', 'primaryCta']} />
                <ArrowRight className="w-4 h-4" />
              </a>

              {siteData.hero.secondaryCta && (
                <a
                  href="#overview"
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-all"
                >
                  <EditableText value={siteData.hero.secondaryCta} path={['hero', 'secondaryCta']} />
                </a>
              )}
            </div>

            {/* Key highlights (Anti-pill: rendered with subtle bullets) */}
            {siteData.hero.highlights && siteData.hero.highlights.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-400">
                {siteData.hero.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className={theme.accentText}>✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Hero Showcase Widget */}
            <div className="mt-14 max-w-3xl mx-auto rounded-2xl bg-neutral-900/90 border border-neutral-800 text-left overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="ml-2 text-[11px] font-mono text-neutral-400">
                    {siteData.brandName.toLowerCase()}.app/preview
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-md text-[10px] text-neutral-400">
                  <button
                    onClick={() => setInteractiveTabDemo('preview')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${interactiveTabDemo === 'preview' ? 'bg-neutral-800 text-white' : ''}`}
                  >
                    대시보드
                  </button>
                  <button
                    onClick={() => setInteractiveTabDemo('flow')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${interactiveTabDemo === 'flow' ? 'bg-neutral-800 text-white' : ''}`}
                  >
                    아키텍처
                  </button>
                </div>
              </div>

              <div className="p-6">
                {interactiveTabDemo === 'preview' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                      <div className="text-neutral-400">
                        실시간 데이터 상태: <span className="text-emerald-400 font-semibold">정상 동기화됨</span>
                      </div>
                      <div className="text-[11px] text-neutral-500">최근 업데이트: 방금 전</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {siteData.metrics.slice(0, 3).map((m, i) => (
                        <div key={i} className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
                          <div className={`text-xl font-bold ${theme.accentText}`}>{m.value}</div>
                          <div className="text-[11px] text-neutral-400 font-medium truncate mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                      💡 원본 자료의 통계와 핵심 지표가 인터랙티브 레이아웃으로 실시간 시각화된 상태입니다.
                    </p>
                  </div>
                ) : (
                  <div className="font-mono text-xs text-neutral-300 space-y-2">
                    <div className="text-neutral-500">// 시스템 파이프라인 구성도</div>
                    <div className="text-emerald-400">$ connect --source "원본 자료" --target "{siteData.brandName}"</div>
                    <div className="text-neutral-400">✔ 자료 파싱 및 의미 구조화 완료 (0.42s)</div>
                    <div className="text-neutral-400">✔ {siteData.features.length}개 핵심 기능 인덱싱 완료</div>
                    <div className="text-neutral-400">✔ 반응형 웹 인터페이스 렌더링 준비 완료</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Overview Section */}
      {siteData.visibleSections.overview && (
        <section id="overview" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800/80">
          <div className="max-w-3xl">
            <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-6 ${fontStyle.headingFont}`}>
              <EditableText value={siteData.overview.title} path={['overview', 'title']} />
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed mb-10 font-normal">
              <EditableText value={siteData.overview.summary} path={['overview', 'summary']} />
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {siteData.overview.keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3 hover:border-neutral-700 transition-colors"
              >
                <span className={`${theme.accentText} font-bold text-base mt-0.5`}>0{idx + 1}</span>
                <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{takeaway}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Features Grid Section with Filter Tabs */}
      {siteData.visibleSections.features && (
        <section id="features" className="py-20 px-6 max-w-6xl mx-auto border-b border-neutral-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
                CORE CAPABILITIES
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold text-white ${fontStyle.headingFont}`}>
                핵심 기능 및 특징
              </h2>
            </div>

            {/* Category Filter Controls */}
            {uniqueCategories.length > 2 && (
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
                {uniqueCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFeatureCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      featureCategory === cat
                        ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feat, idx) => (
              <div
                key={feat.id || idx}
                className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-neutral-400 font-mono">0{idx + 1}</span>
                    {feat.highlight && (
                      <span className={`text-[11px] font-semibold ${theme.accentText}`}>
                        {feat.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2.5 group-hover:text-white transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                {feat.category && (
                  <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                    {feat.category}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Deep Dives Interactive Tabs */}
      {siteData.visibleSections.deepDives && siteData.deepDives.length > 0 && (
        <section id="deep-dives" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800/80">
          <div className="mb-10">
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
              DEEP DIVE
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-white ${fontStyle.headingFont}`}>
              심층 아키텍처 및 세부 실행안
            </h2>
          </div>

          {/* Tab selectors */}
          <div className="flex border-b border-neutral-800 gap-6 text-sm font-semibold mb-8 overflow-x-auto">
            {siteData.deepDives.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDeepDiveTab(idx)}
                className={`pb-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeDeepDiveTab === idx
                    ? `${theme.accentText} border-current`
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.tabTitle}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {siteData.deepDives[activeDeepDiveTab] && (
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
              <h3 className="text-xl font-bold text-white">
                {siteData.deepDives[activeDeepDiveTab].heading}
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {siteData.deepDives[activeDeepDiveTab].content}
              </p>

              <div className="space-y-3 pt-4 border-t border-neutral-800">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  핵심 포인트
                </div>
                {siteData.deepDives[activeDeepDiveTab].bulletPoints.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <span className={`${theme.accentText} mt-0.5`}>•</span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 6. Metrics & Stats Section */}
      {siteData.visibleSections.metrics && siteData.metrics.length > 0 && (
        <section id="metrics" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center hover:border-neutral-700 transition-colors"
              >
                <div className={`text-3xl sm:text-4xl font-black mb-2 ${theme.accentText}`}>
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mb-1">{m.label}</div>
                <div className="text-[11px] text-neutral-400">{m.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Timeline / Roadmap Steps */}
      {siteData.visibleSections.timeline && siteData.timelineOrSteps.length > 0 && (
        <section id="timeline" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800/80">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
              EXECUTION ROADMAP
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-white ${fontStyle.headingFont}`}>
              단계별 실행 일정 및 프로세스
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteData.timelineOrSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 relative flex flex-col justify-between"
              >
                <div>
                  <div className={`text-xs font-mono font-bold mb-3 ${theme.accentText}`}>
                    단계 {step.step}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Pricing & Packages */}
      {siteData.visibleSections.pricing && siteData.pricingOrTiers.length > 0 && (
        <section id="pricing" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
              OPTIONS & TIERS
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-4 ${fontStyle.headingFont}`}>
              패키지 & 요금 안내
            </h2>
            <p className="text-neutral-400 text-xs">상황과 규모에 맞게 유연하게 선택하실 수 있습니다.</p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
              <button
                onClick={() => setIsAnnualBilling(false)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  !isAnnualBilling ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400'
                }`}
              >
                표준 결제
              </button>
              <button
                onClick={() => setIsAnnualBilling(true)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isAnnualBilling ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400'
                }`}
              >
                연간 플랜 (20% 추가 할인)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.pricingOrTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-neutral-900 flex flex-col justify-between transition-all ${
                  tier.popular
                    ? `border-2 ${theme.accentBorder} shadow-xl ${theme.glowShadow}`
                    : 'border border-neutral-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                    {tier.popular && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${theme.accentBadgeBg} ${theme.accentBadgeText}`}>
                        인기 추천
                      </span>
                    )}
                  </div>

                  <div className={`text-2xl font-black mb-3 ${theme.accentText}`}>
                    {isAnnualBilling && !tier.price.includes('협의') && !tier.price.includes('0원') && !tier.price.includes('무료')
                      ? `${tier.price} (연납)`
                      : tier.price}
                  </div>
                  <p className="text-xs text-neutral-400 mb-6">{tier.description}</p>

                  <div className="space-y-2.5 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <Check className={`w-3.5 h-3.5 ${theme.accentText}`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`mt-8 w-full py-2.5 rounded-xl text-center text-xs font-bold transition-all ${
                    tier.popular
                      ? `${theme.accentBg} ${theme.accentHoverBg} text-white shadow-md`
                      : 'bg-neutral-800 hover:bg-neutral-750 text-neutral-200'
                  }`}
                >
                  선택 및 문의하기
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Testimonials & Quotes */}
      {siteData.visibleSections.testimonials && siteData.testimonialsOrQuotes.length > 0 && (
        <section id="testimonials" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800/80">
          <div className="grid md:grid-cols-2 gap-6">
            {siteData.testimonialsOrQuotes.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
              >
                <p className="text-sm text-neutral-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div className="text-xs text-neutral-400">
                  <span className="font-bold text-white block">{t.author}</span>
                  <span className="text-[11px] text-neutral-400">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. FAQ Accordion with Live Search */}
      {siteData.visibleSections.faqs && siteData.faqs.length > 0 && (
        <section id="faq" className="py-20 px-6 max-w-3xl mx-auto border-b border-neutral-800/80">
          <div className="text-center mb-8">
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
              FREQUENTLY ASKED
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-4 ${fontStyle.headingFont}`}>
              자주 묻는 질문 (FAQ)
            </h2>
            <div className="relative max-w-md mx-auto">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="궁금한 내용을 검색해 보세요..."
                value={faqSearchQuery}
                onChange={e => setFaqSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <span>Q. {faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 11. Contact & Lead Form Section */}
      {siteData.visibleSections.contact && (
        <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
                GET IN TOUCH
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-4 ${fontStyle.headingFont}`}>
                <EditableText value={siteData.contact.title} path={['contact', 'title']} />
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8">
                <EditableText value={siteData.contact.description} path={['contact', 'description']} />
              </p>

              <div className="space-y-3 text-xs text-neutral-300">
                {siteData.contact.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span>{siteData.contact.email}</span>
                  </div>
                )}
                {siteData.contact.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-neutral-400" />
                    <span>{siteData.contact.phone}</span>
                  </div>
                )}
                {siteData.contact.address && (
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    <span>{siteData.contact.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Form */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className={`w-10 h-10 ${theme.accentText} mx-auto`} />
                  <div className="font-bold text-white text-base">문의가 접수되었습니다!</div>
                  <p className="text-xs text-neutral-400">
                    입력해주신 연락처로 담당자가 신속히 답변드리겠습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">성함 / 담당자명</label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">이메일 주소</label>
                    <input
                      type="email"
                      required
                      placeholder="hello@example.com"
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">문의 내용 / 요청사항</label>
                    <textarea
                      rows={3}
                      placeholder="문의하실 내용을 자유롭게 남겨주세요."
                      value={contactMessage}
                      onChange={e => setContactMessage(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl font-bold text-white ${theme.accentBg} ${theme.accentHoverBg} transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{siteData.contact.ctaText}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 12. Footer */}
      <footer className="py-12 px-6 border-t border-neutral-800/80 text-xs text-neutral-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-neutral-200 mb-1">{siteData.brandName}</div>
            <div className="text-[11px] text-neutral-400">{siteData.footer.copyright}</div>
          </div>
          {siteData.footer.note && (
            <div className="text-[11px] text-neutral-400 max-w-md text-right sm:text-right">
              {siteData.footer.note}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
