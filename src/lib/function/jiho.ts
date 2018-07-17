
import { yunBot } from "../bot/yun";
import {
  IAttachment,
  postToSlackAsBot,
  workspaces,
} from "../client/slack";
import { randomPickup } from "../util";

// tslint:disable
const lunchJihoList = [
  {
    bot: yunBot,
    message: "お昼ご飯にするでー！大広間に来れる人は一緒に食べよーなー！",
    imageUrl: "https://iwiz-chie.c.yimg.jp/im_siggiB3DJJYl54gwyzJL34AIyQ---x320-y320-exp5m-n1/d/iwiz-chie/que-10177779110",
  },
];
// tslint:enable

export const execJihoLunch = () => {
  const jiho = randomPickup(lunchJihoList, 1)[0];
  const attachments: IAttachment[] = [
    {
      pretext: jiho.message,
      image_url: jiho.imageUrl,
    },
  ];

  postToSlackAsBot(
    workspaces.A,
    jiho.bot.username,
    jiho.bot.icon_url,
    "#a-twitter",
    "",
    attachments,
  );
};

// tslint:disable
const oyatsuJihoList = [
  {
    bot: yunBot,
    message: "15:15までおやつタイムやでー！大広間に来れる人は一緒にお茶しようなー！",
    imageUrl: "http://hurimeri.com/wp-content/uploads/2016/09/newgemuyun.png",
  },
];
// tslint:enable

export const execJihoOyatsu = () => {
  const jiho = randomPickup(oyatsuJihoList, 1)[0];
  const attachments: IAttachment[] = [
    {
      pretext: jiho.message,
      image_url: jiho.imageUrl,
    },
  ];

  postToSlackAsBot(
    workspaces.A,
    jiho.bot.username,
    jiho.bot.icon_url,
    "#a-twitter",
    "",
    attachments,
  );
};

// tslint:disable
const everyJihoList = [
  {
    bot: yunBot,
    message: "10分間休憩タイムやでー！キリが良い人は大広間で一緒にちょっと休憩しようやー！",
    imageUrl: "http://hurimeri.com/wp-content/uploads/2016/09/newgemuyun.png",
  },
];
// tslint:enable

export const execJihoEvery = () => {
  const jiho = randomPickup(everyJihoList, 1)[0];
  const attachments: IAttachment[] = [
    {
      pretext: jiho.message,
      image_url: jiho.imageUrl,
    },
  ];

  postToSlackAsBot(
    workspaces.A,
    jiho.bot.username,
    jiho.bot.icon_url,
    "#a-twitter",
    "",
    attachments,
  );
};
