const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { predictIrrigation } = require("./predict");

const app = express();
app.use(cors());
app.use(express.json());



async function getWeather(city) {
    const API_KEY = "5753c8287637c30fe4f8f73c77ad9db9";

    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        console.log("🌍 RAW WEATHER DATA:", data);

        return {
            temp: data?.main?.temp || 25,
            rainfall: data?.rain?.["1h"] || 0
        };

    } catch (err) {
        console.error("❌ Weather API Error:", err.message);
        throw new Error("Weather fetch failed");
    }
}



app.get("/", (req, res) => {
    res.json({ message: "Precision Agriculture API running" });
});



app.post("/predict", async (req, res) => {
    try {
        console.log("📥 BODY:", req.body);

        const { city, soilType, cropType } = req.body;

        if (!city || !soilType || !cropType) {
            return res.status(400).json({ error: "Missing fields" });
        }

        
        const weather = await getWeather(city);
        console.log("🌦 WEATHER:", weather);

      
        const result = predictIrrigation(
            weather.temp,
            weather.rainfall,
            soilType,
            cropType
        );

        console.log("📊 RESULT:", result);


        res.json({
            ...result,
            live_weather: weather
        });

    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});



app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});
