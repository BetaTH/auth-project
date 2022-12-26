import { EnvelopeSimple, Key } from "phosphor-react";
import Input from "../../components/Input";

export default function Login() {
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
        <form id="login-form" className="w-full flex flex-col gap-lg">
          <Input
            label="Email"
            type="text"
            placeholder="Insira seu email"
            leftIcon={<EnvelopeSimple />}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Insira seu senha"
            leftIcon={<Key />}
          />
        </form>
      </div>
    </div>
  );
}
