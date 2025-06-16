import {
  groupedModelsByProvider,
  ModelKey,
  modelsList,
} from "@/src/constants/models";
import { Button } from "@/src/components/ui/button";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { useModelsStore } from "@/src/hooks/use-models-store";
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
  onSelectModel,
}: {
  llm: string | undefined;
  onSelectModel: (llm: ModelKey) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const provider = useModelsStore((s) => s.provider);
  const apiKeys = useModelsStore((s) => s.apiKeys);

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
            <div className="size-4">
              <Logo />
            </div>
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
                const hasApiKey = apiKeys[provider];
                return (
                  <>
                    <CommandGroup
                      key={provider}
                      className="space-y-2 mb-3 border-b border-border/50"
                    >
                      <div className="font-semibold flex items-center gap-2 mb-1 px-2">
                        <div className="size-4">
                          <Logo />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          {models[0].provider}
                          {/* <span className="font-normal">{models.length}</span> */}
                          {hasApiKey && (
                            <span className="size-3 border rounded-full bg-green-500 border-green-600" />
                          )}
                        </div>
                      </div>
                      {models.map((model) => {
                        // const Logo = logos[model.providerId as keyof typeof logos];
                        return (
                          <CommandItem
                            key={model.name}
                            value={model.id}
                            onSelect={(currentValue) => {
                              onSelectModel(currentValue as ModelKey);
                              useModelsStore.persist.rehydrate();
                              setOpen(false);
                            }}
                          >
                            <div className="size-5 border rounded-full border-border/50 grid place-items-center">
                              {llm === model.id && <Check className="size-3" />}
                            </div>
                            {model.name}
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
