import { useState } from "react";
import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  TwitterEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
interface CardProps {
  title: string;
  description: string;
  link?: string;
  tags?: [];
  type?: "youtube" | "linkedin" | "insta" | "x" | "facebook" | "other";
}

export default function CardComponent({
  title,
  description,
  link,
  tags,
  type,
}: CardProps) {
  const [contentType, setType] = useState(type);

  return (
    <div className="max-w-88 m-2 bg-gray-400 text-neutral-900 p-2 rounded-md">
      <h2 className="text-3xl font-medium py-2">{title}</h2>
      <p>{description}</p>

      {contentType === "x" && <TwitterEmbed url={`${link}`} />}
      {contentType === "facebook" && (
        <div className="w-full rounded-md overflow-hidden">
          <iframe
            src={`${link}`}
            width="270"
            height="270"
            // style={{border:none; overflow:hidden}}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      )}
      {contentType === "insta" && (
        <div className="w-full rounded-md overflow-hidden">
          <InstagramEmbed url={`${link}`} width={325} height={500} />
        </div>
      )}
      {contentType === "youtube" && (
        <div className="w-full rounded-md overflow-hidden">
          {" "}
          <YouTubeEmbed url={`${link}`} width={320} height={220} />{" "}
        </div>
      )}
      {contentType === "linkedin" && (
        <div className="w-full rounded-md overflow-hidden">
          <LinkedInEmbed url={`${link}`} width={335} height={500} />
        </div>
      )}
      {contentType === "other" && (
        <a className="text-blue-600 underline" href={`${link}`}>
          {link}
        </a>
      )}
    </div>
  );
}
