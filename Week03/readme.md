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

**Get Google Maps API Key**
   - Google API createdfor project
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
   - Create credentials (API Key)
   - Restricted API key to project

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

## 🙏 Acknowledgments

- **Ghana Tourism Authority** for location inspiration
- **Google Maps Platform** for mapping services
- **Ghana's Rich Cultural Heritage** for making this project meaningful

**Made with ❤️ for Ghana's Tourism Industry**

*Explore responsibly and preserve Ghana's beautiful heritage for future generations.*