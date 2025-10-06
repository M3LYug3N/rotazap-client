import z from "zod";

export const schema = z
  .object({
    documentType: z.string().min(1, "Выберите тип документа"),
    file: z.any().optional()
  })
  .superRefine((data, ctx) => {
    const file = data.file;

    if (!(file instanceof File)) {
      ctx.addIssue({
        path: ["file"],
        code: "custom",
        message: "Файл обязателен"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      ctx.addIssue({
        path: ["file"],
        code: "custom",
        message: "Файл должен быть меньше 10 МБ"
      });
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      ctx.addIssue({
        path: ["file"],
        code: "custom",
        message: "Недопустимый тип файла"
      });
    }
  });
