var CPU_PERCENTAGE_CMD = "mpstat 5 1 | awk 'NR==5{print $12}'",
    CPU_ICON = "\uf0ca",
    cp = require("child_process")
    exec = (cmd) => cp.execSync(cmd).toString().replace("\n", ""),
    cpuIdle = () => exec(CPU_PERCENTAGE_CMD),
    cpuLoad = (100 - parseFloat(cpuIdle().replace(",", "."))).toFixed(2);

module.exports = function(update) {
  var updateCPU = () => {
    update("cpuload", [
      CPU_ICON,
      cpuLoad + "%",
    ].join(" "));
    setTimeout(updateCPU, 5000);
  };

  updateCPU();
};
