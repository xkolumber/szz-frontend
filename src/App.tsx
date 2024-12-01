import { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import AdminActualJobId from "./components/AdminComponents/ActualJob/AdminActualJobId";
import AdminActualJobNewMonth from "./components/AdminComponents/ActualJob/AdminActualJobNewMonth";
import AdminActualJobs from "./components/AdminComponents/ActualJob/AdminActualJobs";
import AdminAboutUs from "./components/AdminComponents/AboutUs/AdminAboutUs";
import AdminLayout from "./components/AdminComponents/AdminLayout";
import AdminPage from "./components/AdminComponents/AdminPage";
import AdminArchivePage from "./components/AdminComponents/Archiv/AdminArchivePage";
import AdminArchivePageId from "./components/AdminComponents/Archiv/AdminArchivePageId";
import AdminArchivePageNew from "./components/AdminComponents/Archiv/AdminArchivePageNew";
import AdminArchivePageYear from "./components/AdminComponents/Archiv/AdminArchivePageYear";
import AdminBlogPageId from "./components/AdminComponents/Blog/AdminBlogPageId";
import AdminBlogPageNew from "./components/AdminComponents/Blog/AdminBlogPageNew";
import AdminBlogsPage from "./components/AdminComponents/Blog/AdminBlogsPage";
import AdminEventPageId from "./components/AdminComponents/Events/AdminEventPageId";
import AdminEventPageNew from "./components/AdminComponents/Events/AdminEventPageNew";
import AdminEventsPage from "./components/AdminComponents/Events/AdminEventsPage";
import AdminFaqPage from "./components/AdminComponents/Faq/AdminFaqPage";
import AdminFaqPageId from "./components/AdminComponents/Faq/AdminFaqPageId";
import AdminFaqPageNew from "./components/AdminComponents/Faq/AdminFaqPageNew";
import AdminGalleryPage from "./components/AdminComponents/Gallery/AdminGalleryPage";
import AdminGalleryPageId from "./components/AdminComponents/Gallery/AdminGalleryPageId";
import AdminGalleryPageNew from "./components/AdminComponents/Gallery/AdminGalleryPageNew";
import AdminNavbarData from "./components/AdminComponents/NavbarData/AdminNavbarData";
import AdminNavbarDataId from "./components/AdminComponents/NavbarData/AdminNavbarDataId";
import AdminNavbarDataNewId from "./components/AdminComponents/NavbarData/AdminNavbarDataNewId";
import AdminUnionPage from "./components/AdminComponents/Union/AdminUnionPage";
import AdminUnionPageId from "./components/AdminComponents/Union/AdminUnionPageId";
import AdminUnionPageNew from "./components/AdminComponents/Union/AdminUnionPageNew";
import ArchivePage from "./components/ArchiveComponents/ArchivePage";
import BlogDetailPage from "./components/BlogComponents/BlogDetailPage";
import BlogsPage from "./components/BlogComponents/BlogsPage";
import EventDetailPage from "./components/EventComponents/EventDetailPage";
import EventsPage from "./components/EventComponents/EventsPage";
import Footer from "./components/Footer";
import GalleryPage from "./components/GalleryComponents/GalleryPage";
import GalleryPageId from "./components/GalleryComponents/GalleryPageId";
import HomePage from "./components/HomePageComponents/HomePage";
import Navbar from "./components/Navbar";
import NavbarInfo from "./components/NavbarInfo";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import TaskPage from "./components/TaskPage";
import UnionPage from "./components/UnionElements/UnionPage";
import PoradnaPage from "./PoradnaPage";
import ArchivePageYear from "./components/ArchiveComponents/ArchivePageYear";
import AdminSponsors from "./components/AdminComponents/Sponsors/AdminSponsors";
import AdminSponsorNew from "./components/AdminComponents/Sponsors/AdminSponsorNew";
import AdminSponsorId from "./components/AdminComponents/Sponsors/AdminSponsorId";
import AdminDocs from "./components/AdminComponents/Docs/AdminDocs";
import AdminDocsNew from "./components/AdminComponents/Docs/AdminDocsNew";
import AdminDocsId from "./components/AdminComponents/Docs/AdminDocsId";
import ContactPage from "./components/ContactPage";
import { NavbarProvider } from "./components/Provider";
import DocumentsPage from "./components/DocumentsPage";
import RecommendPage from "./components/RecommendedComponents/RecommendPage";
import AdminGalleryPageYear from "./components/AdminComponents/Gallery/AdminGalleryPageYear";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavbarProvider>
        <div className="bg-[#3F8124] own_edge !hidden md:!flex">
          <NavbarInfo />
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </NavbarProvider>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
          path="/archiv/:year"
          element={
            <Layout>
              <ArchivePageYear />
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
          <Route path="galeria/novy-album" element={<AdminGalleryPageNew />} />
          <Route path="galeria/:rok/:id" element={<AdminGalleryPageId />} />
          <Route path="galeria/:rok" element={<AdminGalleryPageYear />} />
          <Route path="blog" element={<AdminBlogsPage />} />
          <Route path="blog/:id" element={<AdminBlogPageId />} />
          <Route path="blog/novy-blog" element={<AdminBlogPageNew />} />
          <Route path="vystavy-a-podujatia" element={<AdminEventsPage />} />
          <Route
            path="vystavy-a-podujatia/:id"
            element={<AdminEventPageId />}
          />
          <Route
            path="vystavy-a-podujatia/nova-udalost"
            element={<AdminEventPageNew />}
          />
          <Route path="aktualne-prace" element={<AdminActualJobs />} />
          <Route path="aktualne-prace/:id" element={<AdminActualJobId />} />

          <Route path="zvaz" element={<AdminUnionPage />} />
          <Route path="zvaz/:id" element={<AdminUnionPageId />} />
          <Route path="zvaz/novy-dokument" element={<AdminUnionPageNew />} />

          <Route path="/admin/otazky-a-odpovede" element={<AdminFaqPage />} />
          <Route
            path="/admin/otazky-a-odpovede/:id"
            element={<AdminFaqPageId />}
          />
          <Route
            path="/admin/otazky-a-odpovede/nova-otazka"
            element={<AdminFaqPageNew />}
          />

          <Route
            path="aktualne-prace/novy-mesiac"
            element={<AdminActualJobNewMonth />}
          />

          <Route path="archiv" element={<AdminArchivePage />} />
          <Route path="archiv/:rok" element={<AdminArchivePageYear />} />
          <Route path="archiv/:rok/:id" element={<AdminArchivePageId />} />
          <Route path="sponzori" element={<AdminSponsors />} />
          <Route path="sponzori/novy-sponzor" element={<AdminSponsorNew />} />
          <Route path="sponzori/:id" element={<AdminSponsorId />} />

          <Route path="tlaciva" element={<AdminDocs />} />
          <Route path="tlaciva/nove-tlacivo" element={<AdminDocsNew />} />
          <Route path="tlaciva/:id" element={<AdminDocsId />} />

          <Route
            path="archiv/novy-dokument"
            element={<AdminArchivePageNew />}
          />
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
          path="/odporucame"
          element={
            <Layout>
              <RecommendPage />
            </Layout>
          }
        />

        <Route
          path="/poradna"
          element={
            <Layout>
              <PoradnaPage />
            </Layout>
          }
        />
        <Route
          path="/kontakt"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/tlaciva"
          element={
            <Layout>
              <DocumentsPage />
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
