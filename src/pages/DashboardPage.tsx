import {useNavigate} from '@tanstack/react-router';
import {Auth} from '../auth';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate({to: '/login'});
  };

  return (
      <div className="p-6">
        <p>You are logged in.</p>
        <button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
  );
};

export default DashboardPage;
