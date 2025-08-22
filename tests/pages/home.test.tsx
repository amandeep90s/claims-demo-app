import HomePage from '@/pages/home';

import { render, screen } from '@tests/test-utils';

// Mock the protected layout since we're testing the HomePage component in isolation
jest.mock('@/layouts/protected-layout', () => {
  return function MockProtectedLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid='protected-layout'>{children}</div>;
  };
});

describe('HomePage', () => {
  it('renders the dashboard title', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('displays the claims statistics cards', () => {
    render(<HomePage />);

    // Check for the presence of all stat cards
    expect(screen.getByText('Total Claims')).toBeInTheDocument();
    expect(screen.getByText('Pending Claims')).toBeInTheDocument();
    expect(screen.getByText('Resolved Claims')).toBeInTheDocument();

    // Check for the actual numbers
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
    expect(screen.getByText('1,178')).toBeInTheDocument();
  });

  it('displays the recent activity section', () => {
    render(<HomePage />);

    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('No recent activity to display.')).toBeInTheDocument();
  });

  it('renders within the protected layout', () => {
    render(<HomePage />);

    expect(screen.getByTestId('protected-layout')).toBeInTheDocument();
  });

  it('has proper structure for dashboard cards', () => {
    render(<HomePage />);

    const totalClaimsCard = screen.getByText('Total Claims').closest('div');
    const pendingClaimsCard = screen.getByText('Pending Claims').closest('div');
    const resolvedClaimsCard = screen.getByText('Resolved Claims').closest('div');

    expect(totalClaimsCard).toHaveClass('rounded-lg', 'bg-white', 'p-6', 'shadow');
    expect(pendingClaimsCard).toHaveClass('rounded-lg', 'bg-white', 'p-6', 'shadow');
    expect(resolvedClaimsCard).toHaveClass('rounded-lg', 'bg-white', 'p-6', 'shadow');
  });
});
