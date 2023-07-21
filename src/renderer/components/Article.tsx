import React from 'react';
import { Link } from 'react-router-dom';
import './Article.css';

interface ArticleItemProps {
  id: number;
  title: string;
  author: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ id, title, author }) => {
  return (
    <div className="article-item-container">
      <div className="article-item">
        <h2>{title}</h2>
        <p>Author: {author}</p>
        <Link to={`/details/${id}`} className="view-details-button">
          View more details
        </Link>
      </div>
    </div>
  );
};

export default ArticleItem;
