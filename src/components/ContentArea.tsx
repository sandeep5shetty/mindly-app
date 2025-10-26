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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagsInputComponent } from "@/components/ui/tags-input";
import { ContentTypeCombobox } from "@/components/ui/content-type-combobox";
import { PlaceCard } from "./PlaceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IconPlus, IconShare3 } from "@tabler/icons-react";

type TagType = {
  _id: string;
  title: string;
};

interface ContentItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  link?: string;
  tags: TagType[];
  type?:
    | "youtube"
    | "linkedin"
    | "insta"
    | "x"
    | "facebook"
    | "threads"
    | "other"
    | undefined;
  createdAt?: string;
}

export const ContentArea = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [contentType, setContentType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Helper function to sort contents by createdAt (newest first)
  const sortContentsByDate = (contentArray: ContentItem[]): ContentItem[] => {
    return contentArray.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // Sort contents by createdAt in descending order (newest first)
        const sortedContents = sortContentsByDate(res.data.data);
        setContents(sortedContents);
      })
      .catch((error) => {
        console.error("Failed to fetch contents:", error);
      });
  }, []);

  // Helper function to extract src attribute value for Facebook and LinkedIn
  const extractSrcFromIframe = (inputLink: string, type: string): string => {
    // Check if the type is facebook or linkedin
    if (type !== "facebook" && type !== "linkedin") {
      return inputLink; // Return original link if not facebook or linkedin
    }

    // Extract src attribute value using regex
    const srcMatch = inputLink.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      console.log(`Extracted src from ${type}:`, srcMatch[1]);
      return srcMatch[1];
    }

    // Return original link if no src attribute found
    return inputLink;
  };

  const handleCreateContent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Extract src from iframe for facebook and linkedin content
      const processedLink = extractSrcFromIframe(link, contentType);

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/create`,
        {
          link: processedLink, // Use processed link instead of original
          type: contentType,
          title: title,
          description: desc,
          tags: tags,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Response : ", res.data.data);
      // Add new content at the beginning since it's the newest
      const newContent = res.data.data;
      const updatedContents = [newContent, ...contents];

      // Sort to maintain chronological order (newest first)
      const sortedContents = sortContentsByDate(updatedContents);

      setContents(sortedContents);
      console.log("_________________");
      console.log("Now contents are : ", sortedContents);

      // Reset form
      setTitle("");
      setDesc("");
      setLink("");
      setContentType("");
      setTags([]);
    } catch (error) {
      console.error("Failed to create content:", error);
    }
  };

  const handleShareContents = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    setIsSharing(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/share`,
        {
          share: true,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Share API response:", res.data);

      if (res.data.hash) {
        // Create frontend share link instead of using backend link
        const currentOrigin = window.location.origin;
        const frontendShareLink = `${currentOrigin}/shared?id=${res.data.hash}`;
        console.log("Current origin:", currentOrigin);
        console.log("Generated frontend share link:", frontendShareLink);
        setShareLink(frontendShareLink);
      } else {
        console.log("No hash found in response");
        // Fallback: if no hash, try to extract it from the backend link
        if (res.data.link && res.data.link.includes("id=")) {
          const hashFromLink = res.data.link.split("id=")[1];
          const frontendShareLink = `${window.location.origin}/shared?id=${hashFromLink}`;
          console.log("Extracted hash from link:", hashFromLink);
          console.log(
            "Generated fallback frontend share link:",
            frontendShareLink
          );
          setShareLink(frontendShareLink);
        }
      }
    } catch (error) {
      console.error("Failed to generate share link:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleStopSharing = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      toast.error("Authentication required");
      return;
    }

    const stopSharingPromise = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/share`,
      {
        share: false,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    toast.promise(stopSharingPromise, {
      loading: "Stopping content sharing...",
      success: () => {
        // Clear the share link when sharing is stopped
        setShareLink("");
        console.log("Content sharing stopped");
        // Close the dropdown after stopping sharing
        setIsDropdownOpen(false);
        return "Content sharing stopped ";
      },
      error: (error) => {
        console.error("Failed to stop", error);
        return "Failed to stop";
      },
    });
  };

  const handleDropdownOpen = () => {
    // Dropdown opened - no automatic link generation
    // User will manually click "Generate Link" button
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      toast.success("Share link Copied");
      // Close the dropdown after copying
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Failed to Copy", error);
      toast.error("Failed to Copy");
    }
  };

  const handleShareIndividualContent = async (contentId: string) => {
    try {
      // Find the content to get its link and title
      const content = contents.find((c) => (c._id || c.id) === contentId);

      if (!content) {
        toast.error("Content not found");
        return;
      }

      const contentTitle = content.title || "content";
      const contentLink = content.link;

      if (!contentLink) {
        toast.error("Link not available for this content");
        return;
      }

      // Copy the content's link to clipboard
      await navigator.clipboard.writeText(contentLink);

      // Show success feedback
      console.log(`Content link copied to clipboard: ${contentLink}`);

      // Success toast notification
      toast.success(`Link Copied`);
    } catch (error) {
      console.error("Failed to copy content link:", error);
      toast.error("Failed to copy");
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      toast.error("Authentication required");
      return;
    }

    // Find the content to get its title for better UX
    const content = contents.find((c) => (c._id || c.id) === contentId);
    const contentTitle = content?.title || "content";

    const deletePromise = axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/?id=${contentId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    toast.promise(deletePromise, {
      loading: `Deleting...`,
      success: (res) => {
        if (res.status === 202) {
          // Remove the deleted content from the state
          setContents((prevContents) =>
            prevContents.filter((content) => content._id !== contentId)
          );
          console.log("Content deleted successfully");
          return "Content deleted successfully";
        }
        return "Content deleted!";
      },
      error: (error) => {
        console.error("Failed to delete", error);
        return `Failed to delete "${contentTitle}"`;
      },
    });
  };

  return (
    <div className="flex flex-1 h-full">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:px-10 dark:border-neutral-700 dark:bg-neutral-900 overflow-hidden">
        <div className="flex gap-2 justify-center mt-4 shrink-0">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="default" className="cursor-pointer">
                  <IconPlus className="h-4 w-4 " />
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
                    <ContentTypeCombobox
                      value={contentType}
                      onChange={setContentType}
                      placeholder="Select content type"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tags">Tags</Label>
                    <TagsInputComponent
                      value={tags}
                      onChange={setTags}
                      placeholder="Add tags"
                    />
                    {tags.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        Type a tag and press Enter to add it
                      </p>
                    )}
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

          {/* Share Contents Dropdown */}
          <DropdownMenu
            open={isDropdownOpen}
            onOpenChange={(open) => {
              setIsDropdownOpen(open);
              if (open) {
                handleDropdownOpen();
              }
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                Share Contents
                <IconShare3 className="h-4 w-4 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4 max-sm:mr-3">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Share your contents</h4>
                <div className="flex items-center space-x-2">
                  <Input
                    value={isSharing ? "Generating link..." : shareLink}
                    readOnly
                    className="flex-1 text-xs"
                    placeholder={
                      isSharing
                        ? "Generating link..."
                        : "Share link will appear here"
                    }
                  />
                  <Button
                    size="sm"
                    onClick={handleCopyToClipboard}
                    className="px-3 cursor-pointer"
                    disabled={isSharing || !shareLink}
                  >
                    {copySuccess ? "Copied!" : "Copy"}
                  </Button>
                </div>

                {/* Conditional button based on share link existence */}
                <div className="flex justify-center pt-2">
                  {!shareLink ? (
                    <Button
                      size="sm"
                      onClick={handleShareContents}
                      className="text-xs cursor-pointer"
                      disabled={isSharing}
                    >
                      {isSharing ? "Generating..." : "Generate Link"}
                    </Button>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground mb-2">
                        Anyone with this link can view your shared contents
                      </p>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleStopSharing}
                        className="text-xs cursor-pointer"
                      >
                        Stop Sharing
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* <div>
        <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/C1y0eb8RNFX/?utm_source=ig_embed&amp;utm_campaign=loading"
        data-instgrm-version="14"
        ></blockquote>
        <script async src="//www.instagram.com/embed.js"></script>
      </div> */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 my-6 justify-items-center place-items-center gap-4">
            {contents.map((content: ContentItem, index: number) => (
              <PlaceCard
                key={content._id || content.id || index}
                id={content._id || content.id || index.toString()}
                title={content.title}
                description={content.description}
                link={content.link}
                type={content.type}
                tags={content.tags}
                onDelete={handleDeleteContent}
                onShare={handleShareIndividualContent}
              />
            ))}

            {/* <PlaceCard
              key={index}
              title={"This is Title"}
              description={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, numquam iure"
              }
              type={"youtube"}
              tags={["vsfvsf", "sdvvsv"]}
              link={"https://youtu.be/9JyLwotmPYA?si=Fk4iWPR61x_zcM7A"}
            />
 */}
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
