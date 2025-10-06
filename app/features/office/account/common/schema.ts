import * as yup from "yup";

const authSchemaErrors = {
  required: "Обязательное поле",
  min: "Не менее 5 символов",
  max: "Не более 30 символов"
};

export const updateUserSchema = yup.object().shape({
  email: yup
    .string()
    .required(authSchemaErrors.required)
    .matches(/\S+@\S+\.\S+/, "Неверный email"),
  fullName: yup
    .string()
    .required(authSchemaErrors.required)
    .min(5, authSchemaErrors.min)
    .max(30, authSchemaErrors.max)
    .matches(/^[а-яА-ЯёЁ\s]*$/, "Только кириллица"),
  username: yup
    .string()
    .required(authSchemaErrors.required)
    .min(5, authSchemaErrors.min)
    .max(30, authSchemaErrors.max)
    .matches(/^[a-zA-Z0-9\s]*$/, "Только латинские буквы и цифры"),
  phoneNumber: yup
    .string()
    .required(authSchemaErrors.required)
    .matches(/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/, "Неверное значение")
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required(authSchemaErrors.required)
    .min(5, authSchemaErrors.min)
    .max(30, authSchemaErrors.max)
    .test("no-cyrillic", "Только латинские символы", value =>
      value ? !/[а-яА-ЯёЁ]/.test(value) : true
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/,
      "Неверный пароль"
    ),

  newPassword: yup
    .string()
    .required(authSchemaErrors.required)
    .min(5, authSchemaErrors.min)
    .max(30, authSchemaErrors.max)
    .test("no-cyrillic", "Только латинские символы", value =>
      value ? !/[а-яА-ЯёЁ]/.test(value) : true
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/,
      "Неверный пароль"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Пароли не совпадают") // Проверка совпадения
    .required(authSchemaErrors.required)
});
