import { Button, Link } from "@nextui-org/react";
import Head from "next/head";
import { api } from "~/utils/api";

export default function Dashbaord() {
  const { data: userData } = api.users.getUser.useQuery();

  console.log(userData);

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
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-5">
          <div className="mb-4 flex w-full flex-col space-y-2 text-center">
            {!userData?.isCompleted && (
              <div className="w-full p-2">
                <div className="flex w-full items-center justify-between rounded-md bg-red-500 px-6 py-2 text-white">
                  <span>You Sign up setup is not finished.</span>
                  <Button
                    variant="bordered"
                    color="danger"
                    className="border-white text-white"
                  >
                    finish you setup
                  </Button>
                </div>
              </div>
            )}
            <h2 className="text-xl font-bold md:text-4xl">
              Welcome to your dashboard
            </h2>
            <h3>
              {userData?.isCompleted
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
