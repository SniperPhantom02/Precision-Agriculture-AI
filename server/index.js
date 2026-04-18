const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { predictIrrigation } = require("./predict");

const app = express();
app.use(cors());
app.use(express.json());



async function getWeather(city) {
    const API_KEY = "5753c8287637c30fe4f8f73c77ad9db9";

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    return {
        temp: data.main.temp,
        rainfall: data.rain ? data.rain["1h"] || 0 : 0
    };
}



app.get("/", (req, res) => {
    res.json({ message: "Precision Agriculture API running" });
});

app.post("/predict", async (req, res) => {
    try {
        const { city, soilType, cropType } = req.body;

        if (!city || !soilType || !cropType) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const weather = await getWeather(city);


        const result = predictIrrigation(
            weather.temp,
            weather.rainfall,
            soilType,
            cropType
        );


        res.json({
            ...result,
            live_weather: weather
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Weather fetch failed" });
    }
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});
