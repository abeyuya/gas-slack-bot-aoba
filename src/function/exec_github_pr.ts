
import { aobaBot } from "../bot/aoba";
import {
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
} from "../lib/slack";
import { getAssignedPullRequests } from "../lib/github";
import { buildGithubPrMessage } from "./github_pr_message";

export const execGithubPr = (param: ISlackOutgoingWebhookParams) => {

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
      aobaBot.username,
      aobaBot.icon_url,
      param.channel_id,
      errorMessage,
    );
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
