import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className='flex min-h-screen flex-col bg-white'>
      {/* Header / Branding */}
      <header className='flex items-center px-8 py-6'>
        <img alt='Allied World logo' className='mr-3 h-10' src='/vite.svg' />
        <span className='text-xs font-semibold tracking-wide text-gray-500'>A FAIRFAX Company</span>
      </header>
      {/* Main Section */}
      <section className='flex flex-1 flex-col items-center justify-between gap-8 px-8 py-8 md:flex-row md:px-20'>
        {/* Left: Text Content */}
        <div className='max-w-xl flex-1'>
          <span className='mb-6 inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-800'>
            <svg className='mr-1 h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
              <circle cx='10' cy='10' r='10' />
            </svg>
            Trusted Global Protection
          </span>
          <h1 className='mb-4 text-4xl leading-tight font-bold md:text-5xl'>
            Start Your Insurance
            <br />
            Claim with Confidence
          </h1>
          <p className='mb-8 text-lg text-gray-600'>
            File a claim quickly and securely for the coverage you’ve trusted—wherever you are in the world.
          </p>
          <button className='rounded-lg border border-gray-400 px-6 py-2 text-base font-medium transition hover:bg-gray-100'>
            Watch video
          </button>
        </div>
        {/* Right: Image Content */}
        <div className='relative flex min-w-[320px] flex-1 items-center justify-center'>
          {/* Main Image */}
          <div className='relative'>
            <img
              alt='Business people celebrating success at a desk'
              className='h-[260px] w-[400px] rounded-xl object-cover shadow-lg'
              src='https://placehold.co/400x260?text=Main+Image'
            />
            {/* 500k+ Protected Badge */}
            <span className='absolute top-4 left-4 flex items-center rounded-full border border-gray-200 bg-white/90 px-4 py-1 text-sm font-medium shadow'>
              <svg
                className='mr-1 h-4 w-4 text-gray-700'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path d='M17 20h5v-2a4 4 0 0 0-3-3.87' />
                <circle cx='9' cy='7' r='4' />
                <path d='M9 17v-1a4 4 0 0 1 4-4h1' />
              </svg>
              500k+ Protected
            </span>
            {/* Global Coverage Badge */}
            <span className='absolute right-4 bottom-4 flex items-center rounded-full border border-gray-200 bg-white/90 px-4 py-1 text-sm font-medium shadow'>
              <svg
                className='mr-1 h-4 w-4 text-gray-700'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20' />
              </svg>
              Global Coverage
            </span>
            {/* Inset Image */}
            <div className='absolute bottom-[-32px] left-6 rounded-lg bg-white p-1 shadow-lg'>
              <img
                alt='Team collaborating at a laptop'
                className='h-20 w-32 rounded-md object-cover'
                src='https://placehold.co/128x80?text=Inset+Image'
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className='flex flex-col items-center bg-gray-50 py-16'>
        <h2 className='mb-2 text-3xl font-bold'>All Products</h2>
        <p className='mb-10 max-w-2xl text-center text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
        </p>
        <div className='flex w-full justify-center'>
          <div className='w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow'>
            <img
              alt='Modern office with travel bag on chair'
              className='mb-4 h-48 w-full rounded-lg object-cover'
              src='https://placehold.co/400x192?text=Product+Image'
            />
            <div className='mb-2 flex items-center justify-between'>
              <h3 className='text-lg font-bold'>Travel</h3>
              <span className='inline-flex items-center text-gray-500'>
                <svg className='ml-1 h-4 w-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path d='M17 7l-1.41-1.41a2 2 0 0 0-2.83 0l-7.09 7.09a2 2 0 0 0 0 2.83l1.41 1.41a2 2 0 0 0 2.83 0l7.09-7.09a2 2 0 0 0 0-2.83z' />
                </svg>
              </span>
            </div>
            <p className='mb-4 text-sm text-gray-700'>
              At Allied World we don&apos;t approach travel insurance like everyone else. Instead, we provide
              comprehensive coverage, with a personalized approach because we un...
            </p>
            <div className='flex gap-3'>
              <button className='rounded bg-black px-4 py-2 text-sm font-semibold text-white'>Submit Online</button>
              <button className='rounded border border-gray-400 bg-white px-4 py-2 text-sm font-semibold text-gray-800'>
                Download Claim Form
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className='mt-auto border-t bg-white px-4 py-6 text-xs text-gray-700'>
        <div className='mx-auto max-w-5xl text-center'>
          <div className='mb-2'>
            Coverage will be underwritten by the Singapore branch office of Allied World Assurance Company, Ltd, which
            is regulated by the Monetary Authority of Singapore. Coverage is only offered subject to local regulatory
            requirements. Actual coverage is subject to the terms, conditions and exclusions of the actual policy
            issued.
          </div>
          <div>
            © 2025 Allied World Assurance Company Holdings, Ltd. All rights reserved. |
            <Link className='mx-1 hover:underline' to='/privacy'>
              Privacy Policy
            </Link>{' '}
            |
            <Link className='mx-1 hover:underline' to='/terms'>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
