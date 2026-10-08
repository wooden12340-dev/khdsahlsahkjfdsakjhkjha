import React, { useState } from 'react';
import { School, StudyCafe } from '../../types/studyCafe';
import { getNearbyStudyCafes } from '../../services/neisService';
import {
  MapPin,
  Coffee,
  Navigation,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Star,
  Users,
  Compass,
  Zap,
} from 'lucide-react';

interface StudyCafeExplorerStepProps {
  selectedSchool: School;
  selectedCafe: StudyCafe | null;
  onSelectCafe: (cafe: StudyCafe) => void;
  onProceedToStep3: () => void;
  onBackToStep1: () => void;
}

export const StudyCafeExplorerStep: React.FC<StudyCafeExplorerStepProps> = ({
  selectedSchool,
  selectedCafe,
  onSelectCafe,
  onProceedToStep3,
  onBackToStep1,
}) => {
  const [radiusMeters, setRadiusMeters] = useState<number>(3000); // 1km, 2km, 3km
  const cafes = getNearbyStudyCafes(selectedSchool, radiusMeters);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="text-xs font-bold text-emerald-400 tracking-wider uppercase mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              STEP 2. 인근 스터디카페 탐색 (소상공인시장진흥공단 R10202 데이터)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedSchool.name} 주변 스터디카페 ({cafes.length}개소)
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              학교 위치 기반 반경 탐색 및 실시간 좌석 현황을 확인하고 혼잡도를 예측할 카페를 선택하세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStep1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>학교 다시 선택</span>
            </button>

            {selectedCafe && (
              <button
                onClick={onProceedToStep3}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <span>혼잡도 & 골든타임 확인 (Step 3)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Radius Filter & Source Badge */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400 font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              검색 반경 설정:
            </span>
            {[1000, 2000, 3000].map(r => (
              <button
                key={r}
                onClick={() => setRadiusMeters(r)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  radiusMeters === r
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-750'
                }`}
              >
                반경 {r / 1000}km
              </button>
            ))}
          </div>

          <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>데이터 출처: 소상공인시장진흥공단 상권정보 (업종코드 R10202 독서실/스터디카페)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Radar/Map & Cafe Cards */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Radar Visualizer */}
        <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-800">
            <div className="font-bold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>위치 레이더 맵</span>
            </div>
            <div className="text-[11px] text-neutral-400">
              기준: <span className="text-neutral-200 font-semibold">{selectedSchool.name}</span>
            </div>
          </div>

          {/* Radar Visual Canvas */}
          <div className="relative w-full aspect-square rounded-2xl bg-neutral-950 border border-neutral-800/80 overflow-hidden flex items-center justify-center">
            {/* Concentric distance rings */}
            <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-neutral-800 flex items-center justify-center">
              <span className="absolute top-2 text-[9px] font-mono text-neutral-400">3.0 km</span>
            </div>
            <div className="absolute w-[58%] h-[58%] rounded-full border border-dashed border-neutral-800 flex items-center justify-center">
              <span className="absolute top-2 text-[9px] font-mono text-neutral-400">2.0 km</span>
            </div>
            <div className="absolute w-[30%] h-[30%] rounded-full border border-dashed border-neutral-800 flex items-center justify-center">
              <span className="absolute top-2 text-[9px] font-mono text-neutral-400">1.0 km</span>
            </div>

            {/* Crosshairs */}
            <div className="absolute inset-x-0 h-px bg-neutral-900" />
            <div className="absolute inset-y-0 w-px bg-neutral-900" />

            {/* School Center Marker */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50 ring-4 ring-indigo-950 animate-pulse">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="mt-1 text-[10px] font-bold text-white bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-700">
                {selectedSchool.name}
              </span>
            </div>

            {/* Surrounding Study Cafe Pins */}
            {cafes.map((c, i) => {
              const isSelected = selectedCafe?.id === c.id;
              // Distribute pseudo angle around center for visual radar clarity
              const angle = (i * (360 / Math.max(cafes.length, 1)) + 25) * (Math.PI / 180);
              const distRatio = Math.min(1, Math.max(0.2, (c.distanceMeter || 1200) / 3200));
              const radiusPx = distRatio * 38; // percentage radius from center
              const x = 50 + radiusPx * Math.cos(angle);
              const y = 50 + radiusPx * Math.sin(angle);

              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCafe(c)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  title={`${c.name} (${c.distanceMeter}m)`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-950'
                        : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5" />
                  </div>
                  <div
                    className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap pointer-events-none transition-opacity ${
                      isSelected ? 'bg-emerald-600 text-white opacity-100' : 'bg-neutral-900 text-neutral-300 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {c.name.slice(0, 8)}..
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-neutral-400 space-y-1 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
              <span>중심: 기준 학교 위치</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>초록 아이콘: 선택한 스터디카페 (좌석 및 혼잡도 분석 대상)</span>
            </div>
          </div>
        </div>

        {/* Study Cafe Cards List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>추천 스터디카페 목록</span>
            <span>거리순 정렬</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {cafes.map(cafe => {
              const isSelected = selectedCafe?.id === cafe.id;
              const distanceKm = ((cafe.distanceMeter || 0) / 1000).toFixed(1);
              const walkMinutes = Math.round((cafe.distanceMeter || 0) / 75);

              return (
                <div
                  key={cafe.id}
                  onClick={() => onSelectCafe(cafe)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                            {cafe.name}
                          </h4>
                          {cafe.brand && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                              {cafe.brand}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{cafe.address}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-black text-emerald-400">{cafe.distanceMeter}m</div>
                        <div className="text-[11px] text-neutral-400">도보 약 {walkMinutes}분</div>
                      </div>
                    </div>

                    {/* Facilities Chips */}
                    <div className="flex flex-wrap gap-1.5 my-3">
                      {cafe.facilities.map((fac, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4 text-neutral-400">
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{cafe.rating}</span>
                        <span className="text-neutral-500 text-[10px]">({cafe.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-300">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        <span>잔여 {cafe.availableSeats}/{cafe.totalSeats}석</span>
                      </div>
                      <div className="text-neutral-400 font-medium">
                        시간당 {cafe.hourlyRate.toLocaleString()}원
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> 선택됨
                        </span>
                      ) : (
                        <button className="px-3 py-1 rounded-lg bg-neutral-800 text-xs text-neutral-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          선택
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedCafe && (
            <div className="pt-2">
              <button
                onClick={onProceedToStep3}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{selectedCafe.name} 혼잡도 예측 및 골든타임 분석 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
