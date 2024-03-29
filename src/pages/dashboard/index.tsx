import Head from "next/head";
import { LuPackage } from "react-icons/lu";
import { StatisticCard } from "~/components/Dashboard/StatisticCard";
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
      <SetupModal />
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-5">
          {!isLoading && <div>{currentUser?.role}</div>}
          <div className="mb-4 flex w-full items-center space-x-8">
            <StatisticCard
              icon={<LuPackage size={28} />}
              title="Total Commandes"
              statistic="20"
            />
            <StatisticCard
              icon={<LuPackage size={28} />}
              title="Total Commandes"
              statistic="20"
            />
            <StatisticCard
              icon={<LuPackage size={28} />}
              title="Total Commandes"
              statistic="20"
            />
            <StatisticCard
              icon={<LuPackage size={28} />}
              title="Total Commandes"
              statistic="20"
            />
          </div>
        </div>
      </div>
    </>
  );
}

Dashbaord.auth = {
  unauthorized: "http://localhost:3000/signin",
};
