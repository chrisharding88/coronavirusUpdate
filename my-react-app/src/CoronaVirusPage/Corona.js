import React, { Component } from 'react';
import { WorldwideTotals } from '../Components/Worldwide';
import { CountryResult } from '../Components/Countries';
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
			countryDeaths: '',
			displayWorldwide: false,
			displayCountry: false
		};

		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.grabCountryName = this.grabCountryName.bind(this);
	}

	componentDidMount() {
		this.totalResults();
		this.grabCountryName(this.state.selectedCountry);
	}

	totalResults = () => {
		//Data for the worldwide results
		API.getTotals()
			.then((response) => {
				const result = response.data;
				console.log(result);
				this.setState({
					displayWorldwide: true,
					cases: result[0].confirmed,
					recovered: result[0].recovered,
					critical: result[0].critical,
					deaths: result[0].deaths
				});
			})
			.catch((err) => console.log(err));

		// Catches the data of all the countries from the API and use them for the dropdown function
		API.getAllCountries()
			.then((response) => {
				const countryResult = response.data;
				let countriesFromAPI = countryResult.map((country) => {
					return { value: country, display: country };
				});
				console.log(countriesFromAPI);

				this.setState({
					displayCountry: true,
					countries: [ { value: '', display: '' } ].concat(countriesFromAPI)
				});
			})
			.catch((err) => console.log(err));
	};

	grabCountryName = (selectedCountry) => {
		API.getCountryDataByName(selectedCountry).then((response) => {
			const countryPicked = response.data[0];
			console.log(countryPicked);
		});
	};

	handleCountryChange = (event) => {
		const { name, value } = event.target;

		this.grabCountryName(this.state.selectedCountry);

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
				<div className="dropdownCountriesMenu" id="country">
					<label for="dropdown-menu"> Country:</label>
					<select
						name="selectedCountry"
						value={this.state.selectedCountry}
						onChange={(e) => {
							this.handleCountryChange(e);
						}}
					>
						{this.state.countries.map((country, i) => (
							<option key={i} value={country.value.country}>
								{country.display.country}
							</option>
						))}
					</select>
				</div>
				{this.state.selectedCountry}
				<CountryResult
					onChange={(e) => this.setState({ selectedCountry: e.target.value })}
					countryCases={this.state.countryCases}
					countryRecovered={this.state.countryRecovered}
					countryCritical={this.state.countryCritical}
					countryDeaths={this.state.countryDeaths}
				/>
			</div>
		);
	}
}

export default CoronaPage;
