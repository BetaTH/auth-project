import { GetServerSideProps } from "next";
import Router from "next/router";
import Button from "../../components/Button";
import { serverSideAuthValidation } from "../../utils/functions/serverSideAuthVallidation";

export default function PublicRoute() {
  function onHandleGoToLogin() {
    Router.push("/login");
  }

  return (
    <div className="flex flex-col gap-5 w-full min-h-screen items-center justify-center">
      <div className="w-[30rme] h-fit flex flex-col p-base items-center justify-center gap-6">
        <h1 className="text-gray-100 text-style-semibold-4xl">
          Esta é uma rota publica!!
        </h1>
        <Button title="Login" onClick={() => onHandleGoToLogin()} />
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
