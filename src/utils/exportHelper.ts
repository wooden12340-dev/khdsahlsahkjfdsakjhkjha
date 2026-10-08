import { SiteData } from '../types/site';

export function generateStandaloneHtml(site: SiteData): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${site.siteTitle}</title>
  <meta name="description" content="${site.tagline}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif; }
  </style>
</head>
<body class="bg-neutral-950 text-neutral-100 antialiased selection:bg-indigo-600 selection:text-white">
  <!-- Navigation -->
  <header class="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="font-bold text-lg tracking-tight text-white flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span>
        ${site.brandName}
      </div>
      <nav class="hidden md:flex items-center gap-6 text-sm text-neutral-400">
        <a href="#overview" class="hover:text-white transition-colors">개요</a>
        <a href="#features" class="hover:text-white transition-colors">주요 기능</a>
        <a href="#metrics" class="hover:text-white transition-colors">성과 지표</a>
        <a href="#pricing" class="hover:text-white transition-colors">요금 안내</a>
        <a href="#faq" class="hover:text-white transition-colors">FAQ</a>
      </nav>
      <a href="#contact" class="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-sm">
        ${site.hero.primaryCta}
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-24 px-6 border-b border-neutral-800/80 relative overflow-hidden">
    <div class="max-w-4xl mx-auto text-center">
      ${site.hero.badge ? `<div class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 mb-6">${site.hero.badge}</div>` : ''}
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
        ${site.hero.headline}
      </h1>
      <p class="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        ${site.hero.subheadline}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="#contact" class="px-6 py-3.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25">
          ${site.hero.primaryCta}
        </a>
        ${site.hero.secondaryCta ? `<a href="#overview" class="px-6 py-3.5 rounded-xl font-semibold bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800 transition-all">${site.hero.secondaryCta}</a>` : ''}
      </div>
    </div>
  </section>

  <!-- Overview Section -->
  <section id="overview" class="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800">
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">${site.overview.title}</h2>
    <p class="text-neutral-300 text-lg leading-relaxed mb-8">${site.overview.summary}</p>
    <div class="grid md:grid-cols-2 gap-4">
      ${site.overview.keyTakeaways.map(t => `
        <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
          <span class="text-indigo-400 font-bold">✓</span>
          <span class="text-sm text-neutral-300 leading-relaxed">${t}</span>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 px-6 max-w-6xl mx-auto border-b border-neutral-800">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-3xl font-bold text-white mb-4">핵심 기능 및 특징</h2>
      <p class="text-neutral-400 text-sm">자료의 핵심 가치와 차별화된 역량을 제공합니다.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${site.features.map(f => `
        <div class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between">
          <div>
            ${f.highlight ? `<span class="text-xs font-semibold text-indigo-400 tracking-wider block mb-2">${f.highlight}</span>` : ''}
            <h3 class="text-lg font-bold text-white mb-2">${f.title}</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">${f.description}</p>
          </div>
          ${f.category ? `<div class="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-500">${f.category}</div>` : ''}
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Metrics Section -->
  <section id="metrics" class="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      ${site.metrics.map(m => `
        <div class="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center">
          <div class="text-3xl md:text-4xl font-extrabold text-indigo-400 mb-2">${m.value}</div>
          <div class="text-sm font-semibold text-white mb-1">${m.label}</div>
          <div class="text-xs text-neutral-500">${m.description}</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-800">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-3xl font-bold text-white mb-4">패키지 & 요금 안내</h2>
      <p class="text-neutral-400 text-sm">필요에 맞춘 최적의 옵션을 선택하세요.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${site.pricingOrTiers.map(p => `
        <div class="p-6 rounded-2xl bg-neutral-900 border ${p.popular ? 'border-indigo-500/80 shadow-lg shadow-indigo-500/10' : 'border-neutral-800'} flex flex-col justify-between">
          <div>
            ${p.popular ? '<span class="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-600 text-white mb-3">추천</span>' : ''}
            <h3 class="text-xl font-bold text-white mb-1">${p.name}</h3>
            <div class="text-2xl font-black text-indigo-400 mb-3">${p.price}</div>
            <p class="text-xs text-neutral-400 mb-6">${p.description}</p>
            <ul class="space-y-2.5 text-xs text-neutral-300">
              ${p.features.map(f => `<li class="flex items-center gap-2"><span class="text-indigo-400">✓</span> ${f}</li>`).join('')}
            </ul>
          </div>
          <a href="#contact" class="mt-8 block w-full py-2.5 rounded-lg text-center text-xs font-bold ${p.popular ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'} transition-colors">
            선택하기
          </a>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="py-20 px-6 max-w-3xl mx-auto border-b border-neutral-800">
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-8 text-center">자주 묻는 질문</h2>
    <div class="space-y-4">
      ${site.faqs.map(f => `
        <div class="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
          <h4 class="font-bold text-white text-base mb-2">Q. ${f.question}</h4>
          <p class="text-neutral-400 text-sm leading-relaxed">${f.answer}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Contact CTA -->
  <section id="contact" class="py-20 px-6 max-w-4xl mx-auto text-center">
    <h2 class="text-3xl font-bold text-white mb-4">${site.contact.title}</h2>
    <p class="text-neutral-400 max-w-lg mx-auto mb-8">${site.contact.description}</p>
    <div class="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
      <div class="text-xs text-neutral-400 text-left">
        <div>📧 이메일: <span class="text-neutral-200">${site.contact.email || '-'}</span></div>
        <div>📞 연락처: <span class="text-neutral-200">${site.contact.phone || '-'}</span></div>
      </div>
      <button onclick="alert('문의가 성공적으로 전달되었습니다.')" class="px-5 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors text-xs whitespace-nowrap">
        ${site.contact.ctaText}
      </button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-10 px-6 border-t border-neutral-800 text-center text-xs text-neutral-500">
    <p>${site.footer.copyright}</p>
    ${site.footer.note ? `<p class="mt-1 text-neutral-600">${site.footer.note}</p>` : ''}
  </footer>
</body>
</html>`;
}

export function generateReactComponent(site: SiteData): string {
  return `import React, { useState } from 'react';

export default function GeneratedLandingPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 px-6 h-16 flex items-center justify-between max-w-6xl mx-auto">
        <div className="font-bold text-lg text-white flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-500" />
          ${site.brandName}
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-400">
          <a href="#overview" className="hover:text-white transition-colors">개요</a>
          <a href="#features" className="hover:text-white transition-colors">특징</a>
          <a href="#metrics" className="hover:text-white transition-colors">지표</a>
          <a href="#pricing" className="hover:text-white transition-colors">요금</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
          ${site.hero.primaryCta}
        </button>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        ${site.hero.badge ? `<span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 mb-6">${site.hero.badge}</span>` : ''}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
          ${site.hero.headline}
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ${site.hero.subheadline}
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/25">
            ${site.hero.primaryCta}
          </button>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-16 px-6 max-w-5xl mx-auto border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-white mb-6">${site.overview.title}</h2>
        <p className="text-neutral-300 text-lg leading-relaxed mb-8">${site.overview.summary}</p>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 max-w-6xl mx-auto border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">핵심 기능 및 특징</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {${JSON.stringify(site.features)}.map(f => (
            <div key={f.id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-800 text-center text-xs text-neutral-500">
        ${site.footer.copyright}
      </footer>
    </div>
  );
}
`;
}

export function generateMarkdownDoc(site: SiteData): string {
  return `# ${site.siteTitle}

**브랜드:** ${site.brandName}  
**슬로건:** ${site.tagline}  
**분야:** ${site.category || '일반'}

---

## 1. 헤드라인 및 개요
> ${site.hero.headline}

${site.hero.subheadline}

### 주요 포인트
${site.hero.highlights?.map(h => `- ${h}`).join('\n') || ''}

---

## 2. 개요 (Overview)
### ${site.overview.title}
${site.overview.summary}

#### 핵심 시사점:
${site.overview.keyTakeaways.map(t => `- ${t}`).join('\n')}

---

## 3. 주요 기능 및 특징 (Features)
${site.features.map(f => `### ${f.title} (${f.highlight || f.category})
${f.description}`).join('\n\n')}

---

## 4. 성과 지표 (Metrics)
${site.metrics.map(m => `- **${m.label}:** ${m.value} (${m.description})`).join('\n')}

---

## 5. 단계별 로드맵 (Roadmap)
${site.timelineOrSteps.map(t => `### [${t.step}] ${t.title}
${t.description}`).join('\n\n')}

---

## 6. 요금 및 패키지
${site.pricingOrTiers.map(p => `### ${p.name} - ${p.price}
${p.description}
혜택:
${p.features.map(f => `  - ${f}`).join('\n')}`).join('\n\n')}

---

## 7. 자주 묻는 질문 (FAQ)
${site.faqs.map(q => `**Q: ${q.question}**  
A: ${q.answer}`).join('\n\n')}

---

## 8. 문의처
- 이메일: ${site.contact.email || '-'}
- 연락처: ${site.contact.phone || '-'}
- 주소: ${site.contact.address || '-'}

${site.footer.copyright}
`;
}
