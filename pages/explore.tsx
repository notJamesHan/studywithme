import Head from "next/head";
import Layout from "@/components/Layout";
import VideosFlex from "@/components/VideosFlex";

interface VideosFlexProps {
  data: any;
  exploreTitle: string;
  description: string;
}

export default function Explore({
  data,
  exploreTitle,
  description,
}: VideosFlexProps) {
  return (
    <Layout hasTabBar hasFooter>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="">
        <div className="mr-3">
          <h1 className="text-lg font-bold">{exploreTitle}</h1>
          <p className="">{description}</p>
        </div>
        <VideosFlex data={data}></VideosFlex>
      </div>
    </Layout>
  );
}
