
const OpenAI = require('openai');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_TOKEN // This is also the default, can be omitted
});


async function chatgptText(_message){
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{"role": "system", "content": process.env.CHARACTER},
        {"role": "user", "content": _message}],

    });
  
    return(chatCompletion.choices[0].message.content);
}

module.exports = {
    chatgptText,
};