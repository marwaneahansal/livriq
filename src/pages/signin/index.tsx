import { signIn } from "next-auth/react";
import Head from "next/head";
import { cairo } from "~/utils/fonts";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Livriq - Sign in</title>
        <meta
          name="description"
          content="Elevating E-commerce Delivery, One Connection at a Time."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-20 flex flex-col items-center justify-center gap-4">
        <div className="flex w-full max-w-lg flex-1 flex-col items-center justify-center space-y-5">
          <div className="mb-4 flex flex-col space-y-2 text-center">
            <h2 className="text-xl font-bold md:text-4xl">
              Sign in to account
            </h2>
            <p className={`text-md md:text-xl ${cairo.className}`}>
              Sign in to your account to continue
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col space-y-5">
            <input
              type="text"
              placeholder="Username"
              className="flex rounded-lg border-2 border-black px-3 py-2 font-medium placeholder:font-normal md:px-4 md:py-3"
            />
            <button className="flex flex-none items-center justify-center rounded-lg border-2 border-black bg-black px-3 py-2 font-medium text-white md:px-4 md:py-3">
              Sign In
            </button>
            <div className="flex items-center justify-center">
              <span className="w-full border border-black"></span>
              <span className="px-4">Or</span>
              <span className="w-full border border-black"></span>
            </div>
            <button
              className="relative flex flex-none items-center justify-center rounded-lg border-2 border-black px-3 py-2 font-medium md:px-4 md:py-3"
              onClick={() =>
                void signIn("google", {
                  callbackUrl: "http://localhost:3000/dashboard",
                })
              }
            >
              <span className="absolute left-4">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#EA4335 "
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
              </span>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
