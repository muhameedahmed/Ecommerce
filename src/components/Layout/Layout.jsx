import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-17 min-h-[90vh]">
        <Outlet /> {/* 👈 This is where the routed components will be displayed */}
      </div>
      <Footer />
    </>
  );
}
