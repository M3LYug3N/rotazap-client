import { memo } from "react";

import { SearchCounter } from "@/features/search/components/SearchCounter";
import { CrossesTableRowProps } from "@/features/search/types/crosses.types";

import { CameraAltIcon, InfoIcon, WarehouseIcon } from "@/components/icons";
import {
  StyledTableCellBody,
  StyledTableRowBody
} from "@/components/styled/tables/StylesTables";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { useBasket } from "@/hooks/useBasket";

import { formatNumber } from "@/utils/format-number";

const CrossesTableRowComponent = ({
  cross,
  descr,
  properties,
  images,
  onOpenImageModal,
  onOpenInfoModal
}: CrossesTableRowProps) => {
  const { items, addItem, removeItem, updateItem, deleteItem } = useBasket();

  const hash = cross.hash;

  const isWarehouse = cross.supplierId === 0;

  const item = items.find(
    i =>
      i.skuId === cross.skuId &&
      i.supplierId === cross.supplierId &&
      i.hash === hash
  );

  const count = item?.qty ?? 0;

  const baseItemData = {
    skuId: cross.skuId,
    supplierId: cross.supplierId,
    hash,
    brand: cross.brand,
    article: cross.numberFix,
    descr: descr || "Описание отсутствует",
    price: cross.price,
    selected: true
  };

  const handleInputChange = (newQty: number) => {
    if (newQty === 0) {
      deleteItem({ skuId: cross.skuId, supplierId: cross.supplierId, hash });
      return;
    }

    if (count === 0) {
      addItem({ ...baseItemData, qty: newQty });
      return;
    }

    if (newQty !== count) {
      updateItem({
        skuId: cross.skuId,
        supplierId: cross.supplierId,
        hash,
        qty: newQty,
        price: cross.price
      });
    }
  };

  return (
    <StyledTableRowBody className={isWarehouse ? "bg-blue-100" : ""}>
      <StyledTableCellBody>{cross.brand}</StyledTableCellBody>
      <StyledTableCellBody>{cross.numberFix}</StyledTableCellBody>
      <StyledTableCellBody>
        {descr || "Описание отсутствует"}
      </StyledTableCellBody>
      <StyledTableCellBody>
        <div className="flex justify-center gap-2">
          <TooltipComponent title="Информация о товаре">
            <InfoIcon
              onClick={() => onOpenInfoModal(properties ?? {})}
              className="closeButton"
            />
          </TooltipComponent>

          {images?.[0]?.url && (
            <TooltipComponent title="Просмотр изображения">
              <CameraAltIcon
                onClick={() => onOpenImageModal(images[0].url)}
                className="closeButton"
              />
            </TooltipComponent>
          )}

          {isWarehouse && (
            <TooltipComponent title="В наличии на нашем складе">
              <WarehouseIcon className="closeButton" />
            </TooltipComponent>
          )}
        </div>
      </StyledTableCellBody>
      <StyledTableCellBody>{formatNumber(cross.price)}</StyledTableCellBody>

      <StyledTableCellBody>{cross.stock}</StyledTableCellBody>
      <StyledTableCellBody>{cross.deliveryDays || "—"}</StyledTableCellBody>
      <StyledTableCellBody>
        <SearchCounter
          count={count}
          stock={cross.stock}
          price={cross.price}
          onIncrement={() => addItem({ ...baseItemData, qty: 1 })}
          onDecrement={() =>
            removeItem({
              skuId: cross.skuId,
              supplierId: cross.supplierId,
              hash
            })
          }
          onInputChange={handleInputChange}
        />
      </StyledTableCellBody>
    </StyledTableRowBody>
  );
};

CrossesTableRowComponent.displayName = "CrossesTableRow";

export const CrossesTableRow = memo(CrossesTableRowComponent);
