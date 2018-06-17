declare var global: any;

import { postAsAoba } from "../lib/slack";
import { getAobaTweets } from "../lib/twitter";
import { isBusinessDay, randomPickup } from "../lib/util";

global.talk = () => {
  if (isBusinessDay() === false) { return; }

  const tweets = getAobaTweets(5);
  const tweet = randomPickup(tweets, 1);

  postAsAoba(
    "#" + process.env.SLACK_TALK_CHANNEL || "",
    `@${process.env.SLACK_TALK_TO_ACCOUNT} ${tweet}`,
  );
};
