$(document).ready(function () {
  getList();
});

function getList() {
  $.ajax({
    url: "http://localhost:3000/establishment/list",
    type: "GET",
    async: true,
    success: function (establishmentList) {
      console.log(establishmentList);
    },
  });
}
