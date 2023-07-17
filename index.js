const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;
const express = require("express");
const cors = require("cors");
require("dotenv").config()

const configuration = new Configuration({
  organization: "org-o5JokMY8pns9CCGCvaDvGhGN",
  apiKey: process.env.API_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(cors());

// const prompt = "What is Bard "

app.post("/", async (req, resp) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 20,
    temperature: 0,
  });

  console.log(response.data);

  if (response.data.choices[0].text) {
    resp.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen("3001", () => console.log("Server is Working"));
