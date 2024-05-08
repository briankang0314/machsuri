import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import ExpertList from './pages/expert/ExpertList';
import MajorCategoryList from './pages/category/MajorCategoryList';
import MainCategoryReport from './pages/main_category_report/MainCategoryReport';
import MainCategoryReportComplete from './pages/main_category_report/MainCategoryReportComplete';
import UserSignUp from './pages/user-signup/UserSignup';
import ReceivedReport from './pages/received_report/ReceivedReport';
import ExpertSignup from './pages/expert-signup/ExpertSignup';
import ExpertProfile from './pages/expert_profile/ExpertProfile';
import ExpertSignUpNext from './pages/expert-signup/ExpertSignUpNext';
import ExpertDetail from './pages/expert-detail/ExpertDetail';

import './styles/reset.scss';
import './styles/common.scss';
import ExpertRequestForm from './components/expert-detail/ExpertRequestForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:minor_name" element={<MajorCategoryList />} />
        <Route path="/expert/list" element={<ExpertList />} />
        <Route
          path="/:minor_category/:minor_name"
          element={<MainCategoryReport />}
        />
        <Route path="/complete" element={<MainCategoryReportComplete />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route path="/received_report" element={<ReceivedReport />} />
        <Route path="/pro" element={<ExpertSignup />} />
        <Route path="/pro/:id" element={<ExpertSignUpNext />} />
        <Route path="/expert/profile" element={<ExpertProfile />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route path="/profile/users/:id" element={<ExpertDetail />} />
        <Route path="/pro" element={<ExpertSignup />} />
        <Route path="/pro/:id" element={<ExpertSignUpNext />} />
        <Route path="/formtest" element={<ExpertRequestForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
