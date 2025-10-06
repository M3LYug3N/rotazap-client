import styles from "@/styles/pages/info/InfoPage.module.css";

export const AboutCompanyTemplate = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>О компании</h2>
          <div className={styles.titleDivider} />
          <p className={styles.subtitle}>
            Краткая информация и основные направления деятельности
          </p>
        </div>
        <div className={styles.block}>
          <p>
            <b>Rotazap</b> — это омниканальный ритейлер на рынке автомобильных
            запасных частей. Мы осуществляем деятельность как на рынке России,
            так и на рынках стран СНГ, предлагая клиентам удобный сервис онлайн
            и офлайн.
          </p>
          <p>
            Мы осуществляем оптовую и розничную продажу оригинальных и
            неоригинальных запчастей для иномарок из Японии, Европы, Америки и
            Кореи.
          </p>
          <p>
            На нашем сайте, по VIN номеру, Вы можете найти интересующую Вас
            деталь для легковых, грузовых автомобилей, мотоциклов, а также
            автобусов, а затем оформить заказ через интернет-магазин или
            позвонив по телефону. Мы гарантируем высокое качество поставляемой
            продукции и обслуживания.
          </p>
          <p>
            Покупка на нашем сайте делается в несколько кликов. Помимо
            нескольких способов доставки, забрать свой заказ можно
            самостоятельно в пункте выдачи заказов рядом с домом, потратив на
            это несколько минут.
          </p>
          <p>
            У нас Вы найдете любые автозапчасти и аксессуары для иномарок, а
            также расходные материалы по лучшим ценам. На нашем складе
            представлены все виды запасных частей и агрегатов от кузовных
            деталей, до запчастей для тюнинга. Ждем Вас!
          </p>
        </div>
        <div className={styles.metricsWrapper}>
          <div className={styles.metric}>
            <h3 className={styles.metricNumber}>10,000+</h3>
            <p className={styles.metricDescription}>
              Номенклатурных позиций автозапчастей
            </p>
          </div>
          <div className={styles.metric}>
            <h3 className={styles.metricNumber}>11</h3>
            <p className={styles.metricDescription}>
              Лет на рынке автозапчастей
            </p>
          </div>
          <div className={styles.metric}>
            <h3 className={styles.metricNumber}>50+</h3>
            <p className={styles.metricDescription}>
              Сотрудничающих производителей
            </p>
          </div>
          <div className={styles.metric}>
            <h3 className={styles.metricNumber}>3,000+</h3>
            <p className={styles.metricDescription}>Удовлетворённых клиентов</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
