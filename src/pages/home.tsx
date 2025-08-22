import ProtectedLayout from '@/layouts/protected-layout';

const HomePage = () => {
  return (
    <ProtectedLayout>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-lg bg-white p-6 shadow'>
            <h2 className='text-lg font-semibold text-gray-900'>Total Claims</h2>
            <p className='mt-2 text-3xl font-bold text-blue-600'>1,234</p>
          </div>
          <div className='rounded-lg bg-white p-6 shadow'>
            <h2 className='text-lg font-semibold text-gray-900'>Pending Claims</h2>
            <p className='mt-2 text-3xl font-bold text-yellow-600'>56</p>
          </div>
          <div className='rounded-lg bg-white p-6 shadow'>
            <h2 className='text-lg font-semibold text-gray-900'>Resolved Claims</h2>
            <p className='mt-2 text-3xl font-bold text-green-600'>1,178</p>
          </div>
        </div>
        <div className='rounded-lg bg-white p-6 shadow'>
          <h2 className='text-lg font-semibold text-gray-900'>Recent Activity</h2>
          <p className='mt-2 text-gray-600'>No recent activity to display.</p>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default HomePage;
