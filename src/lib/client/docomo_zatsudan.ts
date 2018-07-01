
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

interface ICharacterDialogueRequest {
  language: "ja-JP";
  botId: "CharaConv";
  appId: string;
  voiceText: string;
  clientData: {
    option: {
      t: CharacterToneType,
    };
  };
  appRecvTime: string;
  appSendTime: string;
}

enum CharacterToneType {
  ehime1 = "ehime1",       // 愛媛県今治市弁
  ehime2 = "ehime2",       // 愛媛県四国中央市弁
  ehime3 = "ehime3",       // 愛媛県松山市弁
  kansai = "kansai",       // 関西弁
  hakata = "hakata",       // 博多弁
  fukushima = "fukushima", // 福島弁
  mie = "mie",             // 三重弁
  maiko = "maiko",         // 舞妓風
  ojo = "ojo",             // お嬢様風
  bushi = "bushi",         // 武士風
  gyaru = "gyaru",         // ギャル風
  burikko = "burikko",     // ぶりっ子風
  akachan = "akachan",     // 赤ちゃん風
}

const characterDialogueUrl =
  "https://api.apigw.smt.docomo.ne.jp/naturalCharaConv/v1/dialogue?APIKEY="
  + process.env.DOCOMO_APIKEY;

const dialogueUrl =
  "https://api.apigw.smt.docomo.ne.jp/naturalChatting/v1/dialogue?APIKEY="
  + process.env.DOCOMO_APIKEY;

const registUserUrl =
  "https://api.apigw.smt.docomo.ne.jp/naturalChatting/v1/registration?APIKEY="
  + process.env.DOCOMO_APIKEY;

const registUserForCharacterUrl =
  "https://api.apigw.smt.docomo.ne.jp/naturalCharaConv/v1/registration?APIKEY="
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

export const getCharacterDialogueMessage = (userId: string, message: string): string => {
  const appId = getUserAppIdForCharacter(userId);

  const requestOption: ICharacterDialogueRequest = {
    language: "ja-JP",
    botId: "CharaConv",
    appId,
    voiceText: message,
    clientData: {
      option: {
        t: CharacterToneType.burikko,
      },
    },
    appRecvTime: Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyyMMdd HH:mm:ss"),
    appSendTime: Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyyMMdd HH:mm:ss"),
  };

  const option = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(requestOption),
  };
  const res = UrlFetchApp.fetch(characterDialogueUrl, option as any);
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

const getUserAppIdForCharacter = (userId: string): string => {
  const props = PropertiesService.getScriptProperties();
  const key = `docomo-userAppIdForChara-${userId}`;
  const userAppId = props.getProperty(key);

  if (userAppId) { return userAppId; }

  const option = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      botId: "CharaConv",
      appKind: "slack-chara",
    }),
  };
  const res = UrlFetchApp.fetch(registUserForCharacterUrl, option as any);
  const json: { appId: string } = JSON.parse(res.getContentText());

  props.setProperty(key, json.appId);

  return json.appId;
};
