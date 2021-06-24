import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/footer';
import Home from './components/Home';



function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <div className = 'container containe-fluid'>
        <Route path ="/" component = {Home} exact />
      </div>
      <Footer/>
    </div>
    </Router> 
  );
}

export default App;
