import Image from "next/image";
import Link from "next/link";

interface VideosFlexProps {
  videosData: any;
}

export default function VideosFlex({ videosData }: VideosFlexProps) {
  return (
    <div>
      {videosData?.items.map((video: any) => (
        <Link
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          key={video.id}
        >
          <div className="rounded-md p-2">
            <div className="relative bg-slate-300 rounded-md aspect-video transition-transform">
              <div className="inline-block align-middle absolute text-xs z-10 text-center px-1.5 py-0.5 bg-black rounded-md text-white bg-opacity-80 bottom-0 left-0 pointer-events-none m-2">
                {/* <span className="mr-1 indent-0">🔴</span> */}
                <span className="leading-3">
                  {video.liveStreamingDetails.concurrentViewers !== undefined
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
      ))}
    </div>
  );
}
