const utils = require('../src/utils');

describe('utils.deepMerge', () => {
  it('merges flat objects', () => {
    const a = { x: 1, y: 2 };
    const b = { y: 3, z: 4 };
    expect(utils.deepMerge({ ...a }, b)).toEqual({ x: 1, y: 3, z: 4 });
  });

  it('merges nested objects', () => {
    const a = { x: { y: 1 } };
    const b = { x: { z: 2 } };
    expect(utils.deepMerge({ ...a }, b)).toEqual({ x: { y: 1, z: 2 } });
  });

  it('overwrites arrays', () => {
    const a = { arr: [1, 2] };
    const b = { arr: [3] };
    expect(utils.deepMerge({ ...a }, b)).toEqual({ arr: [3] });
  });

  it('does not mutate source', () => {
    const a = { x: 1 };
    const b = { y: 2 };
    utils.deepMerge({ ...a }, b);
    expect(a).toEqual({ x: 1 });
    expect(b).toEqual({ y: 2 });
  });
});
