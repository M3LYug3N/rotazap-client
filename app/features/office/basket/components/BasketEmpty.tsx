import Link from "next/link";

export const BasketEmpty = () => (
  <div className="flex flex-col gap-y-[10px] px-[10px] py-0">
    <h4 className="text-lg!">Корзина пуста</h4>
    <div className="flex flex-col gap-y-[10px] px-[10px] py-0">
      <p>Похоже, вы ещё не добавили товары</p>
      <p className="pb-2.5">
        Перейдите на{" "}
        <Link className="link" href="/">
          главную страницу
        </Link>
        , чтобы начать поиск и выбрать нужные автозапчасти
      </p>
    </div>
  </div>
);
