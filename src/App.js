import './App.css';
import Login from './Login';
import Home from './Home';
import Product from './Product';
import Loader from './components/loader/Loader';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (

    <>
    <BrowserRouter>
        {/* <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/product">Product</Link> */}
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<Product/> }/>
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;

