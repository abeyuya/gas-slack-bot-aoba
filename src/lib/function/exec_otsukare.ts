
import { akagiBot } from "../bot/akagi";
import { aobaBot } from "../bot/aoba";
import { nenecchiBot } from "../bot/nenecchi";
import { IBot } from "../bot/base";
import {
  IAttachment,
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
} from "../client/slack";
import { randomPickup } from "../util";

interface IOtsukare {
  bot: IBot;
  message: string;
  imageUrl: string;
}

// tslint:disable
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
  {
    bot: akagiBot,
    message: "",
    imageUrl: "https://cdn-ak.f.st-hatena.com/images/fotolife/h/heppoko_chihayap/20170313/20170313111738.jpg",
  },
  {
    bot: nenecchiBot,
    message: "おつかれー！",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL8pEArBOEy7eRgkQG1sNxnj8uG8x8etgvLyotcGtLWO-IExdG",
  },
];
// tslint:enable

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
