declare var global: any;

import { aobaBot } from "../bot/aoba";
import { postToSlackAsBot } from "../lib/slack";
import { isBusinessDay } from "../lib/util";

global.zoi = () => {
  if (isBusinessDay() === false) { return; }

  postToSlackAsBot(
    aobaBot.username,
    aobaBot.icon_url,
    process.env.SLACK_OWNER_CHANNEL || "",
    `@${process.env.SLACK_TALK_TO_ACCOUNT} image me 今日も1日頑張るぞい`,
  );
};
