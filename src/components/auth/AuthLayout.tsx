export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <div className='flex flex-1 items-center justify-center p-4'>
        <div className='w-full max-w-md'>{children}</div>
      </div>

      {/* Footer */}
      <footer className='bg-black py-4'>
        <div className='text-center'>
          <p className='text-xs leading-relaxed font-semibold text-white'>
            Copyright © 2001-2025 Allied World Assurance Company Holdings, Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
