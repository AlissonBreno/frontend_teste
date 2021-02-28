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
        var name = establishmentList[i].razao_social;
        var icon = establishmentList[i].categoria.url_icon;
        var nameCategory = establishmentList[i].categoria.categoria;
        var status = establishmentList[i].status;

        table.append(
          `<tr id="row_${id}">
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
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-light ${isActive(
                  status
                )}" onclick="changeStatus(${id}, 'true')">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    autocomplete="off"
                  />
                  Ativo
                </label>
                <label class="btn btn-light ${isActive(
                  !status
                )}" onclick="changeStatus(${id}, 'false')">
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    autocomplete="off"
                  />
                  Inativo
                </label>
                
              </div>
            </td>
            <td>
              <a href="#" onclick="changeCard('list', 'cadastro', 'establishment', ${id})" class="btn btn-light btn-sm"><span class="material-icons" aria-hidden="true">mode_edit</span></a>
              <a href="#" onclick="deleteEstablishment(${id})" class="btn btn-light btn-sm"><span class="material-icons" aria-hidden="true">delete</span></a>
            </td>
          </tr>`
        );
      }
    },
    error: function (error) {
      $(".message").html("falha ao carregar informações.");
      $(".message_card").show();
      changeCard("list", "list", "establishment");
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
    error: function (error) {
      $(".message").html("falha ao carregar informações.");
      $(".message_card").show();
      changeCard("cadastro", "list", "establishment");
    },
  });
}

function isActive(status) {
  if (!status) {
    return "";
  }
  return "active";
}

function inputValidation() {
  var isValideCellphone = validateCellphone();
  var isValideEmail = validateEmail();
  var isValidAgencia = validateAgencia();
  var isValidConta = validateConta();
  var isValidDataCadastro = validateData();

  if (
    isValideCellphone &&
    isValideEmail &&
    isValidAgencia &&
    isValidConta &&
    isValidDataCadastro
  ) {
    return true;
  }

  return false;
}

function save(input) {
  var isInputValid = inputValidation();

  if (isInputValid) {
    var id = $(`#${input}`).val();
    if (id == "") {
      createEstablishment();
    } else {
      updateEstablishment(id);
    }
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

function validateEmail() {
  var email = $("#inputEmail").val();
  console.log(email);
  if (email.length >= 1) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email) || email == "") {
      $(".message").html("email must be valid.");
      $(".message_card").show();
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function validateCellphone() {
  var telefone = $("#inputTelefone").val();
  var category = $("#inputCategoria").val();

  if (category == 1) {
    if (telefone.length < 15) {
      $(".message").html("telefone must be valid.");
      $(".message_card").show();
      return false;
    }
  }
  return true;
}

function validateAgencia() {
  var agencia = $("#inputAgencia").val();

  if (agencia.length >= 1 && agencia.length < 5) {
    $(".message").html("agencia must be valid.");
    $(".message_card").show();
    return false;
  }

  return true;
}

function validateConta() {
  var conta = $("#inputConta").val();

  if (conta.length >= 1 && conta.length < 8) {
    $(".message").html("conta must be valid.");
    $(".message_card").show();
    return false;
  }

  return true;
}

function validateData() {
  var data = $("#inputCadastro").val();

  if (data.length >= 1 && data.length < 8) {
    $(".message").html("data cadastro must be valid.");
    $(".message_card").show();
    return false;
  }

  return true;
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
    success: function (establishment) {
      console.log(establishment);
      $(".message").html("item cadastrado com Sucesso!");
      $(".message_card").show();

      changeCard("cadastro", "list", "establishment");
    },
    error: function (error) {
      $(".message").html(error.responseJSON.message);
      $(".message_card").show();
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
        $(".message").html("falha ao carregar informações.");
        $(".message_card").show();
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
      $(".message").html("Item alterado com sucesso!");
      $(".message_card").show();
      changeCard("cadastro", "list", "establishment");
    },
    error: function (error) {
      $(".message").html(error.responseJSON.message);
      $(".message_card").show();
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
      $(".message").html("item excluído com Sucesso!");
      $(".message_card").show();
      changeCard("list", "list", "establishment");
    },
    error: function (error) {
      $(".message").html(error.responseJSON.message);
      $(".message_card").show();
    },
  });
}

function changeStatus(id, status) {
  var body = { status: status };

  $.ajax({
    url: `http://localhost:3000/establishment/status/${id}`,
    type: "PATCH",
    data: body,
    async: true,
    success: function (establishment) {
      $(".message").html("Status alterado com sucesso!");
      $(".message_card").show();
      changeCard("list", "list", "establishment");
    },
    error: function (error) {
      $(".message").html(error.responseJSON.message);
      $(".message_card").show();
    },
  });
}

function isSupermarket() {
  var category = $("#inputCategoria").val();
  if (category == 1) {
    $("#inputTelefone").attr("required", "required");
  } else {
    $("#inputTelefone").removeAttr("required", "required");
  }
}
