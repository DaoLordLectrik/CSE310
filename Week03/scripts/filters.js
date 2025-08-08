// Filter functionality for Ghana Recreation Map
class LocationFilter {
    constructor() {
        this.categoryFilter = document.getElementById('categoryFilter');
        this.regionFilter = document.getElementById('regionFilter');
        this.ratingFilter = document.getElementById('ratingFilter');
        this.clearFiltersBtn = document.getElementById('clearFilters');
        
        this.initializeEventListeners();
    }

    // Initialize event listeners for filter controls
    initializeEventListeners() {
        this.categoryFilter.addEventListener('change', () => this.applyFilters());
        this.regionFilter.addEventListener('change', () => this.applyFilters());
        this.ratingFilter.addEventListener('change', () => this.applyFilters());
        this.clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
    }

    // Apply all active filters
    applyFilters() {
        let filteredData = [...ghanaRecreationData];

        // Apply category filter
        const selectedCategory = this.categoryFilter.value;
        if (selectedCategory !== 'all') {
            filteredData = filteredData.filter(location => location.category === selectedCategory);
        }

        // Apply region filter
        const selectedRegion = this.regionFilter.value;
        if (selectedRegion !== 'all') {
            filteredData = filteredData.filter(location => location.region === selectedRegion);
        }

        // Apply rating filter
        const minRating = parseFloat(this.ratingFilter.value);
        if (minRating > 0) {
            filteredData = filteredData.filter(location => location.rating >= minRating);
        }

        // Update map with filtered data
        if (typeof window.mapFunctions !== 'undefined') {
            window.mapFunctions.loadMarkers(filteredData);
            window.mapFunctions.updateStatistics(filteredData);
            
            // Fit map to show filtered markers if there are any
            if (filteredData.length > 0 && filteredData.length < ghanaRecreationData.length) {
                setTimeout(() => {
                    window.mapFunctions.fitMapToMarkers();
                }, 300);
            }
        }

        // Update current data reference
        currentData = filteredData;

        // Show filter results message
        this.showFilterResults(filteredData.length);
    }

    // Clear all filters
    clearAllFilters() {
        this.categoryFilter.value = 'all';
        this.regionFilter.value = 'all';
        this.ratingFilter.value = '0';
        
        // Reset to show all locations
        if (typeof window.mapFunctions !== 'undefined') {
            window.mapFunctions.loadMarkers(ghanaRecreationData);
            window.mapFunctions.updateStatistics(ghanaRecreationData);
        }

        currentData = ghanaRecreationData;
        this.hideFilterResults();
    }

    // Show filter results message
    showFilterResults(count) {
        // Remove existing message if any
        this.hideFilterResults();

        const message = document.createElement('div');
        message.id = 'filter-results-message';
        message.className = 'filter-results';
        message.innerHTML = `
            <span>📍 Showing ${count} of ${ghanaRecreationData.length} locations</span>
            ${count === 0 ? '<span style="color: #e74c3c;">No locations match your filters. Try adjusting your criteria.</span>' : ''}
        `;

        const controlsPanel = document.querySelector('.controls-panel');
        controlsPanel.appendChild(message);
    }

    // Hide filter results message
    hideFilterResults() {
        const existingMessage = document.getElementById('filter-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    // Get filtered data for external use
    getFilteredData() {
        return currentData;
    }

    // Filter by search term (for future enhancement)
    searchLocations(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return ghanaRecreationData;
        }

        const term = searchTerm.toLowerCase().trim();
        return ghanaRecreationData.filter(location => {
            return location.name.toLowerCase().includes(term) ||
                   location.description.toLowerCase().includes(term) ||
                   location.location.toLowerCase().includes(term) ||
                   location.activities.some(activity => activity.toLowerCase().includes(term));
        });
    }

    // Get locations by category
    getLocationsByCategory(category) {
        if (category === 'all') return ghanaRecreationData;
        return ghanaRecreationData.filter(location => location.category === category);
    }

    // Get locations by region
    getLocationsByRegion(region) {
        if (region === 'all') return ghanaRecreationData;
        return ghanaRecreationData.filter(location => location.region === region);
    }

    // Get top-rated locations
    getTopRatedLocations(minRating = 4.5) {
        return ghanaRecreationData
            .filter(location => location.rating >= minRating)
            .sort((a, b) => b.rating - a.rating);
    }

    // Get locations by activities
    getLocationsByActivity(activity) {
        return ghanaRecreationData.filter(location => 
            location.activities.some(act => 
                act.toLowerCase().includes(activity.toLowerCase())
            )
        );
    }

    // Get statistics for current filter
    getFilterStatistics() {
        const data = this.getFilteredData();
        const categories = {};
        const regions = {};
        let totalRating = 0;

        data.forEach(location => {
            // Count categories
            categories[location.category] = (categories[location.category] || 0) + 1;
            
            // Count regions
            regions[location.region] = (regions[location.region] || 0) + 1;
            
            // Sum ratings
            totalRating += location.rating;
        });

        return {
            total: data.length,
            averageRating: data.length > 0 ? (totalRating / data.length).toFixed(1) : 0,
            categories: categories,
            regions: regions,
            topCategory: Object.keys(categories).reduce((a, b) => 
                categories[a] > categories[b] ? a : b, 'none'
            ),
            topRegion: Object.keys(regions).reduce((a, b) => 
                regions[a] > regions[b] ? a : b, 'none'
            )
        };
    }
}

// Advanced filtering utilities
class AdvancedFilters {
    // Filter by distance from a point (requires coordinates)
    static filterByDistance(locations, centerLat, centerLng, maxDistanceKm) {
        return locations.filter(location => {
            const distance = this.calculateDistance(
                centerLat, centerLng,
                location.coordinates.lat, location.coordinates.lng
            );
            return distance <= maxDistanceKm;
        });
    }

    // Calculate distance between two points using Haversine formula
    static calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(lat2 - lat1);
        const dLng = this.toRadians(lng2 - lng1);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                 Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                 Math.sin(dLng / 2) * Math.sin(dLng / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Convert degrees to radians
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Filter by opening hours (if location is open now)
    static filterByOpenNow(locations) {
        const now = new Date();
        const currentHour = now.getHours();
        
        return locations.filter(location => {
            if (location.openingHours === '24 hours') return true;
            if (location.openingHours === 'Event dependent') return false;
            
            // Simple hour-based check (could be enhanced for complex schedules)
            const hours = location.openingHours.toLowerCase();
            if (hours.includes('am') && hours.includes('pm')) {
                // Extract opening and closing hours (simplified)
                const openHour = 9; // Default opening
                const closeHour = 17; // Default closing
                return currentHour >= openHour && currentHour < closeHour;
            }
            
            return true; // Default to open if can't parse
        });
    }

    // Filter by entry fee range
    static filterByEntryFee(locations, maxFee) {
        return locations.filter(location => {
            if (location.entryFee === 'Free') return maxFee >= 0;
            if (location.entryFee.includes('Varies')) return true;
            
            // Extract numeric value from fee string (simplified)
            const feeMatch = location.entryFee.match(/GHS\s*(\d+)/);
            if (feeMatch) {
                const fee = parseInt(feeMatch[1]);
                return fee <= maxFee;
            }
            
            return true; // Default to include if can't parse
        });
    }

    // Sort locations by various criteria
    static sortLocations(locations, sortBy = 'name', order = 'asc') {
        const sorted = [...locations];
        
        sorted.sort((a, b) => {
            let aValue, bValue;
            
            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'rating':
                    aValue = a.rating;
                    bValue = b.rating;
                    break;
                case 'category':
                    aValue = a.category;
                    bValue = b.category;
                    break;
                case 'region':
                    aValue = a.region;
                    bValue = b.region;
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }
            
            if (order === 'desc') {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            } else {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            }
        });
        
        return sorted;
    }
}

// Initialize filter system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Google Maps to load
    const checkMapLoaded = setInterval(() => {
        if (typeof google !== 'undefined' && google.maps && document.getElementById('map')) {
            window.locationFilter = new LocationFilter();
            clearInterval(checkMapLoaded);
        }
    }, 100);
});

// Export classes for external use
if (typeof window !== 'undefined') {
    window.LocationFilter = LocationFilter;
    window.AdvancedFilters = AdvancedFilters;
}