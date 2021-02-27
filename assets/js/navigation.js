$(document).ready(function () {
  $("#cadastro").hide();
});

function changeCard(fromId, toId, module, id = null) {
  if (toId.includes("list")) {
    getList();
  }
  if (toId.includes("cadastro") && module == "establishment") {
    getListOptions();
  }

  $(`#${fromId}`).hide();
  $(`#${toId}`).show();

  if (module == "category") {
    $("#inputNome").val("");
    loadData(id);
  }

  if (module == "establishment") {
    $("input").val("");
    loadData(id);
  }
}
