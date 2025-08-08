// User Interface functions for Ghana Recreation Map
class UIManager {
    constructor() {
        this.modal = document.getElementById('locationModal');
        this.modalContent = document.getElementById('modalContent');
        this.closeBtn = document.querySelector('.close');
        
        this.initializeEventListeners();
    }

    // Initialize UI event listeners
    initializeEventListeners() {
        // Modal close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hideModal());
        }

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.hideModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modal.style.display === 'block') {
                this.hideModal();
            }
        });

        // Smooth scrolling for internal links
        document.addEventListener('click', (event) => {
            if (event.target.matches('a[href^="#"]')) {
                event.preventDefault();
                const targetId = event.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Show location details modal
    showModal(location) {
        this.modalContent.innerHTML = this.createModalContent(location);
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add event listeners for modal buttons
        this.addModalEventListeners(location);
    }

    // Hide modal
    hideModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Create detailed modal content
    createModalContent(location) {
        const stars = this.generateStarRating(location.rating);
        const categoryEmoji = this.getCategoryEmoji(location.category);
        const activitiesTags = location.activities.map(activity => 
            `<span class="activity-tag">${activity}</span>`
        ).join('');

        return `
            <div class="modal-header">
                <h2>${categoryEmoji} ${location.name}</h2>
                <div class="rating-stars">${stars} (${location.rating})</div>
            </div>
            <div class="modal-body">
                <img src="${location.image}" alt="${location.name}" class="location-image" 
                     onerror="this.src='images/water.jpeg'">
                
                <div class="location-info">
                    <div class="info-row">
                        <span class="info-icon">📍</span>
                        <span class="info-label">Location:</span>
                        <span class="info-value">${location.location}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">🏷️</span>
                        <span class="info-label">Category:</span>
                        <span class="info-value">${this.formatCategory(location.category)}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">🌍</span>
                        <span class="info-label">Region:</span>
                        <span class="info-value">${this.formatRegion(location.region)}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">⏰</span>
                        <span class="info-label">Opening Hours:</span>
                        <span class="info-value">${location.openingHours}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">💰</span>
                        <span class="info-label">Entry Fee:</span>
                        <span class="info-value">${location.entryFee}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">📞</span>
                        <span class="info-label">Contact:</span>
                        <span class="info-value">${location.contact}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">📅</span>
                        <span class="info-label">Best Time:</span>
                        <span class="info-value">${location.bestTimeToVisit}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">📝</span>
                        <span class="info-label">Description:</span>
                        <span class="info-value">${location.description}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">🎯</span>
                        <span class="info-label">Activities:</span>
                        <div class="activities-list">${activitiesTags}</div>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-icon">🏢</span>
                        <span class="info-label">Facilities:</span>
                        <span class="info-value">${location.facilities.join(', ')}</span>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button id="modal-directions-btn" class="action-btn primary-btn">
                        🗺️ Get Directions
                    </button>
                    <button id="modal-share-btn" class="action-btn secondary-btn">
                        📤 Share Location
                    </button>
                    <button id="modal-favorite-btn" class="action-btn secondary-btn">
                        ❤️ Add to Favorites
                    </button>
                </div>
            </div>
        `;
    }

    // Add event listeners for modal buttons
    addModalEventListeners(location) {
        const directionsBtn = document.getElementById('modal-directions-btn');
        const shareBtn = document.getElementById('modal-share-btn');
        const favoriteBtn = document.getElementById('modal-favorite-btn');

        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => this.getDirections(location));
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareLocation(location));
        }

        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', () => this.toggleFavorite(location));
        }
    }

    // Generate star rating HTML
    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        
        if (hasHalfStar) {
            stars += '⭐';
        }
        
        return stars;
    }

    // Get category emoji
    getCategoryEmoji(category) {
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
    formatCategory(category) {
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
    formatRegion(region) {
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
    getDirections(location) {
        const destination = `${location.coordinates.lat},${location.coordinates.lng}`;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${location.name}`;
        window.open(googleMapsUrl, '_blank');
    }

    // Share location
    shareLocation(location) {
        const shareData = {
            title: location.name,
            text: `Check out ${location.name} - ${location.description}`,
            url: window.location.href + `#location-${location.id}`
        };

        if (navigator.share) {
            navigator.share(shareData).then(() => {
                this.showNotification('Location shared successfully!', 'success');
            }).catch((error) => {
                this.fallbackShare(location);
            });
        } else {
            this.fallbackShare(location);
        }
    }

    // Fallback share method
    fallbackShare(location) {
        const shareText = `${location.name} - ${location.description}\n${window.location.href}#location-${location.id}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('Location details copied to clipboard!', 'success');
            }).catch(() => {
                this.showShareDialog(shareText);
            });
        } else {
            this.showShareDialog(shareText);
        }
    }

    // Show share dialog
    showShareDialog(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Location details copied!', 'success');
        } catch (error) {
            this.showNotification('Unable to copy. Please share manually.', 'error');
        }
        
        document.body.removeChild(textarea);
    }

    // Toggle favorite status
    toggleFavorite(location) {
        const favorites = this.getFavorites();
        const isFavorited = favorites.some(fav => fav.id === location.id);
        
        if (isFavorited) {
            const newFavorites = favorites.filter(fav => fav.id !== location.id);
            this.saveFavorites(newFavorites);
            this.showNotification('Removed from favorites', 'info');
        } else {
            favorites.push(location);
            this.saveFavorites(favorites);
            this.showNotification('Added to favorites!', 'success');
        }
        
        this.updateFavoriteButton(location.id, !isFavorited);
    }

    // Get favorites from storage
    getFavorites() {
        try {
            // Using in-memory storage since localStorage is not available in artifacts
            return window.userFavorites || [];
        } catch (error) {
            return [];
        }
    }

    // Save favorites to storage
    saveFavorites(favorites) {
        try {
            // Using in-memory storage since localStorage is not available in artifacts
            window.userFavorites = favorites;
        } catch (error) {
            console.warn('Unable to save favorites');
        }
    }

    // Update favorite button appearance
    updateFavoriteButton(locationId, isFavorited) {
        const favoriteBtn = document.getElementById('modal-favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.innerHTML = isFavorited ? '💙 Remove from Favorites' : '❤️ Add to Favorites';
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: inherit;
            font-size: 14px;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => notification.remove());

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }

    // Create loading indicator
    showLoading(message = 'Loading...') {
        const loading = document.createElement('div');
        loading.id = 'ui-loading';
        loading.innerHTML = `
            <div class="loading-backdrop">
                <div class="loading-content">
                    <div class="spinner"></div>
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(loading);
    }

    // Hide loading indicator
    hideLoading() {
        const loading = document.getElementById('ui-loading');
        if (loading) {
            loading.remove();
        }
    }

    // Create confirmation dialog
    showConfirmDialog(message, onConfirm, onCancel) {
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="confirm-backdrop">
                <div class="confirm-content">
                    <p>${message}</p>
                    <div class="confirm-actions">
                        <button class="confirm-btn cancel-btn">Cancel</button>
                        <button class="confirm-btn confirm-btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        `;

        dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10002;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(dialog);

        const cancelBtn = dialog.querySelector('.cancel-btn');
        const confirmBtn = dialog.querySelector('.confirm-btn-primary');

        cancelBtn.addEventListener('click', () => {
            dialog.remove();
            if (onCancel) onCancel();
        });

        confirmBtn.addEventListener('click', () => {
            dialog.remove();
            if (onConfirm) onConfirm();
        });
    }
}

// Global function to show location modal (called from map.js)
function showLocationModal(location) {
    if (window.uiManager) {
        window.uiManager.showModal(location);
    }
}

// Initialize UI manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.uiManager = new UIManager();
    
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin: 0;
        }
        
        .action-btn {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
            margin: 5px;
        }
        
        .primary-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }
        
        .secondary-btn {
            background: #f8f9fa;
            color: #333;
            border: 1px solid #ddd;
        }
        
        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .modal-actions {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .filter-results {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            text-align: center;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
});

// Export UIManager for external use
if (typeof window !== 'undefined') {
    window.UIManager = UIManager;
}