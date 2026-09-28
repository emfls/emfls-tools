import test from 'node:test';
import assert from 'node:assert/strict';

const logic = await import('../src/lib/tool-logic.mjs');

test('unit conversion separates regional cup definitions and handles temperature boundaries', () => {
  assert.equal(logic.convertUnit?.(1, 'volume', 'cupUs', 'ml'), 237);
  assert.equal(logic.convertUnit?.(1, 'volume', 'cupNutrition', 'ml'), 240);
  assert.equal(logic.convertUnit?.(1, 'volume', 'cupMetric', 'ml'), 250);
  assert.equal(logic.convertUnit?.(1, 'volume', 'tbsp', 'ml'), 15);
  assert.equal(logic.convertUnit?.(1, 'volume', 'tsp', 'ml'), 5);
  assert.equal(logic.convertUnit?.(0, 'temperature', 'c', 'f'), 32);
  assert.equal(logic.convertUnit?.(-273.15, 'temperature', 'c', 'k'), 0);
  assert.equal(logic.convertUnit?.(-273.16, 'temperature', 'c', 'k'), null);
  assert.equal(logic.convertUnit?.(0, 'temperature', 'k', 'c'), -273.15);
  assert.equal(logic.getUnitSymbol('volume', 'cupMetric'), 'AU cup');
  assert.equal(logic.convertUnit?.(1, 'unknown', 'a', 'b'), null);
});

test('character statistics count user-visible graphemes and define whitespace and line counts', () => {
  assert.deepEqual(logic.countTextStats?.('e\u0301 👩‍💻\n한글'), {
    withSpaces: 6,
    withoutSpaces: 4,
    wordCount: 3,
    lineCount: 2,
  });
  assert.deepEqual(logic.countTextStats?.('one  two\n'), {
    withSpaces: 9,
    withoutSpaces: 6,
    wordCount: 2,
    lineCount: 2,
  });
  assert.deepEqual(logic.countTextStats?.(''), {
    withSpaces: 0,
    withoutSpaces: 0,
    wordCount: 0,
    lineCount: 0,
  });
  assert.equal(logic.countTextStats?.('e\u0301', null).withSpaces, 2);
});

test('time calculation reports the complete signed day offset', () => {
  assert.deepEqual(logic.calculateTime?.('23:30', 2, 0, 'add'), { time: '01:30', dayOffset: 1 });
  assert.deepEqual(logic.calculateTime?.('10:00', 49, 0, 'add'), { time: '11:00', dayOffset: 2 });
  assert.deepEqual(logic.calculateTime?.('10:00', 49, 0, 'subtract'), { time: '09:00', dayOffset: -2 });
  assert.deepEqual(logic.calculateTime?.('10:00', 0, 0, 'add'), { time: '10:00', dayOffset: 0 });
  assert.equal(logic.calculateTime?.('24:00', 1, 0, 'add'), null);
  assert.equal(logic.calculateTime?.('10:00', -1, 0, 'add'), null);
  assert.equal(logic.calculateTime?.('10:00', 1.5, 0, 'add'), null);
  assert.equal(logic.calculateTime?.('10:00', 1, 0, 'invalid'), null);
});
