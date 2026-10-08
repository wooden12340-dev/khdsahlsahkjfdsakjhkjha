import React, { useState } from 'react';
import { X, Download, Copy, Check, Code, FileText, Globe } from 'lucide-react';
import { SiteData } from '../types/site';
import { generateStandaloneHtml, generateReactComponent, generateMarkdownDoc } from '../utils/exportHelper';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, siteData }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'html' | 'react' | 'markdown' | 'json'>('html');
  const [copied, setCopied] = useState(false);

  const htmlCode = generateStandaloneHtml(siteData);
  const reactCode = generateReactComponent(siteData);
  const markdownCode = generateMarkdownDoc(siteData);
  const jsonCode = JSON.stringify(siteData, null, 2);

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'html':
        return { code: htmlCode, ext: 'html', mime: 'text/html', filename: `${siteData.brandName.toLowerCase()}-landing.html` };
      case 'react':
        return { code: reactCode, ext: 'tsx', mime: 'text/typescript', filename: 'GeneratedLandingPage.tsx' };
      case 'markdown':
        return { code: markdownCode, ext: 'md', mime: 'text/markdown', filename: `${siteData.brandName.toLowerCase()}-summary.md` };
      case 'json':
        return { code: jsonCode, ext: 'json', mime: 'application/json', filename: 'site-data.json' };
    }
  };

  const handleCopy = () => {
    const { code } = getCurrentContent();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const { code, mime, filename } = getCurrentContent();
    const blob = new Blob([code], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">웹사이트 내보내기 & 다운로드</h3>
              <p className="text-xs text-neutral-400">
                원하는 형식의 코드를 복사하거나 단일 파일로 다운로드하여 바로 호스팅하세요.
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

        {/* Format Tabs */}
        <div className="px-6 pt-3 border-b border-neutral-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 font-semibold">
            <button
              onClick={() => setActiveTab('html')}
              className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'html' ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>독립 실행형 HTML</span>
            </button>
            <button
              onClick={() => setActiveTab('react')}
              className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'react' ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>React TSX 컴포넌트</span>
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'markdown' ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>마크다운 문서</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'json' ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>JSON 데이터</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 font-medium transition-colors border border-neutral-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료!' : '코드 복사'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>다운로드</span>
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="p-4 flex-1 overflow-hidden bg-neutral-950 flex flex-col">
          <pre className="flex-1 overflow-auto p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs leading-relaxed">
            <code>{getCurrentContent().code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
