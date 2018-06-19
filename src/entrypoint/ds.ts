declare var global: any;

import { aobaBot } from "../bot/aoba";
import { postToSlackAsBot } from "../lib/slack";
import { getAobaTweets } from "../lib/twitter";
import { isBusinessDay, randomPickup } from "../lib/util";

global.ds = () => {

  if (isBusinessDay() === false) { return; }

  const tweets = getAobaTweets();
  const targetTweets = randomPickup(tweets, 3);
  const manzokudo = randomPickup(["1", "2", "3", "4"], 1)[0];

  const postMessage = [
    "```",
    `# 満足度: ${manzokudo}`,
    `- ${targetTweets[0]}`,
    "",
    "# 目標",
    `- ${targetTweets[1]}`,
    "",
    "# 意気込み",
    `- ${targetTweets[2]}`,
    "```",
  ].join("\n");

  postToSlackAsBot(
    aobaBot.username,
    aobaBot.icon_url,
    process.env.SLACK_DS_CHANNEL || "",
    postMessage,
  );
};
