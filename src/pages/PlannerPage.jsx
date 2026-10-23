import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Components/layout/Header';
import TripPlanner from '../Components/planner/TripPlanner';

function PlannerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [initialDestination, setInitialDestination] = useState('');

  useEffect(() => {
    const dest = searchParams.get('destination');
    if (dest) setInitialDestination(dest);
  }, [searchParams]);

  const handleGenerate = (formData) => {
    navigate('/itinerary', { state: { formData } });
  };

  return (
    <>
      <Header />
      <TripPlanner
        onGenerate={handleGenerate}
        initialDestination={initialDestination}
      />
    </>
  );
}

export default PlannerPage;
