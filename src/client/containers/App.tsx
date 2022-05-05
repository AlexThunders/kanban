import '../styles/index.css';
import stanleyPark from '../../../assets/stanley_park.jpeg';
import svgIcon from '../../../assets/save-svgrepo-com.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClickCounter from '../components/ClickCounter';

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Canban Board.....</h1>
      <img
        src={stanleyPark}
        width="400px"
        height="300px"
        alt={stanleyPark}
      />
      <img
        src={svgIcon}
        width="350px"
        alt={svgIcon}
      />
      <ClickCounter />
      <Footer />
    </div>
  );
}

export default App;
