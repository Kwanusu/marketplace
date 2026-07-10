import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AiChatComponent from './components/AiChatComponent';
import Car from './components/Car';
import Counter from './components/Counter';
import { Login } from './pages/Login'
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';
import Japheth, { Heading } from './components/UserProfile';
import Welcome from './components/Welcome';
import Home from './pages/Home';
import WeatherWidget from './pages/Weather';
import UserProvider from './context/UserContext';
import DashboardDemo from './components/Dashboard';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Register } from './pages/Register';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import AdminRoute from './components/AdminRoute';
// import AdminDashboard from './components/Dashboard';
import ProductDetail from './components/ProductDetail';
import AdminLayout from './layouts/AdminLayout';
import AdminOverview from './pages/AdminOverview';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import { Toaster } from 'sonner';
// import PostManager from './components/PostManager';
import FetchData from './components/FetchData';


function App() {

  // const products = [
  //   {id: 1, title: "Wireless Headphones", price: 2000.00, description: "Noise cancellation over-ear headphones"},
  //   {id: 2, title: "Smart Watch", price: 1000.00, description: "Track your fitness and health stats"}
  // ]
  return (
    <>
    <Router>
      <Navbar />
      <Toaster position="top-right" richColors />
      {/* <FetchData /> */}
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/admin' element={<AdminRoute >
          <AdminDashboard />
        </AdminRoute>} /> */}
        <Route path="/admin" element={<AdminRoute>
          <AdminLayout />//A protected Route only accessible to admin users
          </AdminRoute>}>
          {/* index makes this component display when someone goes exactly to "/admin" */}
          <Route index element={<AdminOverview />} />
          {/* This displays at "/admin/orders" */}
          <Route path="orders" element={<AdminOrders />} />
          {/* This displays at "/admin/products" */}
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path='/register' element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<CheckoutSuccess />} />
      </Routes>
      {/* <Footer  /> */}
    </Router>
      {/* <DashboardDemo />
      <Counter />
      
      <WeatherWidget />
      
      <AiChatComponent /> */}
      
      {/* <Home /> */}
      {/* <Header name={'Jason'}/>
      <Login  />
      <GoodBye  />
      <Car color={'Red'} brand={'Toyota'} model={'Fielder'} year={2018}/> */}
    </>
  )
}
export default App;

