declare var global: any;

// import { aobaBot } from "../bot/aoba";
// import { allChannelMarkAsRead } from "../lib/function/exec_all_channel_mark_as_read";
// import { workspaces } from "../lib/client/slack";
import { getAssignedPullRequests } from "../lib/client/github";

global.test = () => {

  const arr = ["a", "b", "c"];

  const include = arr.includes("c");
  Logger.log(include);

  const find = arr.find((obj) => obj === "c");
  Logger.log(find || "");

  const info = getAssignedPullRequests("abeyuya");
  Logger.log(info);

  // allChannelMarkAsRead(workspaces.DEBUG);

  // postToSlackAsBot(
  //   aobaBot.username,
  //   aobaBot.icon_url,
  //   process.env.SLACK_DEBUG_CHANNEL || "",
  //   `テストだぞい`,
  // );
};
