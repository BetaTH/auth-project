import { EnvelopeSimple, Key } from "phosphor-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useContext } from "react";
import { AuthContext, RegisterFormData } from "../../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { serverSideAuthValidation } from "../../utils/functions/serverSideAuthVallidation";

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
    confirmPassword: yup
      .string()
      .required("Senha é requerida")
      .oneOf([yup.ref("password"), null], "Senhas não são iguas"),
  })
  .required();

export default function Register() {
  const { signUp } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: yupResolver(schema) });

  async function onSubmit(data: RegisterFormData) {
    console.log(data);
    try {
      await signUp(data);
    } catch (error: any) {
      if (error.response?.data?.statusCode === 409) {
        setError("email", { message: "Email já cadastrado" });
      } else {
        console.log(error);
        alert("Erro desconhecido");
      }
    }
  }

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col items-center justify-center px-[13.05rem] py-[8rem] bg-gray-700 w-[72rem] h-fit m-auto rounded-[1.2rem] gap-xl shadow-md">
        <div className="flex flex-col gap-md items-center">
          <h1 className="text-gray-100 text-style-semibold-4xl">
            Registre-se Aqui!
          </h1>
          <h2 className="text-gray-100 text-style-regular-lg">
            Crie uma nova conta
          </h2>
        </div>
        <form
          id="login-form"
          className="w-full flex flex-col gap-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-col gap-xs">
            <Input
              isFocused={false}
              label="Email"
              type="text"
              placeholder="Insira seu email"
              leftIcon={<EnvelopeSimple />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              isFocused={false}
              label="Senha"
              type="password"
              placeholder="Insira seu senha"
              leftIcon={<Key />}
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              isFocused={false}
              label="Confirme Sua Senha"
              type="password"
              placeholder="Insira novamente sua senha"
              leftIcon={<Key />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { redirect, userData } = await serverSideAuthValidation(ctx);
  if (redirect) return redirect;

  return {
    props: { userData: userData },
  };
};
