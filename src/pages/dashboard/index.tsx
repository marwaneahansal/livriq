import Head from "next/head";
import { SetupModal } from "~/components/SetupModal";
import { api } from "~/utils/api";

export default function Dashbaord() {
  const { data: currentUser, isLoading } = api.users.getUser.useQuery();

  return (
    <>
      <Head>
        <title>Livriq - Dashboard</title>
        <meta
          name="description"
          content="Elevating E-commerce Delivery, One Connection at a Time."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && !currentUser?.isCompleted && <SetupModal />}
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-5">
          {!isLoading && <div>{currentUser?.role}</div>}
        </div>
      </div>
    </>
  );
}

Dashbaord.auth = {
  unauthorized: "http://localhost:3000/signin",
};
