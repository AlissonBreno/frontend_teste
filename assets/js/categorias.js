$(document).ready(function () {
  getList();
});

function getList() {
  $.ajax({
    url: "http://localhost:3000/category/list",
    type: "GET",
    async: true,
    success: function (categoryList) {
      console.log(categoryList);
    },
  });
}
