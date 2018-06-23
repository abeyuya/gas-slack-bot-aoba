
declare var OAuth1: any;

// https://github.com/gsuitedevs/apps-script-oauth1/blob/master/samples/Twitter.gs
const getTwitterService = () => {
  return OAuth1.createService("Twitter")
    .setAccessTokenUrl("https://api.twitter.com/oauth/access_token")
    .setRequestTokenUrl("https://api.twitter.com/oauth/request_token")
    .setAuthorizationUrl("https://api.twitter.com/oauth/authorize")
    .setConsumerKey(process.env.TW_CONSUMER_KEY)
    .setConsumerSecret(process.env.TW_CONSUMER_SECRET)
    .setAccessToken(process.env.TW_ACCESS_TOKEN, process.env.TW_ACCESS_TOKEN_SECRET);
};

const buildGetTweetsUrl = (userId: string, count: number): string => {
  return [
    `https://api.twitter.com/1.1/statuses/user_timeline.json`,
    `?screen_name=${userId}`,
    `&count=${count}`,
  ].join("");
};

const aobaOfficialTwitterId = "aoba_s_new";
const nenecchiTwitterId = "nene_newgame";

// 特定ユーザのタイムラインを取得
const getTweets = (userId: string, count: number): string[] => {

  const service = getTwitterService();
  const res = service.fetch(buildGetTweetsUrl(userId, count));
  const json = JSON.parse(res);
  const tweets: string[] = json.map((tweet) => {
    return tweet.text.split(/\r\n|\r|\n/)[0];
  });

  Logger.log(tweets);

  return tweets;
};

export const getAobaTweets = (count: number = 20): string[] => {
  return getTweets(aobaOfficialTwitterId, count);
};

export const getNenecchiTweets = (count: number = 20): string[] => {
  return getTweets(nenecchiTwitterId, count);
};
