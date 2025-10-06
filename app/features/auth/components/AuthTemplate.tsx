"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthSignInForm } from "@/features/auth/components/forms/AuthSignInForm";
import { AuthSignUpForm } from "@/features/auth/components/forms/AuthSignUpForm";

import styles from "@/styles/pages/auth/Auth.module.css";

export const AuthTemplate = () => {
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <section className={styles.auth}>
      <div className="container">
        <div className={styles.authContainer}>
          <h2 className={styles.authTitle}>
            {isLoginFormVisible ? "Авторизация" : "Регистрация"}
          </h2>
          {isLoginFormVisible ? <AuthSignInForm /> : <AuthSignUpForm />}
          <p className={styles.switchLink}>
            {isLoginFormVisible
              ? "Новый пользователь?"
              : "Уже зарегистрированы?"}
            <span className="link" onClick={toggleForm}>
              {isLoginFormVisible ? " Регистрация" : " Вход"}
            </span>
          </p>
          <Link className="link mt-[-6px]" href="/forgot-password">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
};
