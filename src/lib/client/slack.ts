
import { timeToSlackFormat } from "../util";

interface IPostPayload {
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

interface IPostParams {
  method: "post";
  payload: IPostPayload;
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
  myUserId: string;
}

interface IWorkspaces {
  A: IWorkspace;
  B: IWorkspace;
  C: IWorkspace;
  DEBUG: IWorkspace;
}

export const workspaces: IWorkspaces = {
  A: {
    webhookToken: "sHpmrA0xB8itZLB8vE87TEJP",
    accessToken: process.env.SLACK_TOKEN || "",
    myUserId: process.env.SLACK_MY_USER_ID || "",
  },
  B: {
    accessToken: process.env.SLACK_B_TOKEN || "",
    myUserId: process.env.SLACK_B_MY_USER_ID || "",
  },
  C: {
    accessToken: process.env.SLACK_C_TOKEN || "",
    myUserId: process.env.SLACK_C_MY_USER_ID || "",
  },
  DEBUG: {
    webhookToken: "paTht3I16gGkNvLgFkUSGAu6",
    accessToken: process.env.SLACK_DEBUG_TOKEN || "",
    myUserId: process.env.SLACK_DEBUG_USER_ID || "",
  },
};

const chatPostUrl = "https://slack.com/api/chat.postMessage";
const getGroupsUrl = "https://slack.com/api/groups.list";
const markAsReadUrl = "https://slack.com/api/groups.mark";

export const postToSlackAsBot = (
  workspace: IWorkspace,
  botUsername: string,
  botIconUrl: string,
  channel: string,
  text: string,
  attachments?: IAttachment[],
) => {

  const payload: IPostPayload = {
    token: workspace.accessToken,
    channel,
    text,
    parse: "full",
    username: botUsername,
    icon_url: botIconUrl,
    attachments: JSON.stringify(attachments),
  };

  const params: IPostParams = { method: "post", payload };
  const res = UrlFetchApp.fetch(chatPostUrl, params as any);
  return res;
};

interface IGetGroupsPayload {
  token: string;
  cursor?: string;
  exclude_archived: true;
  exclude_members: false;
}

interface IGroup {
  id: string;
  name: string;
  is_channel: boolean;
  is_archived: boolean;
  members: string[];
}

interface IChannelsResponse {
  ok: boolean;
  groups: IGroup[];
}

export const getGroups = (workspace: IWorkspace) => {
  const payload: IGetGroupsPayload = {
    token: workspace.accessToken,
    exclude_archived: true,
    exclude_members: false,
  };

  const params = { method: "get", payload };
  const res = UrlFetchApp.fetch(getGroupsUrl, params as any);
  const json: IChannelsResponse = JSON.parse(res.getContentText());
  return json.groups.filter((g) => g.members.includes(workspace.myUserId));
};

interface IMarkAsReadPayload {
  token: string;
  channel: string;
  ts: string;
}

export const markAsRead = (workspace: IWorkspace, channel: string, date: Date): boolean => {
  const payload: IMarkAsReadPayload = {
    token: workspace.accessToken,
    channel,
    ts: timeToSlackFormat(date),
  };

  const params = { method: "post", payload };
  const res = UrlFetchApp.fetch(markAsReadUrl, params as any);
  const json: { ok: boolean; } = JSON.parse(res.getContentText());
  return json.ok;
};
