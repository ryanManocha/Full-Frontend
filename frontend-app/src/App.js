import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Providers } from './components/providers';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProjectView from './pages/ProjectView';
import Settings from './pages/Settings';
import GlowingEffectPage from './pages/GlowingEffectPage';

function App() {
  return (
    <Providers>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="project/:id" element={<ProjectView />} />
              <Route path="settings" element={<Settings />} />
              <Route path="glowing-effect" element={<GlowingEffectPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Providers>
  );
}

export default App;
