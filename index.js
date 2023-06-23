const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/popular", async (request, response) => {
  try {
    const query = request.query;
    const body = request.body;
    const result = await axios.request({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { language: "ja-JP", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjIyNzRiMzJjMTgwM2ZmNWJmMGFkYjg2ZmNiZmQ4ZCIsInN1YiI6IjY0NmRjYjc0OTY2MWZjMDExZDk1NzlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6abkUx93_XOwAaIbBxBseBK-1KBWYpoBLMKoIdQ7U9I",
      },
    });
    response.json(result.data);
  } catch (error) {
    response.status(500);
    response.json({ error: error.message });
  }
});

app.get("/search", async (request, response) => {
  const params = request.query;
  try {
    const getResult = await axios.request({
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjIyNzRiMzJjMTgwM2ZmNWJmMGFkYjg2ZmNiZmQ4ZCIsInN1YiI6IjY0NmRjYjc0OTY2MWZjMDExZDk1NzlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6abkUx93_XOwAaIbBxBseBK-1KBWYpoBLMKoIdQ7U9I",
      },
    });
    // const convertJson = JSON.stringify(getResult.data);
    response.json(getResult.data);
    console.log("api", params.query);
  } catch (error) {
    response.status(500);
    response.json({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
