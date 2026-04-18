const { predictIrrigation } = require("./predict");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Precision Agriculture API running" });
});

app.post("/predict", (req, res) => {
    const { temp, rainfall, soilType, cropType } = req.body;

    if (!temp || !rainfall || !soilType || !cropType) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const result = predictIrrigation(temp, rainfall, soilType, cropType);
    res.json(result);
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
