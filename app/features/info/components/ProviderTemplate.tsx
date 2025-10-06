import Link from "next/link";

import {
  documentsDetails,
  requirementsDetails
} from "@/features/info/data/provider.data";

import { AccordionComponent } from "@/components/ui/accordion/AccordionComponent";

import styles from "@/styles/pages/info/InfoPage.module.css";

export const ProviderTemplate = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Информация для поставщиков</h2>
          <div className={styles.titleDivider} />
          <p className={styles.subtitle}>
            Ключевые условия для успешного и взаимовыгодного сотрудничества
          </p>
        </div>
        <div className={styles.block}>
          <div className={styles.textBlock}>
            <p>
              <b>Для того, чтобы стать нашим поставщиком необходимо:</b>
            </p>
            <div className="ml-6">
              <p>&#9675; Соответствовать нижеуказанным требованиям;</p>
              <p>
                &#9675; Направить на адрес электронной почты&nbsp;
                <Link className="link" href="mailto:info@rotazap.ru">
                  info@rotazap.ru
                </Link>
                &nbsp;прайс-лист и пакет документов, указанный ниже.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.accordionContainer}>
          <AccordionComponent title="Требования к поставщикам">
            <ul className={styles.list}>
              {requirementsDetails.map(item => (
                <li key={item.id} className={styles.listItem}>
                  <span className="!min-w-[20px]">{item.id}.</span>
                  <p>{item.text};</p>
                </li>
              ))}
            </ul>
          </AccordionComponent>

          <AccordionComponent title="Пакет документов">
            <ul className={styles.list}>
              {documentsDetails.map(item => (
                <li key={item.id} className={styles.listItem}>
                  <span className="!min-w-[20px]">{item.id}.</span>
                  <p>{item.text};</p>
                </li>
              ))}
            </ul>
            <p className="color-black-light mt-4 text-sm italic">
              * Копии документов, в обязательном порядке должны быть заверены
              оригиналом печати и подписью директора организации
            </p>
          </AccordionComponent>
        </div>

        <div className={styles.block}>
          <p className="text-center">
            После рассмотрения предложения с Вами свяжется наш специалист для
            обсуждения деталей сотрудничества!
          </p>
        </div>
      </div>
    </div>
  </section>
);
