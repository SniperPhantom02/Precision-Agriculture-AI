const axios = require("axios");
const { predictIrrigation } = require("./predict");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// 🔥 ADD THIS BLOCK HERE
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


// existing route
app.get("/", (req, res) => {
    res.json({ message: "Precision Agriculture API running" });
});
