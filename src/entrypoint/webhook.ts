
import { aobaBot } from "../bot/aoba";
import { execMo } from "../function/exec_mo";
import { execOtsukare } from "../function/exec_otsukare";
import { execZatsudan } from "../function/exec_zatsudan";
import { ISlackOutgoingWebhookParams, postToSlackAsBot } from "../lib/slack";

declare var global: any;

interface IWebhookEvent {
  parameter: any;
  contextPath: string;
  contentLength: number;
  queryString: string;
}

global.doPost = (e: IWebhookEvent) => {
  Logger.log(e);

  if (isSlackOutgoingWebhook(e)) {
    triggerSlackWebHook(e.parameter);
    return;
  }
};

const isSlackOutgoingWebhook = (e: IWebhookEvent): boolean => {
  return e.parameter.token === "sHpmrA0xB8itZLB8vE87TEJP";
};

enum TriggerWord {
  aoba1 = "@aoba",
  aoba2 = "<@U3S3FR23F>",
  mo = ":mo:",
  otsukare1 = "お疲れ",
  otsukare2 = "おつかれ",
  otsukare3 = "落ちます",
}

const triggerSlackWebHook = (param: ISlackOutgoingWebhookParams) => {
  switch (param.trigger_word) {
    case TriggerWord.aoba1:
    case TriggerWord.aoba2: {
      execZatsudan(aobaBot, param);
      break;
    }

    case TriggerWord.mo: {
      execMo(aobaBot, param);
      break;
    }

    case TriggerWord.otsukare1:
    case TriggerWord.otsukare2:
    case TriggerWord.otsukare3: {
      execOtsukare(param);
      break;
    }

    default: {
      const message = `未実装のトリガーワードを受け取ったぞい [${param.trigger_word}]`;
      postToSlackAsBot(
        aobaBot.username,
        aobaBot.icon_url,
        process.env.SLACK_DEBUG_CHANNEL || "",
        message,
      );
    }
  }
};
