import { SettingsIcon } from "@/components/icons";
import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";

import styles from "@/styles/pages/home/Home.module.css";

export const HomeTemplate = () => (
  <section className={`${styles.main} mt-[-50px]`}>
    <div className="container">
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>
          <span className="text-peach">ROTAZAP</span> — умный поиск
          автозапчастей
          <SettingsIcon
            className={`${styles.rotateIcon} text-blue-dark`}
            fontSize="large"
          />
        </h1>
        <SearchForm />
        <p className={styles.text}>
          Быстрый поиск оригинальных и аналоговых автозапчастей по артикулу.
          Пример артикула: <span className="font-bold">a1818</span>
        </p>
      </div>
    </div>
  </section>
);
