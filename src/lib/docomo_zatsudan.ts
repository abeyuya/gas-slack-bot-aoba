
enum ToneType {
  kansai = "20",
  baby = "30",
}

interface IDialogueOption {
  utt: string;
  t?: ToneType;
  context?: string;
}

const dialogueUrl = "https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=" + process.env.DOCOMO_APIKEY;

export const getDialogueMessage = (userId: string, message: string): string => {
  const dialogueOptions: IDialogueOption = {
    utt: message,
    t: ToneType.kansai,
  };

  const contextId = "context" + userId;
  const props = PropertiesService.getScriptProperties();
  const context = props.getProperty(contextId);
  if (context) {
    dialogueOptions.context = context;
  }

  const options = {
    method: "post",
    contentType: "text/json",
    payload: JSON.stringify(dialogueOptions),
  };
  const res = UrlFetchApp.fetch(dialogueUrl, options as any);
  const content = JSON.parse(res.getContentText());
  props.setProperty(contextId, content.context);
  return content.utt;
};
