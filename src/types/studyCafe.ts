export interface School {
  id: string;
  name: string;
  type: '고등학교' | '중학교' | '대학교';
  district: string;
  address: string;
  schoolCode: string;
  ofcdcCode: string;
  lat: number;
  lng: number;
  studentCount?: number;
}

export interface ExamSchedule {
  id: string;
  schoolId: string;
  schoolName: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  dDay: number;
  eventType: '중간고사' | '기말고사' | '전국연합학력평가' | '수능';
  grade: string;
}

export interface StudyCafe {
  id: string;
  name: string;
  brand?: string;
  district: string;
  dong: string;
  address: string;
  lat: number;
  lng: number;
  distanceMeter?: number;
  totalSeats: number;
  availableSeats?: number;
  facilities: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  phone: string;
}

export interface HourlyTraffic {
  hour: number;
  label: string;
  congestionRate: number; // 0 ~ 100
  status: '여유' | '보통' | '혼잡';
  isOptimal: boolean;
}

export interface CongestionForecast {
  cafeId: string;
  cafeName: string;
  currentStatus: '여유' | '보통' | '혼잡';
  currentRate: number;
  overlappingSchoolsCount: number;
  overlappingExams: {
    schoolName: string;
    examTitle: string;
    period: string;
    daysRemaining: number;
  }[];
  hourlyTraffics: HourlyTraffic[];
  optimalHours: {
    start: string;
    end: string;
    reason: string;
  }[];
  weeklyCalendar: {
    date: string;
    dayName: string;
    status: '여유' | '보통' | '혼잡';
    predictedRate: number;
    hasExamOverlaps: boolean;
  }[];
}

export interface StudyTask {
  id: string;
  subject: string;
  title: string;
  targetMinutes: number;
  completedMinutes: number;
  done: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SubjectGoal {
  subject: string;
  targetScore: string;
  progressPercent: number;
  totalTasks: number;
  completedTasks: number;
}
