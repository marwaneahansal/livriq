import { NavBar } from "~/components/NavBar";
import { poppins } from "~/utils/fonts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main
        className={`${poppins.className} w-full bg-background text-foreground light`}
      >
        <NavBar />
        <div className="wrapper mx-auto mt-2 w-10/12">{children}</div>
      </main>
    </>
  );
}
