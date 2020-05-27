var cities = [];
$(document).ready(function()
{
    
    function loadSavedSearch()
    {
        savedCities = JSON.parse(localStorage.getItem("savedCities"))
        if(savedCities)
        {
        console.log(typeof savedCities);
        for(var i = 0; i < savedCities.length; i++)
        saveSearch(savedCities[i])
        
        }
    }
    loadSavedSearch();

    function saveSearch(city)
    {
        cities.push(city)
        localStorage.setItem("savedCities", JSON.stringify(cities))
        var cityList = $("<li>")
        var citybutton = $("<a>")
        citybutton.text(city)
        citybutton.addClass("waves-effect waves-green btn-small")
        
        cityList.append(citybutton);
        $(".sidenav").append(cityList);
    }

    var APIKey = "eb8e38c693f7fe9e6a00882a5f822683";

    $(".searchButton").click(function()
    {
        //tried using .val() here but it kept coming up undefined???
        var cityInput = $("#search");
        console.log(cityInput.val())
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityInput.val()+ "&units=imperial&appid=" +APIKey;
        var foreCastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.val() + "&units=imperial&appid=" + APIKey;
        saveSearch(cityInput.val());
        $.ajax(
            {
                url: queryURL,
                method: "GET"
            })
            .then(function(response)
            {
                
                console.log(response)

                $("#city").html("<h1>" + response.name + "</h1>");
                $("#temp").html("<p> Temperature: " + response.main.temp + " &#8457;</p>");
                $("#humidity").html("<p> Humidity: "+ response.main.humidity +"%</p>");
                $("#wind").html("<p> Wind Speed: " + response.wind.speed + "MPH</p>")
            })
        $.ajax(
            {
                url: foreCastURL,
                method: "GET"
            })
            .then(function(res)
            {
                console.log(res);
                for(var i = 4; i < 40; i+= 8)
                {
                    $(".day"+i).empty();
                    var cardImgDiv = $("<div>");
                    cardImgDiv.addClass("card-image")
                    var weatherIcon = res.list[i].weather[0].icon;
                    var weatherImg = $("<img>");
                    var imgSrc = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
                    weatherImg.attr("src", imgSrc);
                    cardImgDiv.append(weatherImg);

                    var tempInfoDiv = $("<div>");
                    var tempP = $("<p>");
                    tempP.text("Temp: " + res.list[i].main.temp);
                    var humidityP = $("<p>");
                    humidityP.text("Humidity: " + res.list[i].main.humidity + "%");
                    var DateP = $("<span>");
                    DateP.text(res.list[i].dt_txt);
                    var br = $("<br>");

                    tempInfoDiv.append(tempP);
                    tempInfoDiv.append(humidityP);

                    cardImgDiv.append(DateP);
                    tempInfoDiv.append(tempP);
                    tempInfoDiv.append(br);
                    tempInfoDiv.append(humidityP);
                    tempInfoDiv.addClass("card-content");


                    $(".day"+i).append(cardImgDiv);
                    $(".day"+i).append(tempInfoDiv);


                }
            })
    })
})