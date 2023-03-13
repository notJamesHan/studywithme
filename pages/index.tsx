import Link from "next/link";
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
  console.log(popularVideos);
  return (
    <Layout hasTabBar hasFooter>
      <Head>
        <title>Study With Me</title>
      </Head>
      <div className="my-16">
        <h1 className="text-center mb-10 font-medium text-2xl">
          Find your Study Streamer.
        </h1>

        <div className="flex flex-row justify-center">
          <div className="relative overflow-hidden w-full aspect-video mr-6 max-w-lg">
            <iframe
              className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-md"
              src={`https://www.youtube.com/embed/${popularVideos.items[0].id}?&autoplay=1&mute=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="relative bg-slate-300 rounded-md w-72 p-3">
            <h1 className="text-xl font-semibold">Featured Stream</h1>
            <Link
              href={`https://www.youtube.com/watch?v=${popularVideos.items[0].id}`}
              target="_blank"
            >
              <h3 className="mt-2 underline font-semibold">
                {popularVideos.items[0].snippet.channelTitle}
              </h3>
            </Link>
            <h5 className="text-sm">{popularVideos.items[0].snippet.title}</h5>
            <p className="mt-2 text-sm">
              Watch study stream to learn more about something like is water
              wet?
            </p>
          </div>
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
