let userCity = document.querySelector("#userCity")
let userForm = document.querySelector("#userForm")
let btn = document.querySelector("#btn")
let cities = document.querySelector("#cities")
let errMsg = document.querySelector("#errMsg")

userForm.addEventListener("submit", checkWeather)

function checkWeather(evt) {
    evt.preventDefault();
    if(userCity.value.trim() === ""){
        errMsg.classList.remove("hideElement")
        errMsg.innerText = "Please Add A Valid City First"
        userCity.value = "";
        userCity.focus();
        return;
    }
    else{
        getData() 
    }
}

function showData(data){
    let li = document.createElement("li")
    let icon = `http://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`
    li.classList.add("city")
        errMsg.classList.add("hideElement")
        let markUp = `<h2 class="cityName" name="${data.name}">${data.name}<sup name=${data.sys["country"]}>${data.sys["country"]}</sup></h2>
        <div class="cityTemp">${Math.round(data.main["temp"])}<sup>&deg;C</sup></div>
        <figure>
            <img src="${icon}" alt="logo" class="cityIcon">
            <figcaption class="iconCaption">${data.weather[0]["description"]}</figcaption>
        </figure>
        <div class="cityHumidity">Humidity: ${data.main["humidity"]}</div>`
        li.innerHTML = markUp;
        cities.insertAdjacentElement("afterbegin", li)
        userCity.value = "";
}


function getData () {
    let apiKey = "bf09dcf340ea6674c2c611d84581f8c2"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${apiKey}&units=metric`
    let allData = fetch(url)
    allData.then((data) => {
        return data.json()
    })
    .then((actualData) => {
        showData(actualData)  
    })
    .catch((e) => {
        errMsg.classList.remove("hideElement")
        errMsg.innerText = e;
    })
}


