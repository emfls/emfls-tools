export type ToolCategory = '계산' | '날짜/시간' | '텍스트/숫자' | '랜덤' | '변환';

export interface ToolMeta { name: string; description: string; category: ToolCategory; href: string; }

export const tools: ToolMeta[] = [
  { name: '퍼센트 계산기', description: '값의 퍼센트와 비율을 빠르게 계산합니다.', category: '계산', href: '/tools/percentage/' },
  { name: '할인율 계산기', description: '할인 금액과 최종 가격을 계산합니다.', category: '계산', href: '/tools/discount/' },
  { name: '비율 계산기', description: '두 수의 비율과 단순화된 비율을 구합니다.', category: '계산', href: '/tools/ratio/' },
  { name: '날짜 차이 계산기', description: '두 날짜 사이의 경과 일수를 계산합니다.', category: '날짜/시간', href: '/tools/date-difference/' },
  { name: '나이 계산기', description: '생년월일과 기준일로 만 나이를 계산합니다.', category: '날짜/시간', href: '/tools/age/' },
  { name: '시간 계산기', description: '시간을 더하거나 빼서 결과를 확인합니다.', category: '날짜/시간', href: '/tools/time-calculator/' },
  { name: '글자수 계산기', description: '글자·단어·줄 수를 바로 확인합니다.', category: '텍스트/숫자', href: '/tools/character-count/' },
  { name: '숫자 포맷 변환기', description: '숫자를 읽기 쉬운 형태로 바꿉니다.', category: '텍스트/숫자', href: '/tools/number-format/' },
  { name: '랜덤 추첨기', description: '목록에서 한 항목을 무작위로 선택합니다.', category: '랜덤', href: '/tools/random-picker/' },
  { name: '단위 변환기', description: '길이·무게·부피·온도를 변환합니다.', category: '변환', href: '/tools/unit-converter/' },
];

export const toolCategories: ToolCategory[] = ['계산', '날짜/시간', '텍스트/숫자', '랜덤', '변환'];
