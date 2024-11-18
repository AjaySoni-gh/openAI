import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import RecipeWriter from "./components/RecipeWriter";

export default function Home() {
  return (
    <main  className="flex 1 flex-col">
      <section className=" flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className=" bg-teal-500 flex flex-col space-y-5 justify-center items-center order-1 lg:-order-1 pb-10">

          <Image src="/images/logo.png" width={200} height={200}  alt="Logo" className="pt-10" />

          <Button asChild className="px-20 bg-teal-700 p-10 text-xl transition-transform transform hover:scale-105 hover:bg-teal-800 ">
            <Link href ="/stories">Explore Library</Link>
          </Button>
         
        </div>
        <RecipeWriter />
      </section>
    </main>
  );
}
