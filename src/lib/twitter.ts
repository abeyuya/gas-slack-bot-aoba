
declare var TwitterWebService: any;

// OAuth1認証
const twitterClient = TwitterWebService.getInstance(
  process.env.TWITTER_KEY,
  process.env.TWITTER_SECRET,
);

// Twitter認証
const authorize = () => {
  twitterClient.authorize();
};

// コールバック
export const authCallback = (request) => {
  return twitterClient.authCallback(request);
};

const aobaOfficialTwitterId = "aoba_s_new";

const buildUrl = (userId: string, limit: number): string => {
  return [
    "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=",
    userId,
    `&count=${limit}`,
  ].join("");
};

// 特定ユーザのタイムラインを取得
const getTweets = (userId: string, limit: number = 20): string[] => {

  // TwitterAPIでタイムラインを取得してJSONパース
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  const service = twitterClient.getService();
  authorize();

  const response = service.fetch(buildUrl(userId, limit));
  const tweets = JSON.parse(response);

  const messages = tweets.map((tweet) => {
    return tweet.text.split(/\r\n|\r|\n/)[0];
  });

  return messages;
};

export const getAobaTweets = () => {
  return getTweets(aobaOfficialTwitterId);
};
