import {
  groupedModelsByProvider,
  ModelKey,
  modelsList,
} from "@/src/constants/models";
import { Button } from "@/src/components/ui/button";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { OpenAILogo } from "@/src/components/icons/openai";
import { DeepseekLogo } from "@/src/components/icons/deepseek";
import { useChatStore } from "@/src/hooks/use-chat-store";
import { AnthropicLogo } from "@/src/components/icons/anthropic";
import { PerplexityLogo } from "@/src/components/icons/perplexity";

export const logosIcons = {
  openai: OpenAILogo,
  deepseek: DeepseekLogo,
  anthropic: AnthropicLogo,
  perplexity: PerplexityLogo,
};

export function LllmSelect({
  llm,
  onChange,
}: {
  llm: string | undefined;
  onChange: (llm: ModelKey) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const provider = useChatStore((s) => s.provider);
  const Logo = logosIcons[provider as keyof typeof logosIcons];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="size-4">
              <Logo />
            </span>
            {llm
              ? modelsList.find((model) => model.id === llm)?.name
              : "Select model..."}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search model..." className="h-9" />
          <CommandList className="px-1 py-2">
            <CommandEmpty>No model found.</CommandEmpty>
            {Object.entries(groupedModelsByProvider).map(
              ([provider, models]) => {
                const Logo =
                  logosIcons[models[0].providerId as keyof typeof logosIcons];
                return (
                  <>
                    <CommandGroup key={provider} className="space-y-2 mb-3 border-b border-border/50">
                      <div className="font-semibold flex items-center gap-2 mb-1 px-2">
                        <span className="size-4">
                          <Logo />
                        </span>
                        <div className="flex items-center justify-between w-full">
                          {models[0].provider}
                          {/* <span className="font-normal">{models.length}</span> */}
                        </div>
                      </div>
                      {models.map((model) => {
                        // const Logo = logos[model.providerId as keyof typeof logos];
                        return (
                          <CommandItem
                            key={model.name}
                            value={model.id}
                            onSelect={(currentValue) => {
                              onChange(currentValue as ModelKey);
                              useChatStore.persist.rehydrate();
                              setOpen(false);
                            }}
                          >
                            <span className="size-4 border rounded-full bg-muted/80 border-border/50"></span>
                            {model.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                llm === model.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </>
                );
              }
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
