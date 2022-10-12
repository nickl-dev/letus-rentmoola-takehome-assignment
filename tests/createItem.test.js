/**
 * @jest-environment jsdom
 */

import { createItem } from '../scripts/script.js';

describe('createItem Function', () => {
  it ('should create a new <li> element', () => {
    const newItem = createItem('new todo');
    expect(newItem.firstChild.innerText).toEqual('new todo');
  })
})