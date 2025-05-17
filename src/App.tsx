
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import App from "./pages/App";
import NotFound from "./pages/NotFound";
import Templates from "./pages/Templates";
import SharedReport from "./pages/SharedReport";
import { Toaster } from "./components/ui/toaster";

function MainApp() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<App />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/shared/:reportId" element={<SharedReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default MainApp;
