
// import { postAsAoba } from "../lib/slack";
import { zatsudanAoba } from "../lib/zatsudan";

declare var global: any;

export interface IWebhookEvent {
  parameter: any;
  contextPath: string;
  contentLength: number;
  queryString: string;
}

global.doPost = (e: IWebhookEvent) => {
  Logger.log(e);

  if (isAobaZatsudan(e)) {
    zatsudanAoba(e);
  }
};

const isAobaZatsudan = (e: IWebhookEvent): boolean => {
  if (e.parameter.text.match(/aoba/) == null && e.parameter.text.match(/U3S3FR23F/) == null) {
    return false;
  }
  return true;
};
