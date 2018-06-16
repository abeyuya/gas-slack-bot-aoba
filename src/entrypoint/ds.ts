declare var global: any;

import { postAsAoba } from "../lib/slack";

global.handler = () => {
  postAsAoba("@abeyuya", "テストだぞい");
};
