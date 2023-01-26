import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// import Swiper core and required modules
import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
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

  return (
    <Layout hasTabBar>
      <Head>
        <title>StudyWithMe</title>
      </Head>
      <div className="p-4">
        <h2 className="text-2xl font-bold">📈 Popular</h2>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-right",
            prevEl: ".swiper-button-left",
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          <button className="swiper-button-left">Left</button>
          <button className="swiper-button-right">Right</button>
          {popularVideos?.items.map((video: any) => (
            <SwiperSlide key={video.id}>
              <Link
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
              >
                <div className="rounded-md p-2 bg-gray-400">
                  <div className="relative bg-slate-300 rounded-md aspect-video hover:scale-105 transition-transform">
                    <div className="text-xs z-10  flex items-center justify-center text-center absolute px-1.5 py-1.5 leading-5 bg-black rounded-md text-white bg-opacity-80 bottom-0 left-0 pointer-events-none m-2">
                      {/* <span className="mr-1 indent-0">🔴</span> */}
                      <span className="leading-3">
                        {video.liveStreamingDetails.concurrentViewers} Viewers
                      </span>
                    </div>
                    <Image
                      fill
                      sizes="100vw"
                      src={video.snippet.thumbnails.standard.url}
                      alt={`${video.snippet.channelTitle}'s thumbnail`}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm mt-2 font-medium text-gray-900 max-h-16 text-ellipsis line-clamp-1 ">
                      {video.snippet.title}
                    </h3>
                    <div>
                      <p className="text-xs text-ellipsis line-clamp-1 ">
                        {video.snippet.channelTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
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
