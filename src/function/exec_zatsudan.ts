
import { IBot } from "../bot/base";
import { akagiBot } from "../bot/akagi";
import { nenecchiBot } from "../bot/nenecchi";
import { getDialogueMessage } from "../lib/docomo_zatsudan";
import { getNenecchiTweets } from "../lib/twitter";
import {
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
} from "../lib/slack";
import { randomPickup } from "../lib/util";

export const execZatsudan = (bot: IBot, param: ISlackOutgoingWebhookParams) => {
  const { text, user_name, channel_id } = param;
  const receivedMessage = text.replace(`@${bot.username}`, "").trim();
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
