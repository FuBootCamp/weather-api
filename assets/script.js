// weather api key
// name: FuBCAp1K3y
// key:  8763d655011011320242950c02a7ea1e
// mayo 10, 2024
//
//const queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=8763d655011011320242950c02a7ea1e";
const queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=8763d655011011320242950c02a7ea1e&units=metric&q=mexico"
const apiKeyValue = "8763d655011011320242950c02a7ea1e";
const searchButton = document.getElementById("searchButton");

function handleSearch() {
    console.log('...in handleSearch function');
    var apiData = "";
    fetch(queryURL)
    .then(response => response.json())
    .then(data => {
        console.log(data.cod);
            apiData = data;
            console.log(apiData.name);
            console.log(apiData.main.temp);
            console.log(apiData.wind.speed);
            console.log(apiData.main.humidity);
        
    });
};

searchButton.addEventListener("click", function() { handleSearch() });

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// only the following two parameters are required:
// q: The query parameter, where we'll add the city variable.
// appid: The application id or key, where we'll add the API key variable.
