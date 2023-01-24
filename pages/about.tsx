import Head from "next/head";

import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout hasTabBar>
      <Head>
        <title>About</title>
      </Head>
      <div>
        <h2>About Me</h2>
      </div>
    </Layout>
  );
}
