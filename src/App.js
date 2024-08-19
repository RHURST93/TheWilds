import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Photo from './components/photo';
import Hero from './components/Hero';
import About from './components/About';
import PhotoGallery from './components/photo';

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <PhotoGallery />
    </div>
  );
}

export default App;
