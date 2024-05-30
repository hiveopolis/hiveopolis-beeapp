# HIVEOPOLIS BeeApp

HIVEOPOLS BeeApp is a mobile application that demonstrate interaction with the HIVEOPLOIS ecosystem.
https://hiveopolis.eu

- connect to the services povided by the Augmented Map through MQTT API.
- show data from bio-hybrid HIVEOPOLIS beehives
- 

## Compile and Run

### 1. Add API Keys

HIVEOPOLIS BeeApp uses two external APIs: `OpenWeather` and `GoogleMap`. You need to setup those APIs for the app to fully function.

NOTE: don't commit your API keys to the public repositories.

#### OpenWeather

1. Register and generate an API key at ...
2. Add api key from open weather in `src -> OpenWeatherAPI.js`
```js
const openWeatherKey = '...your api key ...'
```

#### Google Map Services

1. Register at 
2. Generate an API
3. Activate the following services 
4. add api key from Google for locations in `src/Map/location/location.js` 
```js
const GOOGLE_API_KEY = ...your api key ...
```

### 2. Compile

Run in a Terminal 
```sh
npm install
```

### 2. Run

The app uses the Expo-Framework.

Run in a Terminal 
```sh
npx expo start
```

Install the app expo go on your phone. Scan the generated qr code with the camera of your mobile phone and tap on the link. 
