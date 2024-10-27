import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import HomePage from "./components/HomePageComponents/HomePage";
import AboutUs from "./components/AboutUs";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import NavbarInfo from "./components/NavbarInfo";
import BlogsPage from "./components/BlogComponents/BlogsPage";
import EventsPage from "./components/EventComponents/EventsPage";
import EventDetailPage from "./components/EventComponents/EventDetailPage";
import GalleryPage from "./components/GalleryComponents/GalleryPage";
import GalleryPageId from "./components/GalleryComponents/GalleryPageId";
import ArchivePage from "./components/ArchivePage";
import TaskPage from "./components/TaskPage";
import UnionPage from "./components/UnionElements/UnionPage";

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
          path="/blog"
          element={
            <Layout>
              <BlogsPage />
            </Layout>
          }
        />
        <Route
          path="/vystavy-a-podujatia"
          element={
            <Layout>
              <EventsPage />
            </Layout>
          }
        />
        <Route
          path="/vystavy-a-podujatia/:slug"
          element={
            <Layout>
              <EventDetailPage />
            </Layout>
          }
        />
        <Route
          path="/galeria"
          element={
            <Layout>
              <GalleryPage />
            </Layout>
          }
        />
        <Route
          path="/galeria/:id"
          element={
            <Layout>
              <GalleryPageId />
            </Layout>
          }
        />
        <Route
          path="/archiv"
          element={
            <Layout>
              <ArchivePage />
            </Layout>
          }
        />
        <Route
          path="/zvaz"
          element={
            <Layout>
              <UnionPage />
            </Layout>
          }
        />
        <Route
          path="/task"
          element={
            <Layout>
              <TaskPage />
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
