const express= require("express")
const bodyParser= require("body-parser")

const https=require("https");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/index.html")


});

app.post("/", (req,res)=>{
   var cityName= req.body.city;
   console.log(req.body.city)
   var countryName=req.body.country;
   const query= req.body.city;
         const apiKey= "da2a1e91a1d3fb21bf6da0b2b7b6ba1f";
       const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+ "&units=metric";
       https.get(url, (response)=>{
   response.on("data",function(data){
       const weatherData=JSON.parse(data)
      
       const weatherDescription=weatherData.weather[0].description;
       const temp= weatherData.main.temp;
       const icon= weatherData.weather[0].icon
       console.log(icon)
       const imageURL= "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
       console.log(imageURL)
       res.writeHead(200 , {'Content-Type' : 'text/html'})
       res.write("The current Temperatore of"+ cityName+"is" +temp+"degree Celcius");
       res.write("<p>the Weather is currently "+weatherDescription +"<p>");
    //    res.write("<img src="+ imageURL +"/>");
        res.write("<img src=" + imageURL + ">");
      res.send();
   })
})
});

app.listen(3000, ()=> {
   console.log( "server is running")
})

// key used=7b9df7bdca8be5c9febc087d3837816f
// e72ca729af228beabd5d20e3b7749713