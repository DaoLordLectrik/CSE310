// Google Maps Integration for Ghana Recreation Map
let map;
let markers = [];
let infoWindow;
let currentData = ghanaRecreationData;

// Initialize Google Map
function initMap() {
    // Center map on Ghana
    const ghanaCenter = { lat: 7.9465, lng: -1.0232 };
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: ghanaCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
            }
        ]
    });

    // Initialize info window
    infoWindow = new google.maps.InfoWindow({
        maxWidth: 350
    });

    // Hide loading and show map
    document.getElementById('loading').style.display = 'none';
    
    // Load all markers initially
    loadMarkers(currentData);
    updateStatistics(currentData);
}

// Load markers on the map
function loadMarkers(data) {
    // Clear existing markers
    clearMarkers();
    
    data.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.coordinates,
            map: map,
            title: location.name,
            icon: getMarkerIcon(location.category),
            animation: google.maps.Animation.DROP
        });

        // Add click listener for info window
        marker.addListener('click', () => {
            showInfoWindow(marker, location);
        });

        // Store reference to the location data
        marker.locationData = location;
        markers.push(marker);
    });

    // Update visible locations count
    updateVisibleCount(data.length);
}

// Clear all markers from map
function clearMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
}

// Get custom marker icon based on category
function getMarkerIcon(category) {
    const icons = {
        beach: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#4A90E2"/>
                    <circle cx="15" cy="15" r="8" fill="white"/>
                    <text x="15" y="20" text-anchor="middle" fill="#4A90E2" font-size="12">🏖️</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(30, 40),
            anchor: new google.maps.Point(15, 40)
        },
        park: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#22C55E"/>
                    <circle cx="15" cy="15" r="8" fill="white"/>
                    <text x="15" y="20" text-anchor="middle" fill="#22C55E" font-size="12">🌲</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(30, 40),
            anchor: new google.maps.Point(15, 40)
        },
        historical: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#8B5A2B"/>
                    <circle cx="15" cy="15" r="8" fill="white"/>
                    <text x="15" y="20" text-anchor="middle" fill="#8B5A2B" font-size="12">🏛️</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(30, 40),
            anchor: new google.maps.Point(15, 40)
        },
        cultural: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#A855F7"/>
                    <circle cx="15" cy="15" r="8" fill="white"/>
                    <text x="15" y="20" text-anchor="middle" fill="#A855F7" font-size="12">🎭</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(30, 40),
            anchor: new google.maps.Point(15, 40)
        },
        nature: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#16A085"/>
                    <circle cx="15" cy="15" r="8" fill="white"/>
                    <text x="15" y="20" text-anchor="middle" fill="#16A085" font-size="12">🌿</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(30, 40),
            anchor: new google.maps.Point(15, 40)
        },
        entertainment: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#E74C3C"/>
                    <circle cx="15" cy="15" r="8" fill="white"/>
                    <text x="15" y="20" text-anchor="middle" fill="#E74C3C" font-size="12">🎪</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(30, 40),
            anchor: new google.maps.Point(15, 40)
        }
    };

    return icons[category] || icons.nature;
}

// Show info window with location details
function showInfoWindow(marker, location) {
    const content = createInfoWindowContent(location);
    infoWindow.setContent(content);
    infoWindow.open(map, marker);

    // Add event listeners after content is set
    setTimeout(() => {
        const detailsBtn = document.getElementById(`details-btn-${location.id}`);
        const directionsBtn = document.getElementById(`directions-btn-${location.id}`);
        
        if (detailsBtn) {
            detailsBtn.addEventListener('click', () => showLocationModal(location));
        }
        
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => getDirections(location));
        }
    }, 100);
}

// Create info window content HTML
function createInfoWindowContent(location) {
    const stars = generateStarRating(location.rating);
    const categoryEmoji = getCategoryEmoji(location.category);
    
    return `
        <div class="custom-info-window">
            <div class="info-window-header">
                <h3 class="info-window-title">${categoryEmoji} ${location.name}</h3>
                <p class="info-window-category">${formatCategory(location.category)} • ${formatRegion(location.region)}</p>
            </div>
            <div class="info-window-body">
                <div class="info-window-rating">
                    <span class="stars">${stars}</span>
                    <span>(${location.rating})</span>
                </div>
                <p class="info-window-description">${location.description}</p>
                <div class="info-window-actions">
                    <button id="details-btn-${location.id}" class="info-window-btn btn-primary">
                        View Details
                    </button>
                    <button id="directions-btn-${location.id}" class="info-window-btn btn-secondary">
                        Directions
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    
    if (hasHalfStar) {
        stars += '⭐'; // Using full star for simplicity
    }
    
    return stars;
}

// Get category emoji
function getCategoryEmoji(category) {
    const emojis = {
        beach: '🏖️',
        park: '🌲',
        historical: '🏛️',
        cultural: '🎭',
        nature: '🌿',
        entertainment: '🎪'
    };
    return emojis[category] || '📍';
}

// Format category name
function formatCategory(category) {
    const categories = {
        beach: 'Beach',
        park: 'National Park',
        historical: 'Historical Site',
        cultural: 'Cultural Site',
        nature: 'Nature Reserve',
        entertainment: 'Entertainment'
    };
    return categories[category] || category;
}

// Format region name
function formatRegion(region) {
    const regions = {
        'greater-accra': 'Greater Accra',
        'central': 'Central Region',
        'western': 'Western Region',
        'ashanti': 'Ashanti Region',
        'northern': 'Northern Region',
        'eastern': 'Eastern Region'
    };
    return regions[region] || region;
}

// Get directions to location
function getDirections(location) {
    const destination = `${location.coordinates.lat},${location.coordinates.lng}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${location.name}`;
    window.open(googleMapsUrl, '_blank');
}

// Fit map to show all visible markers
function fitMapToMarkers() {
    if (markers.length === 0) return;
    
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => {
        bounds.extend(marker.getPosition());
    });
    
    map.fitBounds(bounds);
    
    // Ensure minimum zoom level
    google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
        if (map.getZoom() > 15) {
            map.setZoom(15);
        }
    });
}

// Update visible locations count
function updateVisibleCount(count) {
    document.getElementById('visibleLocations').textContent = count;
}

// Update statistics
function updateStatistics(data) {
    const totalCount = data.length;
    const avgRating = data.reduce((sum, location) => sum + location.rating, 0) / totalCount;
    
    // Find most popular category
    const categoryCounts = {};
    data.forEach(location => {
        categoryCounts[location.category] = (categoryCounts[location.category] || 0) + 1;
    });
    
    const topCategory = Object.keys(categoryCounts).reduce((a, b) => 
        categoryCounts[a] > categoryCounts[b] ? a : b
    );
    
    // Update DOM
    document.getElementById('totalLocations').textContent = totalCount;
    document.getElementById('avgRating').textContent = avgRating.toFixed(1);
    document.getElementById('topCategory').textContent = formatCategory(topCategory);
}

// Export functions for use in other files
window.mapFunctions = {
    loadMarkers,
    fitMapToMarkers,
    updateStatistics,
    updateVisibleCount
};