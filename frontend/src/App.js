import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/footer';
import Home from './components/Home';
import ProductDetails from './components/Product/ProductDetails';



function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <div className = 'container containe-fluid'>
        <Route path ="/" component = {Home} exact />
        <Route path ="/search/:keyword" component = {Home} />
        <Route path ="/product/:id" component = {ProductDetails} exact />
      </div>
      <Footer/>
    </div>
    </Router> 
  );
}

export default App;
