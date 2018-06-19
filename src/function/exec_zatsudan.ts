
import { IBot } from "../bot/base";
import { getDialogueMessage } from "../lib/docomo_zatsudan";
import {
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
} from "../lib/slack";

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
