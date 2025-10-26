import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Share2, Trash2 } from "lucide-react";
import {
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandThreads,
  IconBrandX,
  IconWorld,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InstagramEmbed,
  LinkedInEmbed,
  TwitterEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";

type TagType = {
  _id: string;
  title: string;
};

// Interface for component props for type safety and reusability
interface CardProps {
  id: string;
  title: string;
  description: string;
  link?: string;
  tags?: TagType[];
  type:
    | "youtube"
    | "linkedin"
    | "insta"
    | "x"
    | "facebook"
    | "threads"
    | "other"
    | undefined;
  images?: string[];
  className?: string;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
}

export const PlaceCard = ({
  id,
  title,
  description,
  link,
  tags,
  type,
  images,
  className,
  onDelete,
  onShare,
}: CardProps) => {
  const [contentType, setType] = useState(type);

  // Function to get brand icon based on content type
  const getBrandIcon = (type: string | undefined) => {
    const iconProps = { size: 32, className: "text-muted-foreground" };

    switch (type) {
      case "youtube":
        return (
          <IconBrandYoutube
            {...iconProps}
            className="text-black dark:text-white"
          />
        );
      case "insta":
        return (
          <IconBrandInstagram
            {...iconProps}
            className="text-black dark:text-white"
          />
        );
      case "facebook":
        return (
          <IconBrandFacebook
            {...iconProps}
            className="text-black dark:text-white"
          />
        );
      case "linkedin":
        return (
          <IconBrandLinkedin
            {...iconProps}
            className="text-black dark:text-white"
          />
        );
      case "threads":
        return (
          <IconBrandThreads
            {...iconProps}
            className="text-black dark:text-white"
          />
        );
      case "x":
        return (
          <IconBrandX {...iconProps} className="text-black dark:text-white" />
        );
      default:
        return <IconWorld {...iconProps} />;
    }
  };

  // Animation variants for staggering content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      variants={contentVariants}
      animate={{
        scale: 1,
        boxShadow: "0px 1px 3px 0px hsl(var(--foreground) / 0.1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        "w-full max-sm:w-[85%] max-w-xs overflow-hidden  rounded-xl border bg-card text-card-foreground shadow-lg hover:scale-102 duration-200",
        className
      )}
    >
      <div className="relative group max-h-60 overflow-y-scroll scrollbar-hide link-section">
        <div>
          {contentType === "x" && (
            <div className="w-full rounded-b-none overflow-hidden">
              <TwitterEmbed url={`${link}`} />
            </div>
          )}
          {contentType === "facebook" && (
            <div className="w-full rounded-md overflow-scroll scrollbar-hide">
              <iframe
                src={`${link}`}
                width="320"
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
            <div className="w-full rounded-md overflow-scroll scrollbar-hide">
              <InstagramEmbed url={`${link}`} width={325} height={500} />
            </div>
          )}
          {contentType === "youtube" && (
            <div className="w-full  overflow-hidden">
              {" "}
              <YouTubeEmbed url={`${link}`} width={320} height={220} />{" "}
            </div>
          )}
          {contentType === "linkedin" && (
            <div className="w-full rounded-md overflow-scroll scrollbar-hide">
              <LinkedInEmbed url={`${link}`} width={320} height={500} />
            </div>
          )}
          {contentType === "threads" && (
            <div className="w-full overflow-scroll scrollbar-hide">
              <blockquote
                className="text-post-media"
                data-text-post-permalink={`${link}`}
                data-text-post-version="0"
                id="ig-tp-DQOQfiODdwc"
              >
                {" "}
                <a href={`${link}`}>
                  <div className="text-center"> Loading.....</div>
                </a>
              </blockquote>
              <script async src="https://www.threads.com/embed.js"></script>
            </div>
          )}

          {contentType === "other" && (
            <a
              className="text-blue-600 underline text-center inline-block"
              target="_blank"
              href={`${link}`}
            >
              {link}
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <motion.div
        variants={contentVariants}
        className="max-md:p-2  p-5 pt-3 max-md:pt-3 space-y-4 max-md:space-y-2"
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-1 flex-wrap">
            {tags?.map((tag, index) => (
              <Badge
                key={tag._id || tag.title || index}
                variant="outline"
                className="bg-gray-300 text-neutral-900 backdrop-blur-sm px-2 py-0.5"
              >
                {tag.title}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            {onDelete && (
              <Trash2
                className="cursor-pointer hover:text-gray-400 duration-200"
                onClick={() => onDelete(id)}
              />
            )}
            {onShare && (
              <Share2
                className="cursor-pointer hover:text-gray-400 duration-200"
                onClick={() => onShare(id)}
              />
            )}
          </div>
        </div>
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-start"
        >
          <h3 className="text-xl font-bold">{title}</h3>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm text-muted-foreground leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center pt-2"
        >
          <Button
            className="group cursor-pointer"
            onClick={() => {
              if (link) {
                window.open(link, "_blank", "noopener,noreferrer");
              }
            }}
            disabled={!link}
          >
            View More
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            {getBrandIcon(contentType)}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
