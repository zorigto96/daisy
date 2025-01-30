import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>приложение зорика</title>
      </Head>
      <main>
        <nav>
          <menu>
            <li>
              <Link href={"/calculator"}>Calculator</Link>
            </li>
          </menu>
        </nav>
      </main>
    </>
  );
}
