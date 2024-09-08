import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import About from './pages/About';
import ForgetPassword from './pages/ForgotPassword';
import QuizPage from './pages/Quiz';
import BulkUploadForm from './pages/Bulk';



const App = () => {
  return (
    <BrowserRouter>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/upload' element={<BulkUploadForm />} />
          <Route path='/quiz' element={<QuizPage />} />
        </Routes>
        <Footer />
      </div>
      <ButtonGradient />
    </BrowserRouter>
  );
};

export default App;
