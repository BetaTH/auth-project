import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import Button from "../components/Button";
import { AuthContext, User } from "../contexts/AuthContext";
import { api } from "../lib/axios/api";

interface HomeProps {
  userData: User;
}

export default function Home({ userData }: HomeProps) {
  const { user, setUser, signOff } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  setUser(userData);

  function onHandleSignOff() {
    setIsLoading(true);
    signOff();
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 w-full min-h-screen items-center justify-center">
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
        full={false}
        onClick={() => onHandleSignOff()}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["nextwebauth.token"]: access_token } = parseCookies(ctx);
  if (!access_token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await api.get<User>("/user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status !== 200) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { userData: response.data },
  };
};
