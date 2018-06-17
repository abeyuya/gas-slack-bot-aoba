
import { getDialogueMessage } from "./docomo_zatsudan";
import { postAsAoba } from "./slack";

export const zatsudanAoba = (e) => {

  const message = e.parameter.text.replace("@aoba", "").trim();
  const userName = e.parameter.user_name;
  const channelId = e.parameter.channel_id;
  const responseMessage = getDialogueMessage(userName, message);

  postAsAoba(channelId, responseMessage);
};
