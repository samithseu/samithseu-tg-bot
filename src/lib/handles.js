// handle non command inputs
export const handleNonCommand = async (ctx) => {
  try {
    await ctx.replyWithChatAction("typing");
    await ctx.reply(
      "I dont know this: " +
        `<code>${ctx.message.text}</code>` +
        "\nType /help for commands to use to Bot.",
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error(error);
  }
};

// handle /start
export const handleStart = async (ctx) => {
  try {
    await ctx.replyWithChatAction("typing");
    await ctx.reply(
      `Hello, ${ctx.message.from.first_name}!\nWelcome to Samith Bot 🤖`
    );
  } catch (error) {
    console.error(error);
  }
};

// handle /quote
export const handleQuote = async (ctx) => {
  try {
    await ctx.replyWithChatAction("typing");
    const res = await fetch("https://quotes-api-self.vercel.app/quote");
    const data = await res.json();
    await ctx.reply(
      `<blockquote>${data.quote}</blockquote> By <i>${data.author}</i>`,
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error(error);
  }
};

// handle /surprise_quote
export const handleSurpriseQuote = async (ctx) => {
  try {
    await ctx.replyWithChatAction("typing");
    const res = await fetch("https://quotes-api-self.vercel.app/quote");
    const data = await res.json();
    await ctx.reply(
      `<blockquote><span class='tg-spoiler'>${data.quote}</span></blockquote> By <i>${data.author}</i>`,
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error(error);
  }
};

// handle /meme
export const handleMeme = async (ctx) => {
  const url = "https://programming-memes-images.p.rapidapi.com/v1/memes";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_MEME_API_TOKEN,
      "x-rapidapi-host": "programming-memes-images.p.rapidapi.com",
    },
  };
  try {
    await ctx.replyWithChatAction("upload_photo");
    const res = await fetch(url, options);
    const data = await res.json();
    await ctx.replyWithPhoto(data[0].image);
  } catch (error) {
    console.error(error);
  }
};

// handle /help
export const handleHelp = async (ctx) => {
  try {
    await ctx.replyWithChatAction("typing");
    await ctx.reply(`/start - Greeting from bot.
/me - Get current user info.
/quote - Get random quote!
/surprise_quote - Get surprise quote!
/meme - Get random programming meme!
/joke - Get random joke.
/ask - Ask anything! Ex: What's AI?
/summarize - Any long text...
/help - Showing all commands.
`);
  } catch (error) {
    console.error(error);
  }
};

// handle /joke
export const handleJoke = async (ctx) => {
  try {
    await ctx.replyWithChatAction("typing");
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=twopart");
    const data = await res.json();
    console.log(data);
    await ctx.reply(
      `<blockquote>${data.setup}</blockquote>\n\nAnswer: <span class='tg-spoiler'>${data.delivery}</span>`,
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error(error);
  }
};

// handle /ask ...
export const handleAsking = async (ctx, token) => {
  try {
    if (ctx.message.text === "/ask") {
      await ctx.reply("Example: <code>/ask What's AI?</code>", {
        parse_mode: "HTML",
      });
      return;
    }
    await ctx.replyWithChatAction("typing");
    const query = ctx.message.text.slice("/ask ".length);
    const url =
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/chat/completions";
    const bodyData = {
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [{ role: "user", content: query }],
      max_tokens: 512,
      stream: false,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const data = await res.json();
    await ctx.reply(data.choices[0].message.content, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error(error);
  }
};

// handle /summarize ...
export const handleSummarize = async (ctx, token) => {
  try {
    if (ctx.message.text === "/summarize") {
      await ctx.reply("Example: <code>/summarize Any long text...</code>", {
        parse_mode: "HTML",
      });
      return;
    }
    await ctx.replyWithChatAction("typing");
    const query = ctx.message.text.slice("/summarize ".length);
    const url =
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
    const bodyData = { inputs: query };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const data = await res.json();
    await ctx.reply(data[0].summary_text, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error(error);
  }
};

// handle /me OR me
export const handleMe = async (ctx, admin) => {
  try {
    await ctx.replyWithChatAction("typing");
    await ctx.reply(
      `<blockquote>Telegram Account Info: </blockquote><pre>- <i>ID:</i>           <code>${
        ctx.from.id
      }</code>
- <i>Name:</i>         <code>${ctx.from.first_name}</code>
- <i>Username:</i>     <a href="tg://user?id=${ctx.from.id}">@${
        ctx.from.username
      }</a>
- <i>Is Premium?:</i>  <code>${ctx.from.is_premium ? "✅" : "❌"}</code>
- <i>Bot Admin?:</i>   <code>${ctx.from.id == admin ? "✅" : "❌"}</code>
</pre>
    `,
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error(error);
  }
};
