def predict_irrigation(temp, rainfall, soil_type, crop_type):

    water_need = 0

    if temp > 30:
        water_need += 30
    elif temp > 20:
        water_need += 20
    else:
        water_need += 10

    if rainfall > 50:
        water_need -= 15
    elif rainfall > 20:
        water_need -= 5

    if soil_type == "sandy":
        water_need += 10
    elif soil_type == "clay":
        water_need -= 5


    risk = "Low"
    if temp > 35 and rainfall < 10:
        risk = "High"
    elif temp > 30:
        risk = "Medium"

    return {
    "water_liters_per_day": max(water_need, 5),
    "risk_level": risk,
    "climate_impact": climate_impact(temp, rainfall),
    "advisory": generate_advisory(risk)
}


def generate_advisory(risk):
    if risk == "High":
        return "High climate stress. Increase irrigation and monitor crops closely."
    elif risk == "Medium":
        return "Moderate conditions. Maintain regular irrigation."
    else:
        return "Favorable conditions. Minimal intervention needed."
def climate_impact(temp, rainfall):
    if temp > 35 and rainfall < 20:
        return "High climate stress: drought conditions likely"
    elif rainfall > 80:
        return "Excess rainfall: risk of flooding and nutrient loss"
    else:
        return "Stable climate conditions"


if __name__ == "__main__":
    result = predict_irrigation(32, 10, "sandy", "wheat")
    print(result)
