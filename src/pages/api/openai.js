const { Configuration, OpenAIApi } = require('openai');


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = req.body; //stores the users input in the request body

  try {
    const response = await openAi.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
      temperature: 0.7,
      n: 1,
    });

    const completion = response.data.choices[0].text;
    res.status(200).json(completion);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json('Error Encountered while communicating with the OpenAI API.');
  }
};
