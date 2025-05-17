
import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import './index.css';
import { AnimatePresence } from 'framer-motion';

// Use lazy loading for the main App component
const App = lazy(() => import('./App'));

// Add loading fallback for better user experience
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Add a meta description for SEO
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'ProReporter turns your raw data into actionable insights with AI-powered analytics. Ask natural language questions and get instant answers and visualizations.';
document.head.appendChild(metaDescription);

// Add preconnect hints to speed up loading
const preconnectGoogle = document.createElement('link');
preconnectGoogle.rel = 'preconnect';
preconnectGoogle.href = 'https://fonts.googleapis.com';
document.head.appendChild(preconnectGoogle);

const preconnectGstatic = document.createElement('link');
preconnectGstatic.rel = 'preconnect';
preconnectGstatic.href = 'https://fonts.gstatic.com';
preconnectGstatic.crossOrigin = 'anonymous';
document.head.appendChild(preconnectGstatic);

createRoot(document.getElementById("root")!).render(
  <AnimatePresence mode="wait">
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </AnimatePresence>
);
