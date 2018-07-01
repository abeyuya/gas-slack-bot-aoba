declare var global: any;

import { nenecchiBot } from "../lib/bot/nenecchi";
import { postToSlackAsBot } from "../lib/client/slack";
import { isBusinessDay } from "../lib/util";

global.github_pr_remind_all_user = () => {
  if (isBusinessDay() === false) { return; }

  postToSlackAsBot(
    nenecchiBot.username,
    nenecchiBot.icon_url,
    process.env.SLACK_OWNER_CHANNEL || "",
    "あおっち確認よろしく〜",
  );

  postToSlackAsBot(
    nenecchiBot.username,
    nenecchiBot.icon_url,
    process.env.SLACK_OWNER_CHANNEL || "",
    "@aoba pr all",
  );
};
