import SigninPage from '@/pages/auth/signin';

import { render, screen } from '@tests/test-utils';

// Mock the auth layout
jest.mock('@/layouts/auth-layout', () => {
  return function MockAuthLayout({
    children,
    title,
    subtitle,
  }: {
    children: React.ReactNode;
    title: string;
    subtitle: string;
  }) {
    return (
      <div data-testid='auth-layout'>
        <h1 data-testid='auth-title'>{title}</h1>
        <p data-testid='auth-subtitle'>{subtitle}</p>
        {children}
      </div>
    );
  };
});

describe('SigninPage', () => {
  it('renders the signin page with correct layout props', () => {
    render(<SigninPage />);

    expect(screen.getByTestId('auth-layout')).toBeInTheDocument();
    expect(screen.getByTestId('auth-title')).toHaveTextContent('Sign in to your account');
    expect(screen.getByTestId('auth-subtitle')).toHaveTextContent('Welcome back! Please enter your details.');
  });

  it('displays the placeholder content', () => {
    render(<SigninPage />);

    expect(screen.getByText('Sign In Page')).toBeInTheDocument();
    expect(screen.getByText('Form will be added here later')).toBeInTheDocument();
  });

  it('has proper styling classes for content', () => {
    render(<SigninPage />);

    const mainText = screen.getByText('Sign In Page');
    const subText = screen.getByText('Form will be added here later');

    expect(mainText).toHaveClass('text-lg', 'font-semibold', 'text-gray-900');
    expect(subText).toHaveClass('mt-2', 'text-sm', 'text-gray-600');
  });

  it('centers the content', () => {
    render(<SigninPage />);

    const container = screen.getByText('Sign In Page').closest('div');

    expect(container).toHaveClass('text-center');
  });
});
