// weather api key
// name: FuBCAp1K3y
// key:  8763d655011011320242950c02a7ea1e
// mayo 10, 2024
//
//const queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=8763d655011011320242950c02a7ea1e";
//const queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=8763d655011011320242950c02a7ea1e&units=metric&q=mexico"

const apiKeyValue = "&appid=8763d655011011320242950c02a7ea1e";
const searchButton = document.getElementById("searchButton");
const historyButton = document.getElementById("buttonsofSearchedCities");
const inputCity = document.querySelector(".inputArea input");
const cityNotFoundMessage = document.getElementById("cityNotFoundMessage");
const cityHeader = $('#cityInfo');
const columnsElements = $('#addColumnsDiv');
const searchedCitiesButtons = $('#buttonsofSearchedCities');

var theTargetCity = "";
var arrayofCities = {};

// Declaring and Initilizing vars
var queryURL = "";
var apiDatabyCity = "";
var apiDataTodayWeather = "";
var apiDatabyLatLon = "";


// function to handle localstorage
function handleLocalStorage() {
    let lengthofArray = 0;
  
    if (localStorage.getItem("theCities")!== null) {
        arrayofCities = JSON.parse(localStorage.getItem("theCities"));
        lengthofArray = arrayofCities.length;
    } else {
        arrayofCities=[];
    }

    if (lengthofArray>7) {
        // delete the first element of the array to keep 12 words
        arrayofCities.shift();
        }
    arrayofCities.push(theTargetCity);
    // store the localstorage
    localStorage.setItem("theCities",JSON.stringify(arrayofCities));
}

function renderCitiesSearched() {
    searchedCitiesButtons.empty();
    for (let index = 0; index < arrayofCities.length; index++) {
//       // define the element for the <div> HTML 
    //   const oneButton = $('<button>').addClass("btn btn-outline-secondary btn-block").text(arrayofCities[index]);
      const oneButton = $("<button>").attr("type","button").addClass("btn btn-outline-secondary btn-block").text(arrayofCities[index]);
      searchedCitiesButtons.append(oneButton);
    }
}

// function to display the weather forecast for today and 5 days ahead
function renderWeatherInfo() {
    // get the information for 5 days from array LIST rows 2, 10, 18 ,26, 34
    // from main.temp, main.humidity and wind.speed then call the render information to the html

    theTargetCity = apiDataTodayWeather.name
    // Initializing the elements of the HTML 
    cityHeader.empty();
    columnsElements.empty();

    var iconHeaderCode = apiDataTodayWeather.weather[0].icon;
    var iconHeaderUrl = "https://openweathermap.org/img/wn/"+String(iconHeaderCode)+"@2x.png"

    // building the city header
    const theCityInfo = $('<div>');
    const theCityName = $('<h3>').text(apiDataTodayWeather.name);
    const theCityIcon = $('<img>').attr("src",iconHeaderUrl);
    const theCityTemp = $('<p>').text("Temp "+String(apiDataTodayWeather.main.temp));
    const theCityWind = $('<p>').text("Wind "+String(apiDataTodayWeather.wind.speed));
    const theCityHumi = $('<p>').text("Humi "+String(apiDataTodayWeather.main.humidity));
    // appending the city header  to HTML
    theCityInfo.append(theCityName,theCityIcon,theCityTemp,theCityWind,theCityHumi);
    cityHeader.append(theCityInfo);

    // Building the 5 days forecast
    for (let index = 5; index < 39; index = index + 8) {
        // geting the icon
        var iconCode = apiDatabyLatLon.list[index].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/"+String(iconCode)+"@2x.png"

        // building a column for ine day forecast

        const aDayColumn = $('<div>').addClass('col');
        const aDayDate = $('<p>').text("Date "+String(apiDatabyLatLon.list[index].dt_txt));
        const aDayIcon = $('<img>').attr("src",iconUrl);
        const aDayTemp = $('<p>').text("Temperatue "+String(apiDatabyLatLon.list[index].main.temp));
        const aDayWind = $('<p>').text("Wind speed "+String(apiDatabyLatLon.list[index].wind.speed));
        const aDayHumi = $('<p>').text("Humidity   "+String(apiDatabyLatLon.list[index].main.humidity));
        // appending a column to HTML        
        aDayColumn.append(aDayIcon,aDayDate,aDayTemp,aDayWind,aDayHumi);
        columnsElements.append(aDayColumn);
        };
};

function handleSearch(targetCity) {
    // A fecth to search a specific city 
    // The url to converts the specified name of a location or zip/post code into the exact geographical coordinates
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

    queryURL = "https://api.openweathermap.org/geo/1.0/direct?q="+targetCity+apiKeyValue;
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            apiDatabyCity = data;
            console.log(apiDatabyCity);
            if (apiDatabyCity.length == 0) {
                // city not found
                // console.log('City not found');
                cityNotFoundMessage.style.display = "block";
            } else {
                // The city do exist
                // console.log('Yes, city exist');
                var cityLat = apiDatabyCity[0].lat;
                var cityLon = apiDatabyCity[0].lon;
                console.log(cityLat,cityLon);

                // a second fetch to get the todays weather for the city
                // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
                queryURL = "https://api.openweathermap.org/data/2.5/weather?"+"lat="+String(cityLat)+"&lon="+String(cityLon)+apiKeyValue+"&units=metric";
                console.log(queryURL);
                fetch(queryURL)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data);
                        apiDataTodayWeather = data;
                        console.log('doing the second fetch');
                        console.log(apiDataTodayWeather);
                     });
                // a third fecth to get the 5 days forecast of the city     
                // (https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key})
                queryURL = "https://api.openweathermap.org/data/2.5/forecast?"+"lat="+String(cityLat)+"&lon="+String(cityLon)+apiKeyValue+"&units=metric";
                console.log(queryURL);
                fetch(queryURL)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data);
                        apiDatabyLatLon = data;
                        console.log('doing the third fetch');
                        console.log(apiDatabyLatLon);
                        // call the function to render info
                        renderWeatherInfo();
                        handleLocalStorage();
                        renderCitiesSearched();
                     });
            };

        });
};


// listeners of buttons
searchButton.addEventListener("click", function() { handleSearch(inputCity.value) });
historyButton.addEventListener("click", function() {handleSearch(document.activeElement.textContent)});

