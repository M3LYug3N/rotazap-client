"use client";

import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SearchFilterPanel } from "@/features/search/components/SearchFilterPanel";
import { ModalImage } from "@/features/search/components/modals/ModalImage";
import { ModalInfo } from "@/features/search/components/modals/ModalInfo";
import { CrossesTableBody } from "@/features/search/components/tables/crosses/CrossesTableBody";
import { CrossesTableHead } from "@/features/search/components/tables/crosses/CrossesTableHead";
import { CrossesTableProps } from "@/features/search/types";
import { CrossItem, CrossRowType } from "@/features/search/types/crosses.types";

import { PaginationComponent } from "@/components/ui/pagination/PaginationComponent";

import { useBasket } from "@/hooks/useBasket";

import { paginate } from "@/utils/paginate";

import { SEARCH_PAGINATION } from "@/common/constants";

export interface Filters {
  brand: string;
  article: string;
  minPrice: number;
  maxPrice: number;
}

export const CrossesTable = ({
  descr,
  properties,
  images,
  crosses
}: CrossesTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useBasket();

  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{
    image?: string;
    info?: Record<string, string>;
  }>({
    image: searchParams.get("image") || undefined
  });

  // 🧱 Построение списка со строками и заголовками групп
  const items: CrossRowType[] = useMemo(() => {
    const result: CrossRowType[] = [];

    for (const group of crosses) {
      result.push({ type: "group", label: group.groupName });

      let hasOffers = false;

      for (const item of group.items) {
        if (!item.offers?.length) continue;

        for (const offer of item.offers) {
          result.push({
            type: "item",
            skuId: offer.skuId,
            supplierId: offer.supplierId,
            brand: item.brand,
            article: item.number,
            numberFix: item.number,
            price: offer.price,
            basePrice: offer.basePrice,
            stock: offer.qty,
            count: 0,
            hash: offer.hash,
            deliveryDays: offer.deliveryDays ?? 0
          });

          hasOffers = true;
        }
      }

      if (!hasOffers) {
        result.push({
          type: "empty",
          message: `${group.groupName} отсутствует`
        });
      }
    }

    return result;
  }, [crosses]);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const prices = items
      .filter(
        (i): i is Extract<CrossRowType, { type: "item" }> => i.type === "item"
      )
      .map(i => (i as CrossItem).price);

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    setFilters({
      brand: "",
      article: "",
      minPrice: min,
      maxPrice: max
    });
  }, [items]);

  const [filters, setFilters] = useState<Filters>({
    brand: "",
    article: "",
    minPrice: 0,
    maxPrice: 0
  });

  const handleFilterChange = useCallback((updated: Filters) => {
    setFilters(updated);
    setCurrentPage(1);
  }, []);

  // 📦 Фильтрация и сохранение групп
  const filteredRows = useMemo(() => {
    const result: CrossRowType[] = [];
    let lastGroupLabel: string | null = null;
    let groupAdded = false;

    for (const row of items) {
      if (row.type === "group") {
        lastGroupLabel = row.label;
        groupAdded = false;
        continue;
      }

      if (row.type === "empty") {
        if (!groupAdded) {
          result.push({ type: "group", label: lastGroupLabel! });
          groupAdded = true;
        }
        result.push(row);
        continue;
      }

      const match =
        row.type === "item" &&
        (!filters.brand || row.brand === filters.brand) &&
        (!filters.article || row.article === filters.article) &&
        row.price >= filters.minPrice &&
        row.price <= filters.maxPrice;

      if (match) {
        if (!groupAdded) {
          result.push({ type: "group", label: lastGroupLabel! });
          groupAdded = true;
        }
        result.push(row);
      }
    }

    return result;
  }, [items, filters]);

  const paginatedRows = useMemo(
    () => paginate(filteredRows, currentPage, SEARCH_PAGINATION),
    [filteredRows, currentPage]
  );

  const updateCrossCount = useCallback(
    (index: number, value: number) => {
      const itemIndex =
        currentPage * SEARCH_PAGINATION - SEARCH_PAGINATION + index;
      const updated = [...filteredRows];
      const item = updated[itemIndex];

      if (item?.type === "item") {
        updated[itemIndex] = {
          ...item,
          count: Math.max(0, Math.min(item.stock, value))
        };
      }
    },
    [filteredRows, currentPage]
  );

  const openModal = useCallback(
    (type: "image" | "info", value: string | Record<string, string>) => {
      setModalState(prev => ({ ...prev, [type]: value }));
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState({ image: undefined, info: undefined });
    router.replace("?", { scroll: false });
  }, [router]);

  const addToCart = useCallback(
    (cross: CrossRowType) => {
      if (cross.type !== "item" || !cross.count) return;

      for (let i = 0; i < cross.count; i++) {
        addItem({
          skuId: cross.skuId,
          supplierId: cross.supplierId,
          hash: cross.hash,
          brand: cross.brand,
          article: cross.article,
          descr: descr || "Описание отсутствует",
          price: cross.price,
          qty: 1,
          deliveryDays: cross.deliveryDays ?? 0,
          selected: true
        });
      }
    },
    [addItem, descr]
  );

  return (
    <>
      <SearchFilterPanel
        items={items.filter(
          (i): i is Extract<CrossRowType, { type: "item" }> => i.type === "item"
        )}
        onFilter={handleFilterChange}
      />

      <TableContainer component={Paper}>
        <Table>
          <CrossesTableHead />
          <CrossesTableBody
            crosses={paginatedRows}
            descr={descr}
            properties={properties}
            images={images}
            onUpdateCount={updateCrossCount}
            onOpenImageModal={url => openModal("image", url)}
            onOpenInfoModal={props => openModal("info", props)}
            onAddToCart={index => addToCart(paginatedRows[index])}
          />
        </Table>
      </TableContainer>

      <PaginationComponent
        totalItems={filteredRows.length}
        rowsPerPage={SEARCH_PAGINATION}
        currentPage={currentPage}
        onChange={setCurrentPage}
      />

      <ModalImage
        open={Boolean(modalState.image)}
        imageUrl={modalState.image ?? ""}
        onClose={closeModal}
      />
      <ModalInfo
        open={Boolean(modalState.info)}
        properties={modalState.info ?? {}}
        onClose={closeModal}
      />
    </>
  );
};
