import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardComponent from "./CardComponent";
import { useEffect, useState } from "react";
import axios from "axios";

interface ContentItem {
  id?: string;
  title: string;
  description: string;
  link?: string;
  type?: "youtube" | "linkedin" | "insta" | "x" | "facebook" | "other";
}

export const ContentArea = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [contentType, setContentType] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.dGVzdA.QLMkWa1hvtQ5xjuVw3RECAAqljek89WLMAAj--EJ3YI",
        },
      })
      .then((res) => {
        setContents(res.data.data);
      });
  }, []);

  const handleCreateContent = async () => {
    console.log("To be passed title: ", title);
    console.log("To be passed desc: ", desc);
    console.log("To be passed link: ", link);
    console.log("To be passed type: ", contentType);
    console.log("To be passed tags: ", tags);

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/create`,
      {
        link: link,
        type: contentType,
        title: title,
        tags: [],
      },
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.dGVzdA.QLMkWa1hvtQ5xjuVw3RECAAqljek89WLMAAj--EJ3YI",
        },
      }
    );

    console.log("Response : ", res.data.data);
    setContents([...contents, res.data.data]);
    console.log("_________________");
    console.log("Now contents are : ", [...contents, res.data.data]);
  };

  return (
    <div className="flex flex-1 h-full">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900 overflow-hidden">
        <div className="flex gap-2 justify-center mt-4 shrink-0">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="default" className="cursor-pointer">
                  {" "}
                  Create Content
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Content</DialogTitle>
                  <DialogDescription>
                    Add new content by filling out the details below. Click save
                    when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Enter content title"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      placeholder="Enter content description"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="link">Link</Label>
                    <Input
                      id="link"
                      name="link"
                      value={link}
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                      placeholder="Enter content link"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      name="type"
                      value={contentType}
                      onChange={(e) => {
                        setContentType(e.target.value);
                      }}
                      placeholder="Enter content type"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="cursor-pointer"
                      onClick={handleCreateContent}
                    >
                      Save Content
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>

        {/* <div>
        <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/C1y0eb8RNFX/?utm_source=ig_embed&amp;utm_campaign=loading"
        data-instgrm-version="14"
        ></blockquote>
        <script async src="//www.instagram.com/embed.js"></script>
      </div> */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 my-6 justify-items-center place-items-center gap-4">
            {contents.map((content: ContentItem, index: number) => (
              <CardComponent
                key={index}
                title={content.title}
                description={content.description}
                link={content.link}
                type={content.type}
              />
            ))}
            {/*  <CardComponent
              key={15}
              title={"hey there"}
              description={"this is a simple desc"}
              link={
                "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0ndNs6TCiEaiEVNzJnDud8ptxD8Do6btY2eTHFg7c98yLoN5DXyhpoUUA14y63cLul%26id%3D100068696243760&show_text=false&width=500"
              }
              type={"facebook"}
            />
            <CardComponent
              key={16}
              title={"hey there"}
              description={"this is a simple desc"}
              link={
                "https://twitter.com/PixelAndBracket/status/1356633038717923333"
              }
              type={"x"}
            />
            <CardComponent
              key={20}
              title={"hey there"}
              description={"this is a simple desc"}
              // link={"https://www.instagram.com/p/CUbHfhpswxt/"}
              link={"https://www.instagram.com/p/C1y0eb8RNFX/"}
              type={"insta"}
            />
            <CardComponent
              key={21}
              title={"hey there"}
              description={"this is a simple desc"}
              // link={"https://www.instagram.com/p/CUbHfhpswxt/"}
              link={"https://www.instagram.com/p/DQMWoIckiPh/"}
              type={"insta"}
            />
            <CardComponent
              key={17}
              title={"hey there"}
              description={"this is a simple desc"}
              // link={"https://www.youtube.com/watch?v=d-qqom30TZA"}
              link={"https://youtu.be/ENmCaY5M3v4?si=ScBwPP0A5bl5lRY4"}
              type={"youtube"}
            />
            <CardComponent
              key={18}
              title={"hey there"}
              description={"this is a simple desc"}
               link={
                "https://www.linkedin.com/embed/feed/update/urn:li:share:6892528764350185473"
              } 
              link={
                "https://www.linkedin.com/embed/feed/update/urn:li:share:7385671313589317632?collapsed=1"
              }
              type={"linkedin"}
            />
            <CardComponent
              key={19}
              title={"hey there"}
              description={"this is a simple desc"}
              link={
                "https://twitter.com/PixelAndBracket/status/1356633038717923333"
              }
              type={"other"}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
