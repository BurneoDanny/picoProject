import logo from './logo.svg';
import './App.css';
import Navbar from './Header/Navbar/Navbar';
import Masthead from './Header/MastHead/MastHead';
import Content from './Content/Content';
import Footer from './Footer/Footer';


function App() {
  return (
    <div className='animate-fade-in h-screen bg-gray-200'>
      <header>
        <Navbar/>
        <Masthead/>
      </header>
      <main>
        <Content/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
