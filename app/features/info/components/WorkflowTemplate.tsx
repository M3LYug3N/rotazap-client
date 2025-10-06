import Link from "next/link";

import { AccordionComponent } from "@/components/ui/accordion/AccordionComponent";

import styles from "@/styles/pages/info/InfoPage.module.css";

export const WorkflowTemplate = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Электронный документооборот</h2>
          <div className={styles.titleDivider} />
          <p className={styles.subtitle}>
            Удобство и прозрачность взаимодействия в цифровом формате
          </p>
        </div>
        <div className={styles.block}>
          <div className={styles.textBlock}>
            <p>
              Бумажный документооборот изживает себя. Бумажные документы
              теряются у поставщиков, при доставке контрагенту, у клиента.
              Приходится распечатывать, подписывать и отправлять документы
              заново. Все это — время и деньги.
            </p>
            <p>
              ООО «РОТА» внедрило систему электронного документооборота и
              приглашает своих партнёров присоединиться к выгодному и удобному
              сервису. Электронный документооборот (ЭДО) — единый механизм по
              работе с документами, представленными в электронном виде, с
              реализацией концепции «безбумажного делопроизводства».
            </p>
          </div>
        </div>
        <div className={styles.accordionContainer}>
          <AccordionComponent title="Плюсы ЭДО для бухгалтера">
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">1.</span>
                <p>
                  ФНС и суды принимают электронные документы в качестве
                  оригиналов;
                </p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">2.</span>
                <p>Электронные документы не требуют дублирования на бумаге;</p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">3.</span>
                <p>
                  Мгновенная отправка, получение и внесение корректировок в
                  документы;
                </p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">4.</span>
                <p>
                  Отправляйте и получайте документы прямо из своей учетной
                  системы (1С и др.);
                </p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">5.</span>
                <p>
                  Онлайн контроль статуса документа (доставлен, подписан, отказ
                  в подписи);
                </p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">6</span>
                <p>Легкий поиск документов по удобным расширенным фильтрам</p>
              </li>
            </ul>
          </AccordionComponent>

          <AccordionComponent title="Плюсы для финансового директора">
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">1.</span>
                <p>
                  Сокращение издержек на бумагу, печать, доставку и хранение до
                  80%;
                </p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">2.</span>
                <p>
                  Увеличение суммы входящего НДС за счет гарантированного
                  принятия документов;
                </p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">3.</span>
                <p>Повышение эффективности внутренних бизнес-процессов;</p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">4.</span>
                <p>Прозрачные финансовые отношения с контрагентами;</p>
              </li>
            </ul>
          </AccordionComponent>

          <AccordionComponent title="Для совместного сотрудничества по системе ЭДО необходимо">
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">1.</span>
                <p>
                  Выбрать оператора ЭДО и заключить с ним контракт (список
                  операторов федерального уровня ЭДО представлен на сайте&nbsp;
                  <Link
                    className="link"
                    href="https://www.nalog.gov.ru/rn77/oedo/search_edo/"
                    target="_blank"
                  >
                    Федеральной Налоговой Службы
                  </Link>
                  ;
                </p>
              </li>
              <li className={styles.listItem}>
                <span className="!min-w-[20px]">2.</span>
                <p>
                  Выразить готовность сотрудничества с ООО «РОТА» по ЭДО.
                  Заполнить и подписать доп. соглашение в электронном виде.
                  Реквизиты нашей компании, Вы можете найти&nbsp;
                  <Link className="link" href="/contacts" target="_blank">
                    здесь
                  </Link>
                  .
                </p>
              </li>
            </ul>
          </AccordionComponent>
        </div>
      </div>
    </div>
  </section>
);
