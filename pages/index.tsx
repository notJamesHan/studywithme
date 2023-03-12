import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import Layout from "@/components/Layout";
import SwiperDiv from "@/components/SwiperDiv";

interface HomeProps {
  popularVideos: any;
  newestVideos: any;
}

interface SearchProps {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
}

export default function Home({ popularVideos, newestVideos }: HomeProps) {
  return (
    <Layout hasTabBar>
      <Head>
        <title>Study With Me</title>
      </Head>
      <div className="my-16">
        <h1 className="text-center">Find your Study streamer.</h1>

        <div className="relative bg-slate-300 rounded-md aspect-video transition-transform w-72">
          <div className="inline-block align-middle absolute text-xs z-10 text-center px-1.5 py-0.5 bg-black rounded-md text-white bg-opacity-80 bottom-0 left-0 pointer-events-none m-2">
            {/* <span className="mr-1 indent-0">🔴</span> */}
            <span className="leading-3">
              {popularVideos.items[0].liveStreamingDetails.concurrentViewers !==
              undefined
                ? `${popularVideos.items[0].liveStreamingDetails.concurrentViewers} `
                : "0 "}
              Viewers
            </span>
          </div>
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={popularVideos.items[0].snippet.thumbnails.high.url}
            alt={`${popularVideos.items[0].snippet.channelTitle}'s thumbnail`}
            className="object-cover rounded-md"
          />
        </div>
      </div>

      <div className="my-16">
        <SwiperDiv
          id="popularVideo"
          title="📈 Popular"
          description="Find the most popular study with me."
          data={popularVideos}
        ></SwiperDiv>
      </div>
      <div className="my-16">
        <SwiperDiv
          id="newestVideo"
          title="🌟 Newest"
          description="Look out for the new people to study with."
          data={newestVideos}
        ></SwiperDiv>
      </div>
    </Layout>
  );
}

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://youtube.googleapis.com/youtube/v3/search";
const YOUTUBE_VIDEO_ITEMS_API =
  "https://youtube.googleapis.com/youtube/v3/videos";

export async function getServerSideProps() {
  // yt.search
  //   .list({
  //     part: ["snippet"],
  //     eventType: "live",
  //     q: "study with me",
  //     regionCode: "us",
  //     type: ["video"],
  //   })

  let videoIds: string[] = [];

  // Gets Video data from youtube V3 API (Statistics, Snippet)
  async function getVideos(videoids: string[]) {
    const videoRequest = await fetch(
      `${YOUTUBE_VIDEO_ITEMS_API}?part=snippet&part=liveStreamingDetails&id=${videoIds}&type=video&key=${process.env.YOUTUBE_API_KEY}`
    );
    const videoResponse = await videoRequest.json();
    return videoResponse;
  }

  const popularSearchRequest = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=id&eventType=live&maxResults=12&q=study%20with%20me&order=viewCount&type=video&key=${process.env.YOUTUBE_API_KEY}`
  );
  const popularSearchData = await popularSearchRequest.json();
  popularSearchData.items.forEach((element: SearchProps) => {
    videoIds.push(element.id.videoId);
  });

  let popularVideos = await getVideos(videoIds);
  videoIds = [];

  const newsetSearchRequest = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=id&eventType=live&maxResults=12&q=study%20with%20me&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
  );
  const newsetSearchData = await newsetSearchRequest.json();
  newsetSearchData.items.forEach((element: SearchProps) => {
    videoIds.push(element.id.videoId);
  });

  let newestVideos = await getVideos(videoIds);

  return {
    props: {
      popularVideos,
      newestVideos,
    },
  };
}
