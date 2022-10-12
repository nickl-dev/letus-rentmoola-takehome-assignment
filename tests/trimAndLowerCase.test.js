import { trimAndLowerCase } from '../scripts/utils';

describe ('trimAndLowerCase Function', () => {
  it('should return a string in lowercase with it\'s whitespace removed', () => {
    expect(trimAndLowerCase(' LeTuS TaKeHoMe AsSiGnMeNt ')).toEqual('letus takehome assignment');
  })
})