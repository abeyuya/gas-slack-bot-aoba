
import { aobaBot } from "../lib/bot/aoba";
import { execMo } from "../lib/function/exec_mo";
import { execOtsukare } from "../lib/function/exec_otsukare";
import { execZatsudan, execZatsudanAkagi, execZatsudanNenecchi } from "../lib/function/exec_zatsudan";
import { execGithubPr } from "../lib/function/exec_github_pr";
import { execLunch } from "../lib/function/exec_lunch";
import {
  ISlackOutgoingWebhookParams,
  postToSlackAsBot,
  IWorkspace,
  workspaces,
} from "../lib/client/slack";
import { randomPickup } from "../lib/util";

declare var global: any;

interface IWebhookEvent {
  parameter: any;
  contextPath: string;
  contentLength: number;
  queryString: string;
}

global.doPost = (e: IWebhookEvent) => {

  const slackWorkspace = slackOutgoingWebhookWorkspace(e);
  if (slackWorkspace) {
    triggerSlackWebHook(e.parameter);
    return;
  }
};

const slackOutgoingWebhookWorkspace = (e: IWebhookEvent): IWorkspace | null => {
  const targetWorkspaceKey = Object.keys(workspaces).find((key) => {
    const ws: IWorkspace = workspaces[key];
    return ws.webhookToken === e.parameter.token;
  });

  return targetWorkspaceKey
    ? workspaces[targetWorkspaceKey]
    : null;
};

enum TriggerWord {
  aoba1 = "@aoba",
  aobaPr1 = "@aoba pr",
  aobaPrRemind1 = "Reminder: @aoba pr",
  aoba2 = "<@U3S3FR23F>",
  aobaPr2 = "<@U3S3FR23F> pr",
  aobaPrRemind2 = "Reminder: <@U3S3FR23F> pr",
  mo = ":mo:",
  otsukare1 = "お疲れ",
  otsukare2 = "おつかれ",
  otsukare3 = "落ちます",
  rice = ":rice:",
  riceBall = ":rice_ball:",
  nenecchi = "@ねねっち",
  akagi = "@赤木",
}

const triggerSlackWebHook = (param: ISlackOutgoingWebhookParams) => {

  if (
    param.text.startsWith(TriggerWord.aobaPr1) ||
    param.text.startsWith(TriggerWord.aobaPr2) ||
    param.text.startsWith(TriggerWord.aobaPrRemind1) ||
    param.text.startsWith(TriggerWord.aobaPrRemind2)
  ) {
    execGithubPr(param);
    return;
  }

  if (
    param.text.startsWith(TriggerWord.aoba1) ||
    param.text.startsWith(TriggerWord.aoba2)
  ) {
    execZatsudan(aobaBot, param.trigger_word, param);
    return;
  }

  if (param.text.startsWith(TriggerWord.akagi)) {
    execZatsudanAkagi(param);
    return;
  }

  if (param.text.startsWith(TriggerWord.nenecchi)) {
    execZatsudanNenecchi(param);
    return;
  }

  if (param.text.startsWith(TriggerWord.mo)) {
    execMo(aobaBot, param);
    return;
  }

  if (
    param.text.startsWith(TriggerWord.otsukare1) ||
    param.text.startsWith(TriggerWord.otsukare2) ||
    param.text.startsWith(TriggerWord.otsukare3)
  ) {
    execOtsukare(param);
    return;
  }

  if (
    param.text.startsWith(TriggerWord.rice) ||
    param.text.startsWith(TriggerWord.riceBall)
  ) {
    const ignore = randomPickup([true, true, false], 1)[0];
    if (ignore) { return; }
    execLunch(param);
    return;
  }

  const message = `未実装のトリガーワードを受け取ったぞい [${param.trigger_word}]`;
  postToSlackAsBot(
    workspaces.DEBUG,
    aobaBot.username,
    aobaBot.icon_url,
    process.env.SLACK_DEBUG_CHANNEL || "",
    message,
  );
};
