# 🇬🇭 Ghana Recreation Map
# Go File Watcher
**CSE310 - Applied Programming (GIS Mapping)**  
*Module 2 - Maps API webapp*

A comprehensive web application showcasing Ghana's most beautiful recreational destinations using interactive maps powered by Google Maps API. Discover beaches, national parks, historical sites, and cultural attractions across all regions of Ghana.

## ✨ Features

### 🗺️ Interactive Mapping
- **20 Authentic Locations** - Carefully curated recreational destinations across Ghana
- **Custom Markers** - Color-coded icons for different categories (beaches, parks, historical sites)
- **Detailed Popups** - Rich information windows with location details and action buttons
- **Responsive Design** - Optimized for both desktop and mobile devices

### 🔍 Advanced Filtering
- **Category Filter** - Filter by beaches, national parks, historical sites, cultural attractions, nature reserves, and entertainment venues
- **Region Filter** - Browse locations by Ghana's regions (Greater Accra, Central, Western, Ashanti, Northern, Eastern)
- **Rating Filter** - Display only highly-rated locations (3+, 4+, or 4.5+ stars)
- **Real-time Results** - Instant filtering with live statistics

### 📱 User Experience
- **Modern UI** - Glassmorphism design with smooth animations
- **Location Details** - Comprehensive information including opening hours, entry fees, contact details, and facilities
- **Directions Integration** - Direct links to Google Maps for navigation
- **Share Functionality** - Share locations via native sharing or clipboard
- **Favorites System** - Save preferred locations for quick access

## 🚀 Quick Start

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/ghana-recreation-map.git
   cd ghana-recreation-map
   ```

2. **Get Google Maps API Key**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API (optional, for enhanced features)
   - Create credentials (API Key)
   - Restrict the API key to your domain (recommended for production)

3. **Configure API Key**
   - Open `index.html`
   - Find the line: `src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"`
   - Replace `YOUR_API_KEY` with your actual Google Maps API key

4. **Deploy**
   ```bash
   # For local development
   python -m http.server 8000
   # Or use any web server of your choice
   
   # Then visit: http://localhost:8000
   ```

## 📁 Project Structure

```
ghana-recreation-map/
├── index.html          # Main HTML structure
└── styles              # css folder
    └── styles.css      # Complete styling and responsive design
└── styles              # scripts folder
    ├── styles.css      # Complete styling and responsive design
    ├── data.js         # Ghana recreational locations dataset
    ├── map.js          # Google Maps API integration
    └── filters.js      # Filtering and search functionality
    ├── ui.js           # User interface management
└── README.md           # This file
```

## 🏗️ Architecture

### Core Components

**Data Layer (`data.js`)**
- Contains 20 authentic Ghana recreational locations
- Each location includes GPS coordinates, ratings, descriptions, activities, and facilities
- Structured as JavaScript objects for easy manipulation

**Map Integration (`map.js`)**
- Google Maps initialization with custom styling
- Marker creation and management
- Info window functionality
- Custom marker icons for different categories

**Filtering System (`filters.js`)**
- Real-time filtering by category, region, and rating
- Advanced search capabilities
- Statistics calculation
- Distance-based filtering utilities

**User Interface (`ui.js`)**
- Modal system for detailed location views
- Notification system for user feedback
- Share functionality with fallbacks
- Loading states and confirmations

## 🎯 Usage Examples

### Basic Usage
1. Open the application in your web browser
2. Explore the map with 25+ recreational locations in Ghana
3. Click on any marker to see location details
4. Use filters to narrow down locations by your preferences

### Advanced Features
- **Filter by Category**: Use the dropdown to show only beaches or national parks
- **Regional Exploration**: Filter by specific regions to plan regional trips
- **Get Directions**: Click "Get Directions" in any popup for navigation
- **Share Locations**: Use the share button to send location details to friends
- **View Details**: Click "View Details" for comprehensive location information

## 🗺️ Featured Locations

### 🏖️ Beaches
- Labadi Beach (Greater Accra)
- Busua Beach (Western Region)
- Bojo Beach (Greater Accra)
- Ada Foah Beach (Greater Accra)

### 🌲 National Parks
- Kakum National Park (Central Region)
- Mole National Park (Northern Region)
- Ankasa National Park (Western Region)
- Shai Hills Reserve (Greater Accra)

### 🏛️ Historical Sites
- Cape Coast Castle (Central Region)
- Elmina Castle (Central Region)
- Manhyia Palace Museum (Ashanti Region)
- Larabanga Mosque (Northern Region)

### 🌿 Nature Attractions
- Wli Waterfalls (Volta Region)
- Lake Volta (Eastern Region)
- Boti Falls (Eastern Region)
- Aburi Botanical Gardens (Eastern Region)

## 🔍 API Documentation

### Google Maps APIs Used
- **Maps JavaScript API** - Core mapping functionality
- **Places API** - Enhanced location data (optional)

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Responsiveness

The application is fully responsive and includes:
- Touch-friendly interface
- Optimized marker sizes for mobile
- Responsive filter controls
- Mobile-optimized modal dialogs
- Swipe gestures for map navigation

## 🚀 Performance Optimizations

- Efficient marker management (show/hide instead of recreate)
- Lazy loading of location details
- Optimized images with fallback URLs
- Minimal external dependencies
- CSS animations using GPU acceleration

## 🔐 Security Considerations

- API key restrictions (domain/IP-based)
- No sensitive data stored client-side
- HTTPS recommended for production
- Input sanitization for user interactions

## 🐛 Troubleshooting

### Common Issues

**Map not loading**
- Verify API key is correct and active
- Check browser console for JavaScript errors
- Ensure all files are in the same directory

**Markers not appearing**
- Check data.js for proper coordinate format
- Verify Google Maps API is loaded before initialization
- Look for console errors related to marker creation

**Filters not working**
- Ensure filters.js is loaded after data.js
- Check that filter event listeners are properly attached
- Verify category/region values match data structure

**Mobile display issues**
- Test on actual devices, not just browser dev tools
- Check viewport meta tag in HTML
- Verify touch events are properly handled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and structure
- Test on multiple browsers and devices
- Update documentation for new features
- Verify all locations have accurate GPS coordinates

## 🙏 Acknowledgments

- **Ghana Tourism Authority** for location inspiration
- **Google Maps Platform** for mapping services
- **Ghana's Rich Cultural Heritage** for making this project meaningful

## 🗓️ Roadmap

### Version 2.0 Features
- [ ] User-generated location reviews
- [ ] Photo gallery for each location
- [ ] Weather integration for locations
- [ ] Offline map caching
- [ ] Multi-language support (Twi, Hausa, Ewe)
- [ ] Integration with Ghana tourism booking systems

---

**Made with ❤️ for Ghana's Tourism Industry**

*Explore responsibly and preserve Ghana's beautiful heritage for future generations.*