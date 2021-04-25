class Weather {
    constructor() {
        this.getWeather()
        this.getLocation()
    }

  

    getLocation() {
        fetch('https://ipapi.co/json/')
            .then(function (response) {
                response.json().then(jData => {
                    console.log(jData)
                    document.getElementById('location').innerHTML = jData.country + " " + jData.region + ", " + jData.city
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    getWeather = async => {
        // API ID
        const api = "2e3f338bc2f1aca78c89eed53e8c1358";



        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                console.log(lat, long)

                // API URL
                const base = `https://api.allorigins.win/raw?url=https://api.darksky.net/forecast/${api}/${lat},${long}`;

                fetch(base)
                    .then(res => {
                        return res.json()
                    })


                    .then(data => {
                        var celcius = Math.round(parseFloat(data.currently.temperature) - 273.15);
                        var fahrenheit = Math.round(((parseFloat(data.currently.temperature) - 273.15) * 1.8) + 32);

                        document.getElementById('description').innerHTML = data.hourly.summary;
                        document.getElementById('temp').innerHTML = data.currently.temperature + '&deg; F';

                        console.log(data)
                        console.log(data.currently.icon)
                                             

                        //Skycons
                        var iconRequest = data.currently.icon;
                        var icons = new Skycons({ 'color': '#FFCB00' });
                        var iconList = [
                            "clear-day",
                            "clear-night",
                            "partly-cloudy-day",
                            "partly-cloudy-night",
                            "cloudy",
                            "rain",
                            "sleet",
                            "snow",
                            "wind",
                            "fog"
                        ];
                        console.log(icons);
                        for (let i = 0; i < iconList.length; i++) {
                            if (iconRequest == iconList[i]) {
                                icons.set('icon', iconList[i]);
                                icons.play()
                            }
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        }
        else {
            window.alert("Could not get location");
        }
    }

}