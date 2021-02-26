$(document).ready(function () {
  getList();
});

function getList() {
  var tr = $(".table tbody tr");
  tr.remove();

  $.ajax({
    url: "http://localhost:3000/establishment/list",
    type: "GET",
    async: true,
    success: function (establishmentList) {
      console.log(establishmentList);

      var table = $(".table tbody");
      var dataLength = establishmentList.length;
      for (var i = 0; i < dataLength; i++) {
        var id = establishmentList[i].id_estabelecimento;
        var name = establishmentList[i].nome_fantasia;
        var icon = establishmentList[i].categoria.url_icon;
        var nameCategory = establishmentList[i].categoria.categoria;
        var status = establishmentList[i].status;

        table.append(
          `<tr>
            <td scope="row">${id}</td>
            <td>${name}</td>
            <td>
              <p class="d-flex align-items-center">
                <span class="badge badge-secondary material-icons mr-2">
                  ${icon}
                </span>
                ${nameCategory}
              </p>
            </td>
            <td>
              ${isActive(status)}
            </td>
            <td>
              <a href="#" onclick="changeCard('list', 'cadastro', 'category', ${id})" class="btn btn-light btn-sm"><span class="material-icons" aria-hidden="true">mode_edit</span></a>
              <a href="#" onclick="deleteCategory(${id})" class="btn btn-light btn-sm"><span class="material-icons" aria-hidden="true">delete</span></a>
            </td>
          </tr>`
        );
      }
    },
  });
}

function isActive(status) {
  if (!status) {
    return `<div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-light">
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  autocomplete="off"
                  checked
                />
                Ativo
              </label>
              <label class="btn btn-light active">
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  autocomplete="off"
                />
                Inativo
              </label>
            </div>`;
  }

  return `<div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-light active">
              <input
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                checked
              />
              Ativo
            </label>
            <label class="btn btn-light">
              <input
                type="radio"
                name="options"
                id="option2"
                autocomplete="off"
              />
              Inativo
            </label>
          </div>`;
}
