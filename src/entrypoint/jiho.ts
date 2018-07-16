declare var global: any;

import { isBusinessDay } from "../lib/util";
import { setTrigger, deleteTrigger } from "../lib/client/trigger";
import { execJihoLunch, execJihoOyatsu } from "../lib/function/jiho";

enum functionNames {
  execJihoLunch = "exec_jiho_lunch",
  execJihoOyatsu = "exec_jiho_oyatsu",
}

global.set_jiho_lunch = () => {
  if (isBusinessDay() === false) { return; }
  setTrigger(12, 0, functionNames.execJihoLunch);
};

global.exec_jiho_lunch = () => {
  deleteTrigger(functionNames.execJihoLunch);
  if (isBusinessDay() === false) { return; }
  execJihoLunch();
};

global.set_jiho_oyatsu = () => {
  if (isBusinessDay() === false) { return; }
  setTrigger(15, 0, functionNames.execJihoOyatsu);
};

global.exec_jiho_oyatsu = () => {
  deleteTrigger(functionNames.execJihoOyatsu);
  if (isBusinessDay() === false) { return; }
  execJihoOyatsu();
};
