
interface IPayload {
  token: string;
  channel: string;
  text: string;
  username: string;
  parse: string;
  icon_emoji: string;
  attachments?: string;
}

interface IAttachmentField {
  title: string;
  value: string;
  short: boolean;
}

interface IAttachment {
  color: "#36a64f" | "danger";
  image_url: string;
  fields: IAttachmentField[];
}

interface IParams {
  method: "get" | "post";
  payload: IPayload;
}

interface IBot {
  username: string;
  icon_emoji: string;
}

const aobaBot: IBot = {
  username: "青葉",
  icon_emoji: ":aoba:",
};

const slackPostUrl = "https://slack.com/api/chat.postMessage";
const slackPostToken = process.env.SLACK_TOKEN || "";

const postToSlack = (
  bot: IBot,
  channel: string,
  text: string,
  attachments?: IAttachment[],
) => {

  const payload: IPayload = {
    token: slackPostToken,
    channel,
    text,
    parse: "full",
    username: bot.username,
    icon_emoji: bot.icon_emoji,
    attachments: JSON.stringify(attachments),
  };

  const params: IParams = { method: "post", payload };
  const res = UrlFetchApp.fetch(slackPostUrl, params as any);
  Logger.log(res);
  return res;
};

export const postAsAoba = (
  channel: string,
  text: string,
  attachments?: IAttachment[],
) => {
  return postToSlack(aobaBot, channel, text, attachments);
};
