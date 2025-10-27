// Initialize map for individual listing show page
function initListingMap(coordinates, locationName) {
    if (!coordinates || coordinates.length !== 2) {
        console.error("Invalid coordinates provided:", coordinates);
        return;
    }
    
    // Check if map element exists
    let mapElement = document.getElementById('property-map');
    if (!mapElement) {
        console.log("Map container not found");
        return;
    }

    // Create map centered on listing location
    let propertyMap = L.map('property-map').setView([coordinates[1], coordinates[0]], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(propertyMap);

    // Custom marker icon
    let customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    // Add marker with popup
    let marker = L.marker([coordinates[1], coordinates[0]], { icon: customIcon })
        .addTo(propertyMap)
        .bindPopup(`<div class="map-popup"><h6>${locationName}</h6><p>Exact location provided after booking</p></div>`)
        .openPopup();

    return propertyMap;
}

// Initialize cluster map for listings index page
function initIndexMap(listingsData) {
    if (!listingsData || listingsData.length === 0) {
        console.log("No listings data available");
        return;
    }
    
    // Check if cluster-map element exists
    let mapElement = document.getElementById('cluster-map');
    if (!mapElement) {
        console.log("Map container not found");
        return;
    }

    // Create map with initial view
    let clusterMap = L.map('cluster-map').setView([20, 0], 2);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(clusterMap);

    // Create marker cluster group
    let markers = L.markerClusterGroup({
        maxClusterRadius: 80,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
    });

    // Add markers for each listing
    listingsData.forEach(listing => {
        if (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2) {
            let coords = listing.geometry.coordinates;
            let popupContent = `
                <div class="cluster-popup">
                    <h6><a href="/listings/${listing._id}">${listing.title}</a></h6>
                    <p>${listing.location}</p>
                    <p class="price-text">₹${listing.price.toLocaleString()}/night</p>
                </div>
            `;
            
            let marker = L.marker([coords[1], coords[0]])
                .bindPopup(popupContent);
            
            markers.addLayer(marker);
        }
    });

    clusterMap.addLayer(markers);
    return clusterMap;
}

// Initialize map for booking checkout page
function initBookingMap(coordinates, locationName) {
    if (!coordinates || coordinates.length !== 2) {
        console.error("Invalid coordinates for booking map:", coordinates);
        return;
    }
    
    // Check if map element exists
    let mapElement = document.getElementById('destination-map');
    if (!mapElement) {
        console.log("Destination map container not found");
        return;
    }

    // Create map for destination preview
    let destinationMap = L.map('destination-map').setView([coordinates[1], coordinates[0]], 10);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(destinationMap);

    // Add marker for destination
    let destinationIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    let marker = L.marker([coordinates[1], coordinates[0]], { icon: destinationIcon })
        .addTo(destinationMap)
        .bindPopup(`<div class="booking-popup"><h6>${locationName}</h6><p>Your destination</p></div>`);

    return destinationMap;
}
