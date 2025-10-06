"use client";

import { useMemo, useState } from "react";

import { OrdersEmpty } from "@/features/office/orders/components/OrdersEmpty";
import { OrdersForm } from "@/features/office/orders/components/forms/OrdersForm";
import { OrdersTable } from "@/features/office/orders/components/tables/OrdersTable";
import { OrdersFilters } from "@/features/office/orders/types";
import { filterOrders } from "@/features/office/orders/utils/filter-orders";

import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";
import { PaginationComponent } from "@/components/ui/pagination/PaginationComponent";

import { useOrders } from "@/hooks/useOrders";

import { paginate } from "@/utils/paginate";

import { ORDERS_PAGINATION } from "@/common/constants";

export const OrdersTemplate = () => {
  const { data: orders = [], isLoading } = useOrders();

  const [filters, setFilters] = useState<OrdersFilters>({});
  const [page, setPage] = useState(1);

  // 🔹 сортируем по дате заказа (пустые — в конец)
  const sortedOrders = useMemo(
    () =>
      [...orders].sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
        const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
        return dateB - dateA;
      }),
    [orders]
  );

  const filteredOrders = useMemo(
    () => filterOrders(sortedOrders, filters),
    [sortedOrders, filters]
  );

  const paginatedOrders = useMemo(
    () => paginate(filteredOrders, page, ORDERS_PAGINATION),
    [filteredOrders, page]
  );

  const handleFilter = (newFilters: OrdersFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({});
    setPage(1);
  };

  if (isLoading) return <p>Загрузка заказов...</p>;

  return (
    <div className="officePage">
      <div className="flex items-center justify-between gap-x-[160px]">
        <h2 className="officePageTitle">Заказы</h2>
        <div className="w-full max-w-[566px]">
          <SearchForm />
        </div>
      </div>
      <div className="officePageContent">
        {filteredOrders.length === 0 ? (
          <OrdersEmpty />
        ) : (
          <>
            <OrdersForm onFilter={handleFilter} onReset={handleReset} />
            <OrdersTable
              orders={paginatedOrders}
              highlightArticle={filters.article}
            />
            <PaginationComponent
              totalItems={filteredOrders.length}
              rowsPerPage={ORDERS_PAGINATION}
              currentPage={page}
              onChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};
