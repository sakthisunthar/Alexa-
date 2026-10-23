import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the TripGenie AI landing page', () => {
  render(<App />);
  expect(screen.getByText(/Your Perfect Trip Starts with AI/i)).toBeInTheDocument();
  expect(screen.getByText(/Start Planning/i)).toBeInTheDocument();
});
