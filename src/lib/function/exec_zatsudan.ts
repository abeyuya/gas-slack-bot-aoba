
import { IBot } from "../bot/base";
import { nenecchiBot } from "../bot/nenecchi";
import { getDialogueMessage } from "../client/docomo_zatsudan";
import { getNenecchiTweets } from "../client/twitter";
import {
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
  IWorkspace,
} from "../client/slack";
import { randomPickup } from "../util";

export const execZatsudan = (
  workspace: IWorkspace,
  bot: IBot,
  triggerWord: string,
  param: ISlackOutgoingWebhookParams,
) => {
  const { text, user_name, channel_id } = param;
  const receivedMessage = text.replace(triggerWord, "").trim();
  const responseMessage = getDialogueMessage(user_name, receivedMessage);

  postToSlackAsBot(
    workspace,
    bot.username,
    bot.icon_url,
    channel_id,
    responseMessage,
  );
};

export const execZatsudanNenecchi = (workspace: IWorkspace, param: ISlackOutgoingWebhookParams) => {
  const { channel_id } = param;
  const message = randomPickup(getNenecchiTweets(100), 1)[0];

  postToSlackAsBot(
    workspace,
    nenecchiBot.username,
    nenecchiBot.icon_url,
    channel_id,
    message,
  );
};
