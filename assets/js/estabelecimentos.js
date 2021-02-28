$(document).ready(function () {
  getList();
  mascaras();
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
              <a href="#" onclick="changeCard('list', 'cadastro', 'establishment', ${id})" class="btn btn-light btn-sm"><span class="material-icons" aria-hidden="true">mode_edit</span></a>
              <a href="#" onclick="deleteEstablishment(${id})" class="btn btn-light btn-sm"><span class="material-icons" aria-hidden="true">delete</span></a>
            </td>
          </tr>`
        );
      }
    },
  });
}

function getListOptions() {
  var options = $("#inputCategoria .option");
  options.remove();

  $.ajax({
    url: "http://localhost:3000/category/list",
    type: "GET",
    async: true,
    success: function (categoryList) {
      console.log(categoryList);

      var selector = $("#inputCategoria");
      var dataLength = categoryList.length;
      for (var i = 0; i < dataLength; i++) {
        var id = categoryList[i].id_categoria;
        var name = categoryList[i].categoria;

        selector.append(
          `<option value="${id}" class="option">${name}</option>`
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

function save(input) {
  var id = $(`#${input}`).val();

  if (id == "") {
    createEstablishment();
  } else {
    updateEstablishment(id);
  }
}

function mascaras() {
  $(".cnpj").mask("00.000.000/0000-00");
  $(".telefone").mask("(00)0 0000-0000");
  $(".agencia").mask("000-0");
  $(".conta").mask("00.000-0");
  $(".data").mask("00/00/0000");
  $(".estado").mask("AA");
}

function validateEmail(email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
}

function createEstablishment() {
  var razao_social = $("#inputRazao").val();
  var nome_fantasia = $("#inputFantasia").val();
  var cnpj = $("#inputCNPJ").val();
  var email = $("#inputEmail").val();
  var telefone = $("#inputTelefone").val();
  var endereco = $("#inputEndereco").val();
  var cidade = $("#inputCidade").val();
  var estado = $("#inputEstado").val();
  var agencia = $("#inputAgencia").val();
  var conta = $("#inputConta").val();
  var data_cadastro = $("#inputCadastro").val();
  var categoria = $("#inputCategoria").val();
  var status = true;

  if (razao_social == "" || cnpj == "" || categoria == "") {
    return;
  }

  var body = {
    razao_social: razao_social,
    nome_fantasia: nome_fantasia,
    cnpj: cnpj,
    email: email,
    telefone: telefone,
    endereco: endereco,
    cidade: cidade,
    estado: estado,
    agencia: agencia,
    conta: conta,
    data_cadastro: data_cadastro,
    categoria: categoria,
    status: status,
  };

  console.log(body);

  $.ajax({
    url: "http://localhost:3000/establishment",
    type: "POST",
    data: body,
    async: true,
    success: function (category) {
      console.log(category);
      changeCard("cadastro", "list", "establishment");
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function loadData(id) {
  if (id != null) {
    $.ajax({
      url: `http://localhost:3000/establishment/${id}`,
      type: "GET",
      async: true,
      success: function (establishment) {
        console.log(establishment);
        $("#id_estabelecimentos").val(id);
        $("#inputRazao").val(establishment.razao_social);
        $("#inputFantasia").val(establishment.nome_fantasia);
        $("#inputCNPJ").val(establishment.cnpj);
        $("#inputEmail").val(establishment.email);
        $("#inputTelefone").val(establishment.telefone);
        $("#inputEndereco").val(establishment.endereco);
        $("#inputCidade").val(establishment.cidade);
        $("#inputEstado").val(establishment.estado);
        $("#inputAgencia").val(establishment.agencia);
        $("#inputConta").val(establishment.conta);
        $("#inputCadastro").val(establishment.data_cadastro);
        $("#inputCategoria").val(establishment.categoria);
        $("#status").val(establishment.status);
      },
      error: function (error) {
        console.log(error);
        changeCard("cadastro", "list", "establishment");
      },
    });
  }
}

function updateEstablishment(id) {
  var razao_social = $("#inputRazao").val();
  var nome_fantasia = $("#inputFantasia").val();
  var cnpj = $("#inputCNPJ").val();
  var email = $("#inputEmail").val();
  var telefone = $("#inputTelefone").val();
  var endereco = $("#inputEndereco").val();
  var cidade = $("#inputCidade").val();
  var estado = $("#inputEstado").val();
  var agencia = $("#inputAgencia").val();
  var conta = $("#inputConta").val();
  var data_cadastro = $("#inputCadastro").val();
  var categoria = $("#inputCategoria").val();
  var status = $("#status").val();

  if (razao_social == "" || cnpj == "" || categoria == "") {
    return;
  }

  var body = {
    razao_social: razao_social,
    nome_fantasia: nome_fantasia,
    cnpj: cnpj,
    email: email,
    telefone: telefone,
    endereco: endereco,
    cidade: cidade,
    estado: estado,
    agencia: agencia,
    conta: conta,
    data_cadastro: data_cadastro,
    categoria: categoria,
    status: status,
  };

  console.log(body);

  $.ajax({
    url: `http://localhost:3000/establishment/${id}`,
    type: "PATCH",
    data: body,
    async: true,
    success: function (establishment) {
      console.log(establishment);
      changeCard("cadastro", "list", "establishment");
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function deleteEstablishment(id) {
  $.ajax({
    url: `http://localhost:3000/establishment/${id}`,
    type: "DELETE",
    async: true,
    success: function (establishment) {
      console.log(establishment);
      changeCard("cadastro", "list", "establishment");
    },
  });
}
