import React, { useState } from 'react';
import {
  X,
  Sparkles,
  FileText,
  Upload,
  Zap,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
  Info,
} from 'lucide-react';
import { SAMPLE_MATERIALS } from '../data/sampleMaterials';
import { ThemeStyle, ColorPalette } from '../types/site';

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMaterial: (text: string, options: { goal: string; themeStyle: ThemeStyle; colorPalette: ColorPalette; useAi: boolean }) => void;
  onSelectPreset: (presetId: string) => void;
  isGenerating: boolean;
  activePresetId?: string;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({
  isOpen,
  onClose,
  onSubmitMaterial,
  onSelectPreset,
  isGenerating,
  activePresetId,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'custom' | 'presets'>('custom');
  const [inputText, setInputText] = useState('');
  const [siteGoal, setSiteGoal] = useState('자동 분석 & 추천');
  const [selectedTheme, setSelectedTheme] = useState<ThemeStyle>('modern-saas');
  const [selectedColor, setSelectedColor] = useState<ColorPalette>('indigo');
  const [fileName, setFileName] = useState<string | null>(null);

  const goalOptions = [
    '자동 분석 & 추천',
    'SaaS / 테크 제품 랜딩페이지',
    '디자인 / 크리에이터 포트폴리오',
    '강의 / 스터디 커리큘럼 소개',
    '컨퍼런스 / 이벤트 공식 안내',
    '로컬 브랜드 / 매장 소개서',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      setInputText(content);
    };
    reader.readAsText(file);
  };

  const handleSubmit = (useAi: boolean) => {
    if (!inputText.trim()) {
      alert('자료 텍스트를 입력하거나 파일을 업로드해주세요.');
      return;
    }
    onSubmitMaterial(inputText, {
      goal: siteGoal,
      themeStyle: selectedTheme,
      colorPalette: selectedColor,
      useAi,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">웹사이트 생성 자료 입력 & 선택</h2>
              <p className="text-xs text-neutral-400">
                원하는 자료를 붙여넣거나, 검증된 5가지 고품질 프리셋을 즉시 로드할 수 있습니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-neutral-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'custom'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>내 자료 직접 입력 / 파일 업로드</span>
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'presets'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>샘플 자료 프리셋 (5종)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-neutral-300">
          {activeTab === 'custom' ? (
            <div className="space-y-4">
              {/* Text Area & File Drop */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-neutral-200 flex items-center gap-1.5">
                    <span>자료 내용 (텍스트, 회의록, 기획서, 메모 등)</span>
                  </label>
                  <label className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 cursor-pointer">
                    <Upload className="w-3 h-3" />
                    <span>파일 불러오기 (.txt, .md, .json)</span>
                    <input
                      type="file"
                      accept=".txt,.md,.json,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {fileName && (
                  <div className="mb-2 px-3 py-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700 flex items-center justify-between text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{fileName}</span>
                    </span>
                    <button
                      onClick={() => setFileName(null)}
                      className="text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    >
                      제거
                    </button>
                  </div>
                )}

                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="여기에 웹사이트로 만들고 싶은 자료나 기획안 텍스트를 자유롭게 붙여넣으세요.&#10;&#10;예시:&#10;[새로운 프로젝트 기획서]&#10;- 목표: AI 기반 디자인 자동화 도구 런칭&#10;- 주요 기능: 1초 프로토타입 생성, 피그마 연동, 팀 협업&#10;- 요금: 월 19,000원&#10;- 출시일: 2026년 11월..."
                  rows={9}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3.5 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 font-mono text-xs leading-relaxed resize-none"
                />
              </div>

              {/* Goal & Preferences */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-semibold text-neutral-200 mb-1.5">
                    목적 및 용도
                  </label>
                  <select
                    value={siteGoal}
                    onChange={e => setSiteGoal(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-neutral-200 focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    {goalOptions.map(g => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-200 mb-1.5">
                    디자인 레이아웃 스타일
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTheme('modern-saas')}
                      className={`p-2 rounded-lg border text-left cursor-pointer ${
                        selectedTheme === 'modern-saas'
                          ? 'border-indigo-500 bg-indigo-950/40 text-white'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                      }`}
                    >
                      <div className="font-semibold">모던 SaaS</div>
                      <div className="text-[10px] text-neutral-500">제품 랜딩 & 서비스</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTheme('portfolio')}
                      className={`p-2 rounded-lg border text-left cursor-pointer ${
                        selectedTheme === 'portfolio'
                          ? 'border-indigo-500 bg-indigo-950/40 text-white'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                      }`}
                    >
                      <div className="font-semibold">포트폴리오</div>
                      <div className="text-[10px] text-neutral-500">작품 & 이력 쇼케이스</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                  <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>AI 심층 생성 또는 0.5초 즉시 변환 중 원하는 방식을 선택하세요.</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleSubmit(false)}
                    disabled={isGenerating || !inputText.trim()}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 font-semibold border border-neutral-700 transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>초고속 즉시 변환</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit(true)}
                    disabled={isGenerating || !inputText.trim()}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30 disabled:opacity-40 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI 심층 웹사이트 생성</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Presets Tab */
            <div className="space-y-3">
              <div className="text-neutral-400 text-xs mb-3">
                실제 비즈니스 현장에서 사용되는 5가지 완성형 자료 샘플입니다. 클릭 시 해당 자료로 생성된 웹사이트가 즉시 로드됩니다.
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {SAMPLE_MATERIALS.map(m => (
                  <div
                    key={m.id}
                    onClick={() => {
                      onSelectPreset(m.id);
                      onClose();
                    }}
                    className={`p-4 rounded-xl border transition-all text-left cursor-pointer group flex flex-col justify-between ${
                      activePresetId === m.id
                        ? 'border-indigo-500 bg-indigo-950/30 ring-1 ring-indigo-500/50'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-850'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {m.badge}
                        </span>
                        {activePresetId === m.id && (
                          <span className="text-indigo-400 text-xs font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 적용됨
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors mb-1.5">
                        {m.title}
                      </h4>
                      <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">
                        {m.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>{m.category}</span>
                      <span className="text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        불러오기 <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
