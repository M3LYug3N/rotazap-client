import { ReactNode } from "react";

import { BackLink } from "@/components/ui/back-link/BackLink";
import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";

import styles from "@/styles/pages/search/Search.module.css";

export default function TemplateWrapper({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <section>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.searchForm}>
            <SearchForm />
          </div>
          <BackLink />
          {children}
        </div>
      </div>
    </section>
  );
}
