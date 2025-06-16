import { Slider } from "@/src/components/ui/slider";
import { CiSettings } from "react-icons/ci";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { modelsMap, ModelDetails, ModelKey } from "@/src/constants/models";
import { useModelsStore } from "@/src/hooks/use-models-store";
import * as React from "react";

type SliderConfigType = {
  component: "slider";
  name: string;
  label: string;
  description: string;
  default: number;
  value?: number;
  min: number;
  max: number;
  step: number;
};

const SliderConfig = ({
  name,
  label,
  default: defaultValue,
  value,
  min,
  max,
  step,
  handleUpdate,
}: Omit<SliderConfigType, "component"> & {
  handleUpdate: ({ value, name }: { value: number; name: string }) => void;
}) => {
  return (
    <div className="w-full pb-2">
      <DropdownMenuLabel className="px-0 flex justify-between">
        {label}
        <span>{value || defaultValue}</span>
      </DropdownMenuLabel>
      <Slider
        defaultValue={[defaultValue]}
        value={[value || defaultValue]}
        min={min}
        max={max}
        step={step}
        className="w-full"
        onValueChange={(value) => {
          handleUpdate({
            value: value[0],
            name: name,
          });
        }}
      />
    </div>
  );
};

export function LlmConfigDropdownMenu({
  llm,
}: {
  llm: keyof typeof modelsMap;
}) {
  const llmsDetails = useModelsStore((s) => s.modelsDetails);
  const selectedModel = llmsDetails[llm];
  const selectedModelOptions = llmsDetails[llm]?.options || {};

  const setLlmDetails = useModelsStore((s) => s.setModelsDetails);
  const list = Object.values(selectedModelOptions) as SliderConfigType[];
  const handleUpdate = ({
    name,
    value,
  }: {
    /**
     * eg: name: "temperature", "Max token"
     * value: 1
     */
    name: string;
    value: number;
  }) => {
    const llmDetails = {
      [llm]: {
        ...selectedModel,
        options: {
          ...selectedModelOptions,
          [name]: {
            // @ts-expect-error fix later
            ...selectedModelOptions[name],
            value: value,
          },
        },
      },
    } as { [key in ModelKey]: ModelDetails };
    setLlmDetails(llmDetails);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <CiSettings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[16rem]" align="end">
        <DropdownMenuLabel>
          Customize <span className="font-bold">{selectedModel?.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuGroup className="p-2 space-y-1">
          {list
            ?.filter((o) => o.component === "slider")
            ?.map((o) => (
              <DropdownMenuItem key={o.name}>
                <SliderConfig
                  name={o.name}
                  value={o.value}
                  min={o.min}
                  max={o.max}
                  step={o.step || 1}
                  label={o.label}
                  description={o.description}
                  default={o.default}
                  handleUpdate={handleUpdate}
                />
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
