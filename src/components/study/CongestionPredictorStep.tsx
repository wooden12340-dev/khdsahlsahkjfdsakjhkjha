import React, { useState } from 'react';
import { StudyCafe, School, CongestionForecast } from '../../types/studyCafe';
import { predictCongestion } from '../../services/congestionService';
import {
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Coffee,
  CalendarDays,
} from 'lucide-react';

interface CongestionPredictorStepProps {
  selectedSchool: School;
  selectedCafe: StudyCafe;
  onProceedToStep4: () => void;
  onBackToStep2: () => void;
}

export const CongestionPredictorStep: React.FC<CongestionPredictorStepProps> = ({
  selectedSchool,
  selectedCafe,
  onProceedToStep4,
  onBackToStep2,
}) => {
  const forecast: CongestionForecast = predictCongestion(selectedCafe, selectedSchool);
  const [selectedHourTab, setSelectedHourTab] = useState<number>(new Date().getHours());

  const getStatusBadge = (status: '여유' | '보통' | '혼잡') => {
    switch (status) {
      case '여유':
        return {
          bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
          dot: 'bg-emerald-400',
          desc: '좌석 여유 넉넉함 · 쾌적한 학습 환경',
        };
      case '보통':
        return {
          bg: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
          dot: 'bg-amber-400',
          desc: '일부 좌석 점유 중 · 집중실 이용 추천',
        };
      case '혼잡':
        return {
          bg: 'bg-rose-950/80 text-rose-300 border-rose-800/60',
          dot: 'bg-rose-400',
          desc: '시험 기간 집중 몰림 · 조기 만석 및 대기 주의',
        };
    }
  };

  const statusConfig = getStatusBadge(forecast.currentStatus);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              STEP 3. 주변 학교 시험 일정 기반 혼잡도 예측 & 골든타임 추천
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{forecast.cafeName}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusConfig.bg} flex items-center gap-1.5`}>
                <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                <span>예상 상태: {forecast.currentStatus} ({forecast.currentRate}%)</span>
              </span>
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              반경 내 <strong className="text-white">{forecast.overlappingSchoolsCount}개 학교</strong>의 시험 기간 데이터를 복합 분석하여 시간대별 혼잡도 곡선을 산출했습니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStep2}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>카페 변경</span>
            </button>

            <button
              onClick={onProceedToStep4}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <span>D-Day 학습 플래너 생성 (Step 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Overlapping Schools Analysis Bar */}
        <div className="pt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <div className="text-xs text-neutral-400 font-medium">주변 시험 중복 학교 수</div>
            <div className="text-2xl font-black text-white mt-1">
              {forecast.overlappingSchoolsCount}개 학교 <span className="text-xs font-normal text-neutral-400">겹침</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">
              센텀고, 해운대고 등 주요 고교 시험 주간
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <div className="text-xs text-neutral-400 font-medium">현재 피크 혼잡 시간대</div>
            <div className="text-2xl font-black text-rose-400 mt-1">
              17:00 ~ 22:00
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">
              학교 하교 및 석식 직후 집중 몰림
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <div className="text-xs text-neutral-400 font-medium">추천 방문 골든타임</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              08:00 ~ 11:30
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">
              평균 점유율 30% 이하로 가장 한적함
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 24h Hourly Traffic Graph & Golden Visiting Hours */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* 24-Hour Traffic Chart */}
        <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>24시간 실시간 & 예상 트래픽 혼잡도 곡선</span>
              </h3>
              <p className="text-xs text-neutral-400">
                시간대별 점유율을 확인하고 가장 여유로운 시간에 방문하세요.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 여유</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 보통</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> 혼잡</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-2">
            <div className="h-48 flex items-end gap-1 sm:gap-2 px-2 pt-6 pb-2 bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-x-auto">
              {forecast.hourlyTraffics.map((item, idx) => {
                const isSelected = selectedHourTab === item.hour;
                const barColor =
                  item.status === '혼잡'
                    ? 'bg-rose-500 hover:bg-rose-400'
                    : item.status === '보통'
                    ? 'bg-amber-500 hover:bg-amber-400'
                    : 'bg-emerald-500 hover:bg-emerald-400';

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedHourTab(item.hour)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer min-w-[20px]"
                    title={`${item.label} 예상 혼잡도: ${item.congestionRate}% (${item.status})`}
                  >
                    <div className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                      {item.congestionRate}%
                    </div>
                    <div
                      style={{ height: `${Math.max(10, item.congestionRate)}%` }}
                      className={`w-full rounded-t-sm transition-all ${barColor} ${
                        isSelected ? 'ring-2 ring-white ring-offset-1 ring-offset-neutral-950 scale-105' : ''
                      }`}
                    />
                    <div className="text-[9px] font-mono text-neutral-400 mt-2 truncate">
                      {item.hour % 3 === 0 ? `${item.hour}시` : ''}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Hour Insight */}
            {forecast.hourlyTraffics[selectedHourTab] && (
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span className="font-bold text-white">
                    {forecast.hourlyTraffics[selectedHourTab].label} 시간대 분석:
                  </span>
                  <span className="text-neutral-300">
                    예상 점유율 <strong className="text-white">{forecast.hourlyTraffics[selectedHourTab].congestionRate}%</strong> (
                    <span
                      className={
                        forecast.hourlyTraffics[selectedHourTab].status === '혼잡'
                          ? 'text-rose-400 font-bold'
                          : forecast.hourlyTraffics[selectedHourTab].status === '보통'
                          ? 'text-amber-400 font-bold'
                          : 'text-emerald-400 font-bold'
                      }
                    >
                      {forecast.hourlyTraffics[selectedHourTab].status}
                    </span>
                    )
                  </span>
                </div>

                {forecast.hourlyTraffics[selectedHourTab].isOptimal && (
                  <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800/60">
                    ★ 추천 방문 시간
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Golden Visiting Hours Recommendations */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>최적 방문 골든타임 상세 안내</span>
            </h4>

            <div className="grid sm:grid-cols-2 gap-3">
              {forecast.optimalHours.map((opt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-800/50">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {opt.start} ~ {opt.end}
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{opt.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Week Daily Congestion Calendar View (Heatmap) */}
        <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-indigo-400" />
              <span>향후 4주간 혼잡도 캘린더</span>
            </h3>
            <span className="text-[11px] text-neutral-400">일별 예상</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px]">
            {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
              <div key={i} className="font-bold text-neutral-400 py-1">
                {d}
              </div>
            ))}

            {forecast.weeklyCalendar.map((day, idx) => {
              let dayBg = 'bg-neutral-950 text-neutral-400 border-neutral-800/80';
              if (day.status === '혼잡') {
                dayBg = 'bg-rose-950/60 text-rose-300 border-rose-800/60 font-bold';
              } else if (day.status === '보통') {
                dayBg = 'bg-amber-950/60 text-amber-300 border-amber-800/60';
              } else if (day.status === '여유') {
                dayBg = 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60';
              }

              return (
                <div
                  key={idx}
                  className={`p-1.5 rounded-lg border text-center transition-transform hover:scale-105 cursor-pointer relative ${dayBg}`}
                  title={`${day.date}(${day.dayName}): ${day.status} (${day.predictedRate}%)`}
                >
                  <div className="font-mono text-[10px]">{day.date.split('.')[1]}</div>
                  <div className="text-[9px] mt-0.5">{day.status}</div>
                  {day.hasExamOverlaps && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 absolute top-1 right-1" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>빨간 점 표시: 주변 학교 시험 기간 집중 주간</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>주말 오전 및 평일 주간은 시험 기간에도 비교적 쾌적</span>
            </div>
          </div>

          {/* CTA Button to Step 4 */}
          <div className="pt-4">
            <button
              onClick={onProceedToStep4}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>이 일정에 맞추어 학습 플래너 작성하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
