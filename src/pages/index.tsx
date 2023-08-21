import Head from "next/head";
import { NavBar } from "~/components/NavBar";
import { cairo } from "~/utils/fonts";
// import { api } from "~/utils/api";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Livriq</title>
        <meta name="description" content="Elevating E-commerce Delivery, One Connection at a Time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full">
        <NavBar />
        <div className="wrapper w-10/12 mx-auto">
          <div className="flex flex-row gap-4 min-h-[80vh] items-center mx-auto">
            <div className="max-w-[60%] mx-auto">
              <h1 className="text-4xl font-semibold leading-[3rem] mb-4">
                Elevating E-commerce Delivery, One Connection at a Time.
              </h1>
              <p className={`${cairo.className} text-lg`}>
                The primary objective of <span className="font-semibold">Livriq</span> is to establish seamless connections between independent delivery professionals,
                delivery companies, and e-commerce sellers, thereby effectively managing the crucial delivery aspect of the e-commerce industry.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
