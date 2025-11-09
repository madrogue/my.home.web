
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

test('renders textarea and button', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/type something/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
});
