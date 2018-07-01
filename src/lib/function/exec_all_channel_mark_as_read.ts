
import { aobaBot } from "../bot/aoba";
import {
  IWorkspace,
  getGroups,
  markAsRead,
  workspaces,
  postToSlackAsBot,
} from "../client/slack";

const targetWorkspaces = [workspaces.B, workspaces.C];

export const allChannelMarkAsRead = (workspace: IWorkspace, channelId: string) => {

  postToSlackAsBot(
    workspace,
    aobaBot.username,
    aobaBot.icon_url,
    channelId,
    "既読処理中なので少々お待ち下さい！",
  );

  const now = new Date();
  let channelCount = 0;

  targetWorkspaces.forEach((tws) => {
    const channels = getGroups(tws);
    channels.forEach((channel) => {
      const success = markAsRead(tws, channel.id, now);
      if (success) { channelCount += 1; }
    });
  });

  postToSlackAsBot(
    workspace,
    aobaBot.username,
    aobaBot.icon_url,
    channelId,
    `完了しました！${channelCount}件のチャンネルを既読にしておきました！`,
  );
};
