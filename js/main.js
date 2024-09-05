function getCitites(){
    const apiCountryUrl =  "https://countriesnow.space/api/v0.1/countries/population/cities";
    fetch(apiCountryUrl).then((response)=>response.json()).then((data)=>{
        let resp = data.data;
        // console.log(resp);
        let html = "";
        resp.sort((a,b)=>{
            if(a==b)return 0;
            if(a>b)return -1;
            return 1;
            
        }).map(({city, country})=>{
            // console.log(city);
            html += `<div class="cities" data-city="${city}">${country} => ${city}</div>`;
        }).join('');
        document.querySelector(".city-lists").innerHTML = html;
    }).catch((error)=>{
        console.log(error);
    });
}
getCitites();

function getWeather(city){
    try {
        const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const weatherApiKey = "7b52e8b830ec24dca7ee93a7173d74c7";
        
        fetch(weatherApiUrl + `${city}&appid=${weatherApiKey}`)
        .then((response)=>response.json())
        .then((data)=>{
            if(data.cod != 404){
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML =`${Math.round(data.main.temp)}°C`;
                document.querySelector(".humidity").innerHTML =`${Math.round(data.main.humidity)}%`;
                document.querySelector(".wind_speed").innerHTML =`${Math.round(data.wind.speed)}km/h`;
                document.querySelector(".weather-desc").innerHTML =`${data.weather[0].description}`;
                document.querySelector(".presure").innerHTML =`${Math.round(data.main.pressure)} Pa`;
                document.querySelector(".lat").innerHTML =`${data.coord.lat} °`;
                document.querySelector(".long").innerHTML =`${data.coord.lon} °`;
                const weatherImg = document.querySelector(".weather-img");
                console.log(data);
                switch (data.weather[0].main) {
                    case "Clouds":
                        weatherImg.src = "./images/clouds.png";
                    break;
    
                    case "Rain":
                        weatherImg.src = "./images/rain.png";
                    break;
    
                    case "Clear":
                        weatherImg.src = "./images/clear.png";
                    break;
    
                    case "Drizzle":
                        weatherImg.src = "./images/drizzle.png";
                    break;
    
                    case "Mist":
                        weatherImg.src = "./images/mist.png";
                    break;
    
                    case "Rain":
                        weatherImg.src = "./images/rain.png";
                    break;
                
                    default:
                        weatherImg.src = "./images/clouds.png";
                    break;
                }
                
            }else{
                document.querySelector(".city").innerHTML = `---`;
                document.querySelector(".temp").innerHTML =`---°C`;
                document.querySelector(".humidity").innerHTML =`---%`;
                document.querySelector(".wind_speed").innerHTML =`---km/h`;
                document.querySelector(".presure").innerHTML =`--- Pa`;
                document.querySelector(".weather-desc").innerHTML =`----`;
                document.querySelector(".lat").innerHTML =`----`;
                document.querySelector(".long").innerHTML =`----`;
                alert("Error: City name not found please check your spelling and try again!");
            }
        }).catch((error)=>{
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }

}

function setUserLatInLocalStorage(){
    if(navigator.geolocation){
        if(localStorage.getItem("lat") && localStorage.getItem("longi")){
        }else{
            navigator.geolocation.getCurrentPosition((postion)=>{
                const userLatitude = postion.coords.latitude;
                const userLongitude = postion.coords.longitude;
                var date = new Date();
                localStorage.setItem("lat", postion.coords.latitude);
                localStorage.setItem("longi", postion.coords.longitude);
                localStorage.setItem("day", date.getDate());
                if(localStorage.getItem("lat") && localStorage.getItem("longi")){
                    let lat = localStorage.getItem("lat");
                    let long = localStorage.getItem("longi");
                    const apiKey = "7b52e8b830ec24dca7ee93a7173d74c7";
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
                    fetch(url).then((response)=>response.json()).then((data)=>{
                        if(data.cod != 404){
                            document.querySelector(".city").innerHTML = data.name;
                            document.querySelector(".temp").innerHTML =`${Math.round(data.main.temp)}°C`;
                            document.querySelector(".humidity").innerHTML =`${Math.round(data.main.humidity)}%`;
                            document.querySelector(".wind_speed").innerHTML =`${Math.round(data.wind.speed)}km/h`;
                            document.querySelector(".weather-desc").innerHTML =`${data.weather[0].description}`;
                            document.querySelector(".presure").innerHTML =`${Math.round(data.main.pressure)} Pa`;
                            document.querySelector(".lat").innerHTML =`${data.coord.lat} °`;
                            document.querySelector(".long").innerHTML =`${data.coord.lon} °`;
                            const weatherImg = document.querySelector(".weather-img");
                            console.log(data);
                            switch (data.weather[0].main) {
                                case "Clouds":
                                    weatherImg.src = "./images/clouds.png";
                                break;
                
                                case "Rain":
                                    weatherImg.src = "./images/rain.png";
                                break;
                
                                case "Clear":
                                    weatherImg.src = "./images/clear.png";
                                break;
                
                                case "Drizzle":
                                    weatherImg.src = "./images/drizzle.png";
                                break;
                
                                case "Mist":
                                    weatherImg.src = "./images/mist.png";
                                break;
                
                                case "Rain":
                                    weatherImg.src = "./images/rain.png";
                                break;
                            
                                default:
                                    weatherImg.src = "./images/clouds.png";
                                break;
                            }
                            
                        }else{
                            document.querySelector(".city").innerHTML = `---`;
                            document.querySelector(".temp").innerHTML =`---°C`;
                            document.querySelector(".humidity").innerHTML =`---%`;
                            document.querySelector(".wind_speed").innerHTML =`---km/h`;
                            document.querySelector(".presure").innerHTML =`--- Pa`;
                            document.querySelector(".weather-desc").innerHTML =`----`;
                            document.querySelector(".lat").innerHTML =`----`;
                            document.querySelector(".long").innerHTML =`----`;
                            alert("Error: City name not found please check your spelling and try again!");
                        }
            
                    }).catch((error)=>{
                        console.log(error);
                    });
                }
            });
        }
    }else{
        alert("Your browser does not accept geolocation services!");
    }

}
setUserLatInLocalStorage();

function clearStorage(){
    let date = new Date();
    if (date.getDate() != localStorage.getItem("day")) {
        localStorage.clear();
    }
}
clearStorage();

function autoCheck(){
    if(localStorage.getItem("lat") && localStorage.getItem("longi")){
        let lat = localStorage.getItem("lat");
        let long = localStorage.getItem("longi");
        const apiKey = "7b52e8b830ec24dca7ee93a7173d74c7";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
        fetch(url).then((response)=>response.json()).then((data)=>{
            if(data.cod != 404){
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML =`${Math.round(data.main.temp)}°C`;
                document.querySelector(".humidity").innerHTML =`${Math.round(data.main.humidity)}%`;
                document.querySelector(".wind_speed").innerHTML =`${Math.round(data.wind.speed)}km/h`;
                document.querySelector(".weather-desc").innerHTML =`${data.weather[0].description}`;
                document.querySelector(".presure").innerHTML =`${Math.round(data.main.pressure)} Pa`;
                document.querySelector(".lat").innerHTML =`${data.coord.lat} °`;
                document.querySelector(".long").innerHTML =`${data.coord.lon} °`;
                const weatherImg = document.querySelector(".weather-img");
                console.log(data);
                switch (data.weather[0].main) {
                    case "Clouds":
                        weatherImg.src = "./images/clouds.png";
                    break;
    
                    case "Rain":
                        weatherImg.src = "./images/rain.png";
                    break;
    
                    case "Clear":
                        weatherImg.src = "./images/clear.png";
                    break;
    
                    case "Drizzle":
                        weatherImg.src = "./images/drizzle.png";
                    break;
    
                    case "Mist":
                        weatherImg.src = "./images/mist.png";
                    break;
    
                    case "Rain":
                        weatherImg.src = "./images/rain.png";
                    break;
                
                    default:
                        weatherImg.src = "./images/clouds.png";
                    break;
                }
                
            }else{
                document.querySelector(".city").innerHTML = `---`;
                document.querySelector(".temp").innerHTML =`---°C`;
                document.querySelector(".humidity").innerHTML =`---%`;
                document.querySelector(".wind_speed").innerHTML =`---km/h`;
                document.querySelector(".presure").innerHTML =`--- Pa`;
                document.querySelector(".weather-desc").innerHTML =`----`;
                document.querySelector(".lat").innerHTML =`----`;
                document.querySelector(".long").innerHTML =`----`;
                alert("Error: City name not found please check your spelling and try again!");
            }

        }).catch((error)=>{
            console.log(error);
        });
    }
}
autoCheck();

const form = document.querySelector(".searchbar");
const searchBtn = document.querySelector(".search-btn");
const citySearchInput = document.querySelector(".search-inp");
form.onsubmit = (e)=>{
    e.preventDefault();
}


searchBtn.onclick = ()=>{
    if(citySearchInput.value != ""){
        getWeather(citySearchInput.value);
    }else{
        alert("Please enter a city name and try again");
    }
}

async function sendRequestCity(){
    const cities = document.querySelectorAll(".cities");
    if (cities) {
        cities.forEach((city)=>{
            alert("ddd");
        })
    }
}

sendRequestCity();

var sidebarBtn = document.querySelector(".sidebar-toggle");
var closeBtn = document.querySelector(".close-btn i");
var sidebar = document.querySelector(".sidebar");

sidebarBtn.onclick = ()=>{
    sidebar.classList.toggle("active");
}

closeBtn.onclick = ()=>{
    sidebar.classList.toggle("active");
}
