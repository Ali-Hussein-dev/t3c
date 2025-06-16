import { providersConfigs } from "./llm-configs";


export const modelsMap = {
  "gpt-4o": {
    id: "gpt-4o",
    name: "GPT-4o",
    description:
      "OpenAI's most capable and cost effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks.",
    providerId: "openai",
    provider: "OpenAI",
    logo: "openai",
    options: providersConfigs.openai,
    urls: {
      pricing: "https://platform.openai.com/docs/pricing",
    },
  },
  "gpt-4o-mini": {
    id: "gpt-4o-mini",
    name: "GPT-4o-mini",
    description:
      "OpenAI's most capable and cost effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks.",
    provider: "OpenAI",
    providerId: "openai",
    logo: "openai",
    urls: {
      pricing: "https://platform.openai.com/docs/pricing",
    },
    options: providersConfigs.openai,
  },
  "deepseek-chat": {
    id: "deepseek-chat",
    name: "deepseek-chat",
    description:
      "DeepSeek's most capable and cost effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks.",
    providerId: "deepseek",
    provider: "DeepSeek",
    logo: "deepseek",
    urls: {
      pricing: "https://platform.deepseek.com/docs/pricing",
    },
    options: providersConfigs.deepseek,
  },
  "claude-3-5-sonnet-latest": {
    id: "claude-3-5-sonnet-latest",
    name: "claude-3-5-sonnet-latest",
    description:
      "Anthropic's most capable and cost effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks.",
    providerId: "anthropic",
    provider: "Anthropic",
    logo: "anthropic",
    urls: {
      pricing: "https://platform.anthropic.com/docs/pricing",
    },
    options: providersConfigs.anthropic,
  },
  sonnar: {
    id: "sonnar",
    name: "sonnar",
    description:
      "Perplexity's lightweight offering with search grounding, quicker and cheaper than Sonar Pro.",
    providerId: "perplexity",
    provider: "Perplexity",
    logo: "perplexity",
    urls: {
      pricing: "https://docs.perplexity.ai/docs/pricing",
    },
    options: providersConfigs.perplexity,
  },
  "sonnar-pro": {
    id: "sonnar-pro",
    name: "sonnar-pro",
    description:
      "Perplexity's lightweight offering with search grounding, quicker and cheaper than Sonar Pro.",
    providerId: "perplexity",
    provider: "Perplexity",
    logo: "perplexity",
    urls: {
      pricing: "https://docs.perplexity.ai/docs/pricing",
    },
    options: providersConfigs.perplexity,
  },
} as const;

export type ModelKey = keyof typeof modelsMap;

export type ModelDetails = {
  id: ModelKey;
  name: string;
  description: string;
  providerId: string;
  provider: string;
  logo: string;
  options: (typeof providersConfigs)[keyof typeof providersConfigs];
  urls: {
    pricing: string;
  };
};

// export const ModelsKeys = Object.keys(modelsMap);
export const modelsList = Object.values(modelsMap);

export const groupedModelsByProvider = modelsList.reduce((acc, model) => {
  if (!acc[model.providerId]) {
    acc[model.providerId] = [];
  }
  acc[model.providerId].push(model);
  return acc;
}, {} as Record<string, typeof modelsList>);


// export const groupedModelsByProvider = Object.groupBy(modelsList, model => model.providerId);