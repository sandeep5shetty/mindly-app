import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Share2, Trash2 } from "lucide-react";
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
}

export const PlaceCard = ({
  title,
  description,
  link,
  tags,
  type,
  images,
  className,
}: CardProps) => {
  const [contentType, setType] = useState(type);

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
      whileHover={{
        scale: 1.01,
        boxShadow: "0px 10px 30px -5px hsl(var(--foreground) / 0.1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      animate={{
        scale: 1,
        boxShadow: "0px 1px 3px 0px hsl(var(--foreground) / 0.1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        "w-full max-w-xs overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg ",
        className
      )}
    >
      <div className="relative group max-h-48 overflow-y-scroll link-section">
        <div>
          {contentType === "x" && (
            <div className="w-full rounded-b-none overflow-hidden">
              <TwitterEmbed url={`${link}`} />
            </div>
          )}
          {contentType === "facebook" && (
            <div className="w-full rounded-md overflow-scroll">
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
            <div className="w-full rounded-md overflow-scroll">
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
            <div className="w-full rounded-md overflow-scroll">
              <LinkedInEmbed url={`${link}`} width={320} height={500} />
            </div>
          )}
          {contentType === "threads" && (
            <div className="w-full  overflow-scroll">
              <blockquote
                className="text-post-media"
                data-text-post-permalink={`${link}`}
                data-text-post-version="0"
                id="ig-tp-DQOQfiODdwc"
              >
                {" "}
                <a href={`${link}`}>
                  <div> View on Threads</div>
                </a>
              </blockquote>
              <script async src="https://www.threads.com/embed.js"></script>
            </div>
          )}

          {contentType === "other" && (
            <a className="text-blue-600 underline" href={`${link}`}>
              {link}
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <motion.div variants={contentVariants} className="p-5 pt-3 space-y-4">
        <div className="flex justify-between">
          <div className="flex gap-1 ">
            {tags?.map((tag) => (
              <Badge
                key={tag._id}
                variant="outline"
                className="bg-background/70 backdrop-blur-sm"
              >
                {tag.title}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <Trash2 className="cursor-pointer hover:text-gray-400 duration-200" />
            <Share2 className="cursor-pointer hover:text-gray-400 duration-200" />
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
        <motion.p
          variants={itemVariants}
          className="text-sm text-muted-foreground leading-relaxed"
        >
          Type : {contentType}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center pt-2"
        >
          <Button className="group">
            View More
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
