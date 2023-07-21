import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import ArticleItem from '../components/Article';
import { Article } from 'main/services/Database.service';
import SearchQueryButton from 'renderer/components/SearchQueryButton';

const List: React.FC = () => {
  // Retrieve all articles from the database
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

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

  // Function to handle search
  const handleSearch = async () => {
    try {
      const data = await window.electron.searchArticles(searchKeyword);
      setArticles(data);
      console.log(data);
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  };

  return (
    <div>
      <Header />
      <h1>List</h1>

      {/* Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search for a specific article"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ flex: '1', marginRight: '10px' }}
        />
        <SearchQueryButton onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </SearchQueryButton>
      </div>

      {/* Display articles */}
      <div>
        {articles.map((article) => (
          <ArticleItem
            key={article.id}
            title={article.title}
            author={article.author}
            id={0}
          />
        ))}
      </div>

      {/* Buttons */}
      <div>
        <Button to="/home">Go back to Home Page</Button>
        <Button to="/internet">Find article online</Button>
      </div>

      <Footer />
    </div>
  );
};

export default List;
