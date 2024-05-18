// weather api key
// name: FuBCAp1K3y
// key:  8763d655011011320242950c02a7ea1e
// mayo 10, 2024
//
//const queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=8763d655011011320242950c02a7ea1e";
//const queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=8763d655011011320242950c02a7ea1e&units=metric&q=mexico"
const apiKeyValue = "8763d655011011320242950c02a7ea1e";
const searchButton = document.getElementById("searchButton");
const inputCity = document.querySelector(".inputArea input");
const cityNotFoundMessage = document.getElementById("cityNotFoundMessage");
var queryURL = "";
var apiDatabyCity = "";
var apiDatabyLatLon = "";


function renderWeatherInfo() {
    // get the information for 5 days from array LIST rows 2, 10, 18 ,26, 34
    // from main.temp, main.humidity and wind.speed then call the render information to the html
    for (let index = 2; index < 39; index = index + 8) {
        console.log(apiDatabyLatLon.list[index].dt_txt);
        console.log(apiDatabyLatLon.list[index].main.temp);
        console.log(apiDatabyLatLon.list[index].wind.speed);     
        console.log(apiDatabyLatLon.list[index].main.humidity);
        };
};

function handleSearch() {
    console.log('...in handleSearch function');
    console.log(inputCity.value);
    
    // validate if the city exist doing an API request by city name
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=8763d655011011320242950c02a7ea1e&units=metric&q=";
    queryURL = queryURL + inputCity.value;
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            apiDatabyCity = data;
            console.log(apiDatabyCity);
            if (apiDatabyCity.cod == 404) {
                // city not found
                console.log('City not found');
                cityNotFoundMessage.style.display = "block";
            } else {
                console.log('Yes, city exist');
                var cityLatitud = apiDatabyCity.coord.lat;
                var cityLogitude = apiDatabyCity.coord.lon;
                console.log(cityLatitud, cityLogitude);
                // api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
                queryURL = "https://api.openweathermap.org/data/2.5/forecast?";
                queryURL = queryURL+"lat="+String(cityLatitud)+"&lon="+String(cityLogitude);
                queryURL = queryURL+"&appid=8763d655011011320242950c02a7ea1e&units=metric";
                console.log(queryURL);
                fetch(queryURL)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data);
                        apiDatabyLatLon = data;
                        console.log(apiDatabyLatLon);
                        // call the function to render info
                        renderWeatherInfo();
                     });
            };

        });
};


searchButton.addEventListener("click", function() { handleSearch() });

