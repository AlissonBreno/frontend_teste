$(document).ready(function () {
  $("#cadastro").hide();
});

function changeCard(fromId, toId, module, id = null) {
  if (toId.includes("list")) {
    getList();
  }

  $(`#${fromId}`).hide();
  $(`#${toId}`).show();

  if (module == "category") {
    $("#inputNome").val("");
    loadData(id);
  }
}
