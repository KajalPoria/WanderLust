// IndexedDB wrapper for offline data persistence
class OfflineStorage {
    constructor() {
        this.dbName = 'WanderLustDB';
        this.version = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Listings store
                if (!db.objectStoreNames.contains('listings')) {
                    const listingStore = db.createObjectStore('listings', { keyPath: '_id' });
                    listingStore.createIndex('category', 'category', { unique: false });
                    listingStore.createIndex('price', 'price', { unique: false });
                    listingStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                // Wishlist store
                if (!db.objectStoreNames.contains('wishlist')) {
                    db.createObjectStore('wishlist', { keyPath: '_id' });
                }

                // Bookings store
                if (!db.objectStoreNames.contains('bookings')) {
                    db.createObjectStore('bookings', { keyPath: '_id' });
                }

                // User data store
                if (!db.objectStoreNames.contains('userData')) {
                    db.createObjectStore('userData', { keyPath: 'key' });
                }

                // Sync queue for offline actions
                if (!db.objectStoreNames.contains('syncQueue')) {
                    const syncStore = db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
                    syncStore.createIndex('timestamp', 'timestamp', { unique: false });
                    syncStore.createIndex('synced', 'synced', { unique: false });
                }
            };
        });
    }

    async saveListings(listings) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['listings'], 'readwrite');
            const store = transaction.objectStore('listings');

            const timestamp = Date.now();
            for (const listing of listings) {
                try {
                    store.put({ ...listing, timestamp });
                } catch (e) {
                    // Ignore malformed records to avoid aborting the whole transaction
                    console.warn('[OfflineStorage] Skipping invalid listing record', e);
                }
            }

            transaction.oncomplete = () => resolve(true);
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error);
        });
    }

    async getListings(filter = {}) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['listings'], 'readonly');
            const store = transaction.objectStore('listings');
            const request = store.getAll();
            
            request.onsuccess = () => {
                let listings = request.result;
                
                // Apply filters
                if (filter.category) {
                    listings = listings.filter(l => l.category === filter.category);
                }
                
                resolve(listings);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async saveListing(listing) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['listings'], 'readwrite');
            const store = transaction.objectStore('listings');

            try {
                listing.timestamp = Date.now();
                store.put(listing);
            } catch (e) {
                console.warn('[OfflineStorage] Failed to save listing', e);
            }

            transaction.oncomplete = () => resolve(true);
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error);
        });
    }

    async getListing(id) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['listings'], 'readonly');
            const store = transaction.objectStore('listings');
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async saveWishlist(wishlistItems) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['wishlist'], 'readwrite');
            const store = transaction.objectStore('wishlist');

            // Clear existing
            store.clear();

            // Add all items
            for (const item of wishlistItems) {
                try { store.put(item); } catch (e) { console.warn('[OfflineStorage] Skipping wishlist item', e); }
            }

            transaction.oncomplete = () => resolve(true);
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error);
        });
    }

    async getWishlist() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['wishlist'], 'readonly');
            const store = transaction.objectStore('wishlist');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async addToSyncQueue(action, data) {
        if (!this.db) await this.init();
        
        const transaction = this.db.transaction(['syncQueue'], 'readwrite');
        const store = transaction.objectStore('syncQueue');
        
        const queueItem = {
            action,
            data,
            timestamp: Date.now(),
            synced: false
        };
        
        store.add(queueItem);
        return transaction.complete;
    }

    async getSyncQueue() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['syncQueue'], 'readonly');
            const store = transaction.objectStore('syncQueue');
            const index = store.index('synced');
            const request = index.getAll(false);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async markSynced(id) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');

            const request = store.get(id);
            request.onsuccess = () => {
                const item = request.result;
                if (item) {
                    item.synced = true;
                    store.put(item);
                }
            };

            transaction.oncomplete = () => resolve(true);
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error);
        });
    }

    async clearOldData(daysOld = 7) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const cutoffTime = Date.now() - (daysOld * 24 * 60 * 60 * 1000);

            const transaction = this.db.transaction(['listings'], 'readwrite');
            const store = transaction.objectStore('listings');
            const index = store.index('timestamp');
            const range = IDBKeyRange.upperBound(cutoffTime);

            const request = index.openCursor(range);
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                }
            };

            transaction.oncomplete = () => resolve(true);
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error);
        });
    }
}

// Create global instance
const offlineStorage = new OfflineStorage();

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => offlineStorage.init());
} else {
    offlineStorage.init();
}

// Sync data when coming back online
window.addEventListener('online', async () => {
    console.log('Syncing offline changes...');
    
    try {
        const queue = await offlineStorage.getSyncQueue();
        
        for (const item of queue) {
            try {
                // Process each queued action
                const response = await fetch(item.data.url, {
                    method: item.data.method || 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item.data.body)
                });
                
                if (response.ok) {
                    await offlineStorage.markSynced(item.id);
                    console.log('Synced:', item.action);
                }
            } catch (err) {
                console.error('Sync failed for item:', item, err);
            }
        }
        
        console.log('Sync complete');
    } catch (err) {
        console.error('Sync error:', err);
    }
});

// Auto-save listings when fetched
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    const response = await originalFetch.apply(this, args);
    
    // Clone response for caching
    const clonedResponse = response.clone();
    
    // Get the URL
    const url = typeof args[0] === 'string' ? args[0] : args[0].url;
    
    // Cache listings data
    if (url.includes('/listings') && response.ok && response.headers.get('content-type')?.includes('application/json')) {
        try {
            const data = await clonedResponse.json();
            if (Array.isArray(data)) {
                console.log('[OfflineStorage] Saving', data.length, 'listings to IndexedDB');
                await offlineStorage.saveListings(data);
            } else if (data._id) {
                // Single listing
                console.log('[OfflineStorage] Saving single listing to IndexedDB');
                await offlineStorage.saveListing(data);
            }
        } catch (err) {
            console.error('[OfflineStorage] Error saving listings:', err);
        }
    }
    
    return response;
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = offlineStorage;
}
