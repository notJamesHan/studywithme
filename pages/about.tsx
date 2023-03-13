import Image from "next/image";

import Head from "next/head";
import Layout from "@/components/Layout";

import TestPic from "../assets/epic.jpg";

export default function About() {
  return (
    <Layout hasTabBar hasFooter>
      <Head>
        <title>About</title>
      </Head>
      <div className="flex justify-center">
        <div className="mr-3">
          <h1 className="text-lg font-bold">About</h1>
          <p className="">
            This website was made to inspire people to study harder.
          </p>
        </div>
        <Image
          width="400"
          height="500"
          src={TestPic}
          alt="Study Pictures"
        ></Image>
      </div>
    </Layout>
  );
}
