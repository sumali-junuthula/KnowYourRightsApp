/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: functions.config().openai.key, // secure!
});
const openai = new OpenAIApi(configuration);

exports.analyzeLaw = onRequest((req, res) => {
  cors(req, res, async () => {
    const userInput = req.body?.text;
    if (!userInput) return res.status(400).send("Missing input text.");

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a legal assistant. When given legislation, summarize and flag affected constitutional rights.",
          },
          { role: "user", content: userInput },
        ],
      });

      const output = completion.data.choices[0].message.content;
      res.status(200).send({ result: output });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to analyze law.");
    }
  });
});
