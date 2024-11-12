var employeeList = [];
var employeeId = 0;
function onFormSubmit(event) {
  event.preventDefault();
  var formData = {
    id: employeeId++,
    name: document.getElementById("employeeName").value,
    email: document.getElementById("employeeEmail").value,
    phone: document.getElementById("employeePhone").value,
  };
  if (!validateEmail(formData.email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!validatePhone(formData.phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }
  employeeList.push(formData);
  renderTable();
  resetForm();
}
function validateEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
function validatePhone(phone) {
  var phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
}
function renderTable() {
  var tableBody = document.querySelector("#employeeList tbody");
  tableBody.innerHTML = "";
  employeeList.forEach(function (employee) {
    var row = "<tr>\n              <td>"
      .concat(employee.id, "</td>\n              <td>")
      .concat(employee.name, "</td>\n              <td>")
      .concat(employee.email, "</td>\n              <td>")
      .concat(
        employee.phone,
        '</td>\n              <td>\n                  <button onclick="onEdit('
      )
      .concat(
        employee.id,
        ')">Edit</button>\n                  <button onclick="onDelete('
      )
      .concat(
        employee.id,
        ')">Delete</button>\n              </td>\n          </tr>'
      );
    tableBody.innerHTML += row;
  });
}
function resetForm() {
  document.getElementById("employeeName").value = "";
  document.getElementById("employeeEmail").value = "";
  document.getElementById("employeePhone").value = "";
}
function onEdit(id) {
  var employee = employeeList.find(function (emp) {
    return emp.id === id;
  });
  if (employee) {
    document.getElementById("employeeName").value = employee.name;
    document.getElementById("employeeEmail").value = employee.email;
    document.getElementById("employeePhone").value = employee.phone;
    onDelete(id);
  }
}
function onDelete(id) {
  employeeList = employeeList.filter(function (emp) {
    return emp.id !== id;
  });
  renderTable();
}
function toggleForm() {
  var form = document.getElementById("employeeDetailForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}
