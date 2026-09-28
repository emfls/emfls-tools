import { convertUnit, getUnitSymbol, unitCategories } from '../lib/tool-logic.mjs';

const categorySelect = document.querySelector<HTMLSelectElement>('[data-category]');
const valueInput = document.querySelector<HTMLInputElement>('[data-value]');
const fromSelect = document.querySelector<HTMLSelectElement>('[data-from]');
const toSelect = document.querySelector<HTMLSelectElement>('[data-to]');
const result = document.querySelector<HTMLOutputElement>('[data-conversion-result]');
if (!categorySelect || !valueInput || !fromSelect || !toSelect || !result) throw new Error('단위 변환기 요소를 찾을 수 없습니다.');

const format = (value: number) => Number(value.toFixed(10)).toLocaleString('ko-KR', { maximumFractionDigits: 10 });
const calculate = () => {
  const raw = valueInput.value.trim(); if (!raw) { result.textContent = '값을 입력해 보세요.'; return; }
  const value = Number(raw); if (!Number.isFinite(value)) { result.textContent = '유효한 숫자를 입력해 주세요.'; return; }
  const converted = convertUnit(value, categorySelect.value, fromSelect.value, toSelect.value);
  if (converted === null) { result.textContent = '변환할 수 없는 값입니다.'; return; }
  result.textContent = `${format(converted)} ${getUnitSymbol(categorySelect.value, toSelect.value) ?? ''}`;
};
const refreshUnits = () => { const units = unitCategories[categorySelect.value].units; const options = (Object.entries(units) as [string, [string, string]][]).map(([key, unit]) => `<option value="${key}">${unit[0]} (${unit[1]})</option>`).join(''); fromSelect.innerHTML = options; toSelect.innerHTML = options; if (fromSelect.options.length > 1) toSelect.selectedIndex = 1; calculate(); };
categorySelect.addEventListener('change', refreshUnits); valueInput.addEventListener('input', calculate); fromSelect.addEventListener('change', calculate); toSelect.addEventListener('change', calculate); refreshUnits();
