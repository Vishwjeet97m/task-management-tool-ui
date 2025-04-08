import { Outlet } from "react-router-dom";
import Sidebar from "../components/molecules/Sidebar";
import Header from "../components/molecules/Header";
import Footer from "../components/molecules/Footer";

const MainLayout = () => {
  return (
    <div className="app-container ">
        <Header />
      <div className="content flex flex-row">
      <Sidebar />
        <div className="">
        <main>
          <Outlet /> {/* Renders the matched protected route */}
        </main>
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
