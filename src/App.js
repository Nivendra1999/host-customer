import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Component/Home/Home';
import { Profile } from './Component/Profile/Profile';
import SignUp from './Component/User/SignUp/SignUp';
import SignIn from './Component/User/SignIn/Signin';
import ProtectedRoute from './Component/ProtectedRoute';
import { FreindProfile } from './Component/Profile/FreindProfile';
import Spam from './Component/Spam/spam';
import UpdateDetails from './Component/Update/update';
import About from './Component/About/about';
import { Chat } from './Component/Chat/Chat';
import ForgotPassword from './Component/User/ForgotPassword/forgotPassword';
import SetPassword from './Component/User/ForgotPassword/setpassword';
import ResetPassword from './Component/ResetPassword/ResetPassword';
function App() {
  return <>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/forgotPassword' element={<ForgotPassword/>} />
      <Route path='/userFreindProfile' element={<ProtectedRoute><FreindProfile /></ProtectedRoute>} />
      <Route path='/spam' element={<ProtectedRoute><Spam /></ProtectedRoute>} />
      <Route path='/update' element={<ProtectedRoute><UpdateDetails /></ProtectedRoute>} />
      <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
      <Route path='/chat' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path='/setpassword' element={< SetPassword/>} />
      <Route path='/changePassword' element={<ProtectedRoute><ResetPassword/></ProtectedRoute>} />


    </Routes>

  </>
}

export default App;
