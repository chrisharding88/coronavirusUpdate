import React, { Component } from 'react';
import { WorldwideTotals } from '../Components/Worldwide';
import API from '../Utils/API';
import { Nav } from '../Components/Nav';
import './styles.css';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

class WorldwideCoronaPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cases: '',
			recovered: '',
			critical: '',
			deaths: '',
			displayWorldwide: false
		};
	}

	componentDidMount() {
		this.totalResults();
	}

	totalResults = () => {
		//Data for the worldwide results
		API.getTotals()
			.then((response) => {
				const result = response.data;
				console.log(result);
				this.setState({
					displayWorldwide: true,
					cases: numeral(result[0].confirmed).format('0,0'),
					recovered: numeral(result[0].recovered).format('0,0'),
					critical: numeral(result[0].critical).format('0,0'),
					deaths: numeral(result[0].deaths).format('0,0')
				});
			})
			.catch((err) => console.log(err));
	};

	handleCountryChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div>
				<Nav />
				<div className="links">
					<Link type="button" className="btn btn-primary link1" to="/">
						Worldwide Results
					</Link>
					<Link type="button" className="btn btn-primary link2" to="/country">
						Country Results
					</Link>
				</div>
				<div className="box1">
					<WorldwideTotals
						cases={this.state.cases}
						recovered={this.state.recovered}
						critical={this.state.critical}
						deaths={this.state.deaths}
					/>
				</div>
			</div>
		);
	}
}

export default WorldwideCoronaPage;
