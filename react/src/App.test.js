import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './components/Home/Home';

test('app', () => {
  render(<App />);
  
  expect(App).toBe(App);
});
