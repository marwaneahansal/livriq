import Head from "next/head";

export default function SignUpFinish() {
    return (
        <>
            <Head>
                <title>Livriq - Finsh Signing Up</title>
                <meta name="description" content="Elevating E-commerce Delivery, One Connection at a Time." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col items-center justify-center gap-4 mt-20">
                <div className="flex flex-1 flex-col justify-center items-center space-y-5 w-full max-w-lg">
                    <div className="flex flex-col space-y-2 text-center mb-4">
                        <h2 className="text-xl md:text-4xl font-bold">Finish Your Sign Up</h2>
                    </div>
                </div>
            </div>
        </>
    );
}


SignUpFinish.auth = {
    unauthorized: "http://localhost:3000/signin",
};