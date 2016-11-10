var TOTAL_MEMORY_CMD = "free -m | awk 'NR==2{print $2}'",
    USED_MEMORY_CMD = "free -m | awk 'NR==2{print $3}'",
    MEMORY_ICON = "\uf080",
    home = require("./homepath"),
    path = require("path"),
    cp = require("child_process"),
    exec = (cmd) => cp.execSync(cmd).toString().replace("\n", ""),
    totalMemory = () => exec(TOTAL_MEMORY_CMD),
    usedMemory = () => exec(USED_MEMORY_CMD);

module.exports = function(update) {
  var updateMemory = () => {
    update("memory", [
      MEMORY_ICON,
      [
        totalMemory(),
        "/",
        usedMemory()
      ].join("")
    ].join(" "));
    setTimeout(updateMemory, 12000);
  };
  updateMemory();
};
