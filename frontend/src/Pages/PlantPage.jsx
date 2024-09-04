import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import axios from "axios";
import "../Styling/PlantPage.css";

const PlantPage = () => {
	const { id } = useParams();
	const [plant, setPlant] = useState(null);
	const [weatherData, setWeatherData] = useState(null);
	const [zipCode, setZipCode] = useState("");
	const [error, setError] = useState(null);
	const [nutrientStrength, setNutrientStrength] = useState("light");
	const [quote, setQuote] = useState(null);

	useEffect(() => {
		const fetchPlantDetails = async () => {
			try {
				const plantResponse = await api.get(`plants/${id}/`);
				setPlant(plantResponse.data);
			} catch (error) {
				if (error.response && error.response.status === 401) {
					setError("Unauthorized access. Please log in again.");
				} else {
					setError("Failed to load plant details.");
				}
			}
		};

		fetchPlantDetails();
	}, [id]);

	const fetchRandomQuote = async () => {
		try {
			const response = await axios.get(
				"https://quotes15.p.rapidapi.com/quotes/random/",
				{
					headers: {
						"X-RapidAPI-Key":
							"d811f4a675msh68e034d5ba65ebep1740a0jsn34c94a31801f",
						"X-RapidAPI-Host": "quotes15.p.rapidapi.com",
					},
					params: {
						language_code: "en",
					},
				}
			);
			setQuote(response.data.content);
		} catch (error) {
			setError("Failed to load the quote.");
		}
	};

	const geocodeZipCode = async (zipCode) => {
		try {
			const response = await axios.get(
				`https://api.zippopotam.us/us/${zipCode}`
			);
			const { places } = response.data;
			if (places && places.length > 0) {
				const place = places[0];
				return {
					latitude: parseFloat(place.latitude),
					longitude: parseFloat(place.longitude),
				};
			}
			return null;
		} catch (error) {
			setError("Invalid Zip Code. Please try again.");
			return null;
		}
	};

	const fetchWeatherData = async (latitude, longitude) => {
		try {
			const response = await axios.get(
				"https://api.open-meteo.com/v1/forecast",
				{
					params: {
						latitude,
						longitude,
						current_weather: true,
						daily:
							"temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max",
						temperature_unit: "fahrenheit",
						wind_speed_unit: "mph",
						precipitation_unit: "inch",
						timeformat: "unixtime",
						timezone: "America/Chicago",
					},
				}
			);
			return response.data;
		} catch (error) {
			setError("Failed to fetch weather data. Please try again.");
			return null;
		}
	};

	const handleGetWeather = async () => {
		const location = await geocodeZipCode(zipCode);
		if (location) {
			const { latitude, longitude } = location;
			const weatherResponse = await fetchWeatherData(latitude, longitude);
			if (weatherResponse) {
				setWeatherData(weatherResponse);
			}
		}
	};

	const handleDeletePlant = async () => {
		try {
			await api.delete(`plants/${id}/`);
			window.location.href = "/mygarden";
		} catch (error) {
			setError("Failed to delete plant. Please try again.");
		}
	};

	if (error) {
		return <div>{error}</div>;
	}

	if (!plant) {
		return <div>Loading plant details...</div>;
	}
	return (
		<div className="plant-page">
			<div className="header-content">
				<div className="header">
					<img
						src={plant.image || "/images/horti_logo.WEBP"}
						alt={plant.name}
						className="plant-image"
					/>
					<h1 className="plant-name">{plant.name}</h1>
					<p className="plant-date">Date Planted: {plant.date_planted}</p>
				</div>

				<div className="content">
					<div className="info-containers">
						<div className="weather-info">
							<h2>Weather Information</h2>
							<div className="weather-data-box">
								{weatherData ? (
									<div className="weather-info-container">
										{/* Weather data display */}
										<div className="weather-info-item">
											<div className="weather-info-title">Temperature Max:</div>
											<div className="weather-info-data">
												{weatherData.daily.temperature_2m_max[0]}°F
											</div>
										</div>
										<div className="weather-info-item">
											<div className="weather-info-title">Temperature Min:</div>
											<div className="weather-info-data">
												{weatherData.daily.temperature_2m_min[0]}°F
											</div>
										</div>
										<div className="weather-info-item">
											<div className="weather-info-title">Sunrise:</div>
											<div className="weather-info-data">
												{new Date(
													weatherData.daily.sunrise[0] * 1000
												).toLocaleTimeString()}
											</div>
										</div>
										<div className="weather-info-item">
											<div className="weather-info-title">Sunset:</div>
											<div className="weather-info-data">
												{new Date(
													weatherData.daily.sunset[0] * 1000
												).toLocaleTimeString()}
											</div>
										</div>
										<div className="weather-info-item">
											<div className="weather-info-title">Precipitation:</div>
											<div className="weather-info-data">
												{weatherData.daily.precipitation_sum[0]} inches
											</div>
										</div>
										<div className="weather-info-item">
											<div className="weather-info-title">
												Precipitation Probability:
											</div>
											<div className="weather-info-data">
												{weatherData.daily.precipitation_probability_max[0]}%
											</div>
										</div>
									</div>
								) : (
									<p>Enter a ZIP code to get weather data.</p>
								)}

								<div className="weather-input-container">
									<input
										className="form-control weather-input"
										type="text"
										value={zipCode}
										onChange={(e) => setZipCode(e.target.value)}
										placeholder="Enter ZIP code"
									/>
									<button
										className="btn btn-primary get-weather-button"
										onClick={handleGetWeather}
									>
										Get Weather Data
									</button>
								</div>
							</div>
						</div>

						<div className="random-wisdom-info weather-info">
							{" "}
							{}
							<h2>Random Wisdom</h2>
							<div className="weather-data-box">
								{" "}
								{}
								{quote ? (
									<p>{quote}</p>
								) : (
									<p>No quote available. Click to load a quote.</p>
								)}
								<button className="btn btn-primary" onClick={fetchRandomQuote}>
									Get Random Quote
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="nutrient-schedule-container">
				<div className="nutrient-dropdown">
					<select
						value={nutrientStrength}
						onChange={(e) => setNutrientStrength(e.target.value)}
						className="form-select nutrient-strength-button"
					>
						<option value="light">Light</option>
						<option value="medium">Medium</option>
						<option value="aggressive">Aggressive</option>
					</select>
				</div>
				<div className="nutrient-schedule">
					<h2 className="">Nutrient Schedule</h2>
					<img
						src={`/images/${nutrientStrength}_fertilizing_schedule.png`}
						alt={`${nutrientStrength} fertilizing schedule`}
						className="img-fluid"
					/>
				</div>
			</div>

			<button
				className="btn btn-danger delete-button"
				onClick={handleDeletePlant}
			>
				Delete Plant
			</button>
		</div>
	);
};

export default PlantPage;
