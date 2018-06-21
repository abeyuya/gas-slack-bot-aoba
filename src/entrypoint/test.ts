declare var global: any;

import { aobaBot } from "../bot/aoba";
import "../lib/polyfill";
import { postToSlackAsBot } from "../lib/slack";

global.test = () => {

  const arr = ["a", "b", "c"];

  const include = arr.includes("c");
  Logger.log(include);

  const find = arr.find((obj) => obj === "c");
  Logger.log(find || "");

  postToSlackAsBot(
    aobaBot.username,
    aobaBot.icon_url,
    process.env.SLACK_DEBUG_CHANNEL || "",
    `テストだぞい`,
  );
};
