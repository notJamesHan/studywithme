import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Layout from "@/components/Layout";

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

export default function Home({ popularVideos }: HomeProps) {
  // yt.search
  //   .list({
  //     part: ["snippet"],
  //     eventType: "live",
  //     q: "study with me",
  //     regionCode: "us",
  //     type: ["video"],
  //   })
  console.log(popularVideos);
  return (
    <Layout hasTabBar>
      <Head>
        <title>StudyWithMe</title>
      </Head>
      <div>
        <h2>Popular</h2>
        <div className="flex flex-row">
          {popularVideos?.items.map((video: any) => (
            <Link
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
            >
              <div className="block px-4 py-4 w-72 shadow-md rounded-md">
                <div className="relative rounded-md bg-slate-300 aspect-video">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                    src={video.snippet.thumbnails.standard.url}
                    alt={`${video.snippet.channelTitle}'s thumbnail`}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="block text-base mt-2 font-medium text-gray-900 max-h-16 text-ellipsis line-clamp-2">
                    {video.snippet.title}
                  </h3>
                  <div>
                    <p className="text-sm">{video.snippet.channelTitle}</p>
                    <p className="text-sm">
                      {video.liveStreamingDetails.concurrentViewers} Watching
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://youtube.googleapis.com/youtube/v3/search";
const YOUTUBE_VIDEO_ITEMS_API =
  "https://youtube.googleapis.com/youtube/v3/videos";

export async function getServerSideProps() {
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
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=id&eventType=live&maxResults=4&q=study%20with%20me&order=viewCount&type=video&key=${process.env.YOUTUBE_API_KEY}`
  );
  const popularSearchData = await popularSearchRequest.json();
  popularSearchData.items.forEach((element: SearchProps) => {
    videoIds.push(element.id.videoId);
  });

  let popularVideos = await getVideos(videoIds);
  videoIds = [];

  // const newsetSearchRequest = await fetch(
  //   `${YOUTUBE_PLAYLIST_ITEMS_API}?part=id&eventType=live&maxResults=12&q=study%20with%20me&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
  // );
  // const newsetSearchData = await newsetSearchRequest.json();
  // newsetSearchData.items.forEach((element: SearchProps) => {
  //   videoIds.push(element.id.videoId);
  // });

  // let newestVideos = await getVideos(videoIds);

  return {
    props: {
      popularVideos,
    },
  };
}
