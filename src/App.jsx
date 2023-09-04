
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SaleProvider } from './context/SaleContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './routers/PrivateRouter.jsx';
import Login from './pages/Login.jsx';
import MySales from './pages/MySales.jsx';
import Register from './pages/Register.jsx';
import UsersPage from './pages/UsersPage.jsx';

const App = () => {

  return (
    <AuthProvider>
      <SaleProvider>
        <Router >
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/users" element={<PrivateRoute><UsersPage/> </PrivateRoute>} />
              <Route path="/" element={<PrivateRoute><Home/> </PrivateRoute>} />
              <Route path="/products/:categorId" element={<PrivateRoute><ProductsPage/></PrivateRoute>} />
              <Route path="/sales" element={<PrivateRoute><MySales/></PrivateRoute>} />
          </Routes>
        </Router>
      </SaleProvider>
    </AuthProvider>


  );
}

export default App;
