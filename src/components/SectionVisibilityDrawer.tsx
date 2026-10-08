import React from 'react';
import { X, Eye, EyeOff, CheckSquare, Square } from 'lucide-react';
import { SiteData } from '../types/site';

interface SectionVisibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  visibleSections: SiteData['visibleSections'];
  onToggleSection: (sectionKey: keyof SiteData['visibleSections']) => void;
}

export const SectionVisibilityDrawer: React.FC<SectionVisibilityDrawerProps> = ({
  isOpen,
  onClose,
  visibleSections,
  onToggleSection,
}) => {
  if (!isOpen) return null;

  const sectionLabels: { key: keyof SiteData['visibleSections']; label: string; desc: string }[] = [
    { key: 'hero', label: '히어로 섹션 (Hero)', desc: '헤드라인, 서브카피, 뱃지 및 CTA 버튼' },
    { key: 'overview', label: '개요 및 요약 (Overview)', desc: '문서 배경 및 4대 핵심 시사점' },
    { key: 'features', label: '주요 특징 (Features)', desc: '핵심 기능 카드 그리드' },
    { key: 'deepDives', label: '심층 분석 탭 (Deep Dives)', desc: '인터랙티브 탭별 상세 설명' },
    { key: 'metrics', label: '성과 지표 (Metrics)', desc: '숫자/비율 통계 카드' },
    { key: 'timeline', label: '로드맵 / 일정 (Timeline)', desc: '단계별 진행 프로세스' },
    { key: 'pricing', label: '요금 및 패키지 (Pricing)', desc: '티어별 가격 및 제공 혜택' },
    { key: 'testimonials', label: '추천사 및 인용구 (Quotes)', desc: '고객 평가 및 핵심 발언' },
    { key: 'faqs', label: '자주 묻는 질문 (FAQ)', desc: '아코디언 질의응답' },
    { key: 'contact', label: '문의 및 액션 (Contact)', desc: '문의 접수 양식 및 연락처' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-sm">섹션 표시/숨김 설정</h3>
            <p className="text-[11px] text-neutral-400">웹사이트에 노출할 블록을 켜거나 끌 수 있습니다.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-2 text-xs">
          {sectionLabels.map(s => {
            const isVisible = visibleSections[s.key];
            return (
              <div
                key={s.key}
                onClick={() => onToggleSection(s.key)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isVisible
                    ? 'bg-neutral-850 border-neutral-700 text-white'
                    : 'bg-neutral-950/50 border-neutral-800/80 text-neutral-500'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs flex items-center gap-2">
                    <span>{s.label}</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{s.desc}</div>
                </div>

                <div className="p-1.5 rounded-lg bg-neutral-800">
                  {isVisible ? (
                    <Eye className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-neutral-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
