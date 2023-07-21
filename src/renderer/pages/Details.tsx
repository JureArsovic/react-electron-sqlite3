import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { Article } from 'main/services/Database.service';


const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Retrieve the article data from the database based on the ID
  const [article, setArticle] = useState<Article | null>(null); // Use Article | null for initial state

  useEffect(() => {
    // Function to fetch the specific article
    const fetchArticleById = async () => {
      try {
        const data = await window.electron.getArticleById(Number(id)); // Convert id to a number
        setArticle(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    // Call the function to fetch the article - working
    fetchArticleById();
  }, [id]); // Add id to the dependency array to refetch when the id changes

  // Check if the article exists
  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <Header />
      <h1>Article Details</h1>
      <div>
        <h2>Title: {article.title}</h2>
        <p>Author: {article.author}</p>
        <p>Publication: {article.publication}</p>
        <p>Year: {article.year}</p>
        {/* Additional data to display */}
      </div>
      {/* Buttons */}
      <Button to="/home">Go back to Home Page</Button>
      <Button to="/list">Go back to Article List</Button>
      <Footer />
    </div>
  );
};

export default Details;