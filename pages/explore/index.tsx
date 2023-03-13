import Head from "next/head";
import Layout from "@/components/Layout";
import VideosFlex from "@/pages/explore/VideosFlex";

interface VideosFlexProps {
  videosData: any;
}

interface SearchProps {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
}

export default function Explore({ videosData }: VideosFlexProps) {
  return (
    <Layout hasTabBar hasFooter>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="">
        <div className="mr-3">
          {/* <h1 className="text-lg font-bold">{exploreTitle}</h1> */}
          {/* <p className="">{description}</p> */}
        </div>
        <VideosFlex videosData={videosData}></VideosFlex>
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
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=id&eventType=live&maxResults=12&q=study%20with%20me&order=viewCount&type=video&key=${process.env.YOUTUBE_API_KEY}`
  );
  const popularSearchData = await popularSearchRequest.json();
  popularSearchData.items.forEach((element: SearchProps) => {
    videoIds.push(element.id.videoId);
  });

  let videosData = await getVideos(videoIds);

  return {
    props: {
      videosData,
    },
  };
}
