import { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUsComponents/AboutUs";
import ActualityPage from "./components/ActualityPage";
import AdminAboutUs from "./components/AdminComponents/AboutUs/AdminAboutUs";
import AdminActualityPage from "./components/AdminComponents/Actuality/AdminActualityPage";
import AdminActualJobId from "./components/AdminComponents/ActualJob/AdminActualJobId";
import AdminActualJobNewMonth from "./components/AdminComponents/ActualJob/AdminActualJobNewMonth";
import AdminActualJobs from "./components/AdminComponents/ActualJob/AdminActualJobs";
import AdminNewFile from "./components/AdminComponents/AdminNewFile";
import AdminPage from "./components/AdminComponents/AdminPage";
import AdminAnnouncementsPage from "./components/AdminComponents/Announcements/AdminAnnouncementsPage";
import AdminAnnPageId from "./components/AdminComponents/Announcements/AdminAnnPageId";
import AdminAnnPageNew from "./components/AdminComponents/Announcements/AdminAnnPageNew";
import AdminArchivePage from "./components/AdminComponents/Archiv/AdminArchivePage";
import AdminArchivePageId from "./components/AdminComponents/Archiv/AdminArchivePageId";
import AdminArchivePageNew from "./components/AdminComponents/Archiv/AdminArchivePageNew";
import AdminArchivePageYear from "./components/AdminComponents/Archiv/AdminArchivePageYear";
import AdminBlogPageId from "./components/AdminComponents/Blog/AdminBlogPageId";
import AdminBlogPageNew from "./components/AdminComponents/Blog/AdminBlogPageNew";
import AdminBlogsPage from "./components/AdminComponents/Blog/AdminBlogsPage";
import AdminChildren from "./components/AdminComponents/ChildrenPage/AdminChildren";
import AdminContactPage from "./components/AdminComponents/ContactPage/AdminContactPage";
import AdminDocs from "./components/AdminComponents/Docs/AdminDocs";
import AdminDocsId from "./components/AdminComponents/Docs/AdminDocsId";
import AdminDocsNew from "./components/AdminComponents/Docs/AdminDocsNew";
import AdminEventPageId from "./components/AdminComponents/Events/AdminEventPageId";
import AdminEventPageNew from "./components/AdminComponents/Events/AdminEventPageNew";
import AdminEventsPage from "./components/AdminComponents/Events/AdminEventsPage";
import AdminEventsPageYear from "./components/AdminComponents/Events/AdminEventsPageYear";
import AdminFaqPage from "./components/AdminComponents/Faq/AdminFaqPage";
import AdminFaqPageId from "./components/AdminComponents/Faq/AdminFaqPageId";
import AdminFaqPageNew from "./components/AdminComponents/Faq/AdminFaqPageNew";
import AdminGalleryPage from "./components/AdminComponents/Gallery/AdminGalleryPage";
import AdminGalleryPageId from "./components/AdminComponents/Gallery/AdminGalleryPageId";
import AdminGalleryPageNew from "./components/AdminComponents/Gallery/AdminGalleryPageNew";
import AdminGalleryPageYear from "./components/AdminComponents/Gallery/AdminGalleryPageYear";
import AdminGdpr from "./components/AdminComponents/Gdpr/AdminGdpr";
import AdminNavbarData from "./components/AdminComponents/NavbarData/AdminNavbarData";
import AdminNavbarDataId from "./components/AdminComponents/NavbarData/AdminNavbarDataId";
import AdminNavbarDataNewId from "./components/AdminComponents/NavbarData/AdminNavbarDataNewId";
import AdminPoradna from "./components/AdminComponents/PoradnaPage/AdminPoradna";
import AdminPrednasky from "./components/AdminComponents/PrednaskyPage/AdminPrednasky";
import AdminSponsorId from "./components/AdminComponents/Sponsors/AdminSponsorId";
import AdminSponsorNew from "./components/AdminComponents/Sponsors/AdminSponsorNew";
import AdminSponsors from "./components/AdminComponents/Sponsors/AdminSponsors";
import AdminSpravodajci from "./components/AdminComponents/Spravodajca/AdminSpravodajci";
import AdminSpravodajciId from "./components/AdminComponents/Spravodajca/AdminSpravodajciId";
import AdminSpravodajciNew from "./components/AdminComponents/Spravodajca/AdminSpravodajciNew";
import AdminUnionPage from "./components/AdminComponents/Union/AdminUnionPage";
import AdminUnionPageId from "./components/AdminComponents/Union/AdminUnionPageId";
import AdminUnionPageNew from "./components/AdminComponents/Union/AdminUnionPageNew";
import AdminUzitocne from "./components/AdminComponents/UzitocneLinky/AdminUzitocne";
import AdminZlavyPage from "./components/AdminComponents/ZlavyPage/AdminZlavyPage";
import AnnPage from "./components/AnnComponents/AnnPage";
import AnnPageSlug from "./components/AnnComponents/AnnPageSlug";
import ArchivePage from "./components/ArchiveComponents/ArchivePage";
import ArchivePageYear from "./components/ArchiveComponents/ArchivePageYear";
import BlogDetailPage from "./components/BlogComponents/BlogDetailPage";
import BlogsPage from "./components/BlogComponents/BlogsPage";
import ChildrenPage from "./components/ChildrenPage";
import ContactPage from "./components/ContactPage";
import CookieComponent from "./components/CookieComponent";
import DiscountPage from "./components/DiscountPage";
import DocumentsPage from "./components/DocumentComponents/DocumentsPage";
import EventDetailPage from "./components/EventComponents/EventDetailPage";
import EventsPage from "./components/EventComponents/EventsPage";
import FaqPage from "./components/FaqPage";
import Footer from "./components/Footer";
import GalleryPage from "./components/GalleryComponents/GalleryPage";
import GalleryPageId from "./components/GalleryComponents/GalleryPageId";
import GdprPage from "./components/GdprPage";
import HomePage from "./components/HomePageComponents/HomePage";
import LecturesPage from "./components/LecturesPage";
import LoginElement from "./components/LoginElement";
import Navbar from "./components/Navbar";
import NavbarInfo from "./components/NavbarInfo";
import NotFound from "./components/NotFound";
import PoradnaPage from "./components/PoradnaPage";
import ProtectedRoutes from "./components/ProtectedRoute";
import { NavbarProvider } from "./components/Provider";
import RecommendPage from "./components/RecommendedComponents/RecommendPage";
import ScrollToTop from "./components/ScrollToTop";
import SpravodajcaPage from "./components/SpravodajcaComponents/SpravodajcaPage";
import TaskPage from "./components/TaskPage";
import UnionPage from "./components/UnionElements/UnionPage";
import UsefullLinksPage from "./components/UsefullLinksPage";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavbarProvider>
        <div className="bg-[#3F8124] own_edge !hidden xl:!flex">
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
          path="/spravodajca"
          element={
            <Layout>
              <SpravodajcaPage />
            </Layout>
          }
        />
        <Route
          path="/gdpr"
          element={
            <Layout>
              <GdprPage />
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
        <Route
          path="/zlavy"
          element={
            <Layout>
              <DiscountPage />
            </Layout>
          }
        />
        <Route
          path="/prednasky"
          element={
            <Layout>
              <LecturesPage />
            </Layout>
          }
        />
        <Route
          path="/aktuality"
          element={
            <Layout>
              <ActualityPage />
            </Layout>
          }
        />
        <Route
          path="/mladez"
          element={
            <Layout>
              <ChildrenPage />
            </Layout>
          }
        />
        <Route
          path="/oznamy"
          element={
            <Layout>
              <AnnPage />
            </Layout>
          }
        />
        <Route
          path="/oznamy/:slug"
          element={
            <Layout>
              <AnnPageSlug />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginElement />
            </Layout>
          }
        />

        <Route path="/admin" element={<ProtectedRoutes />}>
          <Route index element={<AdminPage />} />
          <Route path="hlavicka-odkazy" element={<AdminNavbarData />} />
          <Route path="hlavicka-odkazy/:id" element={<AdminNavbarDataId />} />
          <Route
            path="hlavicka-odkazy/novy-odkaz"
            element={<AdminNavbarDataNewId />}
          />
          <Route path="deti-a-mladez" element={<AdminChildren />} />
          <Route path="o-nas" element={<AdminAboutUs />} />
          <Route path="zlavy" element={<AdminZlavyPage />} />
          <Route path="prednasky" element={<AdminPrednasky />} />
          <Route path="uzitocne-linky" element={<AdminUzitocne />} />
          <Route path="aktuality" element={<AdminActualityPage />} />
          <Route path="kontakt" element={<AdminContactPage />} />

          <Route path="galeria" element={<AdminGalleryPage />} />
          <Route path="galeria/novy-album" element={<AdminGalleryPageNew />} />
          <Route path="galeria/:rok/:id" element={<AdminGalleryPageId />} />
          <Route path="galeria/:rok" element={<AdminGalleryPageYear />} />
          <Route path="blog" element={<AdminBlogsPage />} />
          <Route path="blog/:id" element={<AdminBlogPageId />} />
          <Route path="blog/novy-blog" element={<AdminBlogPageNew />} />
          <Route path="vystavy-a-podujatia" element={<AdminEventsPage />} />
          <Route
            path="vystavy-a-podujatia/:rok"
            element={<AdminEventsPageYear />}
          />
          <Route
            path="vystavy-a-podujatia/:rok/:id"
            element={<AdminEventPageId />}
          />
          <Route
            path="vystavy-a-podujatia/nova-udalost"
            element={<AdminEventPageNew />}
          />
          <Route path="aktualne-prace" element={<AdminActualJobs />} />
          <Route path="aktualne-prace/:id" element={<AdminActualJobId />} />

          <Route path="oznamy" element={<AdminAnnouncementsPage />} />
          <Route path="oznamy/:id" element={<AdminAnnPageId />} />
          <Route path="oznamy/novy-oznam" element={<AdminAnnPageNew />} />

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

          <Route path="poradna" element={<AdminPoradna />} />
          <Route path="gdpr" element={<AdminGdpr />} />
          <Route path="novy-dokument" element={<AdminNewFile />} />

          <Route path="spravodajca" element={<AdminSpravodajci />} />
          <Route
            path="spravodajca/novy-objekt"
            element={<AdminSpravodajciNew />}
          />
          <Route path="spravodajca/:id" element={<AdminSpravodajciId />} />

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
          path="/uzitocne-linky"
          element={
            <Layout>
              <UsefullLinksPage />
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
          path="/faq"
          element={
            <Layout>
              <FaqPage />
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
      <CookieComponent />
    </BrowserRouter>
  );
}

export default App;
