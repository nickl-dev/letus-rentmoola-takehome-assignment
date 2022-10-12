/**
 * @jest-environment jsdom
 */

 import { resetInput } from '../scripts/utils';

 describe('resetInput Function', () => {
  it('should reset an input field\'s value', () => {
    const input = document.createElement('input');
    input.value = 'this is my todo';
    resetInput(input);
    expect(input.value).toEqual('');
  })
})