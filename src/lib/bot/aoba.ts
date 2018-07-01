
import { IBot } from "./base";

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
