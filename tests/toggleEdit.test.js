/**
 * @jest-environment jsdom
 */

import { toggleEdit } from '../scripts/script.js';

describe('toggleEdit Function', () => {
  it ('should toggle the \'hidden\' class on the passed in elements', () => {
    const input = document.createElement('input');
    const button = document.createElement('button');
    const span = document.createElement('span');

    const elements = [input, button, span];

    for (const element of elements) {
      element.classList.add('hidden');
      expect(element.className).toEqual('hidden');
    }

    toggleEdit(input, button, span);

    for (const element of elements) {
      expect(element.className).toEqual('');
    }
  })
})

