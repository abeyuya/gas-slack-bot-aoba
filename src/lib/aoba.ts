
import { ISlackOutgoingWebhookParams } from "../entrypoint/webhook";
import { getDialogueMessage } from "./docomo_zatsudan";
import { IAttachment, IBot, postAsAoba } from "./slack";
import { randomPickup } from "./util";

// tslint:disable
const aobaIconList = [
  "https://rr.img.naver.jp/mig?src=http%3A%2F%2Fimgcc.naver.jp%2Fkaze%2Fmission%2FUSER%2F20170714%2F75%2F7436425%2F45%2F300x300x0f1e2dd9884c38900798c89b.jpg%2F300%2F600&twidth=300&theight=600&qlt=80&res_format=jpg&op=r",
  "https://pbs.twimg.com/media/B1xGvC8CUAASYZ2.jpg",
  "https://pbs.twimg.com/profile_images/899285300316262403/rz7fdwAa_400x400.jpg",
  "https://pbs.twimg.com/profile_images/909242571209064448/f8bLCkpi_400x400.jpg",
  "http://dic.nicovideo.jp/oekaki/753260.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzDQWTybFRQLQtIm1gMq0Uy8FPKqYAb5tq1jIPWDbvpp6V7TJQ",
];
// tslint:enable

const todayAobaIcon = (): string => {
  const day = new Date().getDate();
  const index = day % aobaIconList.length;
  return aobaIconList[index];
};

export const aobaBot: IBot = {
  username: "青葉",
  icon_url: todayAobaIcon(),
};

export const triggerAobaBotFromSlack = (param: ISlackOutgoingWebhookParams) => {

  switch (param.trigger_word) {
    case "@aoba":
    case "U3S3FR23F": {
      execZatsudan(param);
      break;
    }

    case ":mo:": {
      execMo(param);
      break;
    }

    case "お疲れ":
    case "落ちます":
    case "おつかれ": {
      execOtsukare(param);
      break;
    }
  }
};

const execZatsudan = (param: ISlackOutgoingWebhookParams) => {
  const { text, user_name, channel_id } = param;
  const receivedMessage = text.replace("@aoba", "").trim();
  const responseMessage = getDialogueMessage(user_name, receivedMessage);

  postAsAoba(channel_id, responseMessage);
};

const execMo = (param: ISlackOutgoingWebhookParams) => {
  const currentHour = new Date().getHours();
  if (currentHour < 18) { return; }
  const { channel_id } = param;
  const attachments: IAttachment[] = [
    {
      pretext: "",
      image_url: "http://livedoor.blogimg.jp/bmaysu/imgs/1/9/192424ff.png",
    },
  ];
  postAsAoba(channel_id, "", attachments);
};

const otsukareImageList = [
  "https://pbs.twimg.com/media/CCT9-y2UMAAtQMg.jpg",
  "http://blog.oukasoft.com/wp-content/uploads/90b5e937575ba81a447c63fdabd0fb87.jpg",
];

const execOtsukare = (param: ISlackOutgoingWebhookParams) => {
  const { channel_id, user_name, text } = param;
  if (user_name === "slackbot" ||
    text.indexOf("お疲れ様です") === 0 ||
    text.indexOf("おつかれさまです") === 0
  ) { return; }

  const imgUrl = randomPickup(otsukareImageList, 1)[0];
  const attachments: IAttachment[] = [
    {
      pretext: "",
      image_url: imgUrl,
    },
  ];
  postAsAoba(channel_id, "おつかれさまでしたー！", attachments);
};
