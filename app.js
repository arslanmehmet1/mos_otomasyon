//? MachineUpTableSelectors
const upTable = document.getElementById("machineUpTable");
const ProductUpTable = document.getElementById("ProductUpTable");

//? Machine Selectors
// const editMachine = document.querySelector(".editMachine");
// const delMachine = document.querySelector(".delMachine");

const machineTable = document.querySelector(".machine-table-body");
const machineModalDropdown = document.querySelector(".machineModalDropdown");
const machineEditModalDropdown = document.querySelector(
  ".machineEditModalDropdown"
);
const addMachineModalBtn = document.querySelector(".addMachineModalBtn");
const editMachineModalBtn = document.querySelector(".editMachineModalBtn");
const machineModalNameInput = document.getElementById("machineModalName");
const machineModalDescInput = document.getElementById("MachineModalDesc");
const MachineModalEditDesc = document.getElementById("MachineModalEditDesc");
const machineModalCloseBtn = document.getElementById("MachineModalCloseBtn");
const MachineEditModalCloseBtn = document.getElementById(
  "MachineEditModalCloseBtn"
);
const selectedMachineNameInput = document.getElementById("selectedMachineName");

//? Product Selectors
const productTable = document.querySelector(".productTable");
const productModalDropdown = document.querySelector(".productModalDropdown");
const productEditModalDropdown = document.querySelector(
  ".productEditModalDropdown"
);
const addProductModalBtn = document.querySelector(".addProductModalBtn");
const editProductModalBtn = document.querySelector(".editProductModalBtn");
const productModalNameInput = document.getElementById("productModalName");
const productModalDescInput = document.getElementById("ProductModalDesc");
const ProductModalEditDesc = document.getElementById("ProductModalEditDesc");
const productModalCloseBtn = document.getElementById("ProductModalCloseBtn");
const ProductEditModalCloseBtn = document.getElementById(
  "ProductEditModalCloseBtn"
);
const selectedProductNameInput = document.getElementById("selectedProductName");

//? Quantitiy Selectors

const quantityModalDropdownMachine = document.querySelector(
  ".quantityModalDropdownMachine"
);

const quantityModalDropdownProduct = document.querySelector(
  ".quantityModalDropdownProduct"
);

//? AxiosUrl
const machineUrl = "https://645e8a578d081002930218bc.mockapi.io/api/machines";
const productUrl = "https://645e8a578d081002930218bc.mockapi.io/api/products";
const quantityUrl = "https://6351821b3e9fa1244e60878b.mockapi.io/api/quantity";

//? upperGroup
const machineUpGroup = {
  1: "Landing",
  2: "Marine",
  3: "Aircraft",
};
const productUpGroup = { 1: "Seat", 2: "Tire", 3: "new" };

//! Machine Category Table Create and Modal dropdown menu create
machineModalDropdown.innerHTML = `<option disabled selected>Machine Category</option>`;
machineEditModalDropdown.innerHTML = `<option disabled selected>Machine Category</option>`;

for (const [key, value] of Object.entries(machineUpGroup)) {
  machineModalDropdown.innerHTML += `<option value="${value}">${value}</option>`;
  machineEditModalDropdown.innerHTML += `<option value="${value}">${value}</option>`;
  upTable.innerHTML += `<tr>
                            <td>${value}</td>
                        </tr>`;
}
//! Product Category Table Create and Modal dropdown menu create
productModalDropdown.innerHTML = `<option disabled selected>Product Category</option>`;
productEditModalDropdown.innerHTML = `<option disabled selected>Product Category</option>`;

for (const [key, value] of Object.entries(productUpGroup)) {
  productModalDropdown.innerHTML += `<option value="${value}">${value}</option>`;
  productEditModalDropdown.innerHTML += `<option value="${value}">${value}</option>`;
  ProductUpTable.innerHTML += `<tr>
                            <td>${value}</td>
                        </tr>`;
}

//! Quantity Modal dropdown menu create
quantityModalDropdownMachine.innerHTML = `<option disabled selected>Machine Name</option>`;
quantityModalDropdownProduct.innerHTML = `<option disabled selected>Product Name</option>`;

//! Global variable
let machineNames = [];
let productNames = [];

//!  MACHINE GET DATA FROM  MACHINE API AND CREATE MACHINE TABLE
const getDataMachine = async () => {
  const { data } = await axios(machineUrl);
  machineNames = [];
  machineTable.innerHTML = ``;
  data.map((item) => {
    const { group_id, machine_name, machine_desc, id } = item;
    machineNames.push(`${item.machine_name}`);
    machineTable.innerHTML += `<tr>
                <td>${machine_name}</td>
                <td>${machine_desc}</td>
                <td>${machineUpGroup[group_id]}</td>
                <td>
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                     data-bs-target="#editMachineModal"
                     onclick="editMachine(${id},${group_id},'${machine_name}','${machine_desc}')">
                     Edit </button>

                     <button type="button" class="btn btn-danger delMachine" onclick="deleteMachine(${id})">
                      Delete </button>
                </td>
              </tr>`;
  });
  quantityModalMachineDrop(machineNames); //quantity add modal machine name dropdown menu
  console.log(machineNames);
};
getDataMachine();

//! PRODUCT  GET DATA FROM PRODUCT API AND CREATE MACHINE TABLE
const getDataProduct = async () => {
  const { data } = await axios(productUrl);
  productNames = [];
  productTable.innerHTML = ``;
  data.map((item) => {
    const { group_id, product_name, product_desc, id } = item;
    productNames.push(`${item.product_name}`);
    productTable.innerHTML += `<tr>
                <td>${product_name}</td>
                <td>${product_desc}</td>
                <td>${productUpGroup[group_id]}</td>
                <td>
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                     data-bs-target="#editProductModal"
                     onclick="editProduct(${id},${group_id},'${product_name}','${product_desc}')">
                     Edit </button>

                     <button type="button" class="btn btn-danger delProduct" onclick="deleteProduct(${id})">
                      Delete </button>
                </td>
              </tr>`;
  });
  quantityModalProductDrop(productNames); //quantity add modal machine name dropdown menu
  console.log(data);
};
getDataProduct();

//! GET NEW MACHINE DATA FROM ADD MODAL AND CALL CREATE FUNCTION
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
    machineModalDropdown.value = "Machine Category";
  }

  console.log(newMachine);
});

//! GET NEW PRODUCT DATA FROM ADD MODAL AND CALL CREATE FUNCTION
addProductModalBtn.addEventListener("click", () => {
  for (const [key, value] of Object.keys(productUpGroup)) {
    if (productUpGroup[key] == productModalDropdown.value) {
      group_id = key;
    }
  }
  const newProduct = {
    group_id,
    product_name: productModalNameInput.value,
    product_desc: productModalDescInput.value,
  };

  if (productModalNameInput.value == "") {
    alert("Product name is required");
  } else if (productModalDescInput.value == "") {
    alert("Product description is required");
  } else {
    console.log(newProduct);
    postNewProduct(newProduct);
    productModalNameInput.value = "";
    productModalDescInput.value = "";
    productModalDropdown.value = "Product Category";
  }

  console.log(productModalNameInput.value);
});

//! MACHINE CREATE FUNCTION FROM API
const postNewMachine = async (newMachine) => {
  try {
    await axios.post(machineUrl, newMachine);
  } catch (error) {
    console.log(error);
  }
  machineModalCloseBtn.click();
  getDataMachine();
};

//! PRODUCT CREATE FUNCTION FROM API
const postNewProduct = async (newProduct) => {
  try {
    await axios.post(productUrl, newProduct);
  } catch (error) {
    console.log(error);
  }
  productModalCloseBtn.click();
  getDataProduct();
};

//! MACHINE DELETE FUNCTION FROM API
const deleteMachine = async (id) => {
  try {
    await axios.delete(`${machineUrl}/${id}`);
  } catch (error) {
    console.log(error);
  }

  getDataMachine();
};

//! PRODUCT DELETE FUNCTION FROM API
const deleteProduct = async (id) => {
  try {
    await axios.delete(`${productUrl}/${id}`);
  } catch (error) {
    console.log(error);
  }

  getDataProduct();
};

//! Machine Get data for edit
let selectedMachineId;
const editMachine = (id, group_id, machine_name, machine_desc) => {
  selectedMachineId = id;
  selectedMachineNameInput.value = machine_name;
  machineEditModalDropdown.value = machineUpGroup[group_id];
  MachineModalEditDesc.value = machine_desc;
};

//! Product Get data for edit
let selectedProductId;
const editProduct = (id, group_id, product_name, product_desc) => {
  selectedProductId = id;
  selectedProductNameInput.value = product_name;
  productEditModalDropdown.value = productUpGroup[group_id];
  ProductModalEditDesc.value = product_desc;
};

//! Machine edit buton event
editMachineModalBtn.addEventListener("click", () => {
  for (const [key, value] of Object.keys(machineUpGroup)) {
    if (machineUpGroup[key] == machineEditModalDropdown.value) {
      group_id = key;
    }
  }
  const edittedMachine = {
    group_id,
    machine_name: selectedMachineNameInput.value,
    machine_desc: MachineModalEditDesc.value,
  };
  console.log(edittedMachine);
  putSelectedMachine(edittedMachine, selectedMachineId);
});

//! Product edit buton event
editProductModalBtn.addEventListener("click", () => {
  for (const [key, value] of Object.keys(productUpGroup)) {
    if (productUpGroup[key] == productEditModalDropdown.value) {
      group_id = key;
    }
  }
  const edittedProduct = {
    group_id,
    product_name: selectedProductNameInput.value,
    product_desc: ProductModalEditDesc.value,
  };
  console.log(edittedProduct);
  putSelectedProduct(edittedProduct, selectedProductId);
});

//! MACHINE PUT FUNCTION FROM API
const putSelectedMachine = async (edittedMachine, selectedMachineId) => {
  try {
    await axios.put(`${machineUrl}/${selectedMachineId}`, edittedMachine);
  } catch (error) {
    console.log(error);
  }
  MachineEditModalCloseBtn.click();
  getDataMachine();
};

//! PRODUCT PUT FUNCTION FROM API
const putSelectedProduct = async (edittedProduct, selectedProductId) => {
  try {
    await axios.put(`${productUrl}/${selectedProductId}`, edittedProduct);
  } catch (error) {
    console.log(error);
  }
  ProductEditModalCloseBtn.click();
  getDataProduct();
};

//! Quantity Add Modal Product name dropdown
const quantityModalProductDrop = (productNames) => {
  quantityModalDropdownProduct.innerHTML = `<option disabled selected>Product Name</option>`;
  for (let i of productNames) {
    quantityModalDropdownProduct.innerHTML += `<option value="${i}">${i}</option>`;
  }
};
//! Quantity Add Modal Machine name dropdown
const quantityModalMachineDrop = (machineNames) => {
  quantityModalDropdownMachine.innerHTML = `<option disabled selected>Machine Name</option>`;
  for (let i of machineNames) {
    quantityModalDropdownMachine.innerHTML += `<option value="${i}">${i}</option>`;
  }
};
