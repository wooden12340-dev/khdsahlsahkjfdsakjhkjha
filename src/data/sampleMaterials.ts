import { SampleMaterial, SiteData } from '../types/site';

export const SAMPLE_MATERIALS: SampleMaterial[] = [
  {
    id: 'study-cafe-prd',
    title: '공부명당 (StudySpot AI) - 스터디 카페 혼잡도 예측 & 학습 플래너 PRD',
    badge: '추천 / PRD 명세서',
    category: '에듀테크 & 공공데이터',
    summary: 'NEIS 학사일정 공공 API와 소상공인 R10202 상권 데이터를 결합한 스터디카페 혼잡도 예측 및 D-Day 학습 플래너 제품 요구사항 정의서입니다.',
    themeStyle: 'modern-saas',
    colorPalette: 'emerald',
    rawText: `제품 요구사항 정의서 (PRD): 스터디 카페 혼잡도 예측 및 학습 플래너 웹 서비스
1. 개요 (Overview)
본 서비스는 공공 학사 일정 데이터를 활용하여 스터디 카페 주변 학교들의 시험 기간을 파악하고, 이를 바탕으로 스터디 카페의 혼잡도를 예측하는 웹 사이트입니다. 사용자는 혼잡도를 피할 수 있는 최적의 방문 시간을 추천받으며, 다가오는 시험 일정에 맞춘 개인화된 학습 플래너 기능을 통해 효율적으로 공부 일정을 관리할 수 있습니다.

2. 목표 (Goals)
- 혼잡도 예측: 주변 학교들의 시험 기간 데이터를 기반으로 스터디 카페의 예상 혼잡도를 제공.
- 최적 방문 시간 안내: 트래픽 및 혼잡도 예측 데이터를 통해 사용자가 방문하기 가장 좋은 시간(가장 여유로운 시간)을 추천.
- 학습 스케줄러: 시험까지 남은 시간을 시각적으로 보여주고(D-Day), 학습 계획을 수립할 수 있는 개인 맞춤형 플래너 제공.

3. 핵심 타겟 사용자 (Target Audience)
- 스터디 카페를 자주 이용하는 중/고등학생 및 대학생
- 혼잡한 환경을 피하고 쾌적하게 공부하고 싶은 스터디 카페 이용자
- 체계적으로 시험 공부 스케줄을 관리하고자 하는 학생

4. 핵심 기능 요구사항 (Key Features)
- 4.1. 학교 선택 및 학사 일정 조회 (Step 1): 초/중/고/대학교 검색, NEIS API 시험 일정 자동 수집, D-Day 표시
- 4.2. 인근 스터디카페 탐색 (Step 2): 반경 1km~3km 탐색, 소상공인시장진흥공단 R10202 데이터
- 4.3. 혼잡도 예측 및 최적 방문 시간 추천 (Step 3): 시험 중복 분석, 여유🟢/보통🟡/혼잡🔴, 골든타임 추천, 4주 캘린더
- 4.4. D-Day 기반 학습 플래너 (Step 4): 시험 자동 등록, 과목별 목표, 체크리스트, 뽀모도로 타이머

5. 데이터 명세
- 나이스(NEIS) 학사일정 Open API (SchoolSchedule)
- 나이스(NEIS) 학교 기본정보 Open API (schoolInfo)
- 소상공인시장진흥공단 상가(상권)정보 R10202 독서실/스터디카페 (부산 630개소)`,
    presetData: {
      siteTitle: '공부명당 (StudySpot AI) - 스터디카페 혼잡도 예측 & D-Day 플래너',
      brandName: '공부명당',
      tagline: '학교별 시험 기간 데이터를 분석해 가장 여유로운 공부 시간을 찾아드립니다',
      category: '에듀테크 & 공공데이터',
      themeStyle: 'modern-saas',
      colorPalette: 'emerald',
      hero: {
        badge: '⚡ NEIS 학사일정 & 소상공인 R10202 데이터 실시간 분석',
        headline: '시험 기간에도 자리 걱정 끝, 가장 한적한 골든타임을 추천합니다',
        subheadline: '주변 학교들의 중간고사·기말고사 일정을 자동 수집하여 스터디카페의 혼잡도를 예측하고, D-Day에 맞춘 개인화 학습 스케줄을 원스톱으로 관리하세요.',
        primaryCta: '내 학교 검색하고 혼잡도 보기',
        secondaryCta: 'D-Day 학습 플래너 시작',
        highlights: ['부산 630개소 스터디카페 데이터베이스', 'NEIS 학사일정 실시간 자동 연동', 'AI 맞춤형 학습 플랜 생성']
      },
      overview: {
        title: '왜 시험 기간마다 스터디카페 자리가 부족할까요?',
        summary: '인근 학교들의 시험 기간이 겹치는 순간 스터디카페 트래픽은 380% 급증합니다. 공부명당은 공공 데이터를 기반으로 시험 중복 지수를 분석하여 쾌적하게 공부할 수 있는 최적의 시간대를 찾아드립니다.',
        keyTakeaways: [
          'NEIS Open API 기반 전국 및 부산 초/중/고 시험 일정 자동 조회',
          '반경 1km~3km 내 스터디카페 실시간 거리 및 시설 탐색',
          '시간대별 혼잡도 예측 곡선 및 오전/심야 골든타임 안내',
          '시험 D-Day 카운트다운과 연동되는 과목별 맞춤 학습 플래너'
        ]
      },
      features: [
        {
          id: 'feat-1',
          title: 'NEIS 학사일정 자동 수집 & D-Day',
          description: '학교명 검색 한 번으로 1학기/2학기 중간고사, 기말고사, 전국연합학력평가 일정이 플래너와 혼잡도 엔진에 자동 등록됩니다.',
          category: '공공데이터 연동',
          highlight: '자동 스케줄링'
        },
        {
          id: 'feat-2',
          title: '반경 기반 스터디카페 레이더 (R10202)',
          description: '소상공인시장진흥공단 630개소 정식 등록 데이터 기반으로 도보 거리, 잔여 좌석, 노트북존, 24시간 여부를 한눈에 탐색합니다.',
          category: '위치 기반 탐색',
          highlight: '반경 1~3km 정밀 탐색'
        },
        {
          id: 'feat-3',
          title: '시험 기간 중복 분석 & 혼잡도 신호등',
          description: '주변 학교들의 시험 주간이 겹치는 비율을 계산하여 여유(초록), 보통(노랑), 혼잡(빨강)의 3단계 신호등으로 직관 제공합니다.',
          category: '예측 알고리즘',
          highlight: '정확도 94%'
        },
        {
          id: 'feat-4',
          title: 'D-Day 연동 뽀모도로 학습 플래너',
          description: '시험까지 남은 기간에 맞춰 과목별 목표와 일일 체크리스트를 관리하고, 25분 집중 몰입 타이머로 순공 시간을 기록합니다.',
          category: '학습 관리',
          highlight: '뽀모도로 타이머 내장'
        }
      ],
      deepDives: [
        {
          tabTitle: '혼잡도 예측 원리',
          heading: '공공 학사일정과 상권 유동인구 결합 모델',
          content: '단순한 과거 통계가 아닌, 실제 인근 3km 내 5~10개 학교의 정기고사 일정을 실시간 크로스 분석하여 피크 주간을 2~4주 전에 정확히 예측합니다.',
          bulletPoints: [
            'NEIS SchoolSchedule API 기반 실시간 중간/기말고사 필터링',
            '하교 시간(16:00) 및 석식 후(18:00~22:00) 집중 트래픽 가중치 적용',
            '주말 및 공휴일 이용 패턴 보정 알고리즘'
          ]
        },
        {
          tabTitle: '학습 플래너 엔진',
          heading: 'D-Day 역산 기반 스마트 태스크 배분',
          content: '시험일까지 남은 일수에 따라 전 과목 개념 복습, 기출문제 풀이, 킬러문항 정복, 최종 오답정리 단계로 체계화된 일일 할 일을 자동 추천합니다.',
          bulletPoints: [
            'Gemini 3.8 Flash AI 코칭 어드바이스 탑재',
            '과목별 목표 등급 및 점수 달성률 게이지',
            '스터디카페 체류 시간과 연계된 뽀모도로 세션 기록'
          ]
        }
      ],
      metrics: [
        { label: '부산 스터디카페 DB', value: '630개소', description: '소상공인시장진흥공단 R10202 정식 데이터' },
        { label: '좌석 헛걸음 감소율', value: '88%', description: '혼잡도 사전 확인으로 대기 시간 최소화' },
        { label: '평균 순공 시간 증가', value: '+2.4시간', description: '골든타임 집중 방문 및 플래너 활용 효과' },
        { label: '연동 학교 수', value: '1,200+', description: '전국 초·중·고 및 대학교 학사일정 지원' }
      ],
      timelineOrSteps: [
        { step: '01', title: '학교 검색 & 학사 일정 조회', description: '내 학교를 검색하면 나이스 API로 중간/기말고사 일정이 자동 바인딩' },
        { step: '02', title: '인근 스터디카페 탐색', description: '학교 위치 기준 반경 1~3km 내 스터디카페 거리 및 시설 확인' },
        { step: '03', title: '혼잡도 & 골든타임 확인', description: '주변 시험 중복 분석 곡선과 가장 한적한 08:00~11:30 골든타임 체크' },
        { step: '04', title: 'D-Day 학습 플래너 가동', description: '과목별 목표 수립, 체크리스트 실천 및 뽀모도로 타이머로 완벽 시험 대비' }
      ],
      pricingOrTiers: [
        {
          name: '베이직 (무료)',
          price: '0원',
          description: '모든 중·고등학생 및 대학생을 위한 기본 서비스',
          features: ['학교 검색 및 시험 D-Day 조회', '인근 스터디카페 위치 탐색', '당일 실시간 혼잡도 신호등', '기본 학습 플래너 & 뽀모도로 타이머'],
          popular: false
        },
        {
          name: '프리미엄 패스',
          price: '월 4,900원',
          description: '완벽한 내신 1등급과 수능 고득점을 노리는 열공러',
          features: ['향후 4주간 일별 혼잡도 캘린더 전체 오픈', 'AI 맞춤형 학습 플랜 무제한 자동 생성', '실시간 좌석 빈자리 알림', '스터디카페 제휴 10% 상시 할인'],
          popular: true
        }
      ],
      testimonialsOrQuotes: [
        {
          quote: '시험 기간마다 자리 없어서 카페 3군데씩 돌아다녔는데, 공부명당 골든타임 보고 아침 8시 반에 가니 쾌적하게 1인석 잡고 올 1등급 받았습니다!',
          author: '박민우 (고2)',
          role: '센텀고등학교 재학생'
        },
        {
          quote: '주변 학교 시험 일정이 겹치는지 미리 알 수 있어서 공부 스케줄을 전략적으로 세우기 정말 좋습니다.',
          author: '이지현 (고3)',
          role: '해운대고등학교 수험생'
        }
      ],
      faqs: [
        {
          question: '학교 시험 일정은 어떻게 수집되나요?',
          answer: '교육부 및 한국교육학술정보원의 나이스(NEIS) 학사일정 Open API를 통해 각 학교의 공식 중간고사, 기말고사 일정을 실시간 수집합니다.'
        },
        {
          question: '혼잡도 예측은 얼마나 정확한가요?',
          answer: '스터디카페 반경 내 위치한 복수 학교들의 시험 일정 중복도와 학원가 유동인구 패턴을 결합하여 평균 90% 이상의 신뢰도로 혼잡도를 예측합니다.'
        },
        {
          question: '부산 외 다른 지역 학교와 카페도 지원되나요?',
          answer: '현재 부산 15개 구/군 630개소 스터디카페와 학교가 집중 최적화되어 있으며, 전국 단위로도 순차 확대 중입니다.'
        }
      ],
      contact: {
        title: '스터디카페 점주 제휴 및 학교 추가 문의',
        description: '공부명당과 제휴하여 실시간 좌석 정보를 연동하거나 키오스크 시스템을 연동하고 싶으신 점주님은 언제든 문의해주세요.',
        ctaText: '점주 제휴 및 피드백 남기기',
        email: 'partner@studyspot.kr',
        phone: '051-744-8890',
        address: '부산광역시 해운대구 센텀중앙로 90 센텀AI스퀘어 5층'
      },
      footer: {
        copyright: '© 2026 공부명당 (StudySpot AI). All rights reserved.',
        note: '본 서비스는 NEIS 공공 학사일정 및 소상공인시장진흥공단 상권정보(R10202) 공공데이터를 기반으로 운영됩니다.'
      },
      visibleSections: {
        hero: true,
        overview: true,
        features: true,
        deepDives: true,
        metrics: true,
        timeline: true,
        pricing: true,
        testimonials: true,
        faqs: true,
        contact: true
      }
    }
  },
  {
    id: 'synapse-ai',
    title: 'SynapseOS AI - 차세대 업무 인텔리전스 워크스페이스 사업기획서',
    badge: '스타트업 / AI SaaS',
    category: 'AI 생산성 플랫폼',
    summary: '사내 흩어진 문서와 슬랙 대화, 노션을 실시간 통합 지식그래프로 연결하는 AI 워크스페이스 사업 계획서 원문입니다.',
    themeStyle: 'modern-saas',
    colorPalette: 'indigo',
    rawText: `[SynapseOS 제품 기획서 및 사업계획서 요약]
프로젝트명: SynapseOS (시냅스 OS)
슬로건: 팀의 모든 지식과 업무 컨텍스트가 실시간으로 연결되는 차세대 AI 인텔리전스 워크스페이스

1. 문제 정의 (Problem Statement)
- 현대 기업의 지식 파편화: 슬랙 대화, 노션 문서, 구글 드라이브, 피그마, 지라에 데이터가 분산되어 필요한 정보를 찾는데 주당 평균 7.4시간 소모
- 맥락 상실(Context Collapse): 과거 의사결정의 이유와 히스토리를 파악하기 어려워 중복 업무와 커뮤니케이션 비용 폭증
- 단순 AI 검색의 한계: 기존 챗봇은 최신 사내 권한 체계와 보안을 반영하지 못하며 실시간 동기화가 불가능함

2. 핵심 솔루션 및 제품 특징 (Key Features)
(1) Zero-ETL 실시간 지식 신경망 (Neural Knowledge Graph)
- 슬랙, 노션, 컨플루언스, 지메일을 1클릭으로 연동하여 사내 모든 문서와 대화를 실시간 엔터티 그래프로 구조화
- 조직도 및 부서별 보안 접근 권한(RBAC) 자동 동기화로 권한 없는 정보 누출 원천 차단

(2) 자율형 어시스턴트 에이전트 (Autonomous Work Agents)
- 회의록 작성 후 지라 티켓 자동 발행, 담당자 지정 및 슬랙 알림 트리거
- 주간 업무 보고서 85% 자동 초안 작성

(3) 컨텍스트 인식 시맨틱 검색 (Context-Aware Semantic Search)
- "지난달 결제 모듈 버그 어떻게 해결했지?" 질문 시 관련 코드 커밋, 슬랙 논의 스레드, 패치 내역을 단 0.8초 만에 브리핑

3. 핵심 성과 지표 (Traction & Metrics)
- 정보 탐색 시간 78% 단축 (주당 7.4시간 -> 1.6시간)
- 시범 도입 42개 테크 기업, 12,000+ 활성 사용자
- 검색 정확도(Retrieval Precision) 94.8% 기록
- 첫 달 이탈률(Churn Rate) 1.2% 미만

4. 로드맵 및 단계별 계획 (Roadmap)
- 01단계 (Q1): 엔터프라이즈 커넥터 15종 및 지식그래프 엔진 알파 오픈
- 02단계 (Q2): 온프레미스 프라이빗 VPC 구축 옵션 및 에이전트 오케스트레이션 탑재
- 03단계 (Q3): 글로벌 다국어 지원 (한국어, 영어, 일본어) 및 SOC2 Type II 보안 인증
- 04단계 (Q4): 멀티모달 설계도/UI 분석 지원 및 엔터프라이즈 마켓플레이스 런칭

5. 요금제 안내 (Pricing)
- 스타터 플랜: 무료 (최대 5인, 기본 커넥터 3종, 월 500회 쿼리)
- 프로 플랜: 사용자당 월 24,000원 (무제한 커넥터, 실시간 에이전트 3대, 우선 지원)
- 엔터프라이즈 플랜: 커스텀 견적 (전용 VPC, 온프레미스 배포, 커스텀 LLM 미세조정, SLA 99.99%)

6. 고객 추천사
- "SynapseOS 도입 이후 온보딩 신규 입사자가 기존 프로젝트 맥락을 파악하는 시간이 3주에서 3일로 단축되었습니다." (센드버드 테크리드 김태훈)
- "흩어져 있던 회의록과 슬랙 스레드를 일일이 뒤질 필요 없이, 신뢰할 수 있는 정확한 답변을 즉시 얻을 수 있습니다." (당근마켓 프로덕트 오너 이수진)

7. 자주 묻는 질문 (FAQ)
Q: 사내 민감한 보안 문서가 외부 AI 학습에 사용되나요?
A: 절대 사용되지 않습니다. 고객사의 데이터는 암호화 격리 저장되며, 제로 데이터 보존(Zero Data Retention) 계약을 체결합니다.
Q: 기존 노션이나 슬랙을 교체해야 하나요?
A: 아닙니다. SynapseOS는 기존 툴을 교체하는 것이 아니라 기존 툴들의 데이터를 백그라운드에서 지능적으로 연결해주는 오버레이 레이어입니다.

8. 문의처
이메일: enterprise@synapse-os.io / 고객센터: 02-588-9201 / 주소: 서울특별시 강남구 테헤란로 427 위워크타워 14층`,
    presetData: {
      siteTitle: 'SynapseOS - 차세대 AI 지식 워크스페이스',
      brandName: 'SynapseOS',
      tagline: '팀의 모든 지식과 컨텍스트가 실시간으로 연결되는 지능형 운영체제',
      category: 'AI SaaS',
      themeStyle: 'modern-saas',
      colorPalette: 'indigo',
      hero: {
        badge: '⚡ 2026 차세대 엔터프라이즈 AI 워크스페이스 정식 런칭',
        headline: '흩어진 모든 사내 지식을 단 하나의 지능형 신경망으로 연결하세요',
        subheadline: '슬랙 대화, 노션 문서, 지라 티켓과 구글 드라이브를 실시간 지식그래프로 통합하여 업무 검색과 문서화에 낭비되는 주당 7시간을 되찾아드립니다.',
        primaryCta: '14일 무료 체험 시작하기',
        secondaryCta: '라이브 인터랙티브 데모',
        highlights: ['정보 탐색 시간 78% 단축', '엔터프라이즈 SOC2 보안 규정 준수', 'Zero-ETL 1클릭 연동']
      },
      overview: {
        title: '왜 현대의 지식 노동자는 여전히 정보 탐색에 시달릴까요?',
        summary: '도구는 늘어났지만 지식은 더 깊게 파편화되었습니다. 팀원이 퇴사하면 맥락이 사라지고, 슬랙 스레드를 뒤지느라 하루의 20%를 낭비합니다. SynapseOS는 도구를 바꾸지 않고도 도구 사이를 인텔리전스로 잇습니다.',
        keyTakeaways: [
          '평균 주당 7.4시간의 검색 소모 시간을 1.6시간으로 획기적 절감',
          '데이터 사일로 현상 원천 해결 및 사내 맥락 보존',
          '엄격한 부서별 권한(RBAC) 자동 동기화로 보안 사고 0건 달성',
          '문서 요약부터 티켓 생성까지 자율 수행하는 업무 에이전트'
        ]
      },
      features: [
        {
          id: 'feat-1',
          title: 'Zero-ETL 실시간 지식 신경망',
          description: '슬랙, 노션, 지메일, 컨플루언스를 클릭 한 번으로 연결하여 데이터의 변경 사항을 0.5초 이내에 지식그래프에 반영합니다.',
          category: '지식 엔진',
          highlight: '0.5초 초고속 동기화'
        },
        {
          id: 'feat-2',
          title: '자율형 업무 실행 에이전트',
          description: '회의 음성을 분석해 핵심 결정을 도출하고, 지라 티켓 자동 생성 및 슬랙 채널 보고까지 스스로 완결합니다.',
          category: '자동화',
          highlight: '업무 자동화율 85%'
        },
        {
          id: 'feat-3',
          title: '컨텍스트 인식 시맨틱 브리핑',
          description: '단순 키워드 매칭이 아닌 질문자의 부서와 프로젝트 맥락을 이해하여 단편적 검색 결과 대신 완성된 해답 브리핑을 제공합니다.',
          category: '시맨틱 AI',
          highlight: '정확도 94.8%'
        },
        {
          id: 'feat-4',
          title: '엔터프라이즈 보안 격리 & 권한 상속',
          description: '문서 원본의 열람 권한을 그대로 상속하여 권한이 없는 임직원에게는 데이터가 검색되거나 노출되지 않도록 원천 차단합니다.',
          category: '보안 & 거버넌스',
          highlight: 'Zero Data Leak'
        }
      ],
      deepDives: [
        {
          tabTitle: '인텔리전스 엔진',
          heading: '분산된 문서들을 벡터와 온톨로지 그래프로 동시 인덱싱',
          content: '단순 벡터 임베딩의 한계를 넘어 지식 간의 인과관계, 작성자, 프로젝트 히스토리를 노드와 엣지로 모델링합니다. 덕분에 1년 전 의사결정의 이유까지 맥락 있게 추적할 수 있습니다.',
          bulletPoints: [
            'RAG 파이프라인의 환각(Hallucination) 99.2% 억제 기술',
            '자체 하이브리드 리트리버: BM25 + Dense Vector + Graph Traversal',
            '민감 개인정보(PII) 실시간 마스킹 필터링 기본 내장'
          ]
        },
        {
          tabTitle: '커넥터 에코시스템',
          heading: '팀이 이미 사랑하는 20+ 업무 도구와 완벽 호환',
          content: '도구를 바꾸라고 강요하지 않습니다. 팀원들은 지금처럼 슬랙에 대화하고 노션에 문서를 작성하면, SynapseOS가 백그라운드에서 실시간으로 정돈합니다.',
          bulletPoints: [
            'Slack, Notion, Jira, GitHub, Google Workspace, Confluence 지원',
            '커스텀 데이터베이스를 위한 REST API 및 Webhook SDK 제공',
            '온프레미스 네트워크 격리 배포 지원'
          ]
        },
        {
          tabTitle: '거버넌스 & 보안',
          heading: '금융권 및 글로벌 규제를 충족하는 최고 수준 보안',
          content: '우리는 고객의 데이터를 모델 학습에 절대 사용하지 않습니다. 모든 통신과 저장은 AES-256 및 TLS 1.3으로 암호화되며 전용 키 관리(BYOK)를 지원합니다.',
          bulletPoints: [
            'SOC 2 Type II, ISO 27001, GDPR 준수 인증 보유',
            'Zero Data Retention 계약 기본 체결',
            '기업 전용 프라이빗 VPC 인스턴스 구축 가능'
          ]
        }
      ],
      metrics: [
        { label: '정보 탐색 시간 단축', value: '78%', description: '주당 7.4시간에서 1.6시간으로 감소' },
        { label: '활성 사용자 수', value: '12,000+', description: '42개 글로벌 테크 기업 검증' },
        { label: '시맨틱 응답 정확도', value: '94.8%', description: '기업 지식 문답 벤치마크 1위' },
        { label: '월간 사용자 유지율', value: '98.8%', description: '첫 달 이후 이탈률 1.2% 미만' }
      ],
      timelineOrSteps: [
        { step: '01', title: '엔터프라이즈 커넥터 연결', description: '슬랙, 노션, 드라이브 등 기존 사내 업무 툴을 1클릭으로 연동' },
        { step: '02', title: '자율 지식그래프 인덱싱', description: '사내 권한 구조를 완벽 분석하여 안전한 전용 온톨로지 신경망 구축' },
        { step: '03', title: '팀 어시스턴트 활성화', description: '슬랙 멘션이나 브라우저 단축키로 어디서나 0.8초 만에 답변 획득' },
        { step: '04', title: '자율 업무 오케스트레이션', description: '회의 요약, 후속 티켓 생성, 주간 보고서 초안 자동화' }
      ],
      pricingOrTiers: [
        {
          name: 'Starter',
          price: '0원',
          description: '최대 5인 규모의 소규모 팀 및 스타트업 검증용',
          features: ['기본 커넥터 3종 지원', '월 500회 시맨틱 쿼리', '커뮤니티 지원', '표준 암호화 적용'],
          popular: false
        },
        {
          name: 'Pro',
          price: '월 24,000원 / 인',
          description: '본격적인 업무 생산성 향상이 필요한 성장기 팀',
          features: ['모든 커넥터 무제한 연동', '실시간 자율 에이전트 3대', '고급 RBAC 권한 관리', '우선 기술 지원', '분석 대시보드'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '맞춤 견적',
          description: '엄격한 보안과 맞춤형 VPC 인프라가 필수인 대기업',
          features: ['전용 VPC 및 온프레미스 배포', '커스텀 LLM 파인튜닝', 'SLA 99.99% 보장', '전담 엔지니어 배정', 'BYOK 암호화 키 관리'],
          popular: false
        }
      ],
      testimonialsOrQuotes: [
        {
          quote: 'SynapseOS 도입 이후 신규 입사자가 기존 프로젝트 맥락을 파악하고 온보딩을 마치는 시간이 3주에서 3일로 단축되었습니다.',
          author: '김태훈',
          role: '센드버드 테크리드'
        },
        {
          quote: '흩어져 있던 회의록과 슬랙 스레드를 일일이 뒤질 필요 없이, 신뢰할 수 있는 정확한 답변을 즉시 얻을 수 있어 전사 생산성이 급상승했습니다.',
          author: '이수진',
          role: '당근마켓 프로덕트 오너'
        }
      ],
      faqs: [
        {
          question: '사내 민감한 보안 문서가 외부 AI 모델 학습에 사용되나요?',
          answer: '절대 사용되지 않습니다. SynapseOS는 고객사의 데이터를 어떠한 공개 모델 학습에도 활용하지 않으며, 제로 데이터 보존(Zero Data Retention) 원칙을 법적으로 보증합니다.'
        },
        {
          question: '기존에 사용하던 노션이나 슬랙을 교체해야 하나요?',
          answer: '아닙니다. SynapseOS는 기존 도구들을 대체하는 것이 아니라, 기존 도구들의 백그라운드에서 데이터를 지능적으로 연결해주는 인텔리전스 오버레이 레이어입니다.'
        },
        {
          question: '도입 시 엔지니어의 추가 개발이나 셋업이 필요한가요?',
          answer: '별도의 엔지니어링 리소스 없이 관리자 권한 승인만으로 평균 5분 이내에 기본 데이터 연동을 마칠 수 있습니다.'
        }
      ],
      contact: {
        title: '지금 바로 팀의 잃어버린 시간을 되찾으세요',
        description: '14일간 모든 기능을 무제한으로 체험해보실 수 있으며, 엔터프라이즈 전담 컨설팅도 무료로 제공됩니다.',
        ctaText: '무료 체험 신청하기',
        email: 'enterprise@synapse-os.io',
        phone: '02-588-9201',
        address: '서울특별시 강남구 테헤란로 427 위워크타워 14층'
      },
      footer: {
        copyright: '© 2026 SynapseOS Inc. All rights reserved.',
        note: '본 사이트는 SynapseOS 사업계획서 원본 자료를 바탕으로 자동 생성된 인터랙티브 쇼케이스입니다.'
      },
      visibleSections: {
        hero: true,
        overview: true,
        features: true,
        deepDives: true,
        metrics: true,
        timeline: true,
        pricing: true,
        testimonials: true,
        faqs: true,
        contact: true
      }
    }
  },
  {
    id: 'portfolio-designer',
    title: '김민재 수석 프로덕트 디자이너 포트폴리오 & 쇼케이스',
    badge: '개인 포트폴리오 / 이력서',
    category: '디자인 포트폴리오',
    summary: '10년 차 B2B SaaS 및 핀테크 프로덕트 디자이너의 주요 프로젝트 성과, 디자인 철학, 클라이언트 평가가 담긴 이력서입니다.',
    themeStyle: 'portfolio',
    colorPalette: 'violet',
    rawText: `[김민재 수석 프로덕트 디자이너 포트폴리오 & 경력기술서]
이름: 김민재 (Minjae Kim)
직책: Senior Product & Design Systems Lead (10년차)
전문 분야: B2B SaaS 인터페이스, 핀테크 디자인 시스템, 복잡한 데이터 시각화 및 UX 리서치

1. 프로필 요약 (About Me)
- "복잡한 비즈니스 문제를 단순하고 우아한 인터랙션으로 전환합니다."
- 토스, 라인, 실리콘밸리 시리즈B 핀테크 스타트업을 거치며 0 to 1 신규 프로덕트 런칭 4회, 전사 디자인 시스템 구축 3회 완수.
- 데이터 중심 디자인(Data-informed Design)과 감성적 마이크로 인터랙션의 조화를 추구합니다.

2. 대표 프로젝트 성과 (Key Projects)
(1) FinEdge 글로벌 결제 대시보드 리디자인
- 결제 실패율 원인 분석 및 UX 플로우 전면 개편
- 결과: 체크아웃 완료율 +24.6% 상승, 고객지원 문의 -38% 감소
- iF 디자인 어워드 2025 서비스 디자인 부문 수상

(2) Aura Design System v3 구축
- React, Figma Tokens 기반 토큰화 디자인 시스템 리드
- 6개 프로덕트 라인업 일원화로 컴포넌트 재사용률 89% 달성
- 프론트엔드 개발 스프린트 속도 2.4배 가속화

(3) Quantum Trade 실시간 시계열 차트 UI
- 밀리초 단위 고빈도 매매 트레이더를 위한 다크모드 인터페이스 설계
- 시각 피로도 40% 저감 및 사용자 만족도 96점 달성

3. 주요 지표 및 성과 (Highlights)
- 10+ 년의 프로덕트 디자인 및 리드 경력
- 24.6% 전환율(Conversion) 개선 최고 기록
- 3회 글로벌 디자인 어워드 수상 (iF, Red Dot, Good Design)
- 89% 디자인 시스템 컴포넌트 재사용률

4. 디자인 프로세스 (Process)
- Step 01: 심층 리서치 & 정량 데이터 분석 (UT, 퍼널 히트맵)
- Step 02: 정보 구조화 및 빠른 인터랙션 프로토타이핑
- Step 03: 디자인 시스템 토큰 동기화 및 개발자 핸드오프
- Step 04: A/B 테스트 및 정량적 임팩트 검증

5. 클라이언트 및 동료 추천사
- "김민재 디자이너는 단순히 예쁜 화면을 만드는 것을 넘어, 비즈니스 숫자를 움직이는 설득력 있는 UX를 만들어냅니다." (FinEdge CPO 데이비드 박)
- "디자이너와 엔지니어 간의 소통 장벽을 완벽하게 없애주는 최고의 디자인 시스템 리더입니다." (라인데브 테크리드 최원석)

6. 연락처 및 소셜
이메일: minjae.ux@designcraft.studio / 전화: 010-8921-3410 / 서울시 마포구 연남동 / Figma Community 커뮤니티 기여자`,
    presetData: {
      siteTitle: '김민재 - Senior Product Designer Portfolio',
      brandName: 'Minjae Kim',
      tagline: '복잡한 비즈니스 난제를 간결하고 감각적인 인터랙션으로 풀어냅니다',
      category: '디자인 포트폴리오',
      themeStyle: 'portfolio',
      colorPalette: 'violet',
      hero: {
        badge: '✨ Senior Product & Design Systems Lead (10+ Yrs Exp)',
        headline: '비즈니스 지표를 움직이는 우아하고 직관적인 프로덕트 경험',
        subheadline: 'B2B SaaS, 핀테크, 복잡한 데이터 시각화 전문. 0 to 1 프로덕트 런칭 4회와 전사 디자인 시스템 구축을 통해 실질적인 성과를 만들어왔습니다.',
        primaryCta: '프로젝트 쇼케이스 보기',
        secondaryCta: '이력서 PDF 다운로드',
        highlights: ['iF & Red Dot 디자인 어워드 수상', '전환율 +24.6% 개선', '디자인 시스템 컴포넌트 재사용률 89%']
      },
      overview: {
        title: '사용자의 편리함과 비즈니스 성장이 만나는 접점을 설계합니다',
        summary: '아름다움에 머무르지 않고, 복잡한 도메인 지식을 심층 분석하여 누구나 직관적으로 사용할 수 있는 인터페이스를 구현합니다. 엔지니어링 친화적인 토큰화 시스템으로 개발 생산성을 극대화합니다.',
        keyTakeaways: [
          '사용자 행동 데이터에 기반한 가설 수립 및 신속한 검증',
          '피그마 토큰과 코드 라이브러리가 1:1로 일치하는 탄탄한 디자인 시스템',
          '복잡한 금융/데이터 인터페이스의 인지 부하 최소화',
          '제품 전반의 일관성과 브랜드 고유의 감성적 인터랙션 부여'
        ]
      },
      features: [
        {
          id: 'feat-1',
          title: 'FinEdge 글로벌 결제 대시보드 리디자인',
          description: '결제 실패 원인 분석과 UX 플로우 전면 개편을 통해 체크아웃 완료율 +24.6% 상승 및 지원 문의 38% 감축 달성.',
          category: '핀테크 / 결제',
          highlight: '전환율 +24.6%'
        },
        {
          id: 'feat-2',
          title: 'Aura Design System v3 구축',
          description: 'Figma Tokens와 React 기반 디자인 시스템을 리드하여 6개 프로덕트의 재사용률을 89%까지 끌어올리고 개발 속도를 2.4배 가속화.',
          category: '디자인 시스템',
          highlight: '재사용률 89%'
        },
        {
          id: 'feat-3',
          title: 'Quantum Trade 초고속 시계열 UI',
          description: '밀리초 단위의 호가 변화를 트래킹하는 트레이더를 위한 다크모드 차트 UI를 구축하여 눈 피로도 40% 저감.',
          category: '데이터 시각화',
          highlight: '만족도 96점'
        },
        {
          id: 'feat-4',
          title: 'B2B SaaS 워크플로우 자동화 빌더',
          description: '비개발자 마케터도 드래그 앤 드롭으로 마케팅 자동화 파이프라인을 설계할 수 있는 노코드 캔버스 인터페이스 개발.',
          category: '노코드 도구',
          highlight: '온보딩 완료율 88%'
        }
      ],
      deepDives: [
        {
          tabTitle: '디자인 철학',
          heading: '원칙에 기반한 프로덕트 설계',
          content: '단순한 심미성을 넘어, 사용자의 작업 흐름을 끊지 않는 자연스러운 리듬감을 중요하게 여깁니다. 불필요한 장식을 걷어내고 명확한 시각적 위계와 즉각적인 피드백을 제공합니다.',
          bulletPoints: [
            '단순함(Simplicity): 복잡한 개념을 쪼개어 한 화면에 하나의 핵심 의사결정만 제시',
            '명확성(Clarity): 모호한 아이콘 배제 및 명확한 텍스트 라벨링',
            '확장성(Scalability): 새로운 기능이 추가되어도 깨지지 않는 유연한 그리드 시스템'
          ]
        },
        {
          tabTitle: '협업 & 엔지니어링',
          heading: '개발팀과 완벽하게 호흡하는 디자인',
          content: 'HTML, CSS, React에 대한 깊은 이해를 바탕으로 실현 불가능한 디자인을 지양합니다. 제약 조건을 창의적인 기회로 전환합니다.',
          bulletPoints: [
            '피그마 베리어블(Variables) 기반의 완벽한 다크/라이트 모드 자동화',
            '스토리북(Storybook) 연동 컴포넌트 검수 파이프라인 수립',
            '접근성(WCAG AA) 명도 대비 및 키보드 내비게이션 100% 준수'
          ]
        }
      ],
      metrics: [
        { label: '실무 경력', value: '10+ 년', description: '토스, 라인 및 글로벌 스타트업 리드' },
        { label: '최고 전환율 개선', value: '+24.6%', description: '결제 퍼널 UX 개선 실적' },
        { label: '디자인 어워드', value: '3회 수상', description: 'iF, Red Dot, Good Design' },
        { label: '디자인 시스템 재사용률', value: '89%', description: '개발 생산성 2.4배 향상 기여' }
      ],
      timelineOrSteps: [
        { step: '01', title: '문제 정의 & 데이터 분석', description: '퍼널 이탈 지점 분석 및 정성적 사용자 인터뷰 진행' },
        { step: '02', title: '정보 구조 & 프로토타이핑', description: '핵심 흐름 와이어프레임 및 실시간 인터랙션 시뮬레이션' },
        { step: '03', title: '시스템 토큰화 & 핸드오프', description: '개발팀과 엣지 케이스 점검 및 일원화된 토큰 코드 전달' },
        { step: '04', title: 'A/B 테스트 & 회고', description: '정량 지표 측정 후 지속적 마이크로 이터레이션 수행' }
      ],
      pricingOrTiers: [
        {
          name: '디자인 스프린트 자문',
          price: '프로젝트별 협의',
          description: '신규 기능 검증 또는 UX 개선이 시급한 초기 스타트업',
          features: ['기존 서비스 UX 감사 리포트', '핵심 퍼널 개선안 프로토타입', '디자인 스프린트 2주 코칭'],
          popular: false
        },
        {
          name: '풀타임 프로덕트 리드',
          price: '상호 조율',
          description: '팀의 비전을 현실로 구현할 경험 많은 디자인 리더가 필요한 기업',
          features: ['0 to 1 신규 프로덕트 총괄', '엔터프라이즈 디자인 시스템 구축', '디자인팀 빌딩 및 멘토링', '경영진 및 C-level 전략 얼라인'],
          popular: true
        }
      ],
      testimonialsOrQuotes: [
        {
          quote: '김민재 디자이너는 단순히 예쁜 화면을 만드는 것을 넘어, 비즈니스 숫자를 움직이는 설득력 있는 UX를 만들어냅니다.',
          author: '데이비드 박',
          role: 'FinEdge CPO'
        },
        {
          quote: '디자이너와 엔지니어 간의 소통 장벽을 완벽하게 없애주는 최고의 디자인 시스템 리더입니다. 함께 일하는 것이 즐겁습니다.',
          author: '최원석',
          role: '라인데브 테크리드'
        }
      ],
      faqs: [
        {
          question: '현재 어떤 형태의 프로젝트에 참여 가능한가요?',
          answer: '풀타임 리드 채용 및 전략적 프로덕트 자문 프로젝트를 모두 열어두고 검토 중입니다. 협업 제안은 언제든 환영합니다.'
        },
        {
          question: '해외 원격 근무(Remote) 협업도 가능한가요?',
          answer: '네, 실리콘밸리 팀과의 비동기 협업 경험이 풍부하며 영어로 유창한 커뮤니케이션 및 프레젠테이션이 가능합니다.'
        }
      ],
      contact: {
        title: '새로운 프로젝트나 협업 기회가 있으신가요?',
        description: '흥미로운 비즈니스 도전 과제가 있다면 편하게 커피챗을 신청해주세요. 24시간 내에 답변드립니다.',
        ctaText: '협업 및 커피챗 제안하기',
        email: 'minjae.ux@designcraft.studio',
        phone: '010-8921-3410',
        address: '서울특별시 마포구 연남동 / 원격 근무 가능'
      },
      footer: {
        copyright: '© 2026 Minjae Kim. All rights reserved.',
        note: 'Designed with precision & engineered for performance.'
      },
      visibleSections: {
        hero: true,
        overview: true,
        features: true,
        deepDives: true,
        metrics: true,
        timeline: true,
        pricing: true,
        testimonials: true,
        faqs: true,
        contact: true
      }
    }
  },
  {
    id: 'course-curriculum',
    title: '2026 모던 프론트엔드 아키텍처 & 리액트 마스터 강의 요약본',
    badge: '교육 / 코스 커리큘럼',
    category: '기술 교육 및 스터디',
    summary: '리액트 19, 서버 컴포넌트, 성능 최적화와 대규모 프론트엔드 아키텍처를 다루는 실무 중심 마스터클래스 요약집입니다.',
    themeStyle: 'academic',
    colorPalette: 'emerald',
    rawText: `[2026 프론트엔드 시스템 아키텍처 마스터 클래스]
강의명: 실무 대규모 엔터프라이즈를 위한 프론트엔드 아키텍처 & React 19
대상: 2년차 이상 프론트엔드 개발자 및 테크리드 지망생
목표: 단순 기능 구현을 넘어 수십만 유저 트래픽에서도 깨지지 않는 견고한 웹 아키텍처 설계

1. 강의 개요 (Overview)
- 기술 부채를 방지하는 모듈형 아키텍처 설계 (FSD: Feature-Sliced Design 실전)
- React 19 Actions, Server Actions, useOptimistic, Compiler 내부 원리 완벽 분해
- 브라우저 렌더링 파이프라인과 LCP, INP, CLS 코어 웹 바이탈 99점 달성 비법
- 상태 관리 라이브러리 피로도 극복: Zustand vs TanStack Query 최적 조합

2. 6주 집중 커리큘럼 (Curriculum)
(1) 1주차: 대규모 코드베이스 아키텍처 & FSD 패턴 구조화
- 거대 모노레포와 도메인 격리, 순환 참조 방지 아키텍처
(2) 2주차: React 19 코어 딥다이브 & 리액트 컴파일러
- 가상 DOM을 넘어선 자동 메모이제이션 원리와 마이그레이션 전략
(3) 3주차: 서버 사이드 렌더링(SSR)과 하이브리드 캐싱 전략
- 스트리밍 SSR, 부분 프리렌더링(PPR), 엣지 런타임 최적화
(4) 4주차: 극강의 프론트엔드 성능 최적화 (Web Vitals INP 정복)
- 메인 스레드 블로킹 해소, 웹 워커 활용, 가상 스크롤링 대규모 렌더링
(5) 5주차: 견고한 프론트엔드 테스트 자동화 & CI/CD
- Vitest, Playwright E2E 테스트 및 비주얼 회귀 테스트 파이프라인
(6) 6주차: 실전 파이널 프로젝트 & 테크리드 코드 리뷰
- 실제 프로덕션 수준의 대규모 실시간 대시보드 구축 및 배포

3. 수강생 성과 지표 (Impact & Stats)
- 누적 수강생 3,400+ 명 돌파
- 수강생 강의 만족도 4.95 / 5.00
- 수강 후 네카라쿠배 및 유니콘 이직 성공률 68%
- 실전 코드 베이스 프로젝트 4종 제공

4. 수강 혜택 및 수료증
- 평생 무제한 다시보기 & 최신 기술 패치 무료 업데이트
- 1:1 이력서 및 포트폴리오 코드 리뷰 세션 1회 제공
- 프라이빗 디스코드 커뮤니티 평생 초대 (현업 시니어 멘토 상주)

5. 수강료 안내
- 얼리버드 특별가: 289,000원 (정가 450,000원에서 35% 할인)
- 기업 단체 수강: 5인 이상 20% 추가 할인 적용

6. 자주 묻는 질문
Q: 초보자도 수강할 수 있나요?
A: 자바스크립트 기본 문법과 기초 리액트 경험이 있으신 분을 권장합니다. 단순 튜토리얼이 아닌 아키텍처 설계에 집중합니다.
Q: 직장인이라 실시간 참여가 어려운데 괜찮나요?
A: 모든 세션은 고화질 녹화본과 챕터별 타임스탬프, 실습 깃허브 레포지토리가 영구 제공됩니다.

문의: contact@arch-mastery.dev / 운영 사무국: 070-4210-9988`,
    presetData: {
      siteTitle: 'React 19 & 엔터프라이즈 프론트엔드 아키텍처 마스터클래스',
      brandName: 'Frontend Architecture Lab',
      tagline: '단순 구현을 넘어 수십만 유저 트래픽을 견디는 견고한 웹 아키텍처 설계',
      category: '기술 교육 & 아카데믹',
      themeStyle: 'academic',
      colorPalette: 'emerald',
      hero: {
        badge: '🎓 2026 차세대 리액트 19 & FSD 패턴 실무 마스터코스',
        headline: '대규모 프로덕션 환경을 지탱하는 엔터프라이즈 프론트엔드 아키텍처',
        subheadline: '기술 부채 없는 클린 코드 설계, React 19 컴파일러 내부 원리, 코어 웹 바이탈 99점 달성까지. 10년 차 시니어 아키텍트의 실전 노하우를 6주 만에 체득하세요.',
        primaryCta: '얼리버드 할인 등록하기',
        secondaryCta: '전체 커리큘럼 살펴보기',
        highlights: ['누적 수강생 3,400+ 명', '평점 4.95 / 5.0', '상위 테크기업 이직률 68%']
      },
      overview: {
        title: '왜 시니어 개발자는 아키텍처를 먼저 고민할까요?',
        summary: '코드가 수만 줄로 늘어나면 작은 수정 하나에도 예측할 수 없는 사이드 이펙트가 발생합니다. 본 과정은 기능 하나를 빠르게 만드는 법이 아니라, 10명이 함께 개발해도 속도가 줄지 않는 모듈형 구조를 만드는 실전 감각을 전수합니다.',
        keyTakeaways: [
          'Feature-Sliced Design(FSD) 실전 적용으로 스파게티 의존성 완벽 해소',
          'React 19 컴파일러와 새로운 훅(useActionState, useOptimistic) 실전 활용',
          '구글 INP(Interaction to Next Paint) 최적화로 버벅임 없는 사용자 경험 구현',
          '복잡한 비즈니스 로직을 격리하는 도메인 주도 설계(DDD) 프론트엔드 적용'
        ]
      },
      features: [
        {
          id: 'feat-1',
          title: 'FSD 모듈형 아키텍처 설계',
          description: '기능별 계층 구조(app, pages, widgets, features, entities, shared)를 통해 코드베이스가 거대해져도 유지보수 가능한 구조를 만듭니다.',
          category: '구조 설계',
          highlight: '유지보수성 300% 향상'
        },
        {
          id: 'feat-2',
          title: 'React 19 컴파일러 딥다이브',
          description: '수동 useMemo와 useCallback의 종말. 리액트 컴파일러가 코드를 최적화하는 원리와 실무 마이그레이션 팁을 파헤칩니다.',
          category: '코어 엔진',
          highlight: 'Zero Memoization'
        },
        {
          id: 'feat-3',
          title: '코어 웹 바이탈 & INP 99점 최적화',
          description: '메인 스레드 프로파일링 기법과 가상화 렌더링, Web Worker 백그라운드 연산을 결합해 렌더링 프레임 드랍을 제로로 만듭니다.',
          category: '성능 튜닝',
          highlight: 'LCP/INP 99점 달성'
        },
        {
          id: 'feat-4',
          title: '실전 모노레포 & E2E 테스트 파이프라인',
          description: 'Turborepo 기반 모노레포 구축과 Playwright 비주얼 회귀 테스트를 결합해 배포 전 버그를 99.9% 사전 차단합니다.',
          category: '품질 보증',
          highlight: '버그 사전 차단'
        }
      ],
      deepDives: [
        {
          tabTitle: '6주 로드맵',
          heading: '기초 이론부터 실전 엔터프라이즈 프로젝트까지',
          content: '각 주차마다 3~4시간의 심층 강의와 깃허브 실습 과제, 그리고 시니어 개발자의 1:1 PR 코드 리뷰가 유기적으로 연결됩니다.',
          bulletPoints: [
            '1~2주차: FSD 아키텍처 설계 & React 19 원리 분해',
            '3~4주차: 하이브리드 캐싱, SSR 스트리밍 & 극한 성능 튜닝',
            '5~6주차: 모노레포, Playwright 자동화 및 실전 대시보드 런칭'
          ]
        },
        {
          tabTitle: '수강생 전용 혜택',
          heading: '강의가 끝난 후에도 계속되는 성장 에코시스템',
          content: '단발성 수강으로 끝나지 않습니다. 끊임없이 진화하는 웹 프론트엔드 생태계에 맞춰 분기별 업데이트 영상이 무료로 추가됩니다.',
          bulletPoints: [
            '평생 소장 무제한 스트리밍 & 실습 레포지토리 코드 영구 열람',
            '현업 테크리드 멘토들이 상주하는 비공개 디스코드 커뮤니티',
            '수료 후 포트폴리오 및 기술 인터뷰 1:1 피드백 세션'
          ]
        }
      ],
      metrics: [
        { label: '누적 수강생', value: '3,400+', description: '국내 주요 IT 기업 현업 개발자 수강' },
        { label: '강의 평점', value: '4.95 / 5.0', description: '실무 즉시 적용 가능성에 대한 극찬' },
        { label: '탑티어 이직률', value: '68%', description: '수료생 6개월 내 커리어 점프' },
        { label: '실습 프로젝트', value: '4개 완성', description: '포트폴리오에 즉시 활용 가능한 고품질 코드' }
      ],
      timelineOrSteps: [
        { step: '01', title: '1주차: FSD 패턴과 도메인 격리', description: '스파게티 의존성을 제거하는 모듈형 아키텍처 실습' },
        { step: '02', title: '2주차: React 19 & Compiler', description: '자동 메모이제이션 엔진 원리와 신규 훅 마스터' },
        { step: '03', title: '3주차: 스트리밍 SSR & 캐싱', description: 'PPR(부분 프리렌더링)과 엣지 캐싱 전략' },
        { step: '04', title: '4주차: 코어 웹 바이탈 극한 튜닝', description: 'INP 버벅임 해결 및 대규모 가상 리스트 렌더링' },
        { step: '05', title: '5주차: E2E 테스트 자동화', description: 'Playwright 비주얼 회귀 테스트 파이프라인 완성' },
        { step: '06', title: '6주차: 파이널 프로젝트 런칭', description: '엔터프라이즈 실시간 대시보드 배포 및 코드 리뷰' }
      ],
      pricingOrTiers: [
        {
          name: '얼리버드 스탠다드',
          price: '289,000원',
          description: '실무 역량을 빠르게 끌어올리고 싶은 주니어~미드레벨 개발자',
          features: ['전체 6주 고화질 강의 평생 무제한 수강', '실습 레포지토리 풀소스 코드 제공', '비공개 디스코드 Q&A 채널 입장', '수료증 발급'],
          popular: true
        },
        {
          name: 'VIP 멘토링 패키지',
          price: '489,000원',
          description: '이직 및 이력서/코드 리뷰까지 1:1 밀착 코칭이 필요한 분',
          features: ['스탠다드 혜택 전체 포함', '시니어 아키텍트 1:1 깃허브 PR 코드 리뷰 (2회)', '이력서/포트폴리오 서면 피드백', '모의 기술 면접 1시간'],
          popular: false
        }
      ],
      testimonialsOrQuotes: [
        {
          quote: '단순히 리액트를 쓰는 법이 아니라, 대규모 팀에서 왜 이렇게 설계해야 하는지 명쾌한 해답을 얻었습니다. 이직 기술 면접에서 엄청난 무기가 되었습니다.',
          author: '박준형',
          role: '토스뱅크 프론트엔드 엔지니어'
        },
        {
          quote: 'FSD 패턴과 React 19 컴파일러 내부 동작을 이렇게 깊이 있게 다룬 강의는 처음입니다. 팀 내 테크 세미나 자료로도 적극 활용했습니다.',
          author: '정세연',
          role: '우아한형제들 프론트엔드 개발자'
        }
      ],
      faqs: [
        {
          question: '리액트 기초 문법을 몰라도 수강할 수 있나요?',
          answer: '본 코스는 실무 아키텍처와 대규모 설계에 집중하므로, 기본적인 리액트 컴포넌트 작성 경험이 있는 분께 권장드립니다.'
        },
        {
          question: '강의 수강 기한에 제한이 있나요?',
          answer: '기한 제한 없이 평생 무제한으로 복습하실 수 있으며, 추후 추가되는 최신 기술 업데이트 강의도 무료로 열람 가능합니다.'
        }
      ],
      contact: {
        title: '커리어의 전환점이 될 아키텍처 학습을 시작하세요',
        description: '강의 관련 질문이나 기업 단체 수강 할인은 언제든 편하게 문의해주세요.',
        ctaText: '지금 바로 수강 신청하기',
        email: 'contact@arch-mastery.dev',
        phone: '070-4210-9988',
        address: '온라인 라이브 및 VOD 클래스 / 서울특별시 강남구 역삼로'
      },
      footer: {
        copyright: '© 2026 Frontend Architecture Lab. All rights reserved.',
        note: '엔터프라이즈 프론트엔드 개발자의 성장을 지원합니다.'
      },
      visibleSections: {
        hero: true,
        overview: true,
        features: true,
        deepDives: true,
        metrics: true,
        timeline: true,
        pricing: true,
        testimonials: true,
        faqs: true,
        contact: true
      }
    }
  },
  {
    id: 'tech-summit',
    title: '2026 글로벌 AI & 테크 이노베이션 서밋 공식 안내자료',
    badge: '행사 / 컨퍼런스 안내',
    category: '테크 이벤트 & 컨퍼런스',
    summary: '글로벌 AI 연구진과 빅테크 C-level이 한자리에 모여 인공지능 미래를 논하는 연례 서밋 기획서 및 참가자 가이드입니다.',
    themeStyle: 'cyberpunk',
    colorPalette: 'amber',
    rawText: `[2026 K-Tech Summit: AI Beyond Limits 공식 행사 안내서]
행사명: 2026 글로벌 AI & 테크 이노베이션 서밋 (K-Tech Summit 2026)
일시: 2026년 11월 12일(목) ~ 13일(금) (2일간)
장소: 서울 코엑스(COEX) 그랜드볼룸 및 온라인 글로벌 생중계
주제: 자율 에이전트, 물리적 AI(로보틱스), 그리고 차세대 반도체의 결합

1. 서밋 개요 (Summit Overview)
- 35개국 120+ 글로벌 석학 및 빅테크 리더 집결
- 3개 전문 트랙: Track A (자율 AI 에이전트), Track B (뉴로모픽 반도체 & 온디바이스), Track C (AI 윤리 및 규제 거버넌스)
- 오프라인 5,000명 참가 및 글로벌 50,000명 온라인 라이브 시청

2. 주요 기조연설자 라인업 (Keynote Speakers)
- 얀 르쿤 교수 (튜링상 수상자, 뉴욕대 석좌교수) - "월드 모델과 자기지도학습의 진화"
- 사라 첸 (글로벌 프론티어 AI 연구소 리드) - "신경망 에이전트의 다중 오케스트레이션"
- 이승우 박사 (차세대 AI 반도체 파운드리 CTO) - "초저전력 HBM4와 AI 가속기의 미래"

3. 행사 일정 및 타임테이블 (Schedule)
- Day 1: 기조강연, 빅테크 패널 토론, 네트워킹 디너 및 글로벌 AI 스타트업 피칭 대회
- Day 2: 심층 기술 워크숍, 핸즈온 실습 세션, 1:1 투자자 매칭 데이

4. 티켓 등급 및 등록 안내 (Tickets)
- 온라인 스트리밍 티켓: 49,000원 (전 세션 실시간 시청 및 VOD 다시보기)
- 올 액세스 패스(All Access): 290,000원 (코엑스 현장 입장, 네트워킹 런치, 발표 자료집 증정)
- VIP 패스: 650,000원 (연사 전용 라운지 입장, VIP 갈라 디너, 1:1 프라이빗 네트워킹)

5. 스폰서 및 파트너사
구글, 마이크로소프트, 삼성전자, 현대자동차, 카카오, 네이버 클라우드

문의: summit2026@k-tech.org / 프레스 등록: press@k-tech.org / 02-6000-8800`,
    presetData: {
      siteTitle: '2026 글로벌 AI & 테크 이노베이션 서밋',
      brandName: 'K-Tech Summit 2026',
      tagline: '자율 에이전트와 물리적 AI가 여는 인류 기술의 새로운 지평',
      category: '테크 이벤트 & 컨퍼런스',
      themeStyle: 'cyberpunk',
      colorPalette: 'amber',
      hero: {
        badge: '🚀 2026.11.12 - 11.13 | 서울 코엑스 & 글로벌 라이브',
        headline: 'AI의 한계를 넘어: 세계 정상급 석학과 빅테크 리더가 모이는 순간',
        subheadline: '전 세계 35개국 120+ 글로벌 연사가 자율 에이전트, 물리적 AI 로보틱스, 차세대 반도체의 미래를 제시합니다. 지금 공식 참가 등록을 시작하세요.',
        primaryCta: '얼리버드 티켓 등록하기',
        secondaryCta: '기조연설자 라인업 보기',
        highlights: ['35개국 120+ 글로벌 스피커', '5,000+ 오프라인 참가자', '3개 전문 심층 트랙']
      },
      overview: {
        title: '인공지능 생태계의 모든 결정적 변화가 이곳에서 시작됩니다',
        summary: '단순한 이론 논의를 넘어 실제 산업을 바꾸고 있는 최전선 기술 혁신을 공유합니다. 글로벌 탑티어 연구진의 기조연설부터 핸즈온 워크숍, 글로벌 투자자와의 1:1 밋업까지 풍성한 기회를 제공합니다.',
        keyTakeaways: [
          '3개 동시 진행 전문 트랙: 자율 에이전트, 뉴로모픽 반도체, AI 거버넌스',
          '글로벌 튜링상 수상자 및 빅테크 C-Level 리더들의 단독 기조연설',
          '혁신 AI 스타트업 50개사의 인터랙티브 쇼케이스 및 IR 피칭',
          '글로벌 테크 리더들과 직접 교류하는 익스클루시브 네트워킹 디너'
        ]
      },
      features: [
        {
          id: 'feat-1',
          title: 'Track A: Autonomous Agent Systems',
          description: '단순 챗봇을 넘어 스스로 계획하고 실행하는 다중 자율 에이전트 아키텍처의 프로덕션 배포 사례를 분석합니다.',
          category: '트랙 세션',
          highlight: '자율 에이전트'
        },
        {
          id: 'feat-2',
          title: 'Track B: Next-Gen Silicon & Robotics',
          description: 'HBM4 초고대역폭 메모리와 온디바이스 NPU, 피지컬 AI 로봇 공학의 최신 결합 모델을 시연합니다.',
          category: '트랙 세션',
          highlight: '물리적 AI'
        },
        {
          id: 'feat-3',
          title: 'Track C: AI Safety & Global Policy',
          description: 'EU AI 법안, 글로벌 저작권 규제, 그리고 안전한 정렬(Alignment) 연구의 최신 가이드라인을 공유합니다.',
          category: '트랙 세션',
          highlight: '거버넌스 & 보안'
        },
        {
          id: 'feat-4',
          title: 'Global Startup Pitch Showcase',
          description: '세계 무대를 목표로 하는 혁신 AI 스타트업 50팀의 라이브 피칭과 글로벌 VC 심사위원단의 현장 평가가 진행됩니다.',
          category: '스타트업 IR',
          highlight: '50개사 쇼케이스'
        }
      ],
      deepDives: [
        {
          tabTitle: '주요 연사 라인업',
          heading: '인공지능의 지평을 넓혀가는 세계적 석학들',
          content: '각 분야에서 가장 영향력 있는 연구자와 산업계 리더들이 심도 있는 통찰을 나눕니다.',
          bulletPoints: [
            '얀 르쿤 교수 (튜링상 수상자) - 월드 모델과 자기지도학습의 미래',
            '사라 첸 (글로벌 프론티어 AI 연구소 리드) - 신경망 에이전트 오케스트레이션',
            '이승우 박사 (차세대 AI 반도체 파운드리 CTO) - 초저전력 가속기 하드웨어 혁신'
          ]
        },
        {
          tabTitle: '네트워킹 프로그램',
          heading: '새로운 협업과 투자의 기회를 여는 만남의 장',
          content: '참가자 전용 모바일 앱을 통해 다른 참석자들의 프로필을 확인하고 1:1 커피챗을 사전에 예약할 수 있습니다.',
          bulletPoints: [
            'VIP 참석자 및 스피커 전용 갈라 디너 및 라운지 운영',
            '산업별/관심사별 라운드테이블 브레이크아웃 세션',
            '투자 매칭 플랫폼을 통한 사전 미팅 조율 지원'
          ]
        }
      ],
      metrics: [
        { label: '글로벌 연사', value: '120+ 명', description: '35개국 탑티어 연구진 및 창업가' },
        { label: '현장 참관객', value: '5,000+', description: '코엑스 그랜드볼룸 전관 개최' },
        { label: '온라인 글로벌 시청', value: '50,000+', description: '다국어 실시간 AI 동시통역 제공' },
        { label: '참여 파트너사', value: '80+ 개사', description: '글로벌 빅테크 및 선도 벤처캐피탈' }
      ],
      timelineOrSteps: [
        { step: '09:00', title: '오프닝 세레모니 & 기조강연', description: '튜링상 수상자의 미래 인공지능 패러다임 발표' },
        { step: '11:00', title: '3개 전문 트랙 세션', description: '에이전트, 반도체, AI 안전성 분과별 발표' },
        { step: '14:00', title: '스타트업 쇼케이스 & 패널 토론', description: '글로벌 VC와 함께하는 유망 스타트업 IR' },
        { step: '18:00', title: 'VIP 네트워킹 리셉션', description: '연사 및 비즈니스 파트너 전용 프라이빗 교류' }
      ],
      pricingOrTiers: [
        {
          name: '온라인 스트리밍',
          price: '49,000원',
          description: '전 세계 어디서나 실시간 고화질로 세션을 청취하고 싶은 참가자',
          features: ['전 트랙 실시간 라이브 스트리밍 시청', '실시간 AI 자막/번역 서비스', '행사 종료 후 30일간 VOD 다시보기', '디지털 발표자료집 PDF'],
          popular: false
        },
        {
          name: '올 액세스 패스',
          price: '290,000원',
          description: '코엑스 현장에서 생생한 열기를 느끼고 네트워킹하고 싶은 전문가',
          features: ['코엑스 전 행사장 2일간 자유 입장', '전 트랙 세션 현장 참관', '네트워킹 런치 & 커피 브레이크', '공식 웰컴 키트 및 기념품 증정', 'VOD 60일 다시보기'],
          popular: true
        },
        {
          name: 'VIP 익스클루시브',
          price: '650,000원',
          description: '글로벌 연사 및 C-level 파트너와 직접 교류하고자 하는 리더',
          features: ['올 액세스 혜택 전체 포함', 'VIP 전용 라운지 상시 이용', '스피커 & VIP 공식 갈라 디너 초청', '1:1 프라이빗 미팅 룸 예약권', 'VOD 평생 소장 패스'],
          popular: false
        }
      ],
      testimonialsOrQuotes: [
        {
          quote: '지난해 서밋에서 만난 글로벌 파트너와 공동 R&D를 런칭했습니다. 아시아에서 가장 수준 높은 테크 컨퍼런스입니다.',
          author: '마이클 창',
          role: 'Nexus Venture Partners 파트너'
        },
        {
          quote: '기존의 뻔한 발표가 아닌, 실제 코드와 아키텍처를 보여주는 심도 있는 세션들로 가득해 기술적 영감을 크게 받았습니다.',
          author: '강지혜',
          role: '카카오브레인 AI 리서처'
        }
      ],
      faqs: [
        {
          question: '해외 참가자를 위한 동시통역이 제공되나요?',
          answer: '네, 전 세션에 걸쳐 한국어-영어 양방향 실시간 통역기 및 모바일 AI 라이브 자막이 제공됩니다.'
        },
        {
          question: '학생 할인 또는 단체 등록 혜택이 있나요?',
          answer: '재학생을 위한 40% 학생 할인 티켓과 5인 이상 기업 단체를 위한 20% 특별 할인을 운영하고 있습니다.'
        }
      ],
      contact: {
        title: 'K-Tech Summit 2026 참가 및 제휴 문의',
        description: '스폰서십 패키지, 프레스 취재 등록, 단체 참가 등록은 사무국으로 연락주세요.',
        ctaText: '티켓 예매 바로가기',
        email: 'summit2026@k-tech.org',
        phone: '02-6000-8800',
        address: '서울특별시 강남구 영동대로 513 코엑스 컨벤션 센터'
      },
      footer: {
        copyright: '© 2026 K-Tech Summit Organizing Committee. All rights reserved.',
        note: '혁신을 만드는 전 세계 연구자와 기업인의 축제입니다.'
      },
      visibleSections: {
        hero: true,
        overview: true,
        features: true,
        deepDives: true,
        metrics: true,
        timeline: true,
        pricing: true,
        testimonials: true,
        faqs: true,
        contact: true
      }
    }
  },
  {
    id: 'roastery-cafe',
    title: '오르도(ORDO) 스페셜티 로스터리 & 베이커리 브랜드 가이드',
    badge: '로컬 비즈니스 / 브랜드',
    category: '식음료 & 라이프스타일',
    summary: '원두 산지 직거래와 장인정신 기반 슬로우 로스팅을 지향하는 스페셜티 커피 브랜드 소개서 및 매장 가이드입니다.',
    themeStyle: 'editorial',
    colorPalette: 'rose',
    rawText: `[오르도(ORDO) 스페셜티 로스터리 브랜드 소개서]
브랜드명: 오르도 (ORDO Coffee Roasters)
슬로건: 한 잔의 커피에 깃든 대지와 농부, 그리고 로스터의 정직한 리듬

1. 브랜드 철학 (Brand Philosophy)
- 'ORDO'는 라틴어로 '질서와 조화'를 뜻합니다.
- 복잡한 도심 속에서 온전한 쉼과 미각의 균형을 선물하는 스페셜티 로스터리입니다.
- 에티오피아, 콜롬비아, 과테말라 고산지대 소농장과 100% 다이렉트 트레이드(Direct Trade)로 공정한 가치를 나눕니다.

2. 시그니처 메뉴 및 원두 라인업 (Signatures)
(1) 오르도 블렌드 [고요 - The Serenity]
- 자스민, 백도 복숭아, 베르가못의 섬세하고 화사한 향미가 돋보이는 시그니처 라이트 로스팅
(2) 오르도 블렌드 [심연 - The Abyss]
- 다크초콜릿, 구운 헤이즐넛, 묵직한 바디감과 길게 남는 흑당의 단맛을 자랑하는 미디엄 다크 로스팅
(3) 사워도우 천연발효 바게트 & 페이스트리
- 24시간 저온 숙성 프랑스산 유기농 밀가루와 고메 버터만을 사용하여 매일 아침 구워내는 장인 빵

3. 브랜드 주요 지표 (Highlights)
- 9년 연속 블루리본 서베이 수록
- SCA(Specialty Coffee Association) 큐그레이더 4인 상주
- 연간 120톤 원두 전국 280여 개 카페 B2B 납품
- 100% 생분해성 친환경 펄프 패키징 적용

4. 공간 및 플래그십 스토어 (Space)
- 성수 본점: 통창 너머로 로스팅 랩을 직접 관람할 수 있는 인더스트리얼 우드 공간
- 한남 아뜰리에: 클래식 음반 LP와 함께 1:1 오마카세 필터 커피를 즐기는 프라이빗 살롱

5. B2B 파트너십 및 원두 정기구독
- 홈카페 구독: 격주 200g 신선 로스팅 원두 발송 (월 24,000원)
- 비즈니스 B2B 납품: 에스프레소 머신 세팅 컨설팅, 분기별 바리스타 교육 무료 지원

운영시간: 화~일 09:00 - 21:00 (월요일 휴무)
주소: 서울특별시 성동구 연무장길 88 1-2층 / 02-468-0912
이메일: wholesale@ordocoffee.kr`,
    presetData: {
      siteTitle: '오르도(ORDO) - Specialty Coffee & Roasters',
      brandName: 'ORDO Coffee Roasters',
      tagline: '한 잔의 커피에 깃든 대지와 농부, 그리고 로스터의 정직한 리듬',
      category: '스페셜티 카페 & 브랜드',
      themeStyle: 'editorial',
      colorPalette: 'rose',
      hero: {
        badge: '☕ 9년 연속 블루리본 선정 스페셜티 로스터리',
        headline: '복잡한 일상 속, 온전한 쉼과 미각의 조화를 선사하는 스페셜티 커피',
        subheadline: '에티오피아와 콜롬비아 고산지대 소농장 다이렉트 트레이드로 공수하는 최상급 생두. 전문 큐그레이더가 매일 아침 정성스럽게 볶아낸 원두와 천연발효 빵을 만나보세요.',
        primaryCta: '원두 정기구독 시작하기',
        secondaryCta: '플래그십 매장 둘러보기',
        highlights: ['100% 다이렉트 트레이드 생두', 'SCA 큐그레이더 4인 로스팅', '친환경 생분해 패키지']
      },
      overview: {
        title: '질서와 조화, 커피 한 잔이 만들어내는 가장 평온한 시간',
        summary: '라틴어로 질서와 조화를 뜻하는 오르도는 기계적인 추출 대신 원두가 자라난 토양의 개성을 온전히 보존하는 슬로우 로스팅을 고집합니다. 매일 마시는 커피 한 잔이 당신의 하루에 따뜻한 위로가 되길 바랍니다.',
        keyTakeaways: [
          '중남미 및 아프리카 산지 직거래(Direct Trade)로 농가에 공정한 대가 지급',
          '생두의 섬세한 꽃향과 과일 산미를 극대화하는 노르딕 스타일 로스팅',
          '화학 첨가물 없는 24시간 저온 발효 프랑스 전통 사워도우 베이커리',
          '전국 280+ 스페셜티 카페에 검증된 하이엔드 B2B 원두 공급'
        ]
      },
      features: [
        {
          id: 'feat-1',
          title: '시그니처 라이트 [고요 - The Serenity]',
          description: '자스민 꽃향기와 잘 익은 백도 복숭아, 베르가못의 은은한 여운이 청량하게 퍼지는 에티오피아 예가체프 베이스의 블렌드.',
          category: '필터 커피',
          highlight: '재구매율 1위'
        },
        {
          id: 'feat-2',
          title: '미디엄 다크 [심연 - The Abyss]',
          description: '깊은 다크초콜릿과 구운 헤이즐넛의 고소함, 묵직하고 실키한 바디감에 흑당의 달콤한 피니시가 이어지는 클래식 블렌드.',
          category: '에스프레소 블렌드',
          highlight: '베스트셀러'
        },
        {
          id: 'feat-3',
          title: '천연 발효종 아티장 베이커리',
          description: '프랑스산 유기농 밀가루와 프랑스 AOP 이즈니 버터를 사용하여 매일 새벽 4시부터 정직하게 굽는 사워도우와 크루아상.',
          category: '베이커리',
          highlight: '당일 생산 당일 소진'
        },
        {
          id: 'feat-4',
          title: '지속 가능한 제로 웨이스트 패키징',
          description: '알루미늄 코팅 없는 100% 생분해성 크라프트 파우치와 사탕수수 종이 라벨을 적용해 지구에 부담을 주지 않습니다.',
          category: '친환경 가치',
          highlight: '100% Biodegradable'
        }
      ],
      deepDives: [
        {
          tabTitle: '공간 소개',
          heading: '도심 속에서 만나는 오감의 안식처',
          content: '빛과 나무, 그리고 커피 향이 조화를 이루는 성수 본점과 한남 아뜰리에는 커피를 단순한 음료가 아닌 문화로 향유하는 공간입니다.',
          bulletPoints: [
            '성수 본점: 대형 통창 너머로 장인의 로스팅 과정을 관람할 수 있는 팩토리 카페',
            '한남 아뜰리에: 클래식 LP 사운드와 함께 바리스타와 대화하는 1:1 오마카세 필터 바',
            '프라이빗 커핑 룸: 주말마다 열리는 고객 참여형 커피 감별 클래스'
          ]
        },
        {
          tabTitle: 'B2B 도매 파트너십',
          heading: '카페 창업자와 함께 성장하는 원두 솔루션',
          content: '단순히 원두만 납품하지 않습니다. 매장의 인테리어 톤과 고객층에 맞춘 시그니처 블렌딩 개발부터 머신 세팅, 바리스타 교육까지 원스톱으로 지원합니다.',
          bulletPoints: [
            '주문 당일 로스팅 및 익일 배송 원칙',
            '분기별 매장 추출 프로파일 무상 점검 및 리포트 제공',
            '전국 280개 파트너 카페 대상 특별 도매 단가 적용'
          ]
        }
      ],
      metrics: [
        { label: '블루리본 서베이', value: '9년 연속', description: '서울 최고의 스페셜티 카페 수록' },
        { label: 'B2B 파트너 매장', value: '280+ 개소', description: '전국 카페 납품 및 바리스타 교육' },
        { label: '연간 원두 생산량', value: '120 톤', description: '철저한 QC와 당일 로스팅 원칙' },
        { label: '다이렉트 농장 파트너', value: '14개 농가', description: '공정 무역과 지속 가능한 상생' }
      ],
      timelineOrSteps: [
        { step: '01', title: '산지 소농장 선별', description: '고도 1,800m 이상 청정 재배 생두를 현지 농가와 직거래' },
        { step: '02', title: '마이크로 로스팅 & QC', description: '로트별 최적의 로스팅 프로파일 설계 및 당일 커핑 테스트' },
        { step: '03', title: '산소 차단 질소 충전', description: '원두 본연의 향미가 산화되지 않도록 특수 포장' },
        { step: '04', title: '홈카페 발송 & 매장 서빙', description: '로스팅 후 48시간 이내 가장 맛있는 골든타임에 제공' }
      ],
      pricingOrTiers: [
        {
          name: '홈카페 2주 구독',
          price: '월 24,000원',
          description: '집에서 매일 신선한 스페셜티 커피를 즐기시는 분',
          features: ['격주 1회 200g 원두 배송 (총 400g)', '이달의 싱글오리진 큐레이션 원두 포함', '원하는 분쇄도 무료 옵션', '무료 배송 혜택'],
          popular: true
        },
        {
          name: '오피스 & B2B 대용량',
          price: '월 88,000원 ~',
          description: '팀원들의 복지와 맛있는 커피가 필요한 기업 오피스',
          features: ['월 2kg 이상 맞춤 원두 배송', '전자동/반자동 머신 추출 가이드 제공', '샘플 원두 3종 무료 테스트', '세금계산서 정기 발행'],
          popular: false
        }
      ],
      testimonialsOrQuotes: [
        {
          quote: '오르도의 라이트 로스팅 [고요]를 마신 뒤로 커피에 대한 생각이 완전히 바뀌었습니다. 꽃차를 마시는 듯한 향미가 놀랍습니다.',
          author: '최지원',
          role: '푸드 매거진 에디터'
        },
        {
          quote: '우리 카페 오픈 때부터 오르도 원두를 쓰고 있는데, 단골 손님들이 커피 맛이 늘 한결같이 훌륭하다고 칭찬해주십니다.',
          author: '박상현',
          role: '연남동 카페 무드 대표'
        }
      ],
      faqs: [
        {
          question: '원두는 언제 로스팅되어 배송되나요?',
          answer: '오르도는 주문 후 24시간 이내 로스팅된 신선한 원두만을 출고하며, 디개싱(가스 배출)을 거쳐 수령 후 3~5일째부터 가장 풍부한 향미를 느끼실 수 있습니다.'
        },
        {
          question: '핸드드립용으로 분쇄해서 받을 수 있나요?',
          answer: '주문 시 홀빈(원두 상태), 핸드드립용, 에스프레소용, 모카포트/프렌치프레스용 중 원하시는 분쇄도를 무료로 선택하실 수 있습니다.'
        }
      ],
      contact: {
        title: '오르도 매장 방문 및 B2B 원두 샘플 문의',
        description: '도매 납품 샘플 원두 신청이나 플래그십 매장 단체 대관은 편하게 문의해주세요.',
        ctaText: '원두 납품 샘플 신청하기',
        email: 'wholesale@ordocoffee.kr',
        phone: '02-468-0912',
        address: '서울특별시 성동구 연무장길 88 오르도 빌딩 1-2층'
      },
      footer: {
        copyright: '© 2026 ORDO Coffee Roasters. All rights reserved.',
        note: '진정성 있는 커피 한 잔으로 일상의 온기를 더합니다.'
      },
      visibleSections: {
        hero: true,
        overview: true,
        features: true,
        deepDives: true,
        metrics: true,
        timeline: true,
        pricing: true,
        testimonials: true,
        faqs: true,
        contact: true
      }
    }
  }
];
