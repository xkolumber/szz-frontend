import { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import AdminAboutUs from "./components/AdminComponents/AdminAboutUs";
import AdminBlogsPage from "./components/AdminComponents/AdminBlogsPage";
import AdminEventsPage from "./components/AdminComponents/AdminEventsPage";
import AdminGalleryPage from "./components/AdminComponents/AdminGalleryPage";
import AdminLayout from "./components/AdminComponents/AdminLayout";
import AdminPage from "./components/AdminComponents/AdminPage";
import ArchivePage from "./components/ArchivePage";
import BlogsPage from "./components/BlogComponents/BlogsPage";
import EventDetailPage from "./components/EventComponents/EventDetailPage";
import EventsPage from "./components/EventComponents/EventsPage";
import GalleryPage from "./components/GalleryComponents/GalleryPage";
import GalleryPageId from "./components/GalleryComponents/GalleryPageId";
import HomePage from "./components/HomePageComponents/HomePage";
import Navbar from "./components/Navbar";
import NavbarInfo from "./components/NavbarInfo";
import NotFound from "./components/NotFound";
import TaskPage from "./components/TaskPage";
import UnionPage from "./components/UnionElements/UnionPage";
import BlogDetailPage from "./components/BlogComponents/BlogDetailPage";
import AdminNavbarData from "./components/AdminComponents/AdminNavbarData";
import AdminNavbarDataId from "./components/AdminComponents/AdminNavbarDataId";
import AdminNavbarDataNewId from "./components/AdminComponents/AdminNavbarDataNewId";

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
          path="/blog/:slug"
          element={
            <Layout>
              <BlogDetailPage />
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="hlavicka-odkazy" element={<AdminNavbarData />} />
          <Route path="hlavicka-odkazy/:id" element={<AdminNavbarDataId />} />
          <Route
            path="hlavicka-odkazy/novy-odkaz"
            element={<AdminNavbarDataNewId />}
          />
          <Route path="o-nas" element={<AdminAboutUs />} />
          <Route path="galeria" element={<AdminGalleryPage />} />
          <Route path="blog" element={<AdminBlogsPage />} />
          <Route path="vystavy-a-podujatia" element={<AdminEventsPage />} />
        </Route>

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
