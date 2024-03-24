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
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import CategoryList from './pages/CategoryList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';

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
          <Route path='customers' element={<Customers/>}/>
          <Route path='order' element={<Orders/>}/>
          <Route path='coupon' element={<AddCoupon/>}/>
          <Route path='coupon-list' element={<CouponList/>}/>
          <Route path='blog' element={<AddBlog/>}/>
          <Route path='blog-list' element={<Bloglist/>}/>
          <Route path='blog-category' element={<AddBlogCat/>}/>
          <Route path='blog-category-list' element={<BlogCatList/>}/>
          <Route path='color' element={<AddColor/>}/>
          <Route path='color-list' element={<ColorList/>}/>
          <Route path='category' element={<AddCategory/>}/>
          <Route path='category-list' element={<CategoryList/>}/>
          <Route path='brand' element={<AddBrand/>}/>
          <Route path='brand-list' element={<BrandList/>}/>
          <Route path='product' element={<AddProduct/>}/>
          <Route path='product-list' element={<ProductList/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
