// Map initialization for single listing
function initListingMap(coordinates, title, location) {
    if (!coordinates || coordinates.length !== 2) {
        console.error('Invalid coordinates:', coordinates);
        return;
    }

    const map = L.map('map').setView([coordinates[1], coordinates[0]], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const marker = L.marker([coordinates[1], coordinates[0]], { icon: customIcon }).addTo(map);
    
    marker.bindPopup(`<b>${title}</b><br>${location}`).openPopup();

    // Add zoom controls
    map.addControl(L.control.zoom({ position: 'topright' }));
}

// Map initialization for multiple listings (index page)
function initIndexMap(listings) {
    if (!listings || listings.length === 0) {
        return;
    }

    const map = L.map('cluster-map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const bounds = [];

    listings.forEach(listing => {
        if (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2) {
            const coords = listing.geometry.coordinates;
            const lat = coords[1];
            const lng = coords[0];

            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
            
            const popupContent = `
                <div style="min-width: 200px;">
                    <b>${listing.title}</b><br>
                    <small>${listing.location}</small><br>
                    <a href="/listings/${listing._id}" class="btn btn-sm btn-primary mt-2">View Details</a>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            bounds.push([lat, lng]);
        }
    });

    // Fit map to show all markers
    if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}

// Map for booking checkout page
function initBookingMap(coordinates, title, location) {
    if (!coordinates || coordinates.length !== 2) {
        console.error('Invalid coordinates:', coordinates);
        return;
    }

    const map = L.map('booking-map').setView([coordinates[1], coordinates[0]], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    const customIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const marker = L.marker([coordinates[1], coordinates[0]], { icon: customIcon }).addTo(map);
    
    marker.bindPopup(`<b>${title}</b><br>${location}`).openPopup();

    map.addControl(L.control.zoom({ position: 'topright' }));
}
