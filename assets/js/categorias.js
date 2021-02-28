$(document).ready(function () {
  getList();
});

function getList() {
  var tr = $(".table tbody tr");
  tr.remove();

  $.ajax({
    url: "http://localhost:3000/category/list",
    type: "GET",
    async: true,
    success: function (categoryList) {
      console.log(categoryList);

      var table = $(".table tbody");
      var dataLength = categoryList.length;
      for (var i = 0; i < dataLength; i++) {
        var id = categoryList[i].id_categoria;
        var name = categoryList[i].categoria;
        var icon = categoryList[i].url_icon;

        table.append(
          `<tr id="row_${id}">
              <td scope="row">${id}</td>
              <td>${name}</td>
              <td>
                <span class="badge badge-secondary material-icons mr-2">
                  ${icon}
                </span>
              </td>
              <td>
                <a href="#" onclick="changeCard('list', 'cadastro', 'category', ${id})" class="btn btn-light btn-sm"><span class="material-icons" aria-hidden="true">mode_edit</span></a>
                <a href="#" onclick="deleteCategory(${id})" class="btn btn-light btn-sm"><span class="material-icons" aria-hidden="true">delete</span></a>
              </td>
          </tr>`
        );
      }
    },
    error: function (error) {
      $(".message").html("falha ao carregar informações.");
      $(".message_card").show();
      changeCard("list", "list", "category");
    },
  });
}

function save(input) {
  var id = $(`#${input}`).val();

  if (id == "") {
    create();
  } else {
    update(id);
  }
}

function update(id) {
  var nome = $("#inputNome").val();
  var icone = $(".active input").val();

  if (nome == "") {
    return;
  }

  var body = {
    categoria: nome,
    url_icon: icone,
  };

  $.ajax({
    url: `http://localhost:3000/category/${id}`,
    type: "PATCH",
    data: body,
    async: true,
    success: function (category) {
      $(".message").html("item alterado com Sucesso!");
      $(".message_card").show();

      changeCard("cadastro", "list", "category");
    },
    error: function (error) {
      $(".message").html(error.responseJSON.message);
      $(".message_card").show();
    },
  });
}

function create() {
  var nome = $("#inputNome").val();
  var icone = $(".active input").val();

  if (nome == "") {
    return;
  }

  var body = {
    categoria: nome,
    url_icon: icone,
  };

  $.ajax({
    url: "http://localhost:3000/category",
    type: "POST",
    data: body,
    async: true,
    success: function (category) {
      console.log(category);
      $(".message").html("item cadastrado com Sucesso!");
      $(".message_card").show();
      changeCard("cadastro", "list", "category");
    },
    error: function (error) {
      $(".message").html(error.responseJSON.message);
      $(".message_card").show();
    },
  });
}

function loadData(id) {
  if (id != null) {
    var list = document.getElementById(`row_${id}`);
    var elementos = list.getElementsByTagName("td");

    $("#id_categoria").val(id);
    $("#inputNome").val(elementos[1].innerHTML);
  }
}

function deleteCategory(id) {
  $.ajax({
    url: `http://localhost:3000/category/${id}`,
    type: "DELETE",
    async: true,
    success: function (category) {
      console.log(category);
      $(".message").html("item excluído com Sucesso!");
      $(".message_card").show();
      changeCard("list", "list", "category");
    },
    error: function (error) {
      $(".message").html(error.responseJSON.message);
      $(".message_card").show();
    },
  });
}
