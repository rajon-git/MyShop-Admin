import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Enquires from './pages/Enquires';
import Bloglist from './pages/Bloglist';
import BlogCatList from './pages/BlogCatList'
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/admin' element={<MainLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='enquires' element={<Enquires/>}/>
          <Route path='order' element={<Orders/>}/>
          <Route path='blog-list' element={<Bloglist/>}/>
          <Route path='blog-category-list' element={<BlogCatList/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
