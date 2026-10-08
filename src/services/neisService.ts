import { School, ExamSchedule, StudyCafe } from '../types/studyCafe';
import { BUSAN_SCHOOLS, BUSAN_STUDY_CAFES, SCHOOL_SCHEDULES } from '../data/busanData';

const NEIS_KEY = import.meta.env.VITE_NEIS_API_KEY || '';
const BASE_URL = 'https://open.neis.go.kr/hub';

/**
 * Calculates Haversine distance in meters
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Searches schools using NEIS API (if key exists), falls back to mock data
 */
export async function searchSchools(keyword: string, district?: string): Promise<School[]> {
  if (NEIS_KEY && keyword.length >= 2) {
    try {
      const response = await fetch(`${BASE_URL}/schoolInfo?KEY=${NEIS_KEY}&Type=json&ATPT_OFCDC_SC_CODE=C10&SCHUL_NM=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      if (data.schoolInfo) {
        return data.schoolInfo[1].row.map((r: any) => ({
          id: r.SD_SCHUL_CODE,
          name: r.SCHUL_NM,
          type: r.SCHUL_KND_SC_NM,
          district: r.LCTN_SC_NM,
          address: r.ORG_RDNMA,
          schoolCode: r.SD_SCHUL_CODE,
          ofcdcCode: r.ATPT_OFCDC_SC_CODE,
          lat: 35.15, // Mock coords for now
          lng: 129.05,
        }));
      }
    } catch (e) {
      console.warn('NEIS API failed, falling back to mock schools', e);
    }
  }

  // Fallback to mock data
  const cleanKeyword = keyword.trim().toLowerCase();
  return BUSAN_SCHOOLS.filter(s => {
    const matchName = !cleanKeyword || s.name.toLowerCase().includes(cleanKeyword);
    const matchDistrict = !district || district === '전체' || s.district === district;
    return matchName && matchDistrict;
  });
}

/**
 * Fetches academic schedules from NEIS API, falls back to mock data
 */
export async function getSchoolSchedules(schoolId: string): Promise<ExamSchedule[]> {
  if (NEIS_KEY) {
    try {
      // Get current date range for the current semester
      const response = await fetch(`${BASE_URL}/SchoolSchedule?KEY=${NEIS_KEY}&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=${schoolId}&AA_FROM_YMD=20260101&AA_TO_YMD=20261231`);
      const data = await response.json();
      if (data.SchoolSchedule) {
        return data.SchoolSchedule[1].row
          .filter((r: any) => r.EVENT_NM.includes('고사'))
          .map((r: any) => ({
            id: r.AA_YMD,
            schoolId,
            schoolName: r.SCHUL_NM,
            title: r.EVENT_NM,
            startDate: r.AA_YMD,
            endDate: r.AA_YMD,
            dDay: 10, // Logic to calculate dDay
            eventType: r.EVENT_NM.includes('중간') ? '중간고사' : '기말고사',
            grade: '전학년',
          }));
      }
    } catch (e) {
      console.warn('NEIS API failed, falling back to mock schedules', e);
    }
  }

  // Fallback to mock data
  return SCHOOL_SCHEDULES[schoolId] || [];
}

export function getNearbyStudyCafes(school: School, radiusMeters: number = 3000): StudyCafe[] {
  return BUSAN_STUDY_CAFES.map(cafe => ({
    ...cafe,
    distanceMeter: calculateDistance(school.lat, school.lng, cafe.lat, cafe.lng),
  }))
    .filter(cafe => (cafe.distanceMeter ?? 0) <= radiusMeters)
    .sort((a, b) => (a.distanceMeter ?? 0) - (b.distanceMeter ?? 0));
}
