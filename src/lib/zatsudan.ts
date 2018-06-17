
import { IWebhookEvent } from "../entrypoint/webhook";
import { getDialogueMessage } from "./docomo_zatsudan";
import { postAsAoba } from "./slack";

export const zatsudanAoba = (e: IWebhookEvent) => {

  const { text, user_name, channel_id } = e.parameter;
  const message = text.replace("@aoba", "").trim();
  const responseMessage = getDialogueMessage(user_name, message);

  postAsAoba(channel_id, responseMessage);
};
