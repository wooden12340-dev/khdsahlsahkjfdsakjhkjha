import React, { useState } from 'react';
import { X, Copy, Check, FileText, Download } from 'lucide-react';
import { DISTRICT_STATS } from '../../data/busanData';

interface PrdViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrdViewModal: React.FC<PrdViewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const prdText = `제품 요구사항 정의서 (PRD): 스터디 카페 혼잡도 예측 및 학습 플래너 웹 서비스

1. 개요 (Overview)
본 서비스는 공공 학사 일정 데이터를 활용하여 스터디 카페 주변 학교들의 시험 기간을 파악하고, 이를 바탕으로 스터디 카페의 혼잡도를 예측하는 웹 사이트입니다. 사용자는 혼잡도를 피할 수 있는 최적의 방문 시간을 추천받으며, 다가오는 시험 일정에 맞춘 개인화된 학습 플래너 기능을 통해 효율적으로 공부 일정을 관리할 수 있습니다.

2. 목표 (Goals)
- 혼잡도 예측: 주변 학교들의 시험 기간 데이터를 기반으로 스터디 카페의 예상 혼잡도를 제공.
- 최적 방문 시간 안내: 트래픽 및 혼잡도 예측 데이터를 통해 사용자가 방문하기 가장 좋은 시간(가장 여유로운 시간)을 추천.
- 학습 스케줄러: 시험까지 남은 시간을 시각적으로 보여주고(D-Day), 학습 계획을 수립할 수 있는 개인 맞춤형 플래너 제공.

3. 핵심 타겟 사용자 (Target Audience)
- 스터디 카페를 자주 이용하는 중/고등학생 및 대학생
- 혼잡한 환경을 피하고 쾌적하게 공부하고 싶은 스터디 카페 이용자
- 체계적으로 시험 공부 스케줄을 관리하고자 하는 학생

4. 핵심 기능 요구사항 (Key Features)
- Step 1: 학교 선택 및 학사 일정 조회 (초/중/고 검색, NEIS API 자동 수집, D-Day 표시)
- Step 2: 인근 스터디카페 탐색 (반경 1km~3km 탐색, 소상공인시장진흥공단 R10202 데이터)
- Step 3: 혼잡도 예측 및 최적 방문 시간 추천 (시험 중복 분석, 여유🟢/보통🟡/혼잡🔴, 골든타임, 4주 캘린더)
- Step 4: D-Day 기반 학습 플래너 (시험 자동 등록, 과목별 목표, 일자별 체크리스트, 진척도 관리)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(prdText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                제품 요구사항 정의서 (PRD) 전체 명세
              </h3>
              <p className="text-xs text-neutral-400">
                스터디 카페 혼잡도 예측 및 학습 플래너 웹 서비스 요구사항 문서
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사됨' : 'PRD 복사'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-300 leading-relaxed font-sans">
          {/* Section 1 */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <h4 className="font-bold text-sm text-indigo-400">1. 개요 (Overview) & 2. 목표 (Goals)</h4>
            <p className="text-neutral-300">
              공공 학사 일정 데이터를 활용하여 스터디 카페 주변 학교들의 시험 기간을 파악하고 혼잡도를 예측하는 웹 서비스입니다.
              사용자는 피크 시간대를 피해 가장 여유로운 골든타임을 추천받으며, D-Day 학습 플래너를 통해 시험 일정을 체계적으로 관리합니다.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">4. 핵심 기능 요구사항 (4단계 사용자 흐름)</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="font-bold text-indigo-400 block mb-1">4.1. 학교 선택 및 학사 일정 (Step 1)</span>
                <p className="text-neutral-400 text-[11px]">
                  초/중/고/대학교 검색, NEIS Open API 학사일정 자동 수집, 중간고사/기말고사 D-Day 실시간 카운트다운.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="font-bold text-emerald-400 block mb-1">4.2. 인근 스터디카페 탐색 (Step 2)</span>
                <p className="text-neutral-400 text-[11px]">
                  반경 1km~3km 레이더 탐색, 소상공인시장진흥공단 R10202 데이터(부산 630개소), 상호명/좌석/거리 카드.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="font-bold text-amber-400 block mb-1">4.3. 혼잡도 예측 & 추천 (Step 3)</span>
                <p className="text-neutral-400 text-[11px]">
                  주변 학교 시험 기간 중복 분석, 여유🟢/보통🟡/혼잡🔴 지표, 24시간 곡선 및 4주 캘린더 뷰.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="font-bold text-purple-400 block mb-1">4.4. D-Day 학습 플래너 (Step 4)</span>
                <p className="text-neutral-400 text-[11px]">
                  시험 자동 바인딩, 과목별 목표, 체크리스트, 뽀모도로 타이머, AI 맞춤형 학습 계획 생성기.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5.4 부산 통계 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">5.4. 부산 구별 스터디카페 분포 (R10202 독서실/스터디카페 630개소)</h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {DISTRICT_STATS.map(d => (
                <div key={d.district} className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
                  <div className="text-[11px] text-neutral-400">{d.district}</div>
                  <div className="text-sm font-bold text-emerald-400">{d.count}개소</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
