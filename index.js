import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

let mylongitude; let mylatitude;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port  = 3000;
const key = "e909154093457ca41316e138a6c4dbcb";

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",  (req, res) => {
    res.render("index.ejs");
});

app.post("/location", (req, res) => {
    mylongitude = req.body.longitude;
    mylatitude = req.body.latitude;
    res.send();
})

app.get("/weather", async (req, res) => {
    try {
        let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${mylatitude}&lon=${mylongitude}&appid=${key}`;
        const response = await axios.get(URL);
        console.log(response.data)
        res.render("weather.ejs", {data: response.data})
    }
    catch (error){
        res.status(500);
        res.render("error.ejs")
    }

});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});