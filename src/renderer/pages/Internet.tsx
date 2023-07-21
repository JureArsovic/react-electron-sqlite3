import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchButton from '../components/SearchButton';
import Button from '../components/Button';

const Internet = () => {
  return (
    <div>
      <Header />
      
      <div className="content">
      <h1>Internet search for a specific article from Google Scholar</h1>       
        <SearchButton />
      </div>
      <Button to="/home">Go back to Home Page</Button>
      <Footer />
    </div>
  );
};

export default Internet;