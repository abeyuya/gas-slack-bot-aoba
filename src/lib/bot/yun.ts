
import { IBot } from "./base";

// tslint:disable
const iconList = [
  "https://images-na.ssl-images-amazon.com/images/I/51uxvb-KnSL.jpg",
];
// tslint:enable

const todayIcon = (): string => {
  const day = new Date().getDate();
  const index = day % iconList.length;
  return iconList[index];
};

export const yunBot: IBot = {
  username: "ゆん",
  icon_url: todayIcon(),
};
