import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Layers, CheckCircle, Moon, Sun, Github, LogOut } from 'lucide-react';
import { School, StudyCafe, ExamSchedule } from './types/studyCafe';
import { BUSAN_SCHOOLS, BUSAN_STUDY_CAFES, SCHOOL_SCHEDULES } from './data/busanData';
import { StudyHeader } from './components/study/StudyHeader';
import { SchoolSearchStep } from './components/study/SchoolSearchStep';
import { StudyCafeExplorerStep } from './components/study/StudyCafeExplorerStep';
import { CongestionPredictorStep } from './components/study/CongestionPredictorStep';
import { StudyPlannerStep } from './components/study/StudyPlannerStep';
import { PrdViewModal } from './components/study/PrdViewModal';
import { SAMPLE_MATERIALS } from './data/sampleMaterials';
import { SiteData } from './types/site';
import { StudioHeader } from './components/StudioHeader';
import { LiveWebsiteView } from './components/LiveWebsiteView';
import { MaterialModal } from './components/MaterialModal';
import { ExportModal } from './components/ExportModal';
import { SectionVisibilityDrawer } from './components/SectionVisibilityDrawer';
import { generateSiteFromMaterial } from './services/aiGenerator';
import { supabase } from './lib/supabase';
import { useTheme } from './main.tsx';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user || null));
    supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
  }, []);

  const signInWithGithub = () => supabase.auth.signInWithOAuth({ provider: 'github' });
  const signOut = () => supabase.auth.signOut();

  // App Mode
  const [appMode, setAppMode] = useState<'service' | 'doc2site'>('service');
  // StudySpot Service Workflow state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(BUSAN_SCHOOLS[0]);
  const [selectedCafe, setSelectedCafe] = useState<StudyCafe | null>(BUSAN_STUDY_CAFES[0]);
  const [isPrdModalOpen, setIsPrdModalOpen] = useState<boolean>(false);

  // Doc2Site Studio state
  const [siteData, setSiteData] = useState<SiteData>(SAMPLE_MATERIALS[0].presetData);
  const [activePresetId, setActivePresetId] = useState<string>(SAMPLE_MATERIALS[0].id);
  const [currentRawText, setCurrentRawText] = useState<string>(SAMPLE_MATERIALS[0].rawText);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isVisibilityDrawerOpen, setIsVisibilityDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };
  
  // ... (keeping other handlers as is)

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    // Find nearest cafe for this school
    const nearest = BUSAN_STUDY_CAFES.find(c => c.district === school.district) || BUSAN_STUDY_CAFES[0];
    setSelectedCafe(nearest);
    showToast(`'${school.name}'이(가) 선택되었습니다.`);
  };

  const handleSelectCafe = (cafe: StudyCafe) => {
    setSelectedCafe(cafe);
    showToast(`'${cafe.name}'이(가) 선택되었습니다.`);
  };

  const getNearestExam = (): ExamSchedule | null => {
    if (!selectedSchool) return null;
    const schedules = SCHOOL_SCHEDULES[selectedSchool.id] || [];
    return schedules[0] || null;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-neutral-700 text-neutral-100 px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mode Switcher Bar */}
      <div className="bg-neutral-950 border-b border-neutral-800/80 px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-neutral-300">
            {appMode === 'service'
              ? '💡 PRD 기반 실 서비스 작동 중: NEIS 학사일정 & 소상공인 R10202 연동'
              : '🎨 자료 기반 웹사이트 빌더 & 편집 스튜디오 모드'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme & Auth UI */}
          <button onClick={toggleTheme} className="p-1.5 rounded-lg bg-neutral-850 hover:bg-neutral-800 border border-neutral-700">
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
          {user ? (
             <button onClick={signOut} className="px-3 py-1 rounded-lg bg-red-950 hover:bg-red-900 border border-red-800 flex items-center gap-1.5 cursor-pointer">
               <LogOut className="w-3.5 h-3.5" />
               <span className="text-red-200">Logout</span>
             </button>
          ) : (
             <button onClick={signInWithGithub} className="px-3 py-1 rounded-lg bg-neutral-850 hover:bg-neutral-800 border border-neutral-700 flex items-center gap-1.5 cursor-pointer">
               <Github className="w-3.5 h-3.5" />
               <span className="text-neutral-200">Login with GitHub</span>
             </button>
          )}

          <button
            onClick={() => setAppMode(appMode === 'service' ? 'doc2site' : 'service')}
            className="px-3 py-1 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-neutral-200 font-semibold border border-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {appMode === 'service' ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>웹사이트 랜딩 쇼케이스 보기</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>스터디카페 실서비스 (Step 1~4)로 돌아가기</span>
              </>
            )}
          </button>
        </div>
      </div>

      {appMode === 'service' ? (
        /* ======================== 1. StudySpot Web Service Mode ======================== */
        <div className="flex-1 flex flex-col">
          <StudyHeader
            currentStep={currentStep}
            onSetStep={st => setCurrentStep(st)}
            onOpenPrdModal={() => setIsPrdModalOpen(true)}
            onOpenDoc2Site={() => setAppMode('doc2site')}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {currentStep === 1 && (
              <SchoolSearchStep
                selectedSchool={selectedSchool}
                onSelectSchool={handleSelectSchool}
                onProceedToStep2={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && selectedSchool && (
              <StudyCafeExplorerStep
                selectedSchool={selectedSchool}
                selectedCafe={selectedCafe}
                onSelectCafe={handleSelectCafe}
                onProceedToStep3={() => setCurrentStep(3)}
                onBackToStep1={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && selectedSchool && selectedCafe && (
              <CongestionPredictorStep
                selectedSchool={selectedSchool}
                selectedCafe={selectedCafe}
                onProceedToStep4={() => setCurrentStep(4)}
                onBackToStep2={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && selectedSchool && (
              <StudyPlannerStep
                selectedSchool={selectedSchool}
                selectedCafe={selectedCafe}
                examSchedule={getNearestExam()}
                onBackToStep3={() => setCurrentStep(3)}
              />
            )}
          </main>

          <footer className="border-t border-neutral-800/80 py-8 px-6 text-xs text-neutral-400 text-center">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-bold text-neutral-200">공부명당 (StudySpot AI)</span> · NEIS 학사일정 및 상가(상권)정보 R10202 연계 서비스
              </div>
              <div>
                © 2026 StudySpot Inc. 부산광역시 해운대구 센텀중앙로 90 센텀AI스퀘어
              </div>
            </div>
          </footer>

          <PrdViewModal
            isOpen={isPrdModalOpen}
            onClose={() => setIsPrdModalOpen(false)}
          />
        </div>
      ) : (
        /* ======================== 2. Doc2Site Studio Mode ======================== */
        <div className="flex-1 flex flex-col">
          <StudioHeader
            currentBrand={siteData.brandName}
            themeStyle={siteData.themeStyle}
            colorPalette={siteData.colorPalette}
            viewport={viewport}
            isEditMode={isEditMode}
            isGenerating={isGenerating}
            activePresetId={activePresetId}
            onOpenMaterialModal={() => setIsMaterialModalOpen(true)}
            onSelectPreset={id => {
              const f = SAMPLE_MATERIALS.find(m => m.id === id);
              if (f) {
                setActivePresetId(f.id);
                setCurrentRawText(f.rawText);
                setSiteData(f.presetData);
                showToast(`'${f.title.slice(0, 20)}...' 로드됨`);
              }
            }}
            onChangeThemeStyle={st => setSiteData(prev => ({ ...prev, themeStyle: st }))}
            onChangeColorPalette={cp => setSiteData(prev => ({ ...prev, colorPalette: cp }))}
            onChangeViewport={vp => setViewport(vp)}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            onOpenVisibilityDrawer={() => setIsVisibilityDrawerOpen(true)}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            onRegenerate={async () => {
              setIsGenerating(true);
              try {
                const res = await generateSiteFromMaterial(currentRawText, {
                  themeStyle: siteData.themeStyle,
                  colorPalette: siteData.colorPalette,
                  useAiFirst: true,
                });
                setSiteData(res.data);
                showToast('웹사이트가 새로 재구성되었습니다.');
              } finally {
                setIsGenerating(false);
              }
            }}
          />

          <main className="flex-1 overflow-x-hidden flex justify-center bg-neutral-950/50">
            <div
              className={`w-full transition-all duration-300 ${
                viewport === 'tablet'
                  ? 'max-w-[768px] my-6 rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden'
                  : viewport === 'mobile'
                  ? 'max-w-[390px] my-6 rounded-3xl shadow-2xl border-4 border-neutral-800 overflow-hidden'
                  : 'max-w-full'
              }`}
            >
              <LiveWebsiteView
                siteData={siteData}
                isEditMode={isEditMode}
                onUpdateSiteData={newD => setSiteData(newD)}
              />
            </div>
          </main>

          <MaterialModal
            isOpen={isMaterialModalOpen}
            onClose={() => setIsMaterialModalOpen(false)}
            onSubmitMaterial={async (text, opts) => {
              setIsGenerating(true);
              setCurrentRawText(text);
              setIsMaterialModalOpen(false);
              try {
                const res = await generateSiteFromMaterial(text, {
                  siteGoal: opts.goal,
                  themeStyle: opts.themeStyle,
                  colorPalette: opts.colorPalette,
                  useAiFirst: opts.useAi,
                });
                setSiteData(res.data);
                showToast('웹사이트 생성이 완료되었습니다.');
              } finally {
                setIsGenerating(false);
              }
            }}
            onSelectPreset={id => {
              const f = SAMPLE_MATERIALS.find(m => m.id === id);
              if (f) {
                setActivePresetId(f.id);
                setCurrentRawText(f.rawText);
                setSiteData(f.presetData);
              }
            }}
            isGenerating={isGenerating}
            activePresetId={activePresetId}
          />

          <ExportModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
            siteData={siteData}
          />

          <SectionVisibilityDrawer
            isOpen={isVisibilityDrawerOpen}
            onClose={() => setIsVisibilityDrawerOpen(false)}
            visibleSections={siteData.visibleSections}
            onToggleSection={key =>
              setSiteData(prev => ({
                ...prev,
                visibleSections: { ...prev.visibleSections, [key]: !prev.visibleSections[key] },
              }))
            }
          />
        </div>
      )}
    </div>
  );
}
