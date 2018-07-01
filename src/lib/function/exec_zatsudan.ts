
import { IBot } from "../bot/base";
import { akagiBot } from "../bot/akagi";
import { nenecchiBot } from "../bot/nenecchi";
import { getDialogueMessage } from "../client/docomo_zatsudan";
import { getNenecchiTweets } from "../client/twitter";
import {
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
} from "../client/slack";
import { randomPickup } from "../util";

export const execZatsudan = (bot: IBot, triggerWord: string, param: ISlackOutgoingWebhookParams) => {
  const { text, user_name, channel_id } = param;
  const receivedMessage = text.replace(triggerWord, "").trim();
  const responseMessage = getDialogueMessage(user_name, receivedMessage);

  postToSlackAsBot(
    bot.username,
    bot.icon_url,
    channel_id,
    responseMessage,
  );
};

export const execZatsudanAkagi = (param: ISlackOutgoingWebhookParams) => {
  const { channel_id } = param;

  postToSlackAsBot(
    akagiBot.username,
    akagiBot.icon_url,
    channel_id,
    "ウッス",
  );
};

export const execZatsudanNenecchi = (param: ISlackOutgoingWebhookParams) => {
  const { channel_id } = param;
  const message = randomPickup(getNenecchiTweets(100), 1)[0];

  postToSlackAsBot(
    nenecchiBot.username,
    nenecchiBot.icon_url,
    channel_id,
    message,
  );
};
