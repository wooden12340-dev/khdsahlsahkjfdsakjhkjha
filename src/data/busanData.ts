import { School, ExamSchedule, StudyCafe } from '../types/studyCafe';

export const DISTRICT_STATS = [
  { rank: 1, district: '해운대구', count: 91, lat: 35.1631, lng: 129.1636 },
  { rank: 2, district: '부산진구', count: 61, lat: 35.1628, lng: 129.0532 },
  { rank: 3, district: '금정구', count: 61, lat: 35.2430, lng: 129.0921 },
  { rank: 4, district: '북구', count: 59, lat: 35.1970, lng: 128.9903 },
  { rank: 5, district: '남구', count: 57, lat: 35.1365, lng: 129.0842 },
  { rank: 6, district: '사하구', count: 52, lat: 35.1044, lng: 128.9749 },
  { rank: 7, district: '동래구', count: 43, lat: 35.2048, lng: 129.0837 },
  { rank: 8, district: '연제구', count: 40, lat: 35.1762, lng: 129.0797 },
  { rank: 9, district: '강서구', count: 34, lat: 35.2122, lng: 128.9805 },
  { rank: 10, district: '기장군', count: 33, lat: 35.2445, lng: 129.2224 },
  { rank: 11, district: '사상구', count: 31, lat: 35.1526, lng: 128.9912 },
  { rank: 12, district: '수영구', count: 23, lat: 35.1456, lng: 129.1132 },
  { rank: 13, district: '동구', count: 21, lat: 35.1293, lng: 129.0454 },
  { rank: 14, district: '영도구', count: 14, lat: 35.0912, lng: 129.0679 },
  { rank: 15, district: '중구', count: 10, lat: 35.1062, lng: 129.0324 },
];

export const BUSAN_SCHOOLS: School[] = [
  // 해운대구
  { id: 'sch-01', name: '센텀고등학교', type: '고등학교', district: '해운대구', address: '부산광역시 해운대구 센텀중앙로 170', schoolCode: '7150198', ofcdcCode: 'C10', lat: 35.1785, lng: 129.1278, studentCount: 820 },
  { id: 'sch-02', name: '해운대고등학교', type: '고등학교', district: '해운대구', address: '부산광역시 해운대구 우동1로 98', schoolCode: '7150112', ofcdcCode: 'C10', lat: 35.1664, lng: 129.1558, studentCount: 650 },
  { id: 'sch-03', name: '양운고등학교', type: '고등학교', district: '해운대구', address: '부산광역시 해운대구 좌동순환로 217', schoolCode: '7150167', ofcdcCode: 'C10', lat: 35.1741, lng: 129.1764, studentCount: 780 },
  { id: 'sch-20', name: '부흥고등학교', type: '고등학교', district: '해운대구', address: '부산광역시 해운대구 좌동순환로 415', schoolCode: '7150165', ofcdcCode: 'C10', lat: 35.1712, lng: 129.1824, studentCount: 750 },
  // 부산진구
  { id: 'sch-07', name: '부산진고등학교', type: '고등학교', district: '부산진구', address: '부산광역시 부산진구 진남로 328', schoolCode: '7150058', ofcdcCode: 'C10', lat: 35.1589, lng: 129.0674, studentCount: 740 },
  { id: 'sch-21', name: '개성고등학교', type: '고등학교', district: '부산진구', address: '부산광역시 부산진구 당감서로 130', schoolCode: '7150005', ofcdcCode: 'C10', lat: 35.1632, lng: 129.0375, studentCount: 700 },
  // 금정구
  { id: 'sch-08', name: '남산고등학교', type: '고등학교', district: '금정구', address: '부산광역시 금정구 금강로 685', schoolCode: '7150143', ofcdcCode: 'C10', lat: 35.2678, lng: 129.0872, studentCount: 810 },
  { id: 'sch-22', name: '부산과학고등학교', type: '고등학교', district: '금정구', address: '부산광역시 금정구 두구동 1018', schoolCode: '7150001', ofcdcCode: 'C10', lat: 35.2798, lng: 129.1023, studentCount: 400 },
  // 남구
  { id: 'sch-09', name: '대연고등학교', type: '고등학교', district: '남구', address: '부산광역시 남구 용소로 64', schoolCode: '7150155', ofcdcCode: 'C10', lat: 35.1328, lng: 129.0982, studentCount: 790 },
  { id: 'sch-23', name: '용호고등학교', type: '고등학교', district: '남구', address: '부산광역시 남구 용호로 167', schoolCode: '7150195', ofcdcCode: 'C10', lat: 35.1275, lng: 129.1121, studentCount: 720 },
  // 연제구
  { id: 'sch-04', name: '부산외국어고등학교', type: '고등학교', district: '연제구', address: '부산광역시 연제구 연산로 115', schoolCode: '7150089', ofcdcCode: 'C10', lat: 35.1856, lng: 129.0825, studentCount: 720 },
  { id: 'sch-24', name: '이사벨고등학교', type: '고등학교', district: '연제구', address: '부산광역시 연제구 과정로 179', schoolCode: '7150085', ofcdcCode: 'C10', lat: 35.1812, lng: 129.0955, studentCount: 680 },
  // 동래구
  { id: 'sch-05', name: '동래고등학교', type: '고등학교', district: '동래구', address: '부산광역시 동래구 충렬대로 350', schoolCode: '7150034', ofcdcCode: 'C10', lat: 35.2012, lng: 129.0912, studentCount: 890 },
  { id: 'sch-25', name: '사직고등학교', type: '고등학교', district: '동래구', address: '부산광역시 동래구 사직북로 63', schoolCode: '7150178', ofcdcCode: 'C10', lat: 35.1955, lng: 129.0725, studentCount: 850 },
  // 동구
  { id: 'sch-06', name: '부산고등학교', type: '고등학교', district: '동구', address: '부산광역시 동구 초량상로 86', schoolCode: '7150021', ofcdcCode: 'C10', lat: 35.1189, lng: 129.0384, studentCount: 710 },
  // 사하구
  { id: 'sch-10', name: '동아고등학교', type: '고등학교', district: '사하구', address: '부산광역시 사하구 제석로 115', schoolCode: '7150045', ofcdcCode: 'C10', lat: 35.1112, lng: 128.9890, studentCount: 850 },
  { id: 'sch-26', name: '부산일과학고등학교', type: '고등학교', district: '사하구', address: '부산광역시 사하구 다대낙조2길 99', schoolCode: '7150199', ofcdcCode: 'C10', lat: 35.0512, lng: 128.9745, studentCount: 420 },
  // 북구
  { id: 'sch-27', name: '낙동고등학교', type: '고등학교', district: '북구', address: '부산광역시 북구 금곡대로 353', schoolCode: '7150180', ofcdcCode: 'C10', lat: 35.2345, lng: 129.0012, studentCount: 760 },
  // 강서구
  { id: 'sch-28', name: '부산강서고등학교', type: '고등학교', district: '강서구', address: '부산광역시 강서구 명지국제8로 235', schoolCode: '7150185', ofcdcCode: 'C10', lat: 35.1055, lng: 128.9125, studentCount: 690 },
  // 대학
  { id: 'sch-11', name: '부산대학교', type: '대학교', district: '금정구', address: '부산광역시 금정구 부산대학로63번길 2', schoolCode: 'UNIV-PNU', ofcdcCode: 'C10', lat: 35.2332, lng: 129.0792, studentCount: 26000 },
  { id: 'sch-12', name: '부경대학교 (대연캠퍼스)', type: '대학교', district: '남구', address: '부산광역시 남구 용소로 45', schoolCode: 'UNIV-PKNU', ofcdcCode: 'C10', lat: 35.1336, lng: 129.1061, studentCount: 21000 },
];

export const SCHOOL_SCHEDULES: Record<string, ExamSchedule[]> = {
  'sch-01': [
    {
      id: 'ex-01',
      schoolId: 'sch-01',
      schoolName: '센텀고등학교',
      title: '2학기 중간고사',
      startDate: '2026-10-19',
      endDate: '2026-10-23',
      dDay: 11,
      eventType: '중간고사',
      grade: '1, 2, 3학년',
    },
    {
      id: 'ex-02',
      schoolId: 'sch-01',
      schoolName: '센텀고등학교',
      title: '2학기 기말고사',
      startDate: '2026-12-14',
      endDate: '2026-12-18',
      dDay: 67,
      eventType: '기말고사',
      grade: '1, 2학년',
    },
  ],
  'sch-02': [
    {
      id: 'ex-03',
      schoolId: 'sch-02',
      schoolName: '해운대고등학교',
      title: '2학기 중간고사',
      startDate: '2026-10-21',
      endDate: '2026-10-24',
      dDay: 13,
      eventType: '중간고사',
      grade: '전학년',
    },
  ],
  'sch-03': [
    {
      id: 'ex-04',
      schoolId: 'sch-03',
      schoolName: '양운고등학교',
      title: '2학기 중간고사',
      startDate: '2026-10-20',
      endDate: '2026-10-24',
      dDay: 12,
      eventType: '중간고사',
      grade: '1, 2, 3학년',
    },
  ],
  'sch-04': [
    {
      id: 'ex-05',
      schoolId: 'sch-04',
      schoolName: '부산외국어고등학교',
      title: '2학기 중간평가',
      startDate: '2026-10-16',
      endDate: '2026-10-20',
      dDay: 8,
      eventType: '중간고사',
      grade: '전학년',
    },
  ],
  'sch-05': [
    {
      id: 'ex-06',
      schoolId: 'sch-05',
      schoolName: '동래고등학교',
      title: '2학기 1차 지필평가',
      startDate: '2026-10-22',
      endDate: '2026-10-26',
      dDay: 14,
      eventType: '중간고사',
      grade: '1, 2학년',
    },
  ],
  'sch-06': [
    {
      id: 'ex-07',
      schoolId: 'sch-06',
      schoolName: '부산고등학교',
      title: '2학기 중간고사',
      startDate: '2026-10-19',
      endDate: '2026-10-23',
      dDay: 11,
      eventType: '중간고사',
      grade: '1, 2, 3학년',
    },
  ],
  'sch-07': [
    {
      id: 'ex-08',
      schoolId: 'sch-07',
      schoolName: '부산진고등학교',
      title: '2학기 중간평가',
      startDate: '2026-10-20',
      endDate: '2026-10-23',
      dDay: 12,
      eventType: '중간고사',
      grade: '전학년',
    },
  ],
  'sch-08': [
    {
      id: 'ex-09',
      schoolId: 'sch-08',
      schoolName: '남산고등학교',
      title: '2학기 1차 정기지필평가',
      startDate: '2026-10-26',
      endDate: '2026-10-29',
      dDay: 18,
      eventType: '중간고사',
      grade: '전학년',
    },
  ],
  'sch-09': [
    {
      id: 'ex-10',
      schoolId: 'sch-09',
      schoolName: '대연고등학교',
      title: '2학기 중간고사',
      startDate: '2026-10-20',
      endDate: '2026-10-23',
      dDay: 12,
      eventType: '중간고사',
      grade: '1, 2, 3학년',
    },
  ],
  'sch-10': [
    {
      id: 'ex-11',
      schoolId: 'sch-10',
      schoolName: '동아고등학교',
      title: '2학기 중간고사',
      startDate: '2026-10-19',
      endDate: '2026-10-22',
      dDay: 11,
      eventType: '중간고사',
      grade: '전학년',
    },
  ],
  'sch-11': [
    {
      id: 'ex-12',
      schoolId: 'sch-11',
      schoolName: '부산대학교',
      title: '2학기 중간시험 기간',
      startDate: '2026-10-19',
      endDate: '2026-10-24',
      dDay: 11,
      eventType: '중간고사',
      grade: '학부 전체',
    },
  ],
  'sch-12': [
    {
      id: 'ex-13',
      schoolId: 'sch-12',
      schoolName: '부경대학교 (대연캠퍼스)',
      title: '2학기 중간고사 주간',
      startDate: '2026-10-20',
      endDate: '2026-10-25',
      dDay: 12,
      eventType: '중간고사',
      grade: '학부 전체',
    },
  ],
};

export const BUSAN_STUDY_CAFES: StudyCafe[] = [
  { id: 'cafe-01', name: '광해', brand: '', district: '영도구', dong: '동삼2동', address: '부산광역시 영도구 태종로 714', lat: 35.0713, lng: 129.0777, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-02', name: '엘리트21프리미엄스터디카페', brand: '', district: '서구', dong: '동대신3동', address: '부산광역시 서구 보수대로 242', lat: 35.1159, lng: 129.0180, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-03', name: '몬스터리스터디카페', brand: '', district: '사하구', dong: '감천1동', address: '부산광역시 사하구 감천로 61', lat: 35.0902, lng: 128.9994, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-04', name: '은하독서실', brand: '', district: '북구', dong: '구포1동', address: '부산광역시 북구 시랑로 33', lat: 35.2026, lng: 129.0046, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-05', name: '송이고시원', brand: '', district: '북구', dong: '금곡동', address: '부산광역시 북구 금곡대로616번길 9', lat: 35.2624, lng: 129.0153, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-06', name: '스키마스터디카페', brand: '덕천점', district: '북구', dong: '덕천2동', address: '부산광역시 북구 덕천로 31', lat: 35.2081, lng: 129.0082, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-07', name: '부산멘토즈스터디카페', brand: '남천점', district: '수영구', dong: '남천1동', address: '부산광역시 수영구 수영로408번길 36', lat: 35.1414, lng: 129.1098, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-08', name: '공부인스터디카페벡스코센터', brand: '해운대', district: '해운대구', dong: '우2동', address: '부산광역시 해운대구 해운대로 407', lat: 35.1678, lng: 129.1407, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-09', name: '르하임스터디카페부산', brand: '동아대점', district: '사하구', dong: '하단2동', address: '부산광역시 사하구 낙동대로 551', lat: 35.1128, lng: 128.9637, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-10', name: '골든브릿지스터디카페토곡점', brand: '', district: '연제구', dong: '연산8동', address: '부산광역시 연제구 과정로 282-1', lat: 35.1884, lng: 129.0965, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-11', name: '독서실/스터디카페', brand: '', district: '영도구', dong: '동삼1동', address: '부산광역시 영도구 동삼로 79', lat: 35.0805, lng: 129.0703, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-12', name: '와이매쓰프리미엄스터디카페', brand: '', district: '남구', dong: '용호1동', address: '부산광역시 남구 동명로117번길 82', lat: 35.1234, lng: 129.1106, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-13', name: '멘토즈스터디카페', brand: '부산대연점', district: '남구', dong: '대연5동', address: '부산광역시 남구 못골로41번길 6', lat: 35.1361, lng: 129.0872, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-14', name: '셀독24스터디카페', brand: '경성대점', district: '남구', dong: '대연3동', address: '부산광역시 남구 수영로 300', lat: 35.1367, lng: 129.0992, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-15', name: '센텀스터디카페', brand: '', district: '해운대구', dong: '우2동', address: '부산광역시 해운대구 해운대로 313', lat: 35.1730, lng: 129.1326, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-16', name: '멘토즈스터디카페', brand: '', district: '북구', dong: '만덕2동', address: '부산광역시 북구 만덕2로44번길 57', lat: 35.2105, lng: 129.0345, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-17', name: '플랜트스터디카페개금라운지', brand: '', district: '부산진구', dong: '개금1동', address: '부산광역시 부산진구 엄광로 35', lat: 35.1484, lng: 129.0199, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-18', name: '청춘멘토', brand: '', district: '금정구', dong: '장전2동', address: '부산광역시 금정구 금강로 271-5', lat: 35.2323, lng: 129.0850, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-19', name: '엣', brand: '', district: '금정구', dong: '장전1동', address: '부산광역시 금정구 부산대학로64번안길 7', lat: 35.2357, lng: 129.0852, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] },
  { id: 'cafe-20', name: '마이플레이스멤버쉽스터디카페', brand: '', district: '북구', dong: '구포3동', address: '부산광역시 북구 시랑로 72', lat: 35.1993, lng: 129.0046, totalSeats: 50, hourlyRate: 2000, rating: 4.0, reviewCount: 1, phone: '', facilities: [] }
];
