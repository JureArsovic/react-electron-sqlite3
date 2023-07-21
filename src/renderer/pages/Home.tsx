import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to the Homepage</h1>
      <Button to="/list">Go to List Page</Button>
      <Button to="/input">Go to New Input Page</Button>
      <Footer />
    </div>
  );
};

export default Home;
