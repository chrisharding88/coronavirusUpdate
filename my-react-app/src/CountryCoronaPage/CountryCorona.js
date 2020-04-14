import React, { Component } from 'react';
import { CountryResult } from '../Components/Countries';
import API from '../Utils/API';
import { Nav } from '../Components/Nav';
import './styles.css';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

class CountryCoronaPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			xCountry: [],
			yCOuntry: [],
			selectedCountry: '',
			countryCases: '',
			countryRecovered: '',
			countryCritical: '',
			countryDeaths: '',
			displayCountry: false,
			countrySelected: false
		};
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.grabCountryName = this.grabCountryName.bind(this);
	}

	componentDidMount() {
		this.allCountries();
		this.grabCountryName(this.state.selectedCountry);
	}

	allCountries = () => {
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
		const pointerToThis = this;
		let xValuesCountryFunction = [];
		let yValuesCountryFunction = [];
		API.getCountryDataByName(selectedCountry)
			.then((response) => {
				const countryPicked = response.data[0];
				console.log(countryPicked);
				this.setState({
					countrySelected: true,
					countryCases: numeral(countryPicked.confirmed).format('0,0'),
					countryRecovered: numeral(countryPicked.recovered).format('0,0'),
					countryCritical: numeral(countryPicked.critical).format('0,0'),
					countryDeaths: numeral(countryPicked.deaths).format('0,0')
				});

				for (var key in response.data[0]) {
					xValuesCountryFunction.push(key);
					yValuesCountryFunction.push(response.data[0][key]);
				}

				pointerToThis.setState({
					xCountry: xValuesCountryFunction.slice(2, 5),
					yCountry: yValuesCountryFunction.slice(2, 5)
				});

				console.log(xValuesCountryFunction);
				console.log(yValuesCountryFunction);
			})
			.catch((err) => console.log(err));
	};

	handleCountryChange = (event) => {
		const { name, value } = event.target;

		this.grabCountryName(this.state.selectedCountry);
		this.setState({
			[name]: value
		});
	};

	render() {
		const data = {
			labels: this.state.xCountry,
			datasets: [
				{
					label: this.state.xCountry,
					backgroundColor: [ '#05f505', '#090ded', '#f50509' ],
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: this.state.yCountry
				}
			]
		};
		return (
			<div>
				<Nav />
				<div className="links">
					<Link type="button" className="btn btn-primary link1" to="/worldwide">
						Worldwide Results
					</Link>
					<Link type="button" className="btn btn-primary link2" to="/">
						Country Results
					</Link>
				</div>
				<div className="box2">
					<h3 id="countryHeader">Country Results</h3>
					<div className="dropdownCountriesMenu" id="country">
						<label for="dropdown-menu"> Country:</label>
						<select
							name="selectedCountry"
							value={this.state.selectedCountry}
							onClick={this.handleCountryChange}
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
					<div>
						<h1 id="countryName">{this.state.selectedCountry}</h1>
					</div>
					<CountryResult
						onChange={(event) => this.setState({ selectedCountry: event.target.value })}
						countryCases={this.state.countryCases}
						countryRecovered={this.state.countryRecovered}
						countryCritical={this.state.countryCritical}
						countryDeaths={this.state.countryDeaths}
					/>
					<Bar data={data} width={500} height={220} />
				</div>
			</div>
		);
	}
}
export default CountryCoronaPage;
