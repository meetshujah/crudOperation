import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './Component/Home';
import View from './Component/View';
import Edit from './Component/Edit';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/view/:id" component={View}></Route>
          <Route exact path="/edit/:id" component={Edit}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
