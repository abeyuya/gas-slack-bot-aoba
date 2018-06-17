
import { postAsAoba } from "../lib/slack";
import { zatsudanAoba } from "../lib/zatsudan";

declare var global: any;

global.doPost = (e) => {
  postAsAoba("@abeyuya", e);

  if (isAobaZatsudan(e)) {
    zatsudanAoba(e);
  }
};

const isAobaZatsudan = (e): boolean => {
  if (e.parameter.text.match(/aoba/) == null && e.parameter.text.match(/U3S3FR23F/) == null) {
    return false;
  }
  return true;
};

// global.zatsudanTest = () => {
//   const e = {
//     parameter: {
//       text: "@aoba こんにちは",
//       user_name: "abeyuya",
//       channel_id: "@abeyuya",
//     },
//   };
//   global.doPost(e);
// };
