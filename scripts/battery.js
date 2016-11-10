var CHARGER_CMD = "acpi -V | grep \"Adapter 0:\" | cut -c 12-";
var PERCENTAGE_CMD = "acpi -V | grep -m 1 \"Battery 0:\" | sed -r \"s/.*, ([0-9]?[0-9][0-9])%.*/\\1/\"";

var CHARGING_ICON = "\uf1e6";

var cp = require("child_process");

var exec = (cmd) => cp.execSync(cmd).toString().replace("\n", "");

var isCharging = () => exec(CHARGER_CMD) == "on-line";
var percentage = () => exec(PERCENTAGE_CMD);

var batteryIcon = (percentage) => {
  switch (true) {
    case (percentage < 20):
      return "\uf244";
    case (percentage > 19 && percentage < 40):
      return "\uf243";
    case (percentage > 39 && percentage < 60):
      return "\uf242";
    case (percentage > 59 && percentage < 80):
      return "\uf241";
    case (percentage > 79):
      return "\uf240";
  }
};

module.exports = (update) => {
  var updateBattery = () => {
    update("battery", [
      isCharging() ? CHARGING_ICON : batteryIcon(percentage()),
      percentage() + "%"
    ].join(" "));
    setTimeout(updateBattery, 120000);
  };

  updateBattery();
};
