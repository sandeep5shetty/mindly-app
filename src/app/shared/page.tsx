"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { PlaceCard } from "@/components/PlaceCard";
import { ModeToggle } from "@/components/ui/ModeToggle";

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
}

interface ApiResponse {
  data?: ContentItem[];
  message?: string;
  [key: string]: unknown;
}

function SharedContentsContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState<ApiResponse | null>(null);
  const searchParams = useSearchParams();
  const shareId = searchParams.get("id");

  useEffect(() => {
    const fetchSharedContents = async () => {
      if (!shareId) {
        setError("No share ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contents/?id=${shareId}`;

        const response = await axios.get(apiUrl);

        setDebugInfo(response.data);

        if (response.data.data && Array.isArray(response.data.data)) {
          setContents(response.data.data);
        } else {
          setError("No contents found in the shared link.");
        }
      } catch (error) {
        console.error("Failed to fetch shared contents:", error);
        setError(
          "Failed to load shared contents. The link may be invalid or expired."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedContents();
  }, [shareId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p>Loading shared contents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Unable to Load Contents</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Please check the link and try again, or contact the person who
            shared this link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-800">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            <span className="font-medium text-black dark:text-white">
              Mindly - Shared Contents
            </span>
          </div>
          <ModeToggle />
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        {contents.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Contents Found</h2>
            <p className="text-muted-foreground">
              This user hasn&apos;t shared any contents yet.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Share ID: {shareId} | Contents count: {contents.length}
            </p>
            {debugInfo && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm">Debug Info</summary>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Shared Contents</h1>
              <p className="text-muted-foreground">
                Viewing {contents.length} shared{" "}
                {contents.length === 1 ? "item" : "items"}
              </p>
              <p className="text-xs text-muted-foreground">
                Share ID: {shareId}
              </p>
            </div>

            <div className="grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center place-items-center">
              {contents.map((content: ContentItem, index: number) => (
                <PlaceCard
                  id={content._id || content.id || index.toString()}
                  key={content._id || content.id || index}
                  title={content.title}
                  description={content.description}
                  link={content.link}
                  type={content.type}
                  tags={content.tags}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SharedContentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
            <p>Loading shared contents...</p>
          </div>
        </div>
      }
    >
      <SharedContentsContent />
    </Suspense>
  );
}
