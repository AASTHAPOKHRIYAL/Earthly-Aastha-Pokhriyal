import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  Thermometer, 
  CloudRain,
  Wind,
  Sun,
  Droplets,
  MapPin,
  Sprout,
  Leaf,
  Users,
  Lightbulb,
  Edit,
  Plus
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [userLocation, setUserLocation] = useState("Dehradun");

  const userStats = {
    name: "Sara Chen",
    joinDate: "March 2024",
    plantsGrown: 23,
  };

  const weatherForecast = [
    { day: "Today", temp: 22, condition: "Partly Cloudy", icon: Sun },
    { day: "Tomorrow", temp: 25, condition: "Sunny", icon: Sun },
    { day: "Thursday", temp: 19, condition: "Rainy", icon: CloudRain }
  ];

  const myPlants = [
    { name: "Tomato Plants", count: 6, status: "Flowering", nextCare: "Water in 2 days" },
    { name: "Basil", count: 3, status: "Harvesting", nextCare: "Prune tomorrow" },
    { name: "Lettuce", count: 8, status: "Growing", nextCare: "Check for pests" },
    { name: "Carrots", count: 12, status: "Sprouting", nextCare: "Thin seedlings" }
  ];

  const ecoTips = [
    "Collect rainwater for your garden to save up to 40% on water usage",
    "Companion planting can reduce pest problems by 60%",
    "Composting kitchen scraps can reduce household waste by 30%"
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'air-quality':
        navigate('/airmap');
        break;
      case 'planting-calendar':
        navigate('/growguide');
        break;
      case 'plant-health':
        navigate('/plantcare');
        break;
      case 'community':
        // Keep existing behavior for community
        break;
    }
  };

  const handleLocationEdit = () => {
    setShowLocationInput(!showLocationInput);
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 fade-in">My Dashboard</h1>
          <p className="text-xl text-muted-foreground fade-in stagger-1">
            Track your environmental impact and garden progress
          </p>
        </div>

        {/* Row 1: Profile and Weather (expanded to fill space) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* User Profile */}
          <Card className="eco-card fade-in stagger-2 hover-lift">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{userStats.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">Member since {userStats.joinDate}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Your Location</span>
                    <div className="flex items-center space-x-2">
                      {showLocationInput ? (
                        <>
                          <span className="text-sm font-medium">{userLocation}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleLocationEdit}
                            className="p-1 h-6 w-6"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleLocationEdit}
                          className="text-xs px-2 py-1 h-6"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Location
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Plants Grown</span>
                    <span className="text-sm font-medium">{userStats.plantsGrown}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 3-Day Weather Forecast */}
          <Card className="eco-card fade-in stagger-3 hover-lift">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sun className="h-5 w-5 mr-2 text-accent" />
              3-Day Weather Forecast
            </h3>
            <div className="space-y-3">
              {weatherForecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                  <div className="flex items-center space-x-3">
                    <day.icon className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{day.day}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{day.temp}°C</div>
                    <div className="text-xs text-muted-foreground">{day.condition}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions - Horizontal Layout */}
        <Card className="eco-card fade-in stagger-4 hover-lift mb-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="justify-start hover-scale"
              onClick={() => handleQuickAction('air-quality')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Check Air Quality
            </Button>
            <Button 
              variant="outline" 
              className="justify-start hover-scale"
              onClick={() => handleQuickAction('planting-calendar')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Planting Calendar
            </Button>
            <Button 
              variant="outline" 
              className="justify-start hover-scale"
              onClick={() => handleQuickAction('plant-health')}
            >
              <Leaf className="h-4 w-4 mr-2" />
              Analyze Plant Health
            </Button>
            <Button 
              variant="outline" 
              className="justify-start hover-scale"
              onClick={() => handleQuickAction('community')}
            >
              <Users className="h-4 w-4 mr-2" />
              Join Community
            </Button>
          </div>
        </Card>

        {/* Swap It - Eco Products */}
        <Card className="eco-card fade-in stagger-5 hover-lift mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-primary" />
            Swap It
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee hover:animation-pause space-x-4 py-2">
              {[
                {
                  name: "Bamboo Toothbrush",
                  description: "Sustainably grown bamboo handle",
                  image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&h=200&fit=crop",
                  url: "https://amazon.com/bamboo-toothbrush"
                },
                {
                  name: "Reusable Silicone Food Bag",
                  description: "Perfect for meal prep",
                  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                  url: "https://amazon.com/silicone-food-bag"
                },
                {
                  name: "Compostable Bamboo Dinnerware",
                  description: "24 piece sustainable dining set",
                  image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
                  url: "https://amazon.com/bamboo-dinnerware"
                },
                {
                  name: "Organic Vegetable Seed Kit",
                  description: "Tomatoes, lettuce, and herbs starter kit",
                  image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
                  url: "https://amazon.com/vegetable-seed-kit"
                },
                {
                  name: "Reusable Jute Shopping Bag",
                  description: "Biodegradable and durable",
                  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
                  url: "https://amazon.com/jute-shopping-bag"
                },
                {
                  name: "Air-Purifying Peace Lily",
                  description: "Indoor plant in recycled pot",
                  image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=300&h=200&fit=crop",
                  url: "https://amazon.com/peace-lily-plant"
                },
                {
                  name: "Biodegradable Dish Soap Bar",
                  description: "Lavender scented natural cleaning",
                  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
                  url: "https://amazon.com/dish-soap-bar"
                },
                {
                  name: "Coconut Fiber Scrub Pads",
                  description: "Natural cleaning pads - pack of 6",
                  image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=200&fit=crop",
                  url: "https://amazon.com/coconut-scrub-pads"
                }
              ].map((product, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-64 bg-secondary/30 rounded-lg p-4 hover:bg-secondary/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                  style={{ animationPlayState: 'inherit' }}
                >
                  <div className="relative overflow-hidden rounded-md mb-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium text-sm mb-2 text-foreground">{product.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-scale focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => window.open(product.url, '_blank')}
                    tabIndex={0}
                  >
                    Buy on Amazon
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Daily Eco Tips - Horizontal Layout */}
        <Card className="eco-card fade-in stagger-6 hover-lift">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-accent" />
            Daily Eco Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ecoTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-secondary rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 hover-scale" variant="outline">
            More Tips
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
