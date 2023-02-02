import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { serverSideAuth } from "../utils/functions/serverSiderAuth";

export default function Home() {
  const { user, signOff } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  function onHandleSignOff() {
    setIsLoading(true);
    signOff();
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center">
      <div className="w-[30rme] h-fit flex flex-col p-base items-center justify-center gap-6">
        <h1 className="text-gray-100 text-style-semibold-4xl">
          Você Está Logado!!
        </h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-100 text-style-regular-xl">
            Seu nome: {user?.name}
          </h2>
          <h2 className="text-gray-100 text-style-regular-xl">
            Seu email: {user?.email}
          </h2>
        </div>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          title="Sair"
          onClick={() => onHandleSignOff()}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = serverSideAuth(
  async (ctx, userData) => {
    if (userData) {
      return { props: { userData } };
    }
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
);
