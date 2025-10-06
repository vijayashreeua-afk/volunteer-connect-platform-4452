import React from 'react';
import './App.css';
import { ThemeProvider } from './state/uiTheme';
import { AuthProvider } from './state/authContext';
import AppRouter from './router/Router';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

/**
 * PUBLIC_INTERFACE
 * App is the root component bootstrapping Theme and Auth contexts and rendering the router.
 * It applies Ocean Professional theme and provides a consistent page layout (Navbar/Main/Footer).
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-container">
          <header className="navbar">
            <div className="container navbar-inner">
              <Navbar />
            </div>
          </header>
          <main className="main">
            <AppRouter />
          </main>
          <footer className="footer">
            <div className="container footer-inner">
              <Footer />
            </div>
          </footer>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
