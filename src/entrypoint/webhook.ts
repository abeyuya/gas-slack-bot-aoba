
import { triggerAobaBotFromSlack } from "../lib/aoba";

declare var global: any;

export interface IWebhookEvent {
  parameter: any;
  contextPath: string;
  contentLength: number;
  queryString: string;
}

export interface ISlackOutgoingWebhookParams {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  text: string;
  trigger_word: string;
}

global.doPost = (e: IWebhookEvent) => {
  Logger.log(e);

  if (isSlackOutgoingWebhook(e)) {
    triggerAobaBotFromSlack(e.parameter);
  }
};

const isSlackOutgoingWebhook = (e: IWebhookEvent): boolean => {
  return e.parameter.token === "sHpmrA0xB8itZLB8vE87TEJP";
};
