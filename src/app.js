const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const HowIsWeather = require("./utils/howIsWeather");
// directories
const publicFolder = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../tempelates/views");
const partialDir = path.join(__dirname, "../tempelates/partials");

// config for static folder
app.use(express.static(publicFolder));
//  config for handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewDir);
hbs.registerPartials(partialDir);

// urls

app.get("", (req, res) => {
  res.render("index", { name: "Nusret", title: "this is the index page" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    header: "this is about page",
    title: "this is about page title",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "this is message from help page",
    name: "Nusret Ibrahimli",
  });
});

app.get("/weather", (req, res) => {
  const loc = req.query.adress;
  if (!loc) {
    return res.send({error:"querini daxil et"});
  }

  geocode(loc, (error, { longtitude, lattitude, place } = {}) => {
    if (error) {
      return res.send({error})
    }

    HowIsWeather(longtitude, lattitude, (error, response) => {
      if (error) {
        return  res.send({error})
      }

      res.send({
        adress: place,
        temperature: response.temp,
        feelsLike: response.feelslike,
      });

    });
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send("hecne axtarmirsanki sen");
  }

  res.send("Budur axtarisda olan sey " + req.query.search);
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMessage: "help in soraki extentionesi tapilmadi",
  });
});

app.get("*", (req, res) => {
  res.render("error", { errorMessage: "Umumiyyetle yoxdyu bele bii sohbet" });
});

app.listen(3000, () => {
  console.log("express ishe dusdu");
});
