
import { aobaBot } from "../bot/aoba";
import { IBot } from "../bot/base";
import {
  IAttachment,
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
} from "../lib/slack";
import { randomPickup } from "../lib/util";

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
      image_url: otsukare.imageUrl,
    },
  ];

  postToSlackAsBot(
    otsukare.bot.username,
    otsukare.bot.icon_url,
    channel_id,
    otsukare.message,
    attachments,
  );
};
