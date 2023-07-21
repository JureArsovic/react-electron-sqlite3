import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Internet from './pages/Internet';
import Details from './pages/Details';
import { useEffect, useState } from 'react';
import { Article } from 'main/services/Database.service';
import Input from './pages/Input';

function App() {
  console.log("Articles:");
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    // Function to fetch all articles
    const fetchArticles = async () => {
      try {
        const data = await window.electron.getAllArticles();
        setArticles(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    // Call the function to fetch articles - working
    fetchArticles();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/input" element={<Input />} />
        <Route path="/internet" element={<Internet />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
