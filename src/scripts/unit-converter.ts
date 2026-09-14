const categories: Record<string, any> = {
  length: { units: { mm: ['밀리미터', 'mm'], cm: ['센티미터', 'cm'], m: ['미터', 'm'], km: ['킬로미터', 'km'], inch: ['인치', 'in'], ft: ['피트', 'ft'] } },
  weight: { units: { mg: ['밀리그램', 'mg'], g: ['그램', 'g'], kg: ['킬로그램', 'kg'], oz: ['온스', 'oz'], lb: ['파운드', 'lb'] } },
  volume: { units: { ml: ['밀리리터', 'mL'], l: ['리터', 'L'], cup: ['컵', 'cup'], tbsp: ['큰술', '큰술'], tsp: ['작은술', '작은술'] } },
  temperature: { units: { c: ['섭씨', '°C'], f: ['화씨', '°F'], k: ['켈빈', 'K'] } },
};

const categorySelect = document.querySelector<HTMLSelectElement>('[data-category]');
const valueInput = document.querySelector<HTMLInputElement>('[data-value]');
const fromSelect = document.querySelector<HTMLSelectElement>('[data-from]');
const toSelect = document.querySelector<HTMLSelectElement>('[data-to]');
const result = document.querySelector<HTMLOutputElement>('[data-conversion-result]');
if (!categorySelect || !valueInput || !fromSelect || !toSelect || !result) throw new Error('단위 변환기 요소를 찾을 수 없습니다.');

const format = (value: number) => Number(value.toFixed(10)).toLocaleString('ko-KR', { maximumFractionDigits: 10 });
const convert = (value: number, category: string, from: string, to: string) => {
  if (category === 'temperature') { const c = from === 'c' ? value : from === 'f' ? (value - 32) * 5 / 9 : value - 273.15; return to === 'c' ? c : to === 'f' ? c * 9 / 5 + 32 : c + 273.15; }
  const factors: Record<string, number> = category === 'length' ? { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048 } : category === 'weight' ? { mg: 0.000001, g: 0.001, kg: 1, oz: 0.028349523125, lb: 0.45359237 } : { ml: 1, l: 1000, cup: 240, tbsp: 15, tsp: 5 };
  return value * factors[from] / factors[to];
};
const calculate = () => {
  const raw = valueInput.value.trim(); if (!raw) { result.textContent = '값을 입력해 보세요.'; return; }
  const value = Number(raw); if (!Number.isFinite(value)) { result.textContent = '유효한 숫자를 입력해 주세요.'; return; }
  if (categorySelect.value === 'temperature' && fromSelect.value === 'k' && value < 0) { result.textContent = '켈빈은 0K 미만으로 입력할 수 없습니다.'; return; }
  const converted = convert(value, categorySelect.value, fromSelect.value, toSelect.value);
  if (!Number.isFinite(converted) || (categorySelect.value === 'temperature' && toSelect.value === 'k' && converted < 0)) { result.textContent = '변환할 수 없는 값입니다.'; return; }
  result.textContent = `${format(converted)} ${categories[categorySelect.value].units[toSelect.value][1]}`;
};
const refreshUnits = () => { const units = categories[categorySelect.value].units; const options = (Object.entries(units) as [string, [string, string]][]).map(([key, unit]) => `<option value="${key}">${unit[0]} (${unit[1]})</option>`).join(''); fromSelect.innerHTML = options; toSelect.innerHTML = options; if (fromSelect.options.length > 1) toSelect.selectedIndex = 1; calculate(); };
categorySelect.addEventListener('change', refreshUnits); valueInput.addEventListener('input', calculate); fromSelect.addEventListener('change', calculate); toSelect.addEventListener('change', calculate); refreshUnits();
