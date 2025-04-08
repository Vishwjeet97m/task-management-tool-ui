import { Outlet } from "react-router-dom";
import Sidebar from "../components/molecules/Sidebar";
import Header from "../components/molecules/Header";
import Footer from "../components/molecules/Footer";

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="content flex flex-row">
        <Sidebar />
        <div className="flex-1 p-4"> {/* Ensure this container takes the remaining width */}
          <main>
            <Outlet /> {/* Renders the matched protected route */}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
