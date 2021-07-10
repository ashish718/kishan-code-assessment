import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import ContactDetails from './Components/ContactDetails'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/" component={ContactDetails}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
