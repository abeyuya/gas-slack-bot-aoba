declare var global: any;

import "../lib/polyfill";
// import { aobaBot } from "../bot/aoba";
// import { postToSlackAsBot } from "../lib/slack";
import { getAssignedPullRequests } from "../lib/github";

global.test = () => {

  const arr = ["a", "b", "c"];

  const include = arr.includes("c");
  Logger.log(include);

  const find = arr.find((obj) => obj === "c");
  Logger.log(find || "");

  const info = getAssignedPullRequests("abeyuya");
  Logger.log(info);

  // postToSlackAsBot(
  //   aobaBot.username,
  //   aobaBot.icon_url,
  //   process.env.SLACK_DEBUG_CHANNEL || "",
  //   `テストだぞい`,
  // );
};
