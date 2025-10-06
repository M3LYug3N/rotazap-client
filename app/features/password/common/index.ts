import * as yup from "yup";

const errors = {
  required: "Обязательное поле",
  min: "Не менее 5 символов",
  max: "Не более 30 символов",
  maxPhone: "Не менее 11 цифр"
};

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required(errors.required)
    .matches(/\S+@\S+\.\S+/, "Неправильный Email")
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required(errors.required)
    .min(5, errors.min)
    .max(30, errors.max)
    .test("no-cyrillic", "Только латинские символы", value =>
      value ? !/[а-яА-ЯёЁ]/.test(value) : true
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/,
      "Неверный пароль"
    ),
  confirmPassword: yup
    .string()
    .required(errors.required)
    .oneOf([yup.ref("newPassword")], "Пароли не совпадают") // Проверка совпадения
});
