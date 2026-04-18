# System Architecture

## Core Feature: Smart Irrigation + Climate Risk Prediction

### Inputs
- Location (coordinates)
- Weather data (temperature, rainfall, humidity)
- Soil type
- Crop type

### Processing
1. Fetch weather data (API or dataset)
2. Apply prediction model
3. Calculate:
   - Water requirement
   - Climate risk score

### Outputs
- Irrigation recommendation (liters/day)
- Risk level (Low / Medium / High)
- Advisory message

## Future Scope
- Satellite data integration
- Mobile app for farmers
- Real-time alerts
