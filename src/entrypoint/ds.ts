declare var global: any;

// import { isBusinessDay } from "../lib/isBussinessDay";
import { postAsAoba } from "../lib/slack";
import { getAobaTweets } from "../lib/twitter";

global.handler = () => {

  // if (isBusinessDay() === false) { return; }

  const tweets = getAobaTweets();
  Logger.log(tweets);

  postAsAoba("@abeyuya", "テストだぞい");
};
