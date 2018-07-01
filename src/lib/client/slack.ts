
interface IPayload {
  token: string;
  channel: string;
  text: string;
  username: string;
  parse: string;
  icon_url: string;
  attachments?: string;
}

interface IAttachmentField {
  title?: string;
  value?: string;
  short?: boolean;
}

export interface IAttachment {
  color?: "#36a64f" | "danger";
  image_url?: string;
  fields?: IAttachmentField[];
  pretext: string;
}

interface IParams {
  method: "get" | "post";
  payload: IPayload;
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

export interface IWorkspace {
  webhookToken?: string;
  accessToken: string;
}

interface IWorkspaces {
  A: IWorkspace;
  B: IWorkspace;
  DEBUG: IWorkspace;
}

export const workspaces: IWorkspaces = {
  A: {
    webhookToken: "sHpmrA0xB8itZLB8vE87TEJP",
    accessToken: process.env.SLACK_TOKEN || "",
  },
  B: {
    accessToken: process.env.SLACK_B_TOKEN || "",
  },
  DEBUG: {
    webhookToken: "paTht3I16gGkNvLgFkUSGAu6",
    accessToken: process.env.SLACK_DEBUG_TOKEN || "",
  },
};

const slackPostUrl = "https://slack.com/api/chat.postMessage";

export const postToSlackAsBot = (
  workspace: IWorkspace,
  botUsername: string,
  botIconUrl: string,
  channel: string,
  text: string,
  attachments?: IAttachment[],
) => {

  const payload: IPayload = {
    token: workspace.accessToken,
    channel,
    text,
    parse: "full",
    username: botUsername,
    icon_url: botIconUrl,
    attachments: JSON.stringify(attachments),
  };

  const params: IParams = { method: "post", payload };
  const res = UrlFetchApp.fetch(slackPostUrl, params as any);
  return res;
};
