import { useNavigate } from 'react-router-dom';
import Header from '../Components/layout/Header';
import EmptyState from '../Components/common/EmptyState';

function MyTripsPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div style={{ minHeight: 'calc(100vh - var(--header-h))' }}>
        <EmptyState
          title="No trips yet"
          message="You haven't created any trips. Start planning your next adventure!"
          actionLabel="Create Your First Trip"
          onAction={() => navigate('/plan')}
        />
      </div>
    </>
  );
}

export default MyTripsPage;
