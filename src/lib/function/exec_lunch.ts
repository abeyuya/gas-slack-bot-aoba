
import { aobaBot } from "../bot/aoba";
import { nenecchiBot } from "../bot/nenecchi";
import {
  IAttachment,
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
  IWorkspace,
} from "../client/slack";
import { randomPickup } from "../util";

const lunchList = [
  {
    bot: aobaBot,
    imageUrl: "http://blog.oukasoft.com/wp-content/uploads/4472782f5c90597e55442b1a25414992.jpg",
  },
  {
    bot: nenecchiBot,
    imageUrl: "https://cdn-ak.f.st-hatena.com/images/fotolife/k/kat_cloudair/20160824/20160824184424.jpg",
  },
];

export const execLunch = (workspace: IWorkspace, param: ISlackOutgoingWebhookParams) => {
  const { channel_id } = param;
  const lunch = randomPickup(lunchList, 1)[0];
  const attachments: IAttachment[] = [
    {
      pretext: "",
      image_url: lunch.imageUrl,
    },
  ];

  postToSlackAsBot(
    workspace,
    lunch.bot.username,
    lunch.bot.icon_url,
    channel_id,
    "",
    attachments,
  );
};
