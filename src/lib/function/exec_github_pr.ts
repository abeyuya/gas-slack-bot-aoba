
import { aobaBot } from "../bot/aoba";
import {
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
  IWorkspace,
} from "../client/slack";
import { getAssignedPullRequests, getAllAssignedPullRequests } from "../client/github";
import { buildGithubPrMessage, buildGithubPrMessageForAllUser } from "./github_pr_message";

export const execGithubPr = (workspace: IWorkspace, param: ISlackOutgoingWebhookParams) => {

  const textInfo = param.text.split(" ");
  const username = textInfo[textInfo.length - 1];

  if (username === "pr") {
    const errorMessage = [
      `githubのアカウント名を指定してください！`,
      "```",
      "@aoba pr abeyuya",
      "```",
    ].join("\n");

    postToSlackAsBot(
      workspace,
      aobaBot.username,
      aobaBot.icon_url,
      param.channel_id,
      errorMessage,
    );
    return;
  }

  if (username === "all") {
    execGithubPrAllUser(workspace, param.channel_id);
    return;
  }

  const pullInfo = getAssignedPullRequests(username);

  if (pullInfo.length === 0) {
    const emptyMessage = [
      `${username}さんにレビュー依頼されているpull requestはなさそうでした！`,
      "青葉の確認ミスだったらごめんなさい :pray:",
      `https://github.com/pulls/review-requested`,
    ].join("\n");

    postToSlackAsBot(
      workspace,
      aobaBot.username,
      aobaBot.icon_url,
      param.channel_id,
      emptyMessage,
    );
    return;
  }

  const infoMessage = buildGithubPrMessage(pullInfo);
  const message = [
    `${username}さんにレビュー依頼されているpull requestがありました！`,
    "",
    infoMessage,
  ].join("\n");

  postToSlackAsBot(
    workspace,
    aobaBot.username,
    aobaBot.icon_url,
    param.channel_id,
    message,
    [
      {
        pretext: "",
        image_url: "https://i.pinimg.com/736x/18/c8/1e/18c81e845fb478d5f5542f1a0fd1b5d9.jpg",
      },
    ],
  );
};

export const execGithubPrAllUser = (workspace: IWorkspace, channelId: string) => {

  const info = getAllAssignedPullRequests();

  if (info.length === 0) {
    const emptyMessage = [
      `レビュー依頼されているpull requestはなさそうでした！`,
      "青葉の確認ミスだったらごめんなさい :pray:",
      `https://github.com/pulls/review-requested`,
    ].join("\n");

    postToSlackAsBot(
      workspace,
      aobaBot.username,
      aobaBot.icon_url,
      channelId,
      emptyMessage,
    );
    return;
  }

  const body = buildGithubPrMessageForAllUser(info);

  const message = [
    `レビュー依頼されているpull requestがありました！`,
    "",
    body,
  ].join("\n");

  postToSlackAsBot(
    workspace,
    aobaBot.username,
    aobaBot.icon_url,
    channelId,
    message,
    [
      {
        pretext: "",
        image_url: "https://i.pinimg.com/736x/18/c8/1e/18c81e845fb478d5f5542f1a0fd1b5d9.jpg",
      },
    ],
  );
};
