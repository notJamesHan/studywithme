import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";

// import Swiper core and required modules
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface SwiperProps {
  id: string;
  title: string;
  description: string;
  data: any;
}

export default function SwiperDiv({
  id,
  title,
  description,
  data,
}: SwiperProps) {
  return (
    <div className="block px-7 max-w-7xl mx-auto my-0">
      <div className="flex justify-between items-center py-6">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p>{description}</p>
        </div>
        <div className="flex flex-nowrap">
          <button id={`${id}-prev`} className="custom-swiper-button-prev mr-3">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button id={`${id}-next`} className="custom-swiper-button-next">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-row">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: `#${id}-next`,
            prevEl: `#${id}-prev`,
          }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 1,
            },
            // when window width is >= 480px
            440: {
              slidesPerView: 2,
              spaceBetween: 0,
              slidesPerGroup: 2,
            },
            // when window width is >= 640px
            680: {
              slidesPerView: 3,
              spaceBetween: 0,
              slidesPerGroup: 3,
            },
            930: {
              slidesPerView: 4,
              spaceBetween: 0,
              slidesPerGroup: 4,
            },
          }}
        >
          {data?.items.map((video: any) => (
            <SwiperSlide key={video.id}>
              <Link
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
              >
                <div className="rounded-md p-2">
                  <div className="relative bg-slate-300 rounded-md aspect-video transition-transform">
                    <div className="inline-block align-middle absolute text-xs z-10 text-center px-1.5 py-0.5 bg-black rounded-md text-white bg-opacity-80 bottom-0 left-0 pointer-events-none m-2">
                      {/* <span className="mr-1 indent-0">🔴</span> */}
                      <span className="leading-3">
                        {video.liveStreamingDetails.concurrentViewers !==
                        undefined
                          ? `${video.liveStreamingDetails.concurrentViewers} `
                          : "0 "}
                        Viewers
                      </span>
                    </div>
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={video.snippet.thumbnails.high.url}
                      alt={`${video.snippet.channelTitle}'s thumbnail`}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm mt-2 font-medium text-gray-900  text-ellipsis line-clamp-1 ">
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
    </div>
  );
}
