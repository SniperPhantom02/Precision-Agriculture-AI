function predictIrrigation(temp, rainfall, soilType, cropType) {
    let waterNeed = 0;

    if (temp > 30) waterNeed += 30;
    else if (temp > 20) waterNeed += 20;
    else waterNeed += 10;

    if (rainfall > 50) waterNeed -= 15;
    else if (rainfall > 20) waterNeed -= 5;

    if (soilType === "sandy") waterNeed += 10;
    else if (soilType === "clay") waterNeed -= 5;

    let risk = "Low";
    if (temp > 35 && rainfall < 10) risk = "High";
    else if (temp > 30) risk = "Medium";

    const climateImpact = getClimateImpact(temp, rainfall);

    return {
        water_liters_per_day: Math.max(waterNeed, 5),
        risk_level: risk,
        climate_impact: climateImpact,
    };
}

function getClimateImpact(temp, rainfall) {
    if (temp > 35 && rainfall < 20)
        return "High climate stress: drought conditions likely";
    else if (rainfall > 80)
        return "Excess rainfall: flooding risk";
    else
        return "Stable climate conditions";
}

module.exports = { predictIrrigation };
