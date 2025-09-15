import api from "./axios";

export async function getAllProducts() {
   const response = await api.get("/api/products/all-products");
console.log(response.data); // should be { message: [...] }
return response.data.message;

}
