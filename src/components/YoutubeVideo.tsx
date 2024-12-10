import YouTube from "react-youtube";

interface Props {
  url: string;
}

const YouTubeVideo = ({ url }: Props) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const v = urlParams.get("v");
  const opts = {
    width: "100%",
    height: "100%",
  };

  return (
    <div className="fullscreen-video">
      <YouTube videoId={v!} opts={opts} />
    </div>
  );
};

export default YouTubeVideo;
