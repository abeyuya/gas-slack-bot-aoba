
enum ToneType {
  kansai = "kansai",
  akachan = "akachan",
}

enum Sex {
  male = "男",
  female = "女",
}

enum Mode {
  dialog = "dialog",
  srtr = "srtr",
}

// https://dev.smt.docomo.ne.jp/?p=docs.api.page&api_name=natural_dialogue&p_name=api_4#tag01
interface IDialogueOption {
  nickname: string;
  sex?: Sex;
  age?: string;
  place?: string;
  mode: Mode;
  t: ToneType;
}

interface IDialogueRequest {
  language: "ja-JP";
  botId: "Chatting";
  appId: string;
  voiceText: string;
  clientData: {
    option: IDialogueOption;
  };
  appRecvTime: string;
  appSendTime: string;
}

interface IDialogueResponse {
  systemText: {
    expression: string;
    utterance: string;
  };
}

const dialogueUrl =
  "https://api.apigw.smt.docomo.ne.jp/naturalChatting/v1/dialogue?APIKEY="
  + process.env.DOCOMO_APIKEY;

const registUserUrl =
  "https://api.apigw.smt.docomo.ne.jp/naturalChatting/v1/registration?APIKEY="
  + process.env.DOCOMO_APIKEY;

export const getDialogueMessage = (userId: string, message: string): string => {
  const dialogueOption: IDialogueOption = {
    nickname: userId,
    sex: Sex.female,
    age: "17",
    place: "東京",
    t: ToneType.kansai,
    mode: Mode.dialog,
  };

  const appId = getUserAppId(userId);

  const requestOption: IDialogueRequest = {
    language: "ja-JP",
    botId: "Chatting",
    appId,
    voiceText: message,
    clientData: {
      option: dialogueOption,
    },
    appRecvTime: Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyyMMdd HH:mm:ss"),
    appSendTime: Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyyMMdd HH:mm:ss"),
  };

  const option = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(requestOption),
  };
  const res = UrlFetchApp.fetch(dialogueUrl, option as any);
  const json: IDialogueResponse = JSON.parse(res.getContentText());
  return json.systemText.utterance;
};

const getUserAppId = (userId: string): string => {
  const props = PropertiesService.getScriptProperties();
  const key = `docomo-userAppId-${userId}`;
  const userAppId = props.getProperty(key);

  if (userAppId) { return userAppId; }

  const option = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      botId: "Chatting",
      appKind: "slack",
    }),
  };
  const res = UrlFetchApp.fetch(registUserUrl, option as any);
  const json: { appId: string } = JSON.parse(res.getContentText());

  props.setProperty(key, json.appId);

  return json.appId;
};
