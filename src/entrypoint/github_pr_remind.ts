declare var global: any;

import { nenecchiBot } from "../lib/bot/nenecchi";
import { postToSlackAsBot, workspaces } from "../lib/client/slack";
import { isBusinessDay } from "../lib/util";

global.github_pr_remind = () => {
  if (isBusinessDay() === false) { return; }

  postToSlackAsBot(
    workspaces.A,
    nenecchiBot.username,
    nenecchiBot.icon_url,
    process.env.SLACK_OWNER_CHANNEL || "",
    "あおっち確認よろしく〜",
  );

  postToSlackAsBot(
    workspaces.A,
    nenecchiBot.username,
    nenecchiBot.icon_url,
    process.env.SLACK_OWNER_CHANNEL || "",
    "@aoba pr abeyuya",
  );
};
