const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function openAI(bookTitle, bookAuthors) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Give me a interesting book trivia spoiler free about ${bookTitle} by ${bookAuthors}
        the response must be a JSON, the format is like this:
        {
            "bookTrivia": ...
        }`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  //   console.log(completion.choices[0].message.content);

  return completion.choices[0].message.content;
};
