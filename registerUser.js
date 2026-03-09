let attendants = [];

document.getElementById("attendantForm").addEventListener("submit", registerAttendant);

function registerAttendant(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let passkey = document.getElementById("passkey").value;
  let dob = document.getElementById("dob").value;
  let nin = document.getElementById("nin").value;
  let phone = document.getElementById("phone").value;
  let station = document.getElementById("station").value;
  let shift = document.getElementById("shift").value;
  let id = "PK" + Math.floor(Math.random() * 10000);

  let attendant = {
    id,
    name,
    passkey,
    dob,
    nin,
    phone,
    station,
    shift,
  };

  attendants.push(attendant);

  updateTable();

  document.getElementById("attendantForm").reset();
}

function updateTable() {
  let tableBody = document.querySelector("#attendantsTable tbody");

  tableBody.innerHTML = "";

  attendants.forEach(function (a) {
    let row = document.createElement("tr");

    row.innerHTML = `
<td>${a.id}</td>
<td>${a.name}</td>
<td>${a.nin}</td>
<td>${a.station}</td>
<td>${a.shift}</td>
`;

    tableBody.appendChild(row);
  });
}
