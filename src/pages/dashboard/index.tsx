import Head from "next/head";
import { SetupModal } from "~/components/SetupModal";
import { api } from "~/utils/api";

export default function Dashbaord() {
  const { data: currentUser } = api.users.getUser.useQuery();

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
      {!currentUser?.isCompleted && <SetupModal currentUser={currentUser} />}
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-5">
          <div className="mb-4 flex w-full flex-col space-y-2 text-center">
            <h2 className="text-xl font-bold md:text-4xl">
              Welcome to your dashboard
            </h2>
            <h3>
              {currentUser?.isCompleted
                ? "Sign Up Completed"
                : "Sign Up Not Completed"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

Dashbaord.auth = {
  unauthorized: "http://localhost:3000/signin",
};
