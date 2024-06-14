let searchInput = document.getElementById('searchInput')
const daysNames = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let weatherData = []






async function searchWithCoordinates(latitude, longitude){
    let weatherApi = await fetch (
        `https://api.weatherapi.com/v1/forecast.json?key=4d8775b892234105a0f181030241306&q=${latitude},${longitude}&days=3`
    );
    let apiResponse = await weatherApi.json();
    weatherData = apiResponse;
    displayTodayWeather();
    displayOtherDaysWeather();

}



function locateUserLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userLocated, userNotLocated)
        
    }else {
        console.error("Geolocation is not supported by this browser.");
    }
}



function userLocated(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    searchWithCoordinates(latitude, longitude)
}



function userNotLocated(error){
    window.alert('Error getting user location:', error)
}


locateUserLocation();





async function searchByCityName(cityName) {
    let weatherApi = await fetch (
        `https://api.weatherapi.com/v1/forecast.json?key=4d8775b892234105a0f181030241306&q=${cityName}&days=3`
    );
    let apiResponse = await weatherApi.json();
    
    if(!apiResponse.error) {
        weatherData = apiResponse;

        displayTodayWeather (cityName);
        displayOtherDaysWeather(cityName);
    }
}

searchInput.addEventListener('input', function (){
    let city = searchInput.value;
    if(city.length >= 3) {
        searchByCityName(city)
    }else {
        return;
    }

})





function displayTodayWeather (){
    let today = weatherData.forecast.forecastday[0];
    let todayDate = new Date(today.date);
    let dayName = daysNames[todayDate.getDay()];
    let dayNumber = todayDate.getDate();
    let month = monthNames[todayDate.getMonth()];


    let weatherInfo = ""

    weatherInfo += `
    
                        <div class="card today-card bg-dark text-white ">
                <div class="card-header text-white-50  d-flex justify-content-between">
                  <span class="day">${dayName}</span
                  ><span class="date">${dayNumber} ${month}</span>
                </div>
                <div class="card-body p-4 text-center d-flex flex-column justify-content-center gap-2">
                  <h5 class="location" title="City">${weatherData.location.name}</h5>
                  <div class="degree d-flex gap-2 justify-content-center align-items-center">
                    <h4 class="max-deg mb-0" title="Max-Temperature">${today.day.maxtemp_c}°C</h4>
                  </div>
                    <h6 class=" mb-0 text-white-50" title="Min-Temperature">${today.day.mintemp_c}°C</h6>
                  <p class="status">${today.day.condition.text}</p>
                  <div class="info d-flex gap-4 justify-content-center">
                    <span title="Chance of rain"><i class="fa-solid fa-umbrella pe-1"></i>${today.day.daily_chance_of_rain}%</span
                    ><span title="Wind speed"><i class="fa-solid fa-wind pe-1"></i>${today.day.maxwind_kph}km/h</span
                    ><span title="Average Humidity"><i class="fa-solid fa-droplet pe-1"></i>${today.day.avghumidity}%</span>
                  </div>
                </div>
              </div>
                    
    `; 


    document.getElementById("todayData").innerHTML = weatherInfo;
}


























function displayOtherDaysWeather() {
    let weatherInfo = "";
    for (let i = 1; i < weatherData.forecast.forecastday.length; i++) {
    const day = weatherData.forecast.forecastday[i];
    const dayName = daysNames[new Date(day.date).getDay()];

      weatherInfo += `
          <div class="col-lg-6">
              <div class="card other-card bg-dark text-white text-center">
                <div class="card-header text-white-50">
                  <span class="day">${dayName}</span>
                </div>
                <div class="card-body  p-4 d-flex flex-column justify-content-center gap-2 ">
                  <div class="degree mt-3">
                    <h4 class="h3" title="Max-Temperature">${day.day.maxtemp_c}°C</h4>
                    <h6 class="text-white-50" title="Min-Temperature">${day.day.mintemp_c}°C</h6>
                  </div>
                  <p class="status">${day.day.condition.text}</p>
                </div>
              </div>
            </div>
      `;
    }

    document.getElementById("otherDaysData").innerHTML = weatherInfo;
  }