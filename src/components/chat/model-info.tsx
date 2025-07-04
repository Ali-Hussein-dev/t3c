"use client";
import { modelsMap } from "@/src/constants/models";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import * as React from "react";
import { useModelsStore } from "@/src/hooks/use-models-store";
import { logosIcons } from "./llms-select";

const ApiKeyInput = ({
  providerId,
  apiKey,
}: {
  providerId: string;
  apiKey?: string;
}) => {
  const [value, setValue] = React.useState<string | undefined>(apiKey);
  const setApiKey = useModelsStore((s) => s.setApiKeys);
  React.useEffect(() => {
    setValue(apiKey);
  }, [apiKey]);
  const onSave = () => {
    setApiKey(providerId, value || "");
    toast.success("API key saved locally");
  };
  const onDelete = () => {
    setApiKey(providerId, "");
    setValue(undefined);
    toast.success("API key deleted locally");
  };
  return (
    <div className="flex gap-2 items-center">
      <Input
        placeholder={`Enter your API key for ${providerId}`}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        type="password"
      />
      {apiKey && (
        <Button onClick={onDelete} type="button" variant="outline">
          Delete
        </Button>
      )}
      {value !== apiKey && (
        <Button
          onClick={onSave}
          disabled={!value}
          type="button"
          variant="outline"
        >
          Save
        </Button>
      )}
    </div>
  );
};

export const ModelInfo = ({
  name,
  provider,
  description,
  urls,
  providerId,
}: (typeof modelsMap)[keyof typeof modelsMap]) => {
  const Logo = logosIcons[providerId as keyof typeof logosIcons];
  const apiKeys = useModelsStore((s) => s.apiKeys);
  return (
    <Card className="border-border/40 dark:border-border/10 bg-card/80 pb-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Logo />
          {provider} / {name}
        </CardTitle>
        <CardDescription>
          <p className="">{description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ApiKeyInput providerId={providerId} apiKey={apiKeys[providerId]} />
      </CardContent>
      <CardFooter className="border-t border-border/40 dark:border-border/10 pb-3 [.border-t]:pt-3">
        <Button variant="outline" asChild className="">
          <a href={urls.pricing}>
            Pricing
            <ExternalLinkIcon className="ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
