declare var global: any;

import { aobaBot } from "../lib/bot/aoba";
import { postToSlackAsBot } from "../lib/client/slack";
import { getAobaTweets } from "../lib/client/twitter";
import { isBusinessDay, randomPickup } from "../lib/util";

global.talk = () => {
  if (isBusinessDay() === false) { return; }

  const tweets = getAobaTweets(5);
  const tweet = randomPickup(tweets, 1)[0];

  postToSlackAsBot(
    aobaBot.username,
    aobaBot.icon_url,
    process.env.SLACK_TALK_CHANNEL || "",
    `@${process.env.SLACK_TALK_TO_ACCOUNT} ${tweet}`,
  );
};
