$(document).ready(function () {
  $("#cadastro").hide();
});

function changeCard(fromId, toId) {
  if (toId.includes("list")) {
    getList();
  }

  $(`#${fromId}`).hide();
  $(`#${toId}`).show();
}
