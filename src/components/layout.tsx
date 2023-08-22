import { NavBar } from "~/components/NavBar";
import { poppins } from "~/utils/fonts";

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
      <>
        <main className={`${poppins.className} w-full`}>
            <NavBar />
            <div className="wrapper w-10/12 mx-auto mt-10">
                {children}
            </div>
        </main>
      </>
    )
  }