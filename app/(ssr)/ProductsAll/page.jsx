import AllProductTableClient from "./AllProductTableClient";
import { productServerApi } from "@/api/server/productServerApi";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = 3;

  const response = await productServerApi.getAllPaginated({
    page,
    limit,
  });

  // console.log("response", response);

  return <AllProductTableClient productsData={response.data} />;
}
