
import { IBot } from "../bot/base";
import {
  IAttachment,
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
  IWorkspace,
} from "../client/slack";

export const execMo = (workspace: IWorkspace, bot: IBot, param: ISlackOutgoingWebhookParams) => {
  const currentHour = new Date().getHours();
  if (currentHour < 18) { return; }
  const { channel_id } = param;
  const attachments: IAttachment[] = [
    {
      pretext: "",
      image_url: "http://livedoor.blogimg.jp/bmaysu/imgs/1/9/192424ff.png",
    },
  ];

  postToSlackAsBot(
    workspace,
    bot.username,
    bot.icon_url,
    channel_id,
    "",
    attachments,
  );
};
