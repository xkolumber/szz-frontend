import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import HomePage from "./components/HomePageComponents/HomePage";
import AboutUs from "./components/AboutUs";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import NavbarInfo from "./components/NavbarInfo";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="bg-[#298040] own_edge ">
        <NavbarInfo />
      </div>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/o-nas"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
