import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Download,
  SlidersHorizontal,
  Edit3,
  Palette,
  Check,
  ChevronDown,
  Layers,
  RefreshCw,
} from 'lucide-react';
import { ColorPalette, ThemeStyle } from '../types/site';
import { SAMPLE_MATERIALS } from '../data/sampleMaterials';

interface StudioHeaderProps {
  currentBrand: string;
  themeStyle: ThemeStyle;
  colorPalette: ColorPalette;
  viewport: 'desktop' | 'tablet' | 'mobile';
  isEditMode: boolean;
  isGenerating: boolean;
  activePresetId?: string;
  onOpenMaterialModal: () => void;
  onSelectPreset: (presetId: string) => void;
  onChangeThemeStyle: (style: ThemeStyle) => void;
  onChangeColorPalette: (palette: ColorPalette) => void;
  onChangeViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  onToggleEditMode: () => void;
  onOpenVisibilityDrawer: () => void;
  onOpenExportModal: () => void;
  onRegenerate: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  currentBrand,
  themeStyle,
  colorPalette,
  viewport,
  isEditMode,
  isGenerating,
  activePresetId,
  onOpenMaterialModal,
  onSelectPreset,
  onChangeThemeStyle,
  onChangeColorPalette,
  onChangeViewport,
  onToggleEditMode,
  onOpenVisibilityDrawer,
  onOpenExportModal,
  onRegenerate,
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState(false);

  const themeStyleOptions: { id: ThemeStyle; label: string }[] = [
    { id: 'modern-saas', label: '모던 SaaS / 테크' },
    { id: 'portfolio', label: '크리에이티브 포트폴리오' },
    { id: 'academic', label: '아카데믹 / 클래스' },
    { id: 'cyberpunk', label: '서밋 & 컨퍼런스' },
    { id: 'editorial', label: '에디토리얼 / 브랜드' },
  ];

  const colorOptions: { id: ColorPalette; label: string; bg: string }[] = [
    { id: 'indigo', label: '인디고', bg: 'bg-indigo-500' },
    { id: 'emerald', label: '에메랄드', bg: 'bg-emerald-500' },
    { id: 'violet', label: '바이올렛', bg: 'bg-violet-500' },
    { id: 'amber', label: '앰버 골드', bg: 'bg-amber-500' },
    { id: 'rose', label: '로즈 핑크', bg: 'bg-rose-500' },
    { id: 'slate', label: '슬레이트', bg: 'bg-slate-400' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between text-xs text-neutral-300 select-none">
      {/* Brand & Document Name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm font-black text-sm">
            D
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
              <span>Doc2Site Studio</span>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                AI 빌더
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 truncate max-w-[180px] sm:max-w-[260px]">
              현재 자료: <span className="text-neutral-200 font-medium">{currentBrand}</span>
            </div>
          </div>
        </div>

        {/* Input Material Trigger Button */}
        <button
          onClick={onOpenMaterialModal}
          className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-sm shadow-indigo-600/30 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>자료 입력 / 교체</span>
        </button>

        {/* Preset Selector Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsPresetMenuOpen(!isPresetMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 transition-colors cursor-pointer"
          >
            <span>샘플 자료 (5종)</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {isPresetMenuOpen && (
            <div
              className="absolute left-0 mt-1.5 w-72 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl p-2 z-50 text-xs"
              onClick={() => setIsPresetMenuOpen(false)}
            >
              <div className="text-[11px] font-semibold text-neutral-400 px-2 py-1 mb-1">
                원하는 샘플 자료를 선택하세요
              </div>
              <div className="space-y-1">
                {SAMPLE_MATERIALS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => onSelectPreset(m.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors flex items-start gap-2 cursor-pointer ${
                      activePresetId === m.id
                        ? 'bg-indigo-950/70 text-indigo-200 border border-indigo-800/50'
                        : 'hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-100 line-clamp-1">{m.title}</div>
                      <div className="text-[10px] text-neutral-400">{m.badge}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Viewport switches & Regenerate */}
      <div className="hidden lg:flex items-center gap-2 bg-neutral-950/70 p-1 rounded-lg border border-neutral-800">
        <button
          onClick={() => onChangeViewport('desktop')}
          title="데스크톱 뷰 (100%)"
          className={`p-1.5 rounded transition-colors ${
            viewport === 'desktop' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onChangeViewport('tablet')}
          title="태블릿 뷰 (768px)"
          className={`p-1.5 rounded transition-colors ${
            viewport === 'tablet' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Tablet className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onChangeViewport('mobile')}
          title="모바일 뷰 (375px)"
          className={`p-1.5 rounded transition-colors ${
            viewport === 'mobile' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right Tools: Style, Sections, Edit Mode, Export */}
      <div className="flex items-center gap-2">
        {/* Quick Regenerate */}
        <button
          onClick={onRegenerate}
          disabled={isGenerating}
          title="웹사이트 재구성"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/80 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin text-indigo-400' : ''}`} />
          <span className="hidden sm:inline">{isGenerating ? '변환 중...' : '재생성'}</span>
        </button>

        {/* Style & Theme Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700/80 transition-colors cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">스타일</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {isThemeMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl p-3 z-50 text-xs">
              <div className="font-semibold text-neutral-300 mb-2">레이아웃 무드</div>
              <div className="space-y-1 mb-4">
                {themeStyleOptions.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onChangeThemeStyle(t.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      themeStyle === t.id ? 'bg-indigo-600 text-white font-medium' : 'hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    <span>{t.label}</span>
                    {themeStyle === t.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>

              <div className="font-semibold text-neutral-300 mb-2 pt-2 border-t border-neutral-800">
                악센트 컬러
              </div>
              <div className="grid grid-cols-6 gap-2">
                {colorOptions.map(c => (
                  <button
                    key={c.id}
                    onClick={() => onChangeColorPalette(c.id)}
                    title={c.label}
                    className={`w-7 h-7 rounded-full ${c.bg} flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                      colorPalette === c.id ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900' : ''
                    }`}
                  >
                    {colorPalette === c.id && <Check className="w-3 h-3 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section Visibility Drawer Toggle */}
        <button
          onClick={onOpenVisibilityDrawer}
          title="섹션 표시/숨김 설정"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700/80 transition-colors cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-neutral-400" />
          <span className="hidden md:inline">섹션</span>
        </button>

        {/* Live Edit Mode Toggle */}
        <button
          onClick={onToggleEditMode}
          title={isEditMode ? '실시간 편집 모드 끄기' : '텍스트 바로 수정하기'}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
            isEditMode
              ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/30'
              : 'bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/80'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isEditMode ? '편집 중' : '직접 수정'}</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-sm shadow-emerald-600/30 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">내보내기</span>
        </button>
      </div>
    </header>
  );
};
