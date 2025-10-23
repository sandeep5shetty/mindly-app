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

export const ContentArea = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex gap-2 justify-center mt-4">
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
                      placeholder="Enter content title"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="Enter content description"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="link">Link</Label>
                    <Input
                      id="link"
                      name="link"
                      placeholder="Enter content link"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      name="type"
                      placeholder="Enter content type"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Content</Button>
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
        <CardComponent
          title={"I am Title"}
          description={"This is a temp description"}
        />
      </div>
    </div>
  );
};
