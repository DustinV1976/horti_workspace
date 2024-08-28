import React, { useState, useEffect } from "react";
import axios from "axios"; 

const PlantPage = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [userFertSchedule, setUserFertSchedule] = useState("");

	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				const response = await axios.get(
					"https://api.open-meteo.com/v1/forecast?latitude=41.85&longitude=-87.65&hourly=temperature_2m,precipitation_probability&daily=sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago"
				);
				setWeatherData(response.data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
			}
		};

		fetchWeatherData();
	}, []);

	return (
		<div className="plant-page">
			<h1>Plant Page</h1>

			<div className="plant-info">
				<div className="latest-photo">{/* Add plant photo here */}</div>
				<div className="plant-details">
					<p>Name: Plant Name</p>
					<p>Strain: Plant Strain</p>
					<p>Date Planted: MM/DD/YYYY</p>
				</div>
			</div>

			<div className="fertilizing-schedules">
				<h2>Recommended Fertilizing Schedule</h2>
				{/* Add recommended schedule image or component here */}

				<h2>User Fertilizing Schedule</h2>
				<input
					type="text"
					value={userFertSchedule}
					onChange={(e) => setUserFertSchedule(e.target.value)}
					placeholder="Enter your fertilizing data"
				/>
			</div>

			<div className="weather-info">
				<h2>Weather Information</h2>
				{weatherData ? (
					<div>
						{/* Display relevant weather data here */}
						<p>Temperature: {weatherData.hourly.temperature_2m[0]}°F</p>
						<p>
							Precipitation Probability:{" "}
							{weatherData.hourly.precipitation_probability[0]}%
						</p>
					</div>
				) : (
					<p>Loading weather data...</p>
				)}
			</div>

			<div className="fertilizing-graph">
				<h2>Fertilizing Schedule Graph</h2>
				{/* Add graph component here */}
			</div>
		</div>
	);
};

export default PlantPage;
