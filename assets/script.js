// weather api key
// name: FuBCAp1K3y
// key:  8763d655011011320242950c02a7ea1e
// mayo 10, 2024

const apiKeyValue = "8763d655011011320242950c02a7ea1e";
let city;
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// only the following two parameters are required:
// q: The query parameter, where we'll add the city variable.
// appid: The application id or key, where we'll add the API key variable.

const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyValue}";

fetch(queryURL);



// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key};