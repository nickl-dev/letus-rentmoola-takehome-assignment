import { getIndex } from '../scripts/utils';

const array = ['wake up', 'work out', 'shower'];

describe('getIndex Function', () => {
  it('should return the index of the value if the value exists in the array', () => {
    expect(getIndex(array, 'wake up')).toEqual(0);
  })
  it('should return -1 if the value does not exist in the array', () => {
    expect(getIndex(array, 'go back to sleep')).toEqual(-1);
  })
})