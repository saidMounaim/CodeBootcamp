import NodeGeocoder from 'node-geocoder';
import dotenv from 'dotenv';

dotenv.config();

const options = {
	provider: process.env.GEOCODER_PROVIDER,
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

export default geocoder;
