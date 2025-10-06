import Link from "next/link";

import { Button } from "@/components/ui/buttons/Button";
import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";

import styles from "@/styles/pages/office/refunds/Refunds.module.css";

export const RefundsTemplate = () => (
  <div className="officePage">
    <div className="flex items-center justify-between gap-x-[160px]">
      <h2 className="officePageTitle">Возвраты</h2>
      <div className="w-full max-w-[566px]">
        <SearchForm />
      </div>
    </div>
    <div className="officePageContent">
      <div className={styles.linksWrapper}>
        <div className="w-[200px]">
          <Link href="/office/refunds/create">
            <Button variant="PrimaryOutline" size="Small">
              Оформить заявку
            </Button>
          </Link>
        </div>
        <Link className="link" href="/info/warranty-refund">
          Условия возврата
        </Link>
      </div>
    </div>
  </div>
);
