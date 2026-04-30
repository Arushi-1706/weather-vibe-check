const API_KEY = "1721d1cf597645c990642132260604"; 

document.getElementById('weatherForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    
    if (city) {
        callMyApi(city);
    }
});


async function callMyApi(city = "London") {
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = "<i>Consulting the weather gods...</i>";

    try {
        console.log(`Checking if ${city} is currently a disaster...`);
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log("Success! Here is the data:");
        console.log(data);
        displayWeather(data);

    } catch (error) {
        console.error("Damn, something went wrong:", error.message);
        resultDiv.innerHTML = `<p style="color:red">Error: That city doesn't exist, bestie.</p>`;
    }
}

function displayWeather(data) {
    const resultDiv = document.getElementById('weatherResult');
    const temp = data.current.temp_c;
    const condition = data.current.condition.text.toLowerCase();


    let iconUrl = data.current.condition.icon;
    if (iconUrl.startsWith("//")) {
        iconUrl = "https:" + iconUrl;
    } else if (!iconUrl.startsWith("http")) {
        iconUrl = "https:" + iconUrl;
    }

    console.log("Icon URL:", iconUrl);


    let bgImage = "images/welcome.jpg";
    let vibe = "Pretty mid.";

    if (temp > 30 && condition.includes("rain")) {
        bgImage = "images/rain.png";
        vibe = "Hot AND raining? Absolute chaos. 🌦️";
    }
    else if (condition.includes("rain")) {
        bgImage = "images/rain.png";
        vibe = "Sky juice is falling. Stay inside. 🌧️";
    } 
    else if (condition.includes("cloud")) {
        bgImage = "images/cloud.png";
        vibe = "The sky is wearing a gray hoodie. ☁️";
    } 
    else if (temp < 10) {
        bgImage = "images/cold.png";
        vibe = "Basically the Ice Age. Why are you outside? ❄️";
    } 
    else if (temp > 30) {
        bgImage = "images/hot.png";
        vibe = "The sun is a deadly laser. 🥵";
    }

    document.body.style.background = `url('${bgImage}') no-repeat center center/cover`;


    resultDiv.innerHTML = `
        <h2 style="margin:0;">${data.location.name}</h2>
        
        <img src="${iconUrl}" alt="weather icon" style="width: 100px; height: 100px; display: block; margin: 10px auto;">
        
        <div style="font-size: 2.5rem; font-weight: bold; margin: 5px 0;">${temp}°C</div>
        <p style="text-transform: capitalize; color: #666;">${condition}</p>
        <span class="vibe-text">"${vibe}"</span>
    `;
}
