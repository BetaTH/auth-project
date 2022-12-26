import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { AuthContext, User } from "../contexts/AuthContext";
import { api } from "../lib/axios/api";

export default function Home() {
  const { user } = useContext(AuthContext);

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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["nextwebauth.token"]: nextwebauth } = parseCookies(ctx);
  try {
    const user = await api.get<User>("/user/me");
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
