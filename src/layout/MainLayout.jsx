import { Outlet } from "react-router-dom";
import Sidebar from "../components/molecules/Sidebar";
import Header from "../components/molecules/Header";
import Footer from "../components/molecules/Footer";

const MainLayout = () => {
  return (
    <div className="app-container flex flex-col min-h-screen h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar className="w-full md:w-1/4 lg:w-1/5 h-full overflow-auto" />
        <div className="flex-1 p-4 overflow-auto">
          <main className="h-full">
            <Outlet /> {/* Renders the matched protected route */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
