import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ pdfUrl }: { pdfUrl: string | null }) => {
  const defaultLayout = defaultLayoutPlugin();

  if (!pdfUrl) {
    return;
  }

  return (
    <div style={{ height: "750px" }}>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdfUrl} plugins={[defaultLayout]} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
