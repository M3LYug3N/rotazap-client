import { ReturnReasonStep } from "@/features/office/refunds/components/ReturnReasonStep";

import { BackLink } from "@/components/ui/back-link/BackLink";

export const RefundsCreateTemplate = () => (
  <div className="officePage">
    <div className="flex h-[52px] items-center justify-between gap-x-[160px]">
      <h2 className="officePageTitle">Оформление заявки на возврат</h2>
      <BackLink />
    </div>
    <ReturnReasonStep />
  </div>
);
