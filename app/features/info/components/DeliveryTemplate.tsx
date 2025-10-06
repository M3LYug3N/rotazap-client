import { deliveryDetails } from "@/features/info/data/delivery.data";

import { AccordionComponent } from "@/components/ui/accordion/AccordionComponent";

import styles from "@/styles/pages/info/InfoPage.module.css";

export const DeliveryTemplate = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Доставка и приемка товара</h2>
          <div className={styles.titleDivider} />
          <p className={styles.subtitle}>
            Условия и важные аспекты логистики и приема заказов
          </p>
        </div>
        <div className="mt-[32px]">
          <div className={styles.accordionContainer}>
            <AccordionComponent title="Способы и график доставки">
              <ul className={styles.list}>
                {deliveryDetails.map(item => (
                  <li key={item.title} className={styles.listItem}>
                    <span className="!min-w-[200px]">{item.title}</span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </AccordionComponent>
            <AccordionComponent title="Приемка товара">
              <ul className={styles.list}>
                <li>
                  Покупатель вправе принять товар по количеству мест без
                  проведения проверки его качества, количества единиц товара
                  внутри упаковки и ассортимента, только если товар находится в
                  таре и упаковке, у которой отсутствуют видимые дефекты;
                </li>
                <li>
                  Приемка товара по внутритарному количеству, качеству,
                  ассортименту и комплектности осуществляется Покупателем в
                  течение трех рабочих дней с даты получения товара
                </li>
              </ul>
            </AccordionComponent>
          </div>
        </div>
      </div>
    </div>
  </section>
);
