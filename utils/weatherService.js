const axios = require('axios');
const geocodingService = require('../mapConfig');

/**
 * Weather Service for fetching weather data from OpenWeather API
 */
class WeatherService {
    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    /**
     * Get weather data for a location by coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @returns {Promise<Object>} Weather data
     */
    async getWeatherByCoordinates(lat, lon) {
        if (!this.apiKey) {
            console.warn('OpenWeather API key not configured');
            return null;
        }

        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: this.apiKey,
                    units: 'metric' // Use Celsius
                },
                timeout: 5000 // 5 second timeout
            });

            return this.formatWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
            return null;
        }
    }

    /**
     * Get weather data for a location by city name
     * @param {string} location - City name
     * @param {string} country - Country code (optional)
     * @returns {Promise<Object>} Weather data
     */
    async getWeatherByLocation(location, country = null) {
        if (!this.apiKey) {
            console.warn('OpenWeather API key not configured');
            return null;
        }

        try {
            const normLocation = this.normalizeLocation(location);

            // 1) Try location only (most robust)
            try {
                const resp1 = await axios.get(this.baseUrl, {
                    params: { q: normLocation, appid: this.apiKey, units: 'metric' },
                    timeout: 5000
                });
                return this.formatWeatherData(resp1.data);
            } catch (e1) {
                // continue to next attempt
            }

            // 2) Try with country code if available
            if (country) {
                const code = this.getCountryCode(country);
                if (code) {
                    try {
                        const resp2 = await axios.get(this.baseUrl, {
                            params: { q: `${normLocation},${code}`, appid: this.apiKey, units: 'metric' },
                            timeout: 5000
                        });
                        return this.formatWeatherData(resp2.data);
                    } catch (e2) {
                        // continue to next attempt
                    }
                }
            }

            // 3) Try with provided country name as-is
            if (country) {
                const resp3 = await axios.get(this.baseUrl, {
                    params: { q: `${normLocation},${country}`, appid: this.apiKey, units: 'metric' },
                    timeout: 5000
                });
                return this.formatWeatherData(resp3.data);
            }

            // 4) Geocode fallback -> use coordinates
            try {
                const query = country ? `${normLocation}, ${country}` : normLocation;
                const geo = await geocodingService.forwardGeocode(query);
                if (geo && Array.isArray(geo.coordinates) && geo.coordinates.length === 2) {
                    const [lon, lat] = geo.coordinates;
                    return await this.getWeatherByCoordinates(lat, lon);
                }
            } catch (eGeo) {
                // swallow and return null below
            }

            return null;
        } catch (error) {
            console.error('Error fetching weather data (by location):', error.message);
            return null;
        }
    }

    /**
     * Format raw weather data into a simplified structure
     * @param {Object} data - Raw weather data from API
     * @returns {Object} Formatted weather data
     */
    formatWeatherData(data) {
        if (!data) return null;

        return {
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            tempMin: Math.round(data.main.temp_min),
            tempMax: Math.round(data.main.temp_max),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            description: data.weather[0].description,
            main: data.weather[0].main,
            icon: data.weather[0].icon,
            iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            windSpeed: data.wind.speed,
            windDeg: data.wind.deg,
            clouds: data.clouds.all,
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000),
            cityName: data.name,
            country: data.sys.country
        };
    }

    /**
     * Get weather condition icon class for custom styling
     * @param {string} main - Main weather condition
     * @returns {string} Icon class name
     */
    getWeatherIconClass(main) {
        const iconMap = {
            'Clear': 'fa-sun',
            'Clouds': 'fa-cloud',
            'Rain': 'fa-cloud-rain',
            'Drizzle': 'fa-cloud-drizzle',
            'Thunderstorm': 'fa-cloud-bolt',
            'Snow': 'fa-snowflake',
            'Mist': 'fa-smog',
            'Smoke': 'fa-smog',
            'Haze': 'fa-smog',
            'Dust': 'fa-smog',
            'Fog': 'fa-smog',
            'Sand': 'fa-smog',
            'Ash': 'fa-smog',
            'Squall': 'fa-wind',
            'Tornado': 'fa-tornado'
        };

        return iconMap[main] || 'fa-cloud';
    }

    // Minimal mapping for common country names to ISO 3166-1 alpha-2 codes
    getCountryCode(country) {
        if (!country) return null;
        const map = {
            'United States': 'US',
            'USA': 'US',
            'United Kingdom': 'GB',
            'UK': 'GB',
            'India': 'IN',
            'France': 'FR',
            'Spain': 'ES',
            'Germany': 'DE',
            'Italy': 'IT',
            'Canada': 'CA',
            'Australia': 'AU',
            'Japan': 'JP',
            'China': 'CN',
            'Brazil': 'BR',
            'Mexico': 'MX',
            'Netherlands': 'NL',
            'Switzerland': 'CH',
            'Sweden': 'SE',
            'Norway': 'NO',
            'Denmark': 'DK',
            'Portugal': 'PT',
            'Greece': 'GR',
            'Turkey': 'TR',
            'Russia': 'RU',
            'South Africa': 'ZA',
            'United Arab Emirates': 'AE',
            'UAE': 'AE',
            'Qatar': 'QA',
            'Saudi Arabia': 'SA',
            'Egypt': 'EG',
            'Singapore': 'SG',
            'Indonesia': 'ID',
            'Thailand': 'TH',
            'Malaysia': 'MY',
            'Philippines': 'PH',
            'Vietnam': 'VN',
            'South Korea': 'KR',
            'New Zealand': 'NZ',
            'Argentina': 'AR',
            'Chile': 'CL',
            'Colombia': 'CO',
            'Peru': 'PE'
        };
        return map[country] || null;
    }

    // Normalize location strings for better API matching
    normalizeLocation(name) {
        if (!name) return name;
        let n = String(name).trim();
        // Remove common suffixes and extra words that confuse search
        n = n.replace(/\bCity\b/gi, '').trim(); // "New York City" -> "New York"
        n = n.replace(/[()]/g, '').trim();
        n = n.replace(/\s{2,}/g, ' ');
        return n;
    }
}

module.exports = new WeatherService();
