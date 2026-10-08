import { SiteData, ThemeStyle, ColorPalette } from '../types/site';

/**
 * Intelligent client-side heuristic parser that converts arbitrary document / text
 * into structured, polished SiteData with complete sections.
 */
export function parseDocumentToSiteData(
  text: string,
  options?: {
    themeStyle?: ThemeStyle;
    colorPalette?: ColorPalette;
    goal?: string;
  }
): SiteData {
  const lines = text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  // 1. Title Extraction
  let extractedTitle = '문서 기반 웹사이트';
  let extractedBrand = '스마트 웹';
  let extractedTagline = '제공된 핵심 자료를 바탕으로 재구성된 현대적 웹사이트';

  for (const line of lines.slice(0, 5)) {
    if (line.startsWith('# ')) {
      extractedTitle = line.replace('# ', '').trim();
      break;
    } else if (line.startsWith('[') && line.includes(']')) {
      const match = line.match(/\[(.*?)\]/);
      if (match) {
        extractedTitle = match[1].trim();
        break;
      }
    } else if (line.toLowerCase().includes('프로젝트명:') || line.toLowerCase().includes('강의명:') || line.toLowerCase().includes('행사명:') || line.toLowerCase().includes('브랜드명:')) {
      const parts = line.split(':');
      if (parts[1]) extractedBrand = parts[1].trim();
    }
  }

  if (extractedTitle === '문서 기반 웹사이트' && lines.length > 0) {
    extractedTitle = lines[0].replace(/^[#\-\*\d\.\s\[\]]+/, '').slice(0, 50);
  }

  // Derive Brand from Title if not set
  if (extractedBrand === '스마트 웹') {
    const firstWord = extractedTitle.split(/[\s\-_\/:]/)[0];
    if (firstWord && firstWord.length > 1) {
      extractedBrand = firstWord;
    }
  }

  // 2. Extract Key Sections
  const features: any[] = [];
  const metrics: any[] = [];
  const timeline: any[] = [];
  const faqs: any[] = [];
  const testimonials: any[] = [];
  const pricingTiers: any[] = [];
  let summaryParagraphs: string[] = [];

  let currentSection = '';
  let currentQ = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect section headers
    if (/^[#\d\.\s\-\*]*(문제|개요|소개|overview|problem|about)/i.test(line)) {
      currentSection = 'overview';
      continue;
    } else if (/^[#\d\.\s\-\*]*(기능|특징|솔루션|solution|feature|핵심)/i.test(line)) {
      currentSection = 'features';
      continue;
    } else if (/^[#\d\.\s\-\*]*(지표|성과|성과지표|metric|traction|stats|성과)/i.test(line)) {
      currentSection = 'metrics';
      continue;
    } else if (/^[#\d\.\s\-\*]*(일정|로드맵|커리큘럼|단계|process|step|roadmap|curriculum)/i.test(line)) {
      currentSection = 'timeline';
      continue;
    } else if (/^[#\d\.\s\-\*]*(요금|가격|티켓|플랜|pricing|ticket|cost)/i.test(line)) {
      currentSection = 'pricing';
      continue;
    } else if (/^[#\d\.\s\-\*]*(추천|후기|인용|testimonial|review)/i.test(line)) {
      currentSection = 'testimonials';
      continue;
    } else if (/^[#\d\.\s\-\*]*(faq|자주 묻는|q&a|질문)/i.test(line)) {
      currentSection = 'faq';
      continue;
    }

    // FAQ matching
    if (/^Q[:\.]/i.test(line) || line.startsWith('Q. ') || line.startsWith('질문:')) {
      currentQ = line.replace(/^(Q[:\.]|질문:)/i, '').trim();
      continue;
    }
    if (currentQ && (/^A[:\.]/i.test(line) || line.startsWith('A. ') || line.startsWith('답변:'))) {
      const ans = line.replace(/^(A[:\.]|답변:)/i, '').trim();
      faqs.push({ question: currentQ, answer: ans });
      currentQ = '';
      continue;
    }

    // Metrics matching: numbers with %, +, x, 배, 명, 개, 원, 건, 초
    const metricMatch = line.match(/([+\-]?\d+[\d,\.]*[%배명개원건초만억]+|\d+\+?%?)/);
    if (metricMatch && (currentSection === 'metrics' || line.includes(':') || line.includes('-'))) {
      const parts = line.split(/[:\-\–]/);
      if (parts.length >= 2) {
        metrics.push({
          label: parts[0].replace(/^[#\-\*\d\.\s]+/, '').trim().slice(0, 30),
          value: metricMatch[0],
          description: parts[1].trim().slice(0, 60),
        });
      }
    }

    // Timeline / step matching
    if (currentSection === 'timeline' || /^(step|\d+단계|\d+주차|day\s*\d|phase\s*\d|\d+:\d+)/i.test(line)) {
      const parts = line.split(/[:\-\–]/);
      if (parts.length >= 2) {
        timeline.push({
          step: `0${timeline.length + 1}`.slice(-2),
          title: parts[0].replace(/^[#\-\*\d\.\s]+/, '').trim(),
          description: parts.slice(1).join(' ').trim(),
        });
      }
    }

    // Feature items
    if (currentSection === 'features' && (line.startsWith('-') || line.startsWith('*') || /^\(\d+\)/.test(line) || /^\d+\./.test(line))) {
      const cleanLine = line.replace(/^[\-\*\d\.\(\)\s]+/, '').trim();
      if (cleanLine.length > 5) {
        const parts = cleanLine.split(/[:\-]/);
        features.push({
          id: `feat-${features.length + 1}`,
          title: parts[0].trim(),
          description: parts[1] ? parts.slice(1).join(' ').trim() : '핵심 가치와 차별화된 사용성을 제공합니다.',
          category: '핵심 기능',
          highlight: '주요 특징'
        });
      }
    }

    // Overview collection
    if ((currentSection === 'overview' || currentSection === '') && line.length > 20 && !line.startsWith('#')) {
      if (summaryParagraphs.length < 3) {
        summaryParagraphs.push(line);
      }
    }
  }

  // Fallbacks if parsed collections are empty
  if (features.length === 0) {
    features.push(
      {
        id: 'feat-1',
        title: '핵심 정보의 구조화',
        description: '제공된 원본 문서의 데이터를 분석하여 직관적인 정보 구조와 시각적 위계로 정리합니다.',
        category: '데이터 구조화',
        highlight: '효율 극대화'
      },
      {
        id: 'feat-2',
        title: '신속한 프로덕션 배포',
        description: '복잡한 웹 코딩 과정 없이 완성도 높은 단일 페이지로 즉각 변환하여 바로 활용할 수 있습니다.',
        category: '즉시 활용',
        highlight: '생산성 3배'
      },
      {
        id: 'feat-3',
        title: '인터랙티브 컴포넌트 내장',
        description: 'FAQ 아코디언, 반응형 탭, 지표 카운터, 슬라이드 등 역동적인 웹 경험을 기본 제공합니다.',
        category: '사용자 경험',
        highlight: '100% 반응형'
      }
    );
  }

  if (metrics.length === 0) {
    metrics.push(
      { label: '데이터 압축률', value: '100%', description: '원문 핵심 내용 완벽 반영' },
      { label: '배포 및 변환 속도', value: '0.5초', description: '즉각적인 실시간 렌더링' },
      { label: '모바일 호환성', value: '100%', description: '모든 디바이스 최적화' },
      { label: '사용자 만족도', value: '99.4%', description: '직관적인 인터페이스 설계' }
    );
  }

  if (timeline.length === 0) {
    timeline.push(
      { step: '01', title: '자료 수집 및 분석', description: '제공된 문서와 요구사항의 핵심 맥락을 추출' },
      { step: '02', title: '정보 구조화 및 설계', description: '헤드라인, 기능, 지표, FAQ 등 섹션별 최적 배치' },
      { step: '03', title: '스타일 및 인터랙션 입히기', description: '브랜드 감성에 맞는 테마와 반응형 레이아웃 적용' },
      { step: '04', title: '완성 및 배포', description: '웹사이트 실시간 확인 및 단일 HTML/React 코드로 내보내기' }
    );
  }

  if (faqs.length === 0) {
    faqs.push(
      {
        question: '이 웹사이트는 어떤 데이터를 기반으로 생성되었나요?',
        answer: '사용자가 입력하거나 선택한 원본 텍스트 및 문서 자료의 핵심 내용을 분석하여 실시간으로 구조화한 웹사이트입니다.'
      },
      {
        question: '텍스트나 섹션을 직접 수정할 수 있나요?',
        answer: '네, 상단의 [실시간 편집 모드]를 켜시면 웹사이트의 모든 텍스트를 클릭하여 바로 수정하고 섹션 순서를 조정할 수 있습니다.'
      },
      {
        question: '완성된 웹사이트를 내 컴퓨터에 다운로드할 수 있나요?',
        answer: '상단 [내보내기] 버튼을 통해 독립 실행형 HTML 파일 또는 React 컴포넌트 소스 코드로 즉시 저장할 수 있습니다.'
      }
    );
  }

  const overviewSummary = summaryParagraphs.join(' ') ||
    '본 문서는 제공된 핵심 데이터를 바탕으로 전문적인 웹 프레젠테이션으로 탈바꿈되었습니다. 복잡한 텍스트 정보를 명확하고 매력적인 인터페이스로 전달합니다.';

  // Determine theme style from content or options
  let themeStyle: ThemeStyle = options?.themeStyle || 'modern-saas';
  let colorPalette: ColorPalette = options?.colorPalette || 'indigo';

  if (!options?.themeStyle) {
    const lower = text.toLowerCase();
    if (lower.includes('포트폴리오') || lower.includes('디자이너') || lower.includes('경력기술서')) {
      themeStyle = 'portfolio';
      colorPalette = 'violet';
    } else if (lower.includes('강의') || lower.includes('커리큘럼') || lower.includes('스터디') || lower.includes('학습')) {
      themeStyle = 'academic';
      colorPalette = 'emerald';
    } else if (lower.includes('서밋') || lower.includes('컨퍼런스') || lower.includes('축제') || lower.includes('페스티벌')) {
      themeStyle = 'cyberpunk';
      colorPalette = 'amber';
    } else if (lower.includes('카페') || lower.includes('원두') || lower.includes('베이커리') || lower.includes('에디토리얼') || lower.includes('매거진')) {
      themeStyle = 'editorial';
      colorPalette = 'rose';
    }
  }

  return {
    siteTitle: extractedTitle,
    brandName: extractedBrand,
    tagline: extractedTagline,
    category: '스마트 생성 웹사이트',
    themeStyle,
    colorPalette,
    hero: {
      badge: '✨ 원본 자료 기반 자동 완성 웹사이트',
      headline: extractedTitle,
      subheadline: summaryParagraphs[0] || '입력하신 자료의 핵심 가치와 내용을 기반으로 완성도 높게 구성된 공식 인터랙티브 웹사이트입니다.',
      primaryCta: '핵심 내용 살펴보기',
      secondaryCta: '자료 전체 다운로드',
      highlights: [
        features[0]?.title || '핵심 기능 요약',
        metrics[0] ? `${metrics[0].label}: ${metrics[0].value}` : '검증된 성과 지표',
        '원클릭 내보내기 지원'
      ]
    },
    overview: {
      title: '자료 개요 및 핵심 요약',
      summary: overviewSummary,
      keyTakeaways: [
        '자료의 핵심 메시지를 사용자가 한눈에 파악할 수 있도록 시각화',
        '상세 스펙과 수치 데이터를 체계적인 표와 카드로 재구성',
        '필요한 정보를 검색 없이 직관적으로 탐색 가능한 섹션 분할',
        '데스크톱부터 모바일까지 매끄러운 반응형 반응'
      ]
    },
    features: features.slice(0, 6),
    deepDives: [
      {
        tabTitle: '핵심 요약',
        heading: '문서의 주안점 및 목표',
        content: overviewSummary,
        bulletPoints: [
          '원문 자료의 핵심 주장과 논리 구조 반영',
          '데이터 중심의 객관적 분석과 명확한 결론 도출',
          '실무 및 비즈니스 현장에 즉시 적용 가능한 실행 방안'
        ]
      },
      {
        tabTitle: '세부 실행안',
        heading: '구체적인 실행 계획 및 방안',
        content: '체계적인 단계별 접근을 통해 안정적인 성과를 달성할 수 있도록 프로세스를 구체화했습니다.',
        bulletPoints: [
          '단계별 마일스톤 및 리소스 최적화',
          '예상 리스크 사전 점검 및 대응 프로토콜',
          '성과 측정을 위한 핵심 KPI 트래킹'
        ]
      }
    ],
    metrics: metrics.slice(0, 4),
    timelineOrSteps: timeline.slice(0, 6),
    pricingOrTiers: [
      {
        name: 'Standard',
        price: '기본 패키지',
        description: '자료의 핵심 내용을 바탕으로 한 표준 구성',
        features: ['전체 핵심 요약 열람', '모바일 반응형 지원', '기본 지원'],
        popular: false
      },
      {
        name: 'Premium',
        price: '풀 패키지',
        description: '심층 분석 자료와 인터랙티브 기능을 포함한 풀 구성',
        features: ['심층 데이터 및 부록 포함', '우선 지원 및 업데이트', '맞춤형 상담 세션 제공'],
        popular: true
      }
    ],
    testimonialsOrQuotes: [
      {
        quote: '제공된 원본 자료가 한눈에 들어오는 세련된 웹사이트로 정리되어 커뮤니케이션 효율이 비약적으로 향상되었습니다.',
        author: '프로젝트 총괄',
        role: '기획 책임자'
      }
    ],
    faqs: faqs.slice(0, 6),
    contact: {
      title: '궁금한 점이나 추가 문의가 있으신가요?',
      description: '본 자료와 관련된 구체적인 문의나 협업 요청을 남겨주시면 신속하게 답변드리겠습니다.',
      ctaText: '문의 남기기',
      email: 'contact@doc2site.studio',
      phone: '02-1234-5678',
      address: '서울특별시 강남구 테헤란로 123'
    },
    footer: {
      copyright: `© 2026 ${extractedBrand}. All rights reserved.`,
      note: '본 웹사이트는 제공된 문서를 바탕으로 AI & 스마트 파서에 의해 생성되었습니다.'
    },
    visibleSections: {
      hero: true,
      overview: true,
      features: true,
      deepDives: true,
      metrics: true,
      timeline: true,
      pricing: true,
      testimonials: true,
      faqs: true,
      contact: true
    }
  };
}
