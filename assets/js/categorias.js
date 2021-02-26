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
          `<tr>
              <th scope="row">${id}</th>
              <td>${name}</td>
              <td>
                <span class="badge badge-secondary material-icons mr-2">
                  ${icon}
                </span>
              </td>
          </tr>`
        );
      }
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
    },
  });
}
