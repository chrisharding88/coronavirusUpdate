import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WorldwideCoronaPage from './WorldwideCoronaVirusPage/WorldwideCorona';
import CountryCoronaPage from './CountryCoronaPage/CountryCorona';
class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={WorldwideCoronaPage} />
						<Route exact path="/worldwide" component={WorldwideCoronaPage} />
						<Route exact path="/country" component={CountryCoronaPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
