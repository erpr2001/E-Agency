//Home page
import React from 'react';
import Layout from '../components/layout';
import Header from '../components/header';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import MainContent from '../components/maincontent';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* <Header /> */}
      {/* <Navbar/> */}
      <MainContent/>
      <h1>Welcome to E-Agency!</h1>
      <p>Find and book services easily!</p>
      {/* <Footer/> */}
    </Layout>
  );
};

export default Home;