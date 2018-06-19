
import { getDialogueMessage } from "../lib/docomo_zatsudan";
import {
  IAttachment,
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
} from "../lib/slack";
import { randomPickup } from "../lib/util";
import { aobaBot } from "./aoba";

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

interface IOtsukare {
  bot: IBot;
  message: string;
  imageUrl: string;
}

const otsukareList: IOtsukare[] = [
  {
    bot: aobaBot,
    message: "おつかれさまでしたー！",
    imageUrl: "https://pbs.twimg.com/media/CCT9-y2UMAAtQMg.jpg",
  },
  {
    bot: aobaBot,
    message: "おつかれさまでしたー！",
    imageUrl: "http://blog.oukasoft.com/wp-content/uploads/90b5e937575ba81a447c63fdabd0fb87.jpg",
  },
];

const ignoreOtsukareWords = [
  "お疲れ様です",
  "おつかれさまです",
];

export const execOtsukare = (param: ISlackOutgoingWebhookParams) => {
  const { channel_id, user_name, text } = param;

  if (user_name === "slackbot") { return; }

  let ignoreFlag = false;
  ignoreOtsukareWords.forEach((word) => {
    if (text.indexOf(word) === 0) { ignoreFlag = true; }
  });
  if (ignoreFlag) { return; }

  const otsukare = randomPickup(otsukareList, 1)[0];
  const attachments: IAttachment[] = [
    {
      pretext: "",
      image_url: otsukare.imgUrl,
    },
  ];

  postToSlackAsBot(otsukare.bot, channel_id, otsukare.message, attachments);
};
