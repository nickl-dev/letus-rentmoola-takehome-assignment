import { updateLocalStorage } from '../scripts/utils';

const mocks = {
  localStorageMock: { 
    setItem: jest.fn(),
    getItem: jest.fn()
  }
};

global.localStorage = mocks.localStorageMock;

describe ('updateLocalStorage Function', () => {
  it('should update localStorage', () => {
    updateLocalStorage('todos', ['wake up', 'work out', 'shower']);
    expect(localStorage.setItem).toHaveBeenCalled();
  })
})