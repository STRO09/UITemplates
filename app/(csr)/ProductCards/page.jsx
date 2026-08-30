"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardImage,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/common/card";
import { Pagination } from "@/components/common/Pagination";
import { Search } from "@/components/common/search";
import { useDebouncer } from "@/hooks/use-debouncer";
import { productClientApi } from "@/api/client/productClientApi";

const limit = 3;

export default function ProductCards() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncer(search, 300);

  async function fetchProducts(page = 1) {
    const response = await productClientApi.getAllPaginated({
      page,
      limit,
      search: debouncedSearch,
    });
    setProducts(response?.data);
  }

  useEffect(() => {
    fetchProducts(1, limit);
  }, [debouncedSearch]);

  return (
    <div className="mt-5 p-5">
      <Search
        value={search}
        onChange={setSearch}
        inputClassName="text-base pl-12"
        iconClassName="left-4 h-5 w-5"
        clearClassName="rounded-full"
        showClear
      />
      <div className="bg-primary grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 m-5 p-5 rounded-lg">
        {products?.data?.map((product) => (
          <Card className="w-96" key={product?._id}>
            <CardContent>
              <CardHeader
                badge="30% Off"
                title={product?.name}
                description={"Product  #" + product?._id}
                warning="Only 2 remaining"
              />
            </CardContent>

            {/* <CardFooter>
            <button className="flex-1 rounded-lg bg-surface px-4 py-2">
              More
            </button>

            <button className="flex-1 rounded-lg bg-primary px-4 py-2 text-white">
              Buy
            </button>
          </CardFooter> */}
          </Card>
        ))}

        <Pagination
          currentPage={products?.pagination?.page}
          totalPages={products?.pagination?.totalPages}
          hasNextPage={products?.pagination?.hasNextPage}
          hasPreviousPage={products?.pagination?.hasPreviousPage}
          onPageChange={(page) => fetchProducts(page, limit)}
        />
      </div>
    </div>
  );
}
