const express=require("express");
const https=require("https")
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
  const query=req.body.cityName;
  const appid="c799cf2ce38695005b92437ecd024ab5";
  const temp="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+temp;
  https.get(url,function(response){
    response.on("data",function(data){
      const wea=JSON.parse(data);

      const tem=wea.main.temp;
      const icon=wea.weather[0].icon
      const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

      const description=wea.weather[0].description;
      res.write("<h1>the weather is "+description+"</h1>")
      res.write("<h1>the Temprature in"+query +" is "+tem+" degree celcius</h1>");
      res.write("<img src="+imgurl+">");
      res.send();
    })
})
})





app.listen(process.env.PORT || 3000,function(){
  console.log("server is started at 3000");
})
