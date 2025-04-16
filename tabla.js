document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("data-form");
  const tableBody = document.querySelector("#data-table tbody");
  const searchInput = document.getElementById("search");

  if (!form || !tableBody || !searchInput) return;

  let data = [];
  let sortColumn = null;
  let sortAsc = true;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = {
      name: form.elements.name.value.trim(),
      age: parseInt(form.elements.age.value),
      city: form.elements.city.value.trim(),
      email: form.elements.email.value.trim(),
    };

    if (form.dataset.editIndex !== undefined) {
      data[form.dataset.editIndex] = newItem;
      delete form.dataset.editIndex;
    } else {
      data.push(newItem);
    }
    form.reset();
    renderTable();
  });

  function renderTable() {
    const filter = searchInput.value.toLowerCase();
    let filteredData = data.filter(item =>
      Object.values(item).some(val => val.toString().toLowerCase().includes(filter))
    );

    if (sortColumn) {
      filteredData.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortAsc ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortAsc ? 1 : -1;
        return 0;
      });
    }

    tableBody.innerHTML = "";
    filteredData.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.city}</td>
        <td>${item.email}</td>
        <td>
          <button data-index="${index}" class="edit">Szerkesztés</button>
          <button data-index="${index}" class="delete">Törlés</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
      const index = e.target.dataset.index;
      const item = data[index];
      form.elements.name.value = item.name;
      form.elements.age.value = item.age;
      form.elements.city.value = item.city;
      form.elements.email.value = item.email;
      form.dataset.editIndex = index;
    } else if (e.target.classList.contains("delete")) {
      const index = e.target.dataset.index;
      if (confirm("Biztosan törlöd ezt a sort?")) {
        data.splice(index, 1);
        renderTable();
      }
    }
  });

  searchInput.addEventListener("input", renderTable);

  document.querySelectorAll("th[data-col]").forEach(th => {
    th.addEventListener("click", () => {
      const col = th.dataset.col;
      if (sortColumn === col) {
        sortAsc = !sortAsc;
      } else {
        sortColumn = col;
        sortAsc = true;
      }
      renderTable();
    });
  });
});
