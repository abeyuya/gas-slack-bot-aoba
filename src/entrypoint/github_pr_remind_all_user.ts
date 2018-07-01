declare var global: any;

import { nenecchiBot } from "../lib/bot/nenecchi";
import { postToSlackAsBot, workspaces } from "../lib/client/slack";
import { isBusinessDay } from "../lib/util";

global.github_pr_remind_all_user = () => {
  if (isBusinessDay() === false) { return; }

  postToSlackAsBot(
    workspaces.A,
    nenecchiBot.username,
    nenecchiBot.icon_url,
    process.env.SLACK_REVIEW_CHANNEL || "",
    "あおっち確認よろしく〜",
  );

  postToSlackAsBot(
    workspaces.A,
    nenecchiBot.username,
    nenecchiBot.icon_url,
    process.env.SLACK_REVIEW_CHANNEL || "",
    "@aoba pr all",
  );
};
