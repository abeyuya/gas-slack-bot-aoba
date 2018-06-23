
import { IBot } from "./base";

// tslint:disable
const iconList = [
  "https://pbs.twimg.com/profile_images/922062061403758592/coBoBzxi_400x400.jpg",
  "https://scontent-lax3-1.cdninstagram.com/vp/72f835b44acc5da3522ebc1f76433aa1/5B88A8FE/t51.2885-15/e35/c118.0.303.303/31310804_582449425469359_3178261075892109312_n.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoRDun5s9tit1rwgsd0Kq3uEGoMZojf9UrWtBxz4oEvH3_J7uq_w",
];
// tslint:enable

const todayIcon = (): string => {
  const day = new Date().getDate();
  const index = day % iconList.length;
  return iconList[index];
};

export const nenecchiBot: IBot = {
  username: "ねねっち",
  icon_url: todayIcon(),
};
