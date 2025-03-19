import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/register/Register";
import Login from "./components/Login/Login";
import Productdetails from "./components/Home/Productdetails";
import Protectedroute from "./components/protectedroute/protectedroute";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
import Errorpage from "./components/Errorpage/Errorpage";
import UsercontextProvider from "./Context/Usercontext";
import Cartcontextprovider from "./Context/Cartcontext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cartcontextprovider>
        <UsercontextProvider>
          <Router> {/* 👈 Using HashRouter instead of BrowserRouter */}
            <Layout>
              <Routes>
                <Route path="/" element={<Protectedroute><Home /></Protectedroute>} />
                <Route path="/Productdetails/:id/:category" element={<Protectedroute><Productdetails /></Protectedroute>} />
                <Route path="/Cart" element={<Protectedroute><Cart /></Protectedroute>} />
                <Route path="/Checkout" element={<Protectedroute><Checkout /></Protectedroute>} />
                <Route path="/allorders" element={<Protectedroute><Orders /></Protectedroute>} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="*" element={<Errorpage />} />
              </Routes>
            </Layout>
          </Router>
          <Toaster />
        </UsercontextProvider>
      </Cartcontextprovider>
    </QueryClientProvider>
  );
}

export default App;
