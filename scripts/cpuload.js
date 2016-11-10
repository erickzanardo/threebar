var CPU_PERCENTAGE_CMD = "mpstat | awk 'NR==4{print $12}'",
    CPU_ICON = "\uf0e4",
    cp = require("child_process"),
    exec = (cmd) => cp.execSync(cmd).toString().replace("\n", ""),
    cpuIdle = () => exec(CPU_PERCENTAGE_CMD),
    cpuLoad = (100 - parseFloat(cpuIdle().replace(",", "."))).toFixed(2);

module.exports = function(update) {
  var updateCPU = () => {
    update("cpuload", [
      CPU_ICON,
      cpuLoad + "%"
    ].join(" "));
    setTimeout(updateCPU, 1000);
  };

  updateCPU();
};
