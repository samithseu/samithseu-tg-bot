<script setup>
import Welcome from "./components/Welcome.vue";
import { Bot } from "grammy";
import {
  handleStart,
  handleQuote,
  handleSurpriseQuote,
  handleMeme,
  handleHelp,
  handleNonCommand,
  handleJoke,
  handleAsking,
  handleSummarize,
  handleMe,
} from "./lib/handles";

const bot = new Bot(import.meta.env.VITE_TL_BOT_TOKEN);

bot.on("message:text", async (ctx) => {
  if (ctx.message.text == "/start") {
    await handleStart(ctx);
  } else if (ctx.message.text == "/joke") {
    await handleJoke(ctx);
  } else if (ctx.message.text == "/quote") {
    await handleQuote(ctx);
  } else if (ctx.message.text == "/surprise_quote") {
    await handleSurpriseQuote(ctx);
  } else if (ctx.message.text == "/meme") {
    await handleMeme(ctx);
  } else if (ctx.message.text == "/help") {
    await handleHelp(ctx);
  } else if (ctx.message.text.includes("/ask")) {
    await handleAsking(ctx, import.meta.env.VITE_HUGGING_FACE_TOKEN);
  } else if (ctx.message.text.includes("/summarize")) {
    await handleSummarize(ctx, import.meta.env.VITE_HUGGING_FACE_TOKEN);
  } else if (ctx.message.text == "me" || ctx.message.text == "/me") {
    await handleMe(ctx, import.meta.env.VITE_ADMIN_ID);
  } else {
    await handleNonCommand(ctx);
  }
});

// starting the bot
(async () => {
  await bot.start();
})();
</script>

<template>
  <Welcome />
</template>
