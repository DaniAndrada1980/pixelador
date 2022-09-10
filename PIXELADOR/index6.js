$(document).ready(function () {
  var safuiAlert = $("#safeui-alert");
  if (safuiAlert) {
    safuiAlert
      .first()
      .delay(1e4)
      .slideUp(1e3, function () {
        $(this).remove();
      });
  }
});
