const conversionFactors = {
  length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048 },
  weight: { mg: 0.000001, g: 0.001, kg: 1, oz: 0.028349523125, lb: 0.45359237 },
  volume: { ml: 1, l: 1000, cupUs: 237, cupNutrition: 240, cupMetric: 250, tbsp: 15, tsp: 5 },
};

/** @type {Record<string, { label: string, units: Record<string, [string, string]> }>} */
export const unitCategories = {
  length: { label: '길이', units: { mm: ['밀리미터', 'mm'], cm: ['센티미터', 'cm'], m: ['미터', 'm'], km: ['킬로미터', 'km'], inch: ['인치', 'in'], ft: ['피트', 'ft'] } },
  weight: { label: '무게', units: { mg: ['밀리그램', 'mg'], g: ['그램', 'g'], kg: ['킬로그램', 'kg'], oz: ['온스', 'oz'], lb: ['파운드', 'lb'] } },
  volume: { label: '부피', units: { ml: ['밀리리터', 'mL'], l: ['리터', 'L'], cupUs: ['미국 계량컵 (237mL)', 'US cup'], cupNutrition: ['미국 영양표시 컵 (240mL)', 'US label cup'], cupMetric: ['호주식 컵 (250mL)', 'AU cup'], tbsp: ['큰술 (15mL)', '큰술'], tsp: ['작은술 (5mL)', '작은술'] } },
  temperature: { label: '온도', units: { c: ['섭씨', '°C'], f: ['화씨', '°F'], k: ['켈빈', 'K'] } },
};

/** @param {string} category @param {string} unit @returns {string | null} */
export function getUnitSymbol(category, unit) {
  const units = unitCategories[category]?.units;
  return units?.[unit]?.[1] ?? null;
}

/** @param {number} value @param {string} category @param {string} from @param {string} to @returns {number | null} */
export function convertUnit(value, category, from, to) {
  if (!Number.isFinite(value)) return null;

  if (category === 'temperature') {
    const toCelsius = {
      c: (number) => number,
      f: (number) => (number - 32) * 5 / 9,
      k: (number) => number - 273.15,
    };
    const fromCelsius = {
      c: (number) => number,
      f: (number) => number * 9 / 5 + 32,
      k: (number) => number + 273.15,
    };
    if (!(from in toCelsius) || !(to in fromCelsius)) return null;
    const celsius = toCelsius[from](value);
    if (celsius < -273.15 - 1e-10) return null;
    const converted = fromCelsius[to](celsius);
    if (!Number.isFinite(converted)) return null;
    if (to === 'k' && converted < 0 && converted >= -1e-10) return 0;
    return to === 'k' && converted < 0 ? null : converted;
  }

  const units = conversionFactors[/** @type {'length' | 'weight' | 'volume'} */ (category)];
  if (!units || !(from in units) || !(to in units)) return null;
  const converted = value * units[from] / units[to];
  return Number.isFinite(converted) ? converted : null;
}

/** @param {string} text @param {typeof Intl.Segmenter | null} [Segmenter] */
export function countTextStats(text, Segmenter = globalThis.Intl?.Segmenter) {
  const characterCount = typeof Segmenter === 'function'
    ? [...new Segmenter(undefined, { granularity: 'grapheme' }).segment(text)].length
    : Array.from(text).length;
  const withoutWhitespace = text.replace(/\s/gu, '');
  const withoutWhitespaceCount = typeof Segmenter === 'function'
    ? [...new Segmenter(undefined, { granularity: 'grapheme' }).segment(withoutWhitespace)].length
    : Array.from(withoutWhitespace).length;

  return {
    withSpaces: characterCount,
    withoutSpaces: withoutWhitespaceCount,
    wordCount: text.trim() ? text.trim().split(/\s+/u).length : 0,
    lineCount: text ? text.split(/\r\n|\n|\r/u).length : 0,
  };
}

/** @param {string} time @param {number} hours @param {number} minutes @param {'add' | 'subtract'} operation */
export function calculateTime(time, hours, minutes, operation) {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (
    !match || Number(match[1]) > 23 || Number(match[2]) > 59
    || !Number.isSafeInteger(hours) || !Number.isSafeInteger(minutes)
    || hours < 0 || minutes < 0 || !['add', 'subtract'].includes(operation)
  ) return null;

  const base = Number(match[1]) * 60 + Number(match[2]);
  const sign = operation === 'subtract' ? -1 : 1;
  const total = base + (hours * 60 + minutes) * sign;
  if (!Number.isSafeInteger(total)) return null;

  const dayOffset = Math.floor(total / 1440);
  const normalized = ((total % 1440) + 1440) % 1440;
  const result = `${String(Math.floor(normalized / 60)).padStart(2, '0')}:${String(normalized % 60).padStart(2, '0')}`;
  return { time: result, dayOffset };
}
