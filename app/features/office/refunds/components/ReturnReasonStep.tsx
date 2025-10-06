"use client";

import { useState } from "react";

type ReturnReasonGroup = {
  title: string;
  options: {
    value: string;
    label: string;
    description?: string;
    subOptions?: {
      value: string;
      label: string;
      description?: string;
    }[];
  }[];
};

const reasonGroups: ReturnReasonGroup[] = [
  {
    title: "Качественный товар",
    options: [
      {
        value: "assortment",
        label: "Нарушение ассортимента",
        description:
          "Срок рассмотрения заявки на возврат товара не превышает 3 рабочих дней.",
        subOptions: [
          {
            value: "shortage",
            label: "Недовложение",
            description:
              "Отсутствует часть товаров из отгрузочных документов. Срок подачи заявки — 3 рабочих дня с даты получения."
          },
          {
            value: "wrong_item",
            label: "Пересорт",
            description:
              "Товар не соответствует описанию или артикулу. Срок подачи — 3 рабочих дня с даты получения."
          }
        ]
      },
      {
        value: "agreement",
        label: "По согласованию сторон",
        description:
          "Вы заказывали под клиента, но он отказался. Срок подачи — 14 рабочих дней с даты отгрузки.",
        subOptions: [
          {
            value: "delay",
            label: "Нарушен срок поставки",
            description: "Клиент отказался из-за задержки доставки."
          },
          {
            value: "client_refusal",
            label: "Отказ клиента",
            description:
              "Клиент отказался от детали (неактуальна/ошибка подбора)."
          }
        ]
      }
    ]
  },
  {
    title: "Некачественный товар",
    options: [
      {
        value: "defect",
        label: "Брак",
        description:
          "Конструктивный дефект или поломка при эксплуатации. Возврат по условиям гарантии."
      },
      {
        value: "damaged",
        label: "Некондиция",
        description:
          "Механические повреждения упаковки/товара. Срок подачи — 3 рабочих дня с даты получения."
      },
      {
        value: "incomplete",
        label: "Некомплект",
        description:
          "Нарушена заводская комплектность. Вложение не соответствует спецификации производителя."
      }
    ]
  }
];

export const ReturnReasonStep = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedSubReason, setSelectedSubReason] = useState<string | null>(
    null
  );

  return (
    <div className="mx-auto w-full">
      <p className="mb-6 text-xl font-semibold">
        Шаг 1: Выбор причины возврата
      </p>
      {reasonGroups.map(group => (
        <div key={group.title} className="mb-6">
          <h3 className="mb-2 font-medium">{group.title}</h3>
          <div className="space-y-2">
            {group.options.map(option => (
              <div key={option.value} className="rounded-md border p-3">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="radio"
                    name="reason"
                    value={option.value}
                    checked={selectedReason === option.value}
                    onChange={() => {
                      setSelectedReason(option.value);
                      setSelectedSubReason(null);
                    }}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    )}
                  </div>
                </label>

                {option.subOptions && selectedReason === option.value && (
                  <div className="mt-2 space-y-2 pl-6">
                    {option.subOptions.map(sub => (
                      <label
                        key={sub.value}
                        className="flex cursor-pointer items-start gap-3"
                      >
                        <input
                          type="radio"
                          name="subReason"
                          value={sub.value}
                          checked={selectedSubReason === sub.value}
                          onChange={() => setSelectedSubReason(sub.value)}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium">{sub.label}</div>
                          {sub.description && (
                            <div className="text-sm text-gray-500">
                              {sub.description}
                            </div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 flex justify-between">
        <button className="rounded border px-4 py-2 text-sm hover:bg-gray-50">
          Список возвратов
        </button>
        <button
          className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
          disabled={
            !selectedReason ||
            (reasonGroups
              .flatMap(g => g.options)
              .find(opt => opt.value === selectedReason)?.subOptions &&
              !selectedSubReason)
          }
        >
          Далее
        </button>
      </div>
    </div>
  );
};
