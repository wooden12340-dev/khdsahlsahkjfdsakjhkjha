import React from 'react';
import {
  School,
  Coffee,
  TrendingUp,
  Calendar,
  FileText,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface StudyHeaderProps {
  currentStep: 1 | 2 | 3 | 4;
  onSetStep: (step: 1 | 2 | 3 | 4) => void;
  onOpenPrdModal: () => void;
  onOpenDoc2Site: () => void;
}

export const StudyHeader: React.FC<StudyHeaderProps> = ({
  currentStep,
  onSetStep,
  onOpenPrdModal,
  onOpenDoc2Site,
}) => {
  const steps: { step: 1 | 2 | 3 | 4; label: string; desc: string; icon: any }[] = [
    { step: 1, label: '학교 & 학사일정', desc: 'NEIS 학교 검색 및 시험 일정', icon: School },
    { step: 2, label: '인근 카페 탐색', desc: '반경 1~3km R10202 데이터', icon: Coffee },
    { step: 3, label: '혼잡도 & 골든타임', desc: '시험 중복 분석 및 24h 곡선', icon: TrendingUp },
    { step: 4, label: 'D-Day 학습 플래너', desc: '목표 수립 및 뽀모도로 타이머', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-6 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-md font-black text-base">
              學
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-tight flex items-center gap-2">
                <span>공부명당 (StudySpot AI)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  NEIS 실시간 연동
                </span>
              </div>
              <div className="text-[11px] text-neutral-400">
                학사 일정 기반 스터디카페 혼잡도 예측 & D-Day 플래너
              </div>
            </div>
          </div>

          {/* Mobile Right Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenPrdModal}
              className="p-2 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-750 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
          {steps.map(s => {
            const Icon = s.icon;
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;

            return (
              <button
                key={s.step}
                onClick={() => onSetStep(s.step)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : isCompleted
                    ? 'bg-neutral-800/80 text-emerald-400 font-semibold hover:bg-neutral-800'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-white text-indigo-600'
                      : isCompleted
                      ? 'bg-emerald-500 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {isCompleted ? '✓' : s.step}
                </div>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Header Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenPrdModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>PRD 요구사항 보기</span>
          </button>

          <button
            onClick={onOpenDoc2Site}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700/80 transition-colors cursor-pointer"
            title="다른 자료를 붙여넣어 웹사이트를 생성할 수 있는 스튜디오를 엽니다"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>자료 사이트 빌더</span>
          </button>
        </div>
      </div>
    </header>
  );
};
