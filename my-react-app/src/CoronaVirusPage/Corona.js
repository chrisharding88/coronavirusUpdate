import React, { Component } from 'react';
import { WorldwideTotals } from '../Components/Worldwide';
import { Countries, CountryResult } from '../Components/Countries';
import API from '../Utils/API';

class CoronaPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cases: '',
			recovered: '',
			critical: '',
			deaths: '',
			countries: [],
			selectedCountry: '',
			countryCases: '',
			countryRecovered: '',
			countryCritical: '',
			countryDeaths: ''
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

		API.getAllCountries()
			.then((response) => {
				const countryResult = response.data;
				console.log(countryResult);
				this.setState({
					countryCases: countryResult.cases,
					countryRecovered: countryResult.recovered,
					countryCritical: countryResult.critical,
					countryDeaths: countryResult.deaths
				});
			})
			.then((data) => {
				let countryArray = [];
				countryArray = data.map((country) => {
					return country;
				});
				console.log(countryArray);
				this.setState({
					countries: countryArray
				});
			})
			.catch((err) => console.log(err));
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div>
				<WorldwideTotals
					cases={this.state.cases}
					recovered={this.state.recovered}
					critical={this.state.critical}
					deaths={this.state.deaths}
				/>

				{/* {this.state.countries.map((country, index) => ( 
					<div key={index}>
						<Countries country={this.state.countries}>
							<option key={country.value} value={country.value}>
								{country.country}
							</option>
						</Countries>
					</div>
				))}*/}
			</div>
		);
	}
}

export default CoronaPage;
