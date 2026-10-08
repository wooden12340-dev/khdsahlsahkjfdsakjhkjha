import React, { useState, useEffect } from 'react';
import { School, ExamSchedule } from '../../types/studyCafe';
import { DISTRICT_STATS } from '../../data/busanData';
import { searchSchools, getSchoolSchedules } from '../../services/neisService';
import {
  Search,
  School as SchoolIcon,
  Calendar,
  Clock,
  ArrowRight,
  MapPin,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface SchoolSearchStepProps {
  selectedSchool: School | null;
  onSelectSchool: (school: School) => void;
  onProceedToStep2: () => void;
}

export const SchoolSearchStep: React.FC<SchoolSearchStepProps> = ({
  selectedSchool,
  onSelectSchool,
  onProceedToStep2,
}) => {
  const [keyword, setKeyword] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('전체');
  const [schools, setSchools] = useState<School[]>([]);
  const [schedules, setSchedules] = useState<ExamSchedule[]>([]);

  useEffect(() => {
    loadSchools();
  }, [keyword, selectedDistrict]);

  useEffect(() => {
    if (selectedSchool) {
      loadSchedules(selectedSchool.id);
    }
  }, [selectedSchool]);

  const loadSchools = async () => {
    const results = await searchSchools(keyword, selectedDistrict);
    setSchools(results);
  };

  const loadSchedules = async (schoolId: string) => {
    const list = await getSchoolSchedules(schoolId);
    setSchedules(list);
  };

  const nearestExam = schedules[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Step Header */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="text-xs font-bold text-indigo-400 tracking-wider uppercase mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              STEP 1. 학교 선택 및 학사 일정 조회
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              나의 학교를 검색하고 시험 일정을 확인하세요
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              NEIS 나이스 학사일정 공공 API와 실시간 연동되어 중간고사 및 기말고사 D-Day가 자동 계산됩니다.
            </p>
          </div>

          {selectedSchool && (
            <button
              onClick={onProceedToStep2}
              className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <span>인근 스터디카페 찾기 (Step 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search & District Filter Controls */}
        <div className="pt-6 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="학교명을 입력하세요 (예: 센텀고, 해운대고, 부산고, 부산대, 동래고 등)..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Quick District Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-neutral-400 font-semibold shrink-0">부산 주요 구:</span>
            <button
              onClick={() => setSelectedDistrict('전체')}
              className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors cursor-pointer ${
                selectedDistrict === '전체'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-750'
              }`}
            >
              전체
            </button>
            {DISTRICT_STATS.slice(0, 8).map(d => (
              <button
                key={d.district}
                onClick={() => setSelectedDistrict(d.district)}
                className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors cursor-pointer ${
                  selectedDistrict === d.district
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-750'
                }`}
              >
                {d.district} ({d.count}개소)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: School Selection & Schedule Details */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* School List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
            검색 결과 ({schools.length}개 학교)
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {schools.length === 0 ? (
              <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-800 text-center text-sm text-neutral-400">
                일치하는 학교가 없습니다. 다른 검색어를 입력해 보세요.
              </div>
            ) : (
              schools.map(school => {
                const isSelected = selectedSchool?.id === school.id;
                return (
                  <div
                    key={school.id}
                    onClick={() => onSelectSchool(school)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                        : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                          {school.name}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {school.type}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{school.address}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        표준학교코드: <span className="font-mono text-neutral-300">{school.schoolCode}</span> · 교육청: C10
                      </div>
                    </div>

                    <div className="shrink-0 ml-3">
                      {isSelected ? (
                        <div className="flex items-center gap-1 text-xs font-bold text-indigo-400">
                          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                          <span className="hidden sm:inline">선택됨</span>
                        </div>
                      ) : (
                        <button className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs text-neutral-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          선택
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected School NEIS Academic Schedule Panel */}
        <div className="lg:col-span-6">
          {selectedSchool ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                    <SchoolIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{selectedSchool.name}</h3>
                    <div className="text-xs text-neutral-400">
                      {selectedSchool.district} · {selectedSchool.type} · 재학생 약 {selectedSchool.studentCount?.toLocaleString()}명
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                    NEIS 일정 연동됨
                  </span>
                </div>
              </div>

              {/* D-Day Highlight Card */}
              {nearestExam && (
                <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/80 via-neutral-900 to-neutral-900 border border-indigo-800/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>가장 가까운 정기 시험</span>
                    </div>
                    <div className="text-xl font-extrabold text-white">{nearestExam.title}</div>
                    <div className="text-xs text-neutral-400 mt-1">
                      시험 기간: {nearestExam.startDate} ~ {nearestExam.endDate} ({nearestExam.grade})
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-black text-indigo-400 tracking-tight">
                      D-{nearestExam.dDay}
                    </div>
                    <div className="text-[11px] text-neutral-400">남은 준비 기간</div>
                  </div>
                </div>
              )}

              {/* Schedules Table */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  2026학년도 주요 학사 일정
                </div>
                <div className="space-y-2">
                  {schedules.map(sch => (
                    <div
                      key={sch.id}
                      className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div>
                          <div className="font-bold text-white text-sm">{sch.title}</div>
                          <div className="text-neutral-400 text-[11px]">
                            {sch.startDate} ~ {sch.endDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-neutral-300 font-semibold">{sch.grade}</span>
                        <span className="font-mono font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/40">
                          D-{sch.dDay}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA to Step 2 */}
              <div className="pt-2">
                <button
                  onClick={onProceedToStep2}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{selectedSchool.name} 주변 스터디카페 탐색하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-neutral-600 mx-auto" />
              <div className="text-base font-bold text-neutral-200">
                학교를 선택하면 학사 일정과 D-Day가 표시됩니다
              </div>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                좌측 목록에서 다니는 학교를 클릭하세요. 나이스 Open API를 통해 중간/기말고사 일정을 조회하고 주변 스터디카페의 혼잡도를 예측합니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
