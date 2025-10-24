import { useState } from "react";

interface CardProps {
  title: string;
  description: string;
  link?: string;
  type?: "youtube" | "twitter" | "other";
}

export default function CardComponent({
  title,
  description,
  link,
  type,
}: CardProps) {
  const [contentType, setType] = useState(type);

  return (
    <div className="max-w-72 m-2 bg-white text-neutral-900 p-2 rounded-md">
      <h2 className="text-3xl font-medium py-2">{title}</h2>
      <p>{description}</p>
      {contentType === "twitter" && (
        <div className="w-full ">
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              It&#39;s GSoC season again. <br></br>If you have any questions or
              need tips, comment below.{" "}
              <a href="https://t.co/QK0ADhLCo7">pic.twitter.com/QK0ADhLCo7</a>
            </p>
            &mdash; Asish Kumar (@asishcodes){" "}
            <a href={`${link}`}>October 23, 2025</a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
      )}

      {contentType === "youtube" && (
        <div className="w-full">
          <iframe
            className="w-full rounded-md"
            width="290"
            height="200"
            src={`${link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
