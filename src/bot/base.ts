
import { getDialogueMessage } from "../lib/docomo_zatsudan";
import {
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
} from "../lib/slack";

export interface IBot {
  username: string;
  icon_url: string;
}

export const execZatsudan = (bot: IBot, param: ISlackOutgoingWebhookParams) => {
  const { text, user_name, channel_id } = param;
  const receivedMessage = text.replace(`@${bot.username}`, "").trim();
  const responseMessage = getDialogueMessage(user_name, receivedMessage);

  postToSlackAsBot(bot, channel_id, responseMessage);
};
