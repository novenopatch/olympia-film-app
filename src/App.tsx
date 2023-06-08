import React, { lazy, Suspense } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="mt-5">
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
