import Link from "next/link";

import {
  individualsDetails,
  legalEntitiesDetails,
  orderStagesDetails
} from "@/features/info/data/wholesale.data";

import { AccordionComponent } from "@/components/ui/accordion/AccordionComponent";

import styles from "@/styles/pages/info/InfoPage.module.css";

export const WholesaleTemplate = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Информация для оптовых клиентов</h2>
          <div className={styles.titleDivider} />
          <p className={styles.subtitle}>
            Ключевые условия для успешного и взаимовыгодного сотрудничества
          </p>
        </div>
        <div className={styles.block}>
          <div className={styles.textBlock}>
            <p>
              <b>Для того, чтобы стать нашим клиентом необходимо: </b>
            </p>
            <div className="ml-6">
              <p>
                Пройти регистрацию на сайте, после чего загрузить необходимые
                документы в&nbsp;
                <Link className="link" href="/office/documents">
                  личном кабинете
                </Link>
                &nbsp;или направить на электронную почту&nbsp;
                <a href="mailto:info@rotazap.ru" className="link">
                  info@rotazap.ru
                </a>
                &nbsp; письмо с приложением пакета документов.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.accordionContainer}>
          <AccordionComponent title="Порядок заключения договора (пакет документов)">
            <div className={styles.textBlockAccordion}>
              Вам необходимо заключить с нами договор поставки, и предоставить
              следующие документы:
            </div>
            <div className={styles.accordionContainer}>
              <AccordionComponent
                title="Для физических лиц (ИП)"
                level="nested"
              >
                <ul className={styles.list}>
                  {individualsDetails.map(item => (
                    <li key={item.id} className={styles.listItem}>
                      <span className="!min-w-[20px]">{item.id}.</span>
                      <p>{item.text};</p>
                    </li>
                  ))}
                </ul>
              </AccordionComponent>
              <AccordionComponent
                title="Для юридических лиц (ООО)"
                level="nested"
              >
                <ul className={styles.list}>
                  {legalEntitiesDetails.map(item => (
                    <li key={item.id} className={styles.listItem}>
                      <span className="!min-w-[20px]">{item.id}.</span>
                      <p>{item.text};</p>
                    </li>
                  ))}
                </ul>
              </AccordionComponent>
            </div>
          </AccordionComponent>

          <AccordionComponent title="Порядок размещения заказов">
            <div className={styles.textBlockAccordionMono}>
              Принцип оформления заказа похож на взаимодействие с
              интернет-магазинами. Вы добавляете нужные товары в корзину, затем
              выбираете данные для доставки.
            </div>
          </AccordionComponent>

          <AccordionComponent title="Отслеживание заказа">
            <div className={styles.textBlockAccordion}>
              После оформления заказа, в&nbsp;
              <Link className="link" href="/office/orders">
                личном кабинете
              </Link>
              , вы можете отслеживать его статус:
            </div>
            <ul className={styles.list}>
              {orderStagesDetails.map(item => (
                <li key={item.id} className={styles.listItem}>
                  <span className="!min-w-[20px]">{item.id}.</span>
                  <p>{item.text};</p>
                </li>
              ))}
            </ul>
          </AccordionComponent>
          <AccordionComponent title="Порядок оплаты">
            <div className={styles.textBlockAccordionMono}>
              Оплата товара производится на условиях Договора поставки. ООО
              &laquo;РОТА&raquo; вправе отказать в отгрузке товара, если
              денежные средства не поступили вовремя.
            </div>
          </AccordionComponent>

          <AccordionComponent title="Порядок отгрузки и получения товара">
            <div className={styles.textBlockAccordionMono}>
              Отгрузка товара осуществляется на условиях Договора поставки. Наша
              компания вправе приостановить отгрузку товара в случае
              несоблюдения покупателем условий Договора. Получение товара
              производится только на основе доверенности или печати предприятия.
            </div>
          </AccordionComponent>
        </div>
      </div>
    </div>
  </section>
);
