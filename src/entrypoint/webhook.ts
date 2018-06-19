
import { triggerSlackWebHook } from "../lib/slack";

declare var global: any;

export interface IWebhookEvent {
  parameter: any;
  contextPath: string;
  contentLength: number;
  queryString: string;
}

global.doPost = (e: IWebhookEvent) => {
  Logger.log(e);

  if (isSlackOutgoingWebhook(e)) {
    triggerSlackWebHook(e.parameter);
  }
};

const isSlackOutgoingWebhook = (e: IWebhookEvent): boolean => {
  return e.parameter.token === "sHpmrA0xB8itZLB8vE87TEJP";
};
