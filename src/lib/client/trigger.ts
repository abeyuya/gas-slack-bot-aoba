
export const setTrigger = (hour: number, minute: number, functionName: string) => {
  const triggerDay = new Date();
  triggerDay.setHours(hour);
  triggerDay.setMinutes(minute);

  ScriptApp.newTrigger(functionName)
    .timeBased()
    .at(triggerDay)
    .create();
};

export const deleteTrigger = (functionName: string) => {
  const triggers = ScriptApp.getProjectTriggers();

  triggers.forEach((trigger) => {
    if (functionName === trigger.getHandlerFunction()) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
};
