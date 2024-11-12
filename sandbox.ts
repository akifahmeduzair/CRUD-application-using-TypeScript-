interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
}

let employeeList: Employee[] = [];
let employeeId = 0;

function onFormSubmit(event: Event): void {
  event.preventDefault();

  const formData: Employee = {
    id: employeeId++,
    name: (document.getElementById("employeeName") as HTMLInputElement).value,
    email: (document.getElementById("employeeEmail") as HTMLInputElement).value,
    phone: (document.getElementById("employeePhone") as HTMLInputElement).value,
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

function validateEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePhone(phone: string): boolean {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
}

function renderTable(): void {
  const tableBody = document.querySelector(
    "#employeeList tbody"
  ) as HTMLElement;
  tableBody.innerHTML = "";

  employeeList.forEach((employee) => {
    const row = `<tr>
              <td>${employee.id}</td>
              <td>${employee.name}</td>
              <td>${employee.email}</td>
              <td>${employee.phone}</td>
              <td>
                  <button onclick="onEdit(${employee.id})">Edit</button>
                  <button onclick="onDelete(${employee.id})">Delete</button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}

function resetForm(): void {
  (document.getElementById("employeeName") as HTMLInputElement).value = "";
  (document.getElementById("employeeEmail") as HTMLInputElement).value = "";
  (document.getElementById("employeePhone") as HTMLInputElement).value = "";
}

function onEdit(id: number): void {
  const employee = employeeList.find((emp) => emp.id === id);
  if (employee) {
    (document.getElementById("employeeName") as HTMLInputElement).value =
      employee.name;
    (document.getElementById("employeeEmail") as HTMLInputElement).value =
      employee.email;
    (document.getElementById("employeePhone") as HTMLInputElement).value =
      employee.phone;

    onDelete(id);
  }
}

function onDelete(id: number): void {
  employeeList = employeeList.filter((emp) => emp.id !== id);
  renderTable();
}

function toggleForm(): void {
  const form = document.getElementById("employeeDetailForm") as HTMLFormElement;
  form.style.display = form.style.display === "none" ? "block" : "none";
}
