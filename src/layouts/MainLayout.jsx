import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
