"use client";

import { TagsInput } from "@ark-ui/react/tags-input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function TagsInputComponent({
  value,
  onChange,
  placeholder = "Add tag",
  label,
  className,
}: TagsInputProps) {
  return (
    <div className={cn("w-full", className)}>
      <TagsInput.Root
        value={value}
        onValueChange={(details) => onChange(details.value)}
      >
        <TagsInput.Context>
          {(tagsInput) => (
            <>
              {label && (
                <TagsInput.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {label}
                </TagsInput.Label>
              )}
              <TagsInput.Control className="flex flex-wrap gap-1 p-2 border border-input rounded-md bg-background min-h-9 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:border-ring">
                {tagsInput.value.map((value, index) => (
                  <TagsInput.Item
                    key={index}
                    index={index}
                    value={value}
                    className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm"
                  >
                    <TagsInput.ItemPreview className="flex items-center gap-1">
                      <TagsInput.ItemText>{value}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger className="flex items-center justify-center w-4 h-4 hover:bg-secondary/80 rounded transition-colors">
                        <X className="w-3 h-3" />
                      </TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput className="bg-transparent border-none outline-none text-sm" />
                  </TagsInput.Item>
                ))}
                <TagsInput.Input
                  placeholder={placeholder}
                  className="flex-1 min-w-20 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                />
              </TagsInput.Control>
              {tagsInput.value.length > 0 && (
                <TagsInput.ClearTrigger className="mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Clear all
                </TagsInput.ClearTrigger>
              )}
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </div>
  );
}
