import React, { useState, useEffect } from 'react';
import { School, StudyCafe, ExamSchedule, SubjectGoal, StudyTask } from '../../types/studyCafe';
import { generatePersonalizedStudyPlan } from '../../services/aiPlannerService';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  ArrowLeft,
  Flame,
  CheckSquare,
} from 'lucide-react';

interface StudyPlannerStepProps {
  selectedSchool: School;
  selectedCafe: StudyCafe | null;
  examSchedule: ExamSchedule | null;
  onBackToStep3: () => void;
}

export const StudyPlannerStep: React.FC<StudyPlannerStepProps> = ({
  selectedSchool,
  selectedCafe,
  examSchedule,
  onBackToStep3,
}) => {
  const dDay = examSchedule?.dDay || 11;
  const examTitle = examSchedule?.title || '2학기 중간고사';

  // Goals & Tasks state
  const [goals, setGoals] = useState<SubjectGoal[]>([
    { subject: '수학', targetScore: '1등급 (96점)', progressPercent: 50, totalTasks: 4, completedTasks: 2 },
    { subject: '영어', targetScore: '1등급 (95점)', progressPercent: 65, totalTasks: 3, completedTasks: 2 },
    { subject: '국어', targetScore: '1등급 (92점)', progressPercent: 40, totalTasks: 4, completedTasks: 1 },
    { subject: '탐구', targetScore: '만점 (50점)', progressPercent: 55, totalTasks: 4, completedTasks: 2 },
  ]);

  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: 't-1',
      subject: '수학',
      title: '미적분 3개년 수능 및 학평 기출 킬러문항 30제 오답 풀이',
      targetMinutes: 90,
      completedMinutes: 90,
      done: true,
      priority: 'high',
      dueDate: '2026-10-09',
    },
    {
      id: 't-2',
      subject: '영어',
      title: 'EBS 수능특강 12~15강 핵심 구문 분석 및 어법 변형 문제 풀이',
      targetMinutes: 60,
      completedMinutes: 60,
      done: true,
      priority: 'high',
      dueDate: '2026-10-09',
    },
    {
      id: 't-3',
      subject: '국어',
      title: '독서 철학/과학 제재 기출 지문 문단별 요약 및 시간 단축 훈련',
      targetMinutes: 70,
      completedMinutes: 20,
      done: false,
      priority: 'high',
      dueDate: '2026-10-10',
    },
    {
      id: 't-4',
      subject: '탐구',
      title: '생명과학 유전 가계도 분석 알고리즘 20제 실전 연습',
      targetMinutes: 80,
      completedMinutes: 0,
      done: false,
      priority: 'medium',
      dueDate: '2026-10-11',
    },
    {
      id: 't-5',
      subject: '수학',
      title: '전 범위 실전 모의고사 1회 (100분) 실전 시간 관리 훈련',
      targetMinutes: 100,
      completedMinutes: 0,
      done: false,
      priority: 'high',
      dueDate: '2026-10-12',
    },
  ]);

  const [coachingAdvice, setCoachingAdvice] = useState<string>(
    `${selectedSchool.name} ${examTitle}까지 남은 D-${dDay}일은 취약 과목 개념 점검과 실전 기출 문제풀이를 병행할 최적의 시기입니다. 스터디카페의 오전 골든타임(08:00~11:30)을 활용해 집중력을 유지하세요!`
  );

  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('전체');

  // New task input
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('수학');
  const [newTaskMinutes, setNewTaskMinutes] = useState(60);

  // Pomodoro Study Timer (25min / 5min)
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'study' | 'break'>('study');

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (timerMode === 'study') {
        alert('🎉 25분 집중 세션 완료! 5분간 휴식을 취하세요.');
        setTimerMode('break');
        setTimerSeconds(5 * 60);
      } else {
        alert('🔔 휴식 종료! 다시 집중 학습을 시작하세요.');
        setTimerMode('study');
        setTimerSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const nextDone = !t.done;
          return {
            ...t,
            done: nextDone,
            completedMinutes: nextDone ? t.targetMinutes : 0,
          };
        }
        return t;
      })
    );
  };

  // Add task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: StudyTask = {
      id: `task-${Date.now()}`,
      subject: newTaskSubject,
      title: newTaskTitle.trim(),
      targetMinutes: newTaskMinutes,
      completedMinutes: 0,
      done: false,
      priority: 'high',
      dueDate: '2026-10-15',
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Generate with AI
  const handleAiPlanGenerate = async () => {
    setIsGeneratingAi(true);
    try {
      const plan = await generatePersonalizedStudyPlan(
        selectedSchool.name,
        examTitle,
        dDay,
        ['국어', '수학', '영어', '탐구']
      );
      setGoals(plan.subjectGoals);
      setTasks(plan.tasks);
      setCoachingAdvice(plan.advice);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Overall statistics
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(t => t.done).length;
  const overallProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  const totalTargetMinutes = tasks.reduce((acc, t) => acc + t.targetMinutes, 0);
  const totalCompletedMinutes = tasks.reduce((acc, t) => acc + t.completedMinutes, 0);

  const filteredTasks = tasks.filter(
    t => selectedSubjectFilter === '전체' || t.subject === selectedSubjectFilter
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner with D-Day Dashboard */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
          <div>
            <div className="text-xs font-bold text-indigo-400 tracking-wider uppercase mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              STEP 4. D-DAY 기반 개인화 학습 플래너
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedSchool.name} {examTitle} 실전 대비 플래너
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              시험 D-Day와 남은 기간에 맞춰 과목별 목표를 수립하고 일일 학습 태스크를 관리하세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onBackToStep3}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>혼잡도 분석 다시보기</span>
            </button>

            <button
              onClick={handleAiPlanGenerate}
              disabled={isGeneratingAi}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 ${isGeneratingAi ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAi ? 'AI 플랜 생성 중...' : 'AI 맞춤형 학습 플랜 자동 생성'}</span>
            </button>
          </div>
        </div>

        {/* D-Day & Progress Stats Bar */}
        <div className="pt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400 font-medium">시험 D-Day 카운트다운</div>
              <div className="text-3xl font-black text-indigo-400 mt-0.5">D-{dDay}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400 font-medium">전체 학습 달성률</div>
              <div className="text-3xl font-black text-emerald-400 mt-0.5">{overallProgress}%</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400 font-medium">완료 학습 시간 / 목표</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {Math.round(totalCompletedMinutes / 60)}h{' '}
                <span className="text-xs font-normal text-neutral-400">/ {Math.round(totalTargetMinutes / 60)}h</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400 font-medium">지정 스터디카페</div>
              <div className="text-sm font-bold text-neutral-200 mt-1 truncate max-w-[130px]">
                {selectedCafe?.name || '카페 미선택'}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </div>

        {/* AI Coaching Callout */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-950/70 to-purple-950/40 border border-indigo-800/60 text-xs text-neutral-300 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-indigo-200">AI 학습 코치 가이드: </span>
            <span>{coachingAdvice}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Subject Goals + Checklist & Pomodoro Timer */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Subject Goals & Task Checklist */}
        <div className="lg:col-span-8 space-y-6">
          {/* Subject Goals Bar */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>과목별 목표 성적 & 진행률</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {goals.map((g, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{g.subject}</span>
                    <span className="text-indigo-400 font-semibold">{g.targetScore}</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${g.progressPercent}%` }}
                      className="bg-indigo-500 h-full rounded-full transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>진행률: {g.progressPercent}%</span>
                    <span>태스크 {g.completedTasks}/{g.totalTasks} 완료</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Checklist & Task Creator */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>시험 대비 일일 학습 태스크 ({completedTasksCount}/{totalTasksCount})</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  스터디카페 방문 시 집중적으로 끝낼 공부 항목을 체크하세요.
                </p>
              </div>

              {/* Subject Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {['전체', '수학', '영어', '국어', '탐구'].map(sub => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubjectFilter(sub)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      selectedSubjectFilter === sub
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Task Add Form */}
            <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2 text-xs">
              <select
                value={newTaskSubject}
                onChange={e => setNewTaskSubject(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-neutral-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="수학">수학</option>
                <option value="영어">영어</option>
                <option value="국어">국어</option>
                <option value="탐구">탐구</option>
                <option value="기타">기타</option>
              </select>

              <input
                type="text"
                placeholder="새로운 공부 태스크를 입력하세요 (예: 2단원 핵심 유형 20문제 풀이)..."
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
              />

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={newTaskMinutes}
                  onChange={e => setNewTaskMinutes(Number(e.target.value))}
                  className="w-20 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-center text-white focus:outline-none focus:border-indigo-500"
                  title="목표 소요 시간 (분)"
                />
                <span className="text-neutral-400 text-xs">분</span>

                <button
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>추가</span>
                </button>
              </div>
            </form>

            {/* Tasks List */}
            <div className="space-y-2.5">
              {filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                    task.done
                      ? 'bg-neutral-950/40 border-neutral-800/60 opacity-60'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div
                    onClick={() => handleToggleTask(task.id)}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    {task.done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-500 shrink-0 hover:text-indigo-400 transition-colors" />
                    )}

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[11px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {task.subject}
                        </span>
                        <span
                          className={`font-semibold text-sm ${
                            task.done ? 'line-through text-neutral-500' : 'text-neutral-100'
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-3">
                        <span>목표 시간: {task.targetMinutes}분</span>
                        <span>기한: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="태스크 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pomodoro Focus Timer & Cafe Study Session */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pomodoro Timer */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 text-center">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>뽀모도로 몰입 타이머</span>
              </span>
              <span className={`font-semibold px-2 py-0.5 rounded ${timerMode === 'study' ? 'bg-indigo-950 text-indigo-300' : 'bg-emerald-950 text-emerald-300'}`}>
                {timerMode === 'study' ? '집중 세션 (25분)' : '휴식 세션 (5분)'}
              </span>
            </div>

            {/* Large Clock Display */}
            <div className="py-4">
              <div className="text-5xl sm:text-6xl font-mono font-black text-white tracking-tight">
                {formatTimer(timerSeconds)}
              </div>
              <div className="text-xs text-neutral-400 mt-2">
                {timerMode === 'study' ? '스마트폰을 멀리하고 집중하세요' : '스트레칭을 하고 눈을 쉬어주세요'}
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md cursor-pointer ${
                  isTimerRunning
                    ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? '일시정지' : '타이머 시작'}</span>
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(timerMode === 'study' ? 25 * 60 : 5 * 60);
                }}
                className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 transition-colors cursor-pointer"
                title="타이머 리셋"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Today Study Cafe Visit Card */}
          {selectedCafe && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-xs">
              <div className="font-bold text-white flex items-center justify-between pb-3 border-b border-neutral-800">
                <span>오늘 방문할 스터디카페</span>
                <span className="text-emerald-400 font-semibold">{selectedCafe.distanceMeter}m</span>
              </div>

              <div>
                <h4 className="font-bold text-base text-white">{selectedCafe.name}</h4>
                <p className="text-neutral-400 text-xs mt-0.5">{selectedCafe.address}</p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <div className="text-neutral-400">추천 방문 골든타임:</div>
                <div className="text-emerald-400 font-bold text-sm">오전 08:00 ~ 11:30</div>
                <div className="text-[11px] text-neutral-400">
                  주변 {selectedSchool.name} 학생 하교 전 가장 여유롭게 집중 가능
                </div>
              </div>

              <div className="text-neutral-400 flex items-center justify-between pt-1">
                <span>문의 및 예약:</span>
                <span className="font-mono text-neutral-200">{selectedCafe.phone}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
