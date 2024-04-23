import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import MasterList from './pages/master/MasterList';
import ThemaCategoryList from './pages/category/ThemaCategoryList';
import MainCategoryReport from './pages/main_category_report/MainCategoryReport';
import MainCategoryReportComplete from './pages/main_category_report/MainCategoryReportComplete';
import UserSignUp from './pages/user-signup/UserSignup';
import ReceivedReport from './pages/received_report/ReceivedReport';
import MasterSignup from './pages/master-signup/MasterSignup';
import MasterProfile from './pages/master_profile/MasterProfile';
import MasterSignUpNext from './pages/master-signup/MasterSignUpNext';
import MasterDetail from './pages/master-detail/MasterDetail';

import './styles/reset.scss';
import './styles/common.scss';
import MasterRequestForm from './components/master-detail/MasterRequestForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:lesson_name" element={<ThemaCategoryList />} />
        <Route path="/master/list" element={<MasterList />} />
        <Route
          path="/:lesson_category/:lesson_name"
          element={<MainCategoryReport />}
        />
        <Route path="/complete" element={<MainCategoryReportComplete />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route path="/received_report" element={<ReceivedReport />} />
        <Route path="/pro" element={<MasterSignup />} />
        <Route path="/pro/:id" element={<MasterSignUpNext />} />
        <Route path="/master/profile" element={<MasterProfile />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route path="/profile/users/:id" element={<MasterDetail />} />
        <Route path="/pro" element={<MasterSignup />} />
        <Route path="/pro/:id" element={<MasterSignUpNext />} />
        <Route path="/formtest" element={<MasterRequestForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
