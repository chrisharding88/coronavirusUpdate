import React, { Component } from 'react';
import { WorldwideTotals } from '../Components/Worldwide';
import API from '../Utils/API';

class CoronaPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cases: '',
			recovered: '',
			critical: '',
			deaths: ''
		};
	}

	componentDidMount() {
		this.totalResults();
	}

	totalResults = () => {
		API.getTotals()
			.then((response) => {
				const result = response.data;
				console.log(result);
				this.setState({
					cases: result[0].confirmed,
					recovered: result[0].recovered,
					critical: result[0].critical,
					deaths: result[0].deaths
				});
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<WorldwideTotals
				cases={this.state.cases}
				recovered={this.state.recovered}
				critical={this.state.critical}
				deaths={this.state.deaths}
			/>
		);
	}
}

export default CoronaPage;
