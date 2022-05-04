
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';

import Home from "./pages/Home"
import InfoPage from './pages/InfoPage';
import Products from "./pages/Products"
function App() {
  return (
    <>
       <Navbar/>
      <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="products/:ctegory_type" element={<Products/>} />
       <Route path="products/:ctegory_type/:id" element={<InfoPage/>} />
       <Route path='cart' element={<CartPage/>}/>
    </Routes>
    </>
  );
}

export default App;
