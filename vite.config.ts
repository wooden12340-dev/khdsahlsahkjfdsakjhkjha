import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {GoogleGenAI} from '@google/genai';

function apiPlugin(): Plugin {
  return {
    name: 'doc2site-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/generate' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { documentText, siteGoal, colorTheme } = JSON.parse(body || '{}');
              if (!documentText) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'documentText is required' }));
                return;
              }

              const ai = new GoogleGenAI();
              const systemPrompt = `당신은 세계 정상급 웹 기획자이자 수석 프론트엔드 디자이너입니다.
사용자가 제공한 원문 자료/문서를 분석하여 완성도 높은 현대적 웹사이트 데이터 구조(JSON)로 변환하세요.
원문의 핵심 가치, 구체적인 데이터, 기능, 일정, FAQ, 가격 또는 구성요소를 풍부하고 전문성 있게 재구성하세요.

반드시 오직 유효한 JSON 형식 하나만 반환하세요 (마크다운 백틱 없이 순수 JSON만).
JSON 구조:
{
  "siteTitle": "웹사이트 메인 타이틀",
  "brandName": "브랜드 또는 프로젝트명",
  "tagline": "핵심 슬로건 한 줄",
  "category": "분야 (예: AI SaaS, 디자인 포트폴리오, 테크 컨퍼런스, 교육 코스 등)",
  "hero": {
    "badge": "상단 뱃지 텍스트 (예: 2026 신규 공개)",
    "headline": "임팩트 있는 헤드라인 (HTML br 태그 없이)",
    "subheadline": "헤드라인을 뒷받침하는 설득력 있는 부제 (2~3문장)",
    "primaryCta": "주요 행동 유도 버튼 문구 (예: 무료로 시작하기, 등록하기)",
    "secondaryCta": "보조 버튼 문구 (예: 상세 자료 다운로드, 데모 체험)",
    "highlights": ["핵심 포인트 1", "핵심 포인트 2", "핵심 포인트 3"]
  },
  "overview": {
    "title": "개요 및 도입부 제목",
    "summary": "자료의 핵심 맥락과 배경을 설명하는 상세 단락",
    "keyTakeaways": ["핵심 시사점/특징 1", "핵심 시사점/특징 2", "핵심 시사점/특징 3", "핵심 시사점/특징 4"]
  },
  "features": [
    {
      "id": "feat-1",
      "title": "기능/특징 제목",
      "description": "구체적인 설명과 사용자 가치",
      "category": "카테고리명",
      "highlight": "차별화 포인트"
    }
  ],
  "deepDives": [
    {
      "tabTitle": "탭 이름 (예: 핵심 아키텍처, 커리큘럼, 프로세스)",
      "heading": "상세 주제 제목",
      "content": "상세한 심층 설명",
      "bulletPoints": ["세부 항목 1", "세부 항목 2", "세부 항목 3"]
    }
  ],
  "metrics": [
    {
      "label": "지표 이름 (예: 생산성 향상)",
      "value": "수치 (예: +380%)",
      "description": "지표의 의미 설명"
    }
  ],
  "timelineOrSteps": [
    {
      "step": "01",
      "title": "단계/일정/모듈명",
      "description": "해당 단계의 주요 내용"
    }
  ],
  "pricingOrTiers": [
    {
      "name": "플랜/패키지명",
      "price": "가격 (예: 월 29,000원, 무료 등)",
      "description": "대상 고객/사용자",
      "features": ["포함 혜택 1", "포함 혜택 2", "포함 혜택 3"],
      "popular": true
    }
  ],
  "testimonialsOrQuotes": [
    {
      "quote": "추천사 또는 핵심 인용구",
      "author": "작성자 이름",
      "role": "직책 및 소속"
    }
  ],
  "faqs": [
    {
      "question": "자주 묻는 질문",
      "answer": "친절하고 상세한 답변"
    }
  ],
  "contact": {
    "title": "문의 및 참여 안내",
    "description": "언제든 연락주시거나 신청해 주세요.",
    "ctaText": "문의 접수하기",
    "email": "contact@example.com",
    "phone": "02-1234-5678",
    "address": "서울특별시 강남구 테헤란로 123"
  },
  "footer": {
    "copyright": "© 2026 All rights reserved.",
    "note": "본 사이트는 제공된 원문 자료를 바탕으로 자동 생성되었습니다."
  }
}`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: [
                  {
                    role: 'user',
                    parts: [
                      {
                        text: `${systemPrompt}\n\n[사용자 희망 목적]: ${siteGoal || '자동 감지'}\n[희망 컬러 테마]: ${colorTheme || 'indigo'}\n\n[변환할 원문 자료 내용]:\n${documentText}`,
                      },
                    ],
                  },
                ],
                config: {
                  responseMimeType: 'application/json',
                },
              });

              const text = response.text || '{}';
              res.setHeader('Content-Type', 'application/json');
              res.end(text);
            } catch (err: any) {
              console.error('API Generate error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Generation failed' }));
            }
          });
          return;
        }

        if (req.url === '/api/generate-plan' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { schoolName, examTitle, dDay, subjects } = JSON.parse(body || '{}');
              const ai = new GoogleGenAI();
              const prompt = `당신은 대한민국 수험생 및 중고등학생/대학생을 위한 1타 학습 코칭 전문가입니다.
[학교]: ${schoolName}
[시험]: ${examTitle} (남은 기간: D-${dDay})
[목표 과목]: ${(subjects || ['국어', '수학', '영어']).join(', ')}

이 시험과 D-Day에 맞추어 과목별 핵심 목표(targetScore)와 즉시 실천 가능한 일자별 학습 태스크 목록(tasks)을 생성하세요.
반드시 순수 JSON 형식으로만 응답하세요:
{
  "subjectGoals": [
    { "subject": "과목명", "targetScore": "목표(예: 1등급, 95점, A+)", "progressPercent": 35 }
  ],
  "tasks": [
    {
      "id": "t-1",
      "subject": "과목명",
      "title": "구체적인 공부 분량 및 단원",
      "targetMinutes": 60,
      "completedMinutes": 0,
      "done": false,
      "priority": "high",
      "dueDate": "YYYY-MM-DD"
    }
  ],
  "advice": "시험 기간 집중력과 스터디 카페 활용을 위한 핵심 코칭 한마디"
}`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                config: { responseMimeType: 'application/json' },
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(response.text || '{}');
            } catch (err: any) {
              console.error('Plan generation API error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Plan generation failed' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

