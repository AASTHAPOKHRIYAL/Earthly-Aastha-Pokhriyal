
import { useState } from "react";
import { MapPin, Wind, Thermometer, Droplets, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AirMap = () => {
  const [selectedLocation, setSelectedLocation] = useState("San Francisco");

  const airQualityData = {
    aqi: 85,
    level: "Moderate",
    color: "bg-yellow-500",
    recommendation: "Sensitive individuals should limit outdoor activities"
  };

  const weatherData = {
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    visibility: 8.5
  };

  const nearbyStations = [
    { name: "Downtown SF", aqi: 92, distance: "0.5 km" },
    { name: "Golden Gate", aqi: 78, distance: "2.1 km" },
    { name: "Mission Bay", aqi: 88, distance: "1.8 km" },
    { name: "Presidio", aqi: 72, distance: "3.2 km" },
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    return "bg-red-500";
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive";
    return "Unhealthy";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 fade-in">Air Map</h1>
          <p className="text-xl text-muted-foreground fade-in stagger-1">
            Realtime air quality monitoring and pollution tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Maps + Health Tips */}
          <div className="lg:col-span-2 space-y-6">
            {/* Heat Map */}
            <Card className="eco-card h-48 lg:h-[290px] flex items-center justify-center fade-in stagger-2 hover-lift">
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-primary mx-auto animate-pulse" />
                <h3 className="text-xl font-semibold">Heat Map</h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm">
                  Temperature distribution and heat index overlay will be displayed here.
                </p>
                <Button className="bg-gradient-primary hover-scale">View Heat Map</Button>
              </div>
            </Card>

            {/* Pollution Map */}
            <Card className="eco-card h-48 lg:h-[290px] flex items-center justify-center fade-in stagger-3 hover-lift">
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-accent mx-auto animate-pulse" />
                <h3 className="text-xl font-semibold">Pollution Map</h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm">
                  Air pollution levels and contamination zones will be displayed here.
                </p>
                <Button className="bg-gradient-primary hover-scale">View Pollution Map</Button>
              </div>
            </Card>

            {/* Health Recommendations */}
            <Card className="eco-card fade-in stagger-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Health Recommendations</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Consider wearing a mask when going outdoors</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Keep windows closed and use air purifiers indoors</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Limit outdoor exercise and activities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Stay hydrated and monitor air quality throughout the day</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            {/* Weather Info - moved to first position */}
            <Card className="eco-card fade-in stagger-4 hover-lift">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Thermometer className="h-4 w-4 mr-2 text-accent" />
                Weather Conditions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-sm text-muted-foreground">Temperature</div>
                    <div className="font-semibold">{weatherData.temperature}°C</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                    <div className="font-semibold">{weatherData.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-sm text-muted-foreground">Wind Speed</div>
                    <div className="font-semibold">{weatherData.windSpeed} km/h</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-sm text-muted-foreground">Visibility</div>
                    <div className="font-semibold">{weatherData.visibility} km</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Current Location AQI - moved to second position */}
            <Card className="eco-card fade-in stagger-3 hover-lift">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Current Location</h3>
                  <Badge variant="outline">{selectedLocation}</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-4xl font-bold text-primary">
                    <span>AQI =</span>
                    <span>{airQualityData.aqi}</span>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-white text-sm ${airQualityData.color}`}>
                    {airQualityData.level}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {airQualityData.recommendation}
                  </p>
                </div>
              </div>
            </Card>

            {/* Nearby Locations - updated heading */}
            <Card className="eco-card fade-in stagger-5 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Nearby Locations</h3>
              <div className="space-y-3">
                {nearbyStations.map((station, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-300 cursor-pointer hover-scale"
                  >
                    <div>
                      <div className="font-medium">{station.name}</div>
                      <div className="text-sm text-muted-foreground">{station.distance}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{station.aqi}</div>
                      <div className={`text-xs px-2 py-1 rounded text-white ${getAQIColor(station.aqi)}`}>
                        {getAQILevel(station.aqi)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirMap;
