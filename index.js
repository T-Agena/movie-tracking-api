require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/popular", async (request, response) => {
  try {
    const popularResult = await axios.request({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { language: "ja-JP", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: "Bearer" + process.env.API_KEY,
      },
    });
    response.json(popularResult.data);
    console.log(popularResult.data);
  } catch (error) {
    response.status(500);
    response.json({ error: error.message });
  }
});

app.get("/search", async (request, response) => {
  const params = request.query;
  try {
    const searchResult = await axios.request({
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: params.query,
        include_adult: "false",
        language: "ja-JP",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: "Bearer" + process.env.API_KEY,
      },
    });
    // const convertJson = JSON.stringify(getResult.data);
    response.json(searchResult.data);
    console.log("search", searchResult.data);
  } catch (error) {
    response.status(500);
    response.json({ error: error.message });
  }
});

app.get("/detail", async (request, response) => {
  const id = request.query;
  try {
    const detaileResults = await axios.request({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/" + id.query,
      params: { language: "ja-JP" },
      headers: {
        accept: "application/json",
        Authorization: "Bearer" + process.env.API_KEY,
      },
    });
    response.json(detaileResults.data);
    console.log("detaile", id);
  } catch (error) {
    response.status(500);
    response.json({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
