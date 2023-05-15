//? MachineUpTableSelectors
const upTable = document.getElementById("machineUpTable");

//? Machine Selectors
const editMachine = document.querySelector(".editMachine");
const delMachine = document.querySelector(".delMachine");

const machineTable = document.querySelector(".machine-table-body");
const machineModalDropdown = document.querySelector(".machineModalDropdown");
const addMachineModalBtn = document.querySelector(".addMachineModalBtn");
const machineModalNameInput = document.getElementById("machineModalName");
const machineModalDescInput = document.getElementById("MachineModalDesc");
const machineModalCloseBtn = document.getElementById("MachineModalCloseBtn");

//? Product Selectors
const addProduct = document.querySelector(".addProduct");
const editProduct = document.querySelector(".editProduct");
const delProduct = document.querySelector(".delProduct");

//? Quantitiy Selectors
const changeQuantity = document.querySelector(".changeQuantity");

//? AxiosUrl
const machineUrl = "https://645e8a578d081002930218bc.mockapi.io/api/machines";
const productUrl = "https://645e8a578d081002930218bc.mockapi.io/api/products";

//? upperGroup
const machineUpGroup = {
  1: "Landing",
  2: "Marine",
  3: "Aircraft",
  4: "newone",
};
const productUpGroup = { 1: "Seat", 2: "Tire" };

const getDataMachine = async () => {
  const { data } = await axios(machineUrl);
  machineTable.innerHTML = ``;
  data.map((item) => {
    const { group_id, machine_name, machine_desc, id } = item;
    machineTable.innerHTML += `<tr>
    <td>${machine_name}</td>
    <td>${machine_desc}</td>
    <td>${machineUpGroup[group_id]}</td>
    <td>
      <button type="button" class="btn btn-secondary editMachine">
        Edit
      </button>
      <button type="button" class="btn btn-danger delMachine">
        Delete
      </button>
    </td>
  </tr>`;
  });

  console.log(data);
};
getDataMachine();

machineModalDropdown.innerHTML = `<option disabled selected>Machine Group Name</option>`;
for (const [key, value] of Object.entries(machineUpGroup)) {
  machineModalDropdown.innerHTML += `<option value="${value}">${value}</option>`;
  upTable.innerHTML += `<tr>
  <td>${value}</td>
</tr>`;
}

addMachineModalBtn.addEventListener("click", () => {
  for (const [key, value] of Object.keys(machineUpGroup)) {
    if (machineUpGroup[key] == machineModalDropdown.value) {
      group_id = key;
    }
  }
  const newMachine = {
    group_id,
    machine_name: machineModalNameInput.value,
    machine_desc: machineModalDescInput.value,
  };

  if (machineModalNameInput.value == "") {
    alert("Machine name is required");
  } else if (machineModalDescInput.value == "") {
    alert("Machine description is required");
  } else {
    postNewMachine(newMachine);
    machineModalNameInput.value = "";
    machineModalDescInput.value = "";
    machineModalDropdown.value = "Machine Group Name";
  }

  console.log(machineModalNameInput.value);
  console.log(newMachine);
});

const postNewMachine = async (newMachine) => {
  try {
    await axios.post(machineUrl, newMachine);
  } catch (error) {
    console.log(error);
  }
  machineModalCloseBtn.click();
  getDataMachine();
};

machineTable.addEventListener("click", (e) => {
  if (e.target.classList.contains("delMachine")) {
  }
});

// const deleteMachine = async () => {
//   try {
//     await axios.delete(`${machineUrl}/2`);
//     // await axios.delete(`${machineUrl}/${id}`);
//   } catch (error) {
//     console.log(error);
//   }

//   getDataMachine();
// };
