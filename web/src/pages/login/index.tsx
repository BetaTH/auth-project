import { EnvelopeSimple, Key } from "phosphor-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "../../components/Button";
import Input from "../../components/Input";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Email é requerido"),
    password: yup
      .string()
      .min(10, "A senha precisa ter no mínimo 10 caracteres")
      .required("Senha é requerida"),
  })
  .required();

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  async function onSubmit(data: LoginFormData) {
    console.log(data);
    await verificar();
    return null;
  }

  async function verificar() {
    return new Promise((resolve, reject) => setTimeout(resolve, 2000));
  }

  const { onBlur: onBlurEmail, ...registerEmail } = register("email");
  const { onBlur: onBlurPassword, ...registerPassword } = register("password");

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col items-center justify-center px-[13.05rem] py-[11.3rem] bg-gray-700 w-[72rem] h-fit m-auto rounded-[1.2rem] gap-xl shadow-md">
        <div className="flex flex-col gap-md items-center">
          <h1 className="text-gray-100 text-style-semibold-4xl">
            Bem-vindo de Volta!
          </h1>
          <h2 className="text-gray-100 text-style-regular-lg">
            Entre na sua conta
          </h2>
        </div>
        <form
          id="login-form"
          className="w-full flex flex-col gap-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            isFocused={false}
            label="Email"
            type="text"
            placeholder="Insira seu email"
            leftIcon={<EnvelopeSimple />}
            error={errors.email?.message}
            onBlurInput={onBlurEmail}
            {...registerEmail}
          />
          <Input
            isFocused={false}
            label="Senha"
            type="password"
            placeholder="Insira seu senha"
            leftIcon={<Key />}
            error={errors.password?.message}
            onBlurInput={onBlurPassword}
            {...registerPassword}
          />
          <Button
            type="submit"
            title="Login"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
