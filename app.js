const url1 = "https://645e8a578d081002930218bc.mockapi.io/api/machines";
const url2 = "https://645e8a578d081002930218bc.mockapi.io/api/products";

const getData1 = async () => {
  const { data } = await axios(url1);

  console.log(data);
};
getData1();

const getData2 = async () => {
  const { data } = await axios(url2);
  console.log(data);
};
getData2();
