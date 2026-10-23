import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the TripGenie AI landing page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Your Perfect Trip/i);
  expect(screen.getByText(/Start Planning/i)).toBeInTheDocument();
});
