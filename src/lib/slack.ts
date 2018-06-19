
import { aobaBot, execMo } from "../bot/aoba";
import { execOtsukare, execZatsudan, IBot } from "../bot/base";

interface IPayload {
  token: string;
  channel: string;
  text: string;
  username: string;
  parse: string;
  icon_url: string;
  attachments?: string;
}

interface IAttachmentField {
  title?: string;
  value?: string;
  short?: boolean;
}

export interface IAttachment {
  color?: "#36a64f" | "danger";
  image_url?: string;
  fields?: IAttachmentField[];
  pretext: string;
}

interface IParams {
  method: "get" | "post";
  payload: IPayload;
}

const slackPostUrl = "https://slack.com/api/chat.postMessage";
const slackPostToken = process.env.SLACK_TOKEN || "";

export const postToSlackAsBot = (
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
    icon_url: bot.icon_url,
    attachments: JSON.stringify(attachments),
  };

  const params: IParams = { method: "post", payload };
  const res = UrlFetchApp.fetch(slackPostUrl, params as any);
  return res;
};

export interface ISlackOutgoingWebhookParams {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  text: string;
  trigger_word: string;
}

export const triggerSlackWebHook = (param: ISlackOutgoingWebhookParams) => {

  switch (param.trigger_word) {
    case "@aoba":
    case "U3S3FR23F": {
      execZatsudan(aobaBot, param);
      break;
    }

    case ":mo:": {
      execMo(param);
      break;
    }

    case "お疲れ":
    case "落ちます":
    case "おつかれ": {
      execOtsukare(param);
      break;
    }
  }
};
