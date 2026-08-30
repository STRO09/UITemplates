"use client";

import { Table } from "@/components/common/table/Table";
import { Pagination } from "@/components/common/Pagination";
import { Search } from "@/components/common/search";

const columns = [
  {
    key: "name",
    header: "Product",
  },
  {
    key: "price",
    header: "Price",
    render: (value) => `₹${value}`,
  },
  {
    key: "category",
    header: "Category",
  },
  {
    key: "stock",
    header: "Stock",
  },
];

export default function AllProductTableClient({ productsData }) {
  const { page, hasNextPage, hasPreviousPage } = productsData.pagination;
  return (
    <main className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-muted-foreground">Manage all products.</p>
      </div>

      <Search
        inputClassName="text-base pl-12"
        iconClassName="left-4 h-5 w-5"
        clearClassName="rounded-full"
        showClear
      />

      <Table
        columns={columns}
        data={productsData.data}
        getRowId={(product) => product._id}
        selectable
      />

      <Pagination
        currentPage={page}
        totalPages={productsData.pagination.totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        previousHref={`?page=${page - 1}`}
        nextHref={`?page=${page + 1}`}
        getPageHref={(page) => `?page=${page}`}
      />
    </main>
  );
}
