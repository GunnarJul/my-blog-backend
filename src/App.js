import './App.css';
import NavBar from './Navbar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import {BrowserRouter, Routes, Route }  from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <div id="page-body" >
        <BrowserRouter >
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />}> </Route> s
            <Route path="/about" element={<AboutPage />}> </Route> 
            <Route path="/articles" element={<ArticlesListPage />}> </Route> 
            <Route path="/articles/:articleId" element={<ArticlePage />}> </Route> 
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </BrowserRouter> 
      </div>
    </div> 
  );
}

export default App;
