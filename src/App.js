import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect } from 'react';
import { listen } from './app/listener';
import { useSelector } from 'react-redux';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Invoices from './pages/Invoices';

function App() {
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    listen();
  }, [])

  return (
    <Router>
      <TopBar />
      <Switch>
        <Route path="/invoices/:id" component={Invoices}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/account" component={Account}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/register" component={Register}/>
        <Route path="/login">
          { auth.user ? <Redirect to="/" /> : <Login /> }
        </Route>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
