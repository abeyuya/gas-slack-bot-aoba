declare var global: any;

import { isBusinessDay } from "../lib/util";
import { setTrigger, deleteTrigger } from "../lib/client/trigger";
import { execJihoLunch, execJihoEvery } from "../lib/function/jiho";

enum functionNames {
  execJihoLunch = "exec_jiho_lunch",
  execJihoOyatsu = "exec_jiho_oyatsu",
  execJihoEvery = "exec_jiho_every",
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
  // if (isBusinessDay() === false) { return; }
  // execJihoOyatsu();
};

global.set_jiho_every = () => {
  if (isBusinessDay() === false) { return; }
  const hour = new Date().getHours();
  if ([9, 12, 13, 14, 15].includes(hour)) {
    setTrigger(hour + 1, 50, functionNames.execJihoEvery);
  }
};

global.exec_jiho_every = () => {
  deleteTrigger(functionNames.execJihoEvery);
  if (isBusinessDay() === false) { return; }
  const hour = new Date().getHours();
  if ([10, 13, 14, 15, 16].includes(hour)) {
    execJihoEvery();
  }
};
