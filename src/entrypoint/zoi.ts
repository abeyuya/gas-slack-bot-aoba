declare var global: any;

import { postAsAoba } from "../lib/slack";
import { isBusinessDay } from "../lib/util";

global.zoi = () => {
  if (isBusinessDay() === false) { return; }
  postAsAoba(process.env.SLACK_OWNER_CHANNEL || "", `@${process.env.SLACK_TALK_TO_ACCOUNT} image me 今日も1日頑張るぞい`);
};
