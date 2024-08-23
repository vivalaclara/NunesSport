import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../mainPage/mainPage';

const AppRoutes: React.FC = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        
      </Routes>
    </Router>
 
 
  );
};

export default AppRoutes;