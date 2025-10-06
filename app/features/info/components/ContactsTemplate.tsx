import {
  bankDetails,
  companyDetails,
  contactsDetails
} from "@/features/info/data/company-info.data";

import { AccordionComponent } from "@/components/ui/accordion/AccordionComponent";

import styles from "@/styles/pages/info/InfoPage.module.css";

export const ContactsTemplate = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Контактная информация и реквизиты</h2>
          <div className={styles.titleDivider} />
          <p className={styles.subtitle}>
            Все необходимые контакты и данные для сотрудничества с нами
          </p>
        </div>
        <div className="mt-[32px]">
          <div className={styles.accordionContainer}>
            <AccordionComponent title="Реквизиты компании и банка">
              <ul className={styles.list}>
                {companyDetails.map(item => (
                  <li key={item.title} className={styles.listItem}>
                    <span>{item.title}</span>
                    <p>{item.text}</p>
                  </li>
                ))}
                <div className={styles.divider} />
                {bankDetails.map(item => (
                  <li key={item.title} className={styles.listItem}>
                    <span>{item.title}</span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </AccordionComponent>
            <AccordionComponent title="Контакты, адрес и график работы">
              <ul className={styles.list}>
                {contactsDetails.map((item, index) =>
                  item.divider ? (
                    <div key={`divider-${index}`} className={styles.divider} />
                  ) : (
                    <li key={item.title} className={styles.listItem}>
                      <span className={item.spanClass}>{item.title}</span>
                      <p>{item.text}</p>
                    </li>
                  )
                )}
              </ul>
            </AccordionComponent>
            <AccordionComponent title="Руководство">
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span>Генеральный директор</span>
                  <p>Костюшкин Юрий Владимирович</p>
                </li>
              </ul>
            </AccordionComponent>
          </div>
        </div>
      </div>
    </div>
  </section>
);
