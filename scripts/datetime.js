module.exports = function(update) {
  var updateTime = () => {
    function leadingZero(number) {
      return ["0", number].join("").slice(-2);
    }

    var d = new Date(),
        hours = leadingZero(d.getHours()),
        minutes = leadingZero(d.getMinutes()),
        day = leadingZero(d.getDate()),
        month = leadingZero(d.getMonth() +1),
        year = d.getFullYear();

    update("datetime", [
        "\uf06c",
        [
          day,
          month,
          year
        ].join("/"),
        [hours, ":", minutes].join(""),
    ].join(" "));
    setTimeout(updateTime, 30000);
  }
  updateTime();
};
