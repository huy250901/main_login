import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { setCookie } from "nookies";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { LoginFormValues } from "../../models/auth";
import "./login.css";
import { getTokenSourceMapRange } from "typescript";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { username: "", password: "" },
  });
  const { t } = useTranslation();
  let navigate = useNavigate();

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxOSwiaWF0IjoxNjgyNTgwNjAyfQ.nO-4LrST0bInLbZqYw0ACFYrcH9K9uksZE2dklAeTfI"

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch(
        "http://api.training.div3.pgtest.co/api/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.username,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.code === 200) {
        // Save the token in a cookie
        setCookie(null, "token", result.data.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
          path: "/", // cookie will be accessible for all pages in the domain
        });
        toast.success("Đăng nhập thành công!", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
        console.log(result.data);

        // Redirect to home page
      } else {
        toast.error("Đăng nhập thất bại!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const validateEmail = (value: string) => {
  //   let error;
  //   if (!value) {
  //     error = "Vui lòng nhập email";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
  //     error = "Email không hợp lệ";
  //   }
  //   return error;
  // };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Vui lòng nhập email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Email không hợp lệ";
    }
    return error;
  };

  // const validatePassword = (value: string) => {
  //   let error;
  //   if (!value) {
  //     error = "Vui lòng nhập mật khẩu";
  //   } else if (value.trim().length < 6) {
  //     error = "Mật khẩu phải có ít nhất 6 kí tự";
  //   }
  //   return error;
  // };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = "Vui lòng nhập mật khẩu";
    } else if (value.length < 6) {
      error = "Mật khẩu phải có ít nhất 6 kí tự";
    } else if (/\s/.test(value)) {
      return "Mật khẩu không được chứa dấu cách";
    }
    return error;
  };

  return (
    <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginTop: "32px" }}>
        <label>{t("email")} </label>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            validate: {
              emailValue: (value) => validateEmail(value),
            },
          }}
          render={({ field }) => <input className="input-login" {...field} />}
        />

        {errors.username && (
          <small className="text-danger">{errors.username.message}</small>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>{t("password")}</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            validate: {
              minLength: (value) => validatePassword(value),
            },
          }}
          render={({ field }) => (
            <input className="input-login" type="password" {...field} />
          )}
        />
        {errors.password && (
          <small className="text-danger">{errors.password.message}</small>
        )}
      </div>
      <div className="submit">
        <button className="button-login" type="submit">
          Đăng nhập
        </button>
        <NavLink to="/signup" className="button-login">
          Đăng kí
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
