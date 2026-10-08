import { StudyCafe, CongestionForecast, HourlyTraffic, School } from '../types/studyCafe';
import { BUSAN_SCHOOLS, SCHOOL_SCHEDULES } from '../data/busanData';
import { calculateDistance } from './neisService';

/**
 * Predict congestion for a selected study cafe based on nearby schools' exam overlaps
 */
export function predictCongestion(cafe: StudyCafe, selectedSchool?: School): CongestionForecast {
  // Find all schools within 2.5km of this study cafe
  const nearbySchools = BUSAN_SCHOOLS.filter(s => {
    const dist = calculateDistance(cafe.lat, cafe.lng, s.lat, s.lng);
    return dist <= 3000;
  });

  // Calculate overlapping exam periods
  const overlappingExams: {
    schoolName: string;
    examTitle: string;
    period: string;
    daysRemaining: number;
  }[] = [];

  nearbySchools.forEach(sch => {
    const schedules = SCHOOL_SCHEDULES[sch.id] || [];
    schedules.forEach(sc => {
      if (sc.dDay >= 0 && sc.dDay <= 21) {
        // Within 3 weeks of exam
        overlappingExams.push({
          schoolName: sch.name,
          examTitle: sc.title,
          period: `${sc.startDate.slice(5)} ~ ${sc.endDate.slice(5)}`,
          daysRemaining: sc.dDay,
        });
      }
    });
  });

  const overlapCount = overlappingExams.length;

  // Base congestion rate affected by overlapping schools
  // 1 school in exam: +20%, 2 schools: +40%, 3+ schools: +60%
  let baseRate = 35; // off-season standard
  if (overlapCount === 1) baseRate = 58;
  else if (overlapCount === 2) baseRate = 78;
  else if (overlapCount >= 3) baseRate = 89;

  // Add small pseudo-jitter based on cafe id
  const jitter = (cafe.id.charCodeAt(cafe.id.length - 1) % 7) - 3;
  const currentRate = Math.min(98, Math.max(15, baseRate + jitter));

  let currentStatus: '여유' | '보통' | '혼잡' = '보통';
  if (currentRate <= 45) currentStatus = '여유';
  else if (currentRate >= 75) currentStatus = '혼잡';

  // Generate 24-hour traffic projection curve
  const hourlyTraffics: HourlyTraffic[] = [];
  for (let h = 0; h < 24; h++) {
    let hourFactor = 0.2;
    // Typical study cafe pattern:
    // 02:00 ~ 07:00: very low (0.15)
    // 08:00 ~ 12:00: morning calm (0.35)
    // 13:00 ~ 17:00: afternoon build-up (0.65)
    // 17:00 ~ 22:30: peak after school & dinner (0.95)
    // 23:00 ~ 02:00: night owl quiet (0.45)
    if (h >= 2 && h < 7) hourFactor = 0.15;
    else if (h >= 7 && h < 11) hourFactor = 0.35;
    else if (h >= 11 && h < 16) hourFactor = 0.6;
    else if (h >= 16 && h < 22) hourFactor = 1.0;
    else if (h >= 22) hourFactor = 0.55;
    else hourFactor = 0.25;

    // Exam season lifts the baseline significantly
    const rate = Math.min(99, Math.round(currentRate * hourFactor));
    let status: '여유' | '보통' | '혼잡' = '여유';
    if (rate >= 75) status = '혼잡';
    else if (rate >= 46) status = '보통';

    const isOptimal = (h >= 7 && h <= 11) || (h >= 22 && h <= 24);

    hourlyTraffics.push({
      hour: h,
      label: `${String(h).padStart(2, '0')}:00`,
      congestionRate: rate,
      status,
      isOptimal,
    });
  }

  // Recommended Golden Visiting Hours
  const optimalHours = [
    {
      start: '08:00',
      end: '11:30',
      reason: '오전 집중 골든타임: 평균 좌석 점유율 32%로 가장 조용하고 쾌적한 학습 환경',
    },
    {
      start: '22:00',
      end: '02:00',
      reason: '심야 몰입 타임: 중·고등학생 귀가 후 성인 및 심야 열공족 위주로 차분한 분위기',
    },
  ];

  // 4-Week Calendar view (28 days ahead)
  const today = new Date(2026, 9, 8); // 2026-10-08
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const weeklyCalendar: CongestionForecast['weeklyCalendar'] = [];

  for (let i = 0; i < 28; i++) {
    const curDate = new Date(today);
    curDate.setDate(today.getDate() + i);

    const month = String(curDate.getMonth() + 1).padStart(2, '0');
    const day = String(curDate.getDate()).padStart(2, '0');
    const dayName = daysOfWeek[curDate.getDay()];
    const dateStr = `${month}.${day}`;

    // Peak exam week around 10.16 ~ 10.26
    const isExamPeak = curDate.getDate() >= 16 && curDate.getDate() <= 26 && curDate.getMonth() === 9;
    const isWeekend = curDate.getDay() === 0 || curDate.getDay() === 6;

    let predictedRate = 35;
    if (isExamPeak) {
      predictedRate = isWeekend ? 94 : 85;
    } else if (i < 8) {
      // 1 week before exams
      predictedRate = isWeekend ? 76 : 64;
    } else {
      predictedRate = isWeekend ? 60 : 42;
    }

    let status: '여유' | '보통' | '혼잡' = '보통';
    if (predictedRate <= 45) status = '여유';
    else if (predictedRate >= 75) status = '혼잡';

    weeklyCalendar.push({
      date: dateStr,
      dayName,
      status,
      predictedRate,
      hasExamOverlaps: isExamPeak,
    });
  }

  return {
    cafeId: cafe.id,
    cafeName: cafe.name,
    currentStatus,
    currentRate,
    overlappingSchoolsCount: overlapCount,
    overlappingExams,
    hourlyTraffics,
    optimalHours,
    weeklyCalendar,
  };
}
