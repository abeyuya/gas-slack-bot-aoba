declare var global: any;

import { postAsAoba } from "../lib/slack";
import { getAobaTweets } from "../lib/twitter";
import { isBusinessDay, randomPickup } from "../lib/util";

global.ds = () => {

  if (isBusinessDay() === false) { return; }

  const tweets = getAobaTweets();
  const targetTweets: string[] = randomPickup(tweets, 3);
  const manzokudo = Math.floor(Math.random() * 4) + 1;

  const postMessage = [
    "```",
    `# 満足度: ${manzokudo}`,
    `- ${targetTweets[0]}`,
    "",
    `# 目標`,
    `- ${targetTweets[1]}`,
    "",
    `# 意気込み`,
    `- ${targetTweets[2]}`,
    "```",
  ].join("\n");

  postAsAoba(process.env.SLACK_DS_CHANNEL || "", postMessage);
};
