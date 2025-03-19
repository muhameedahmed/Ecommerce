import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/register/Register";
import Login from "./components/Login/Login";
import UsercontextProvider from "./Context/Usercontext";
import Protectedroute from "./components/protectedroute/protectedroute";
import Errorpage from "./components/Errorpage/Errorpage";
import Productdetails from "./components/Home/Productdetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Cartcontextprovider from "./Context/Cartcontext";
import toast, { Toaster } from "react-hot-toast";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";

function App() {
  let queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Cartcontextprovider>
        <UsercontextProvider>
          <HashRouter>
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
          </HashRouter>
          <Toaster />
          <ReactQueryDevtools />
        </UsercontextProvider>
      </Cartcontextprovider>
    </QueryClientProvider>
  );
}

export default App;
