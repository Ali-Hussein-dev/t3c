const common = {
  temperature: {
    name: "temperature",
    label: "Temperature",
    description:
      "Control the randomness of the return text. Lower is less random.",
      step: 0.1,
  },
  maxTokens: {
    label: "Max Tokens",
    name:"maxTokens",
    description: "Controls the maximum number of tokens to generate.",
    step: 10,
  },
  maxOutputTokens: {
    label: "Max Output Tokens",
    name:"maxOutputTokens",
    description: "Controls the maximum number of tokens to return.",
    step: 10,
  },
  topP: {
    label: "Top P",
    name:"topP",
    description:
    "Controls the cumulative probability of the most likely tokens to return.",
    step: 0.1,
  },
  topK: {
    label: "Top K",
    name:"topK",
    description:
    "Controls the size of the set of most-likely tokens to sample from.",
    step: 1,
    },
  frequencyPenalty: {
    label: "Frequency Penalty",
    name:"topKfrequencyPenalty",
    description:
    "How much to penalize tokens based on their frequency in the text so far",
    step: 0.01,
  },
  presencePenalty: {
    label: "Presence Penalty",
    name:"topKpresencePenalty",
    description:
      "How much to penalize tokens based on if they have appeared in the text so far",
    step: 0.1,
  },
};

export const providersConfigs = {
  openai: {
    temperature: {
      ...common.temperature,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 2,
      step: 0.1,
    },
    maxTokens: {
      ...common.maxTokens,
      component: "slider",
      default: 4096,
      value: undefined,
      min: 300,
      max: 8192,
      step: 10,
    },
    topP: {
      ...common.topP,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 1,
    },
    frequencyPenalty: {
      ...common.frequencyPenalty,
      component: "slider",
      default: 0.1,
      value: undefined,
      min: 0.01,
      max: 1,
      step: 0.01,
    },
    presencePenalty: {
      ...common.presencePenalty,
      component: "slider",
      default: 0,
      value: undefined,
      min: -2,
      max: 2,
      step: 0.1,
    },
  },
  deepseek: {
    temperature: {
      ...common.temperature,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 2,
    },
    maxTokens: {
      ...common.maxTokens,
      component: "slider",
      default: 4096,
      value: undefined,
      min: 300,
      max: 8192,
    },
    topP: {
      ...common.topP,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 1,
    },
    topK: {
      ...common.topK,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 2048,
    },
    frequencyPenalty: {
      ...common.frequencyPenalty,
      component: "slider",
      default: 0.1,
      value: undefined,
      min: 0.01,
      max: 1,
    },
    presencePenalty: {
      ...common.presencePenalty,
      component: "slider",
      default: 0,
      value: undefined,
      min: -2,
      max: 2,
    },
  },
  anthropic:{
    temperature: {
      ...common.temperature,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 2,
    },
    maxOutputTokens: {
      ...common.maxOutputTokens,
      component: "slider",
      default: 4096,
      value: undefined,
      min: 300,
      max: 8192,
    },
    topP: {
      ...common.topP,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 1,
    },
    topK: {
      ...common.topK,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 2048,
    },
    frequencyPenalty: {
      ...common.frequencyPenalty,
      component: "slider",
      default: 0.1,
      value: undefined,
      min: 0.01,
      max: 1,
    },
    presencePenalty: {
      ...common.presencePenalty,
      component: "slider",
      default: 0,
      value: undefined,
      min: -2,
      max: 2,
    },
  },
  perplexity:{
    temperature: {
      ...common.temperature,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 2,
    },
    maxOutputTokens: {
      ...common.maxOutputTokens,
      component: "slider",
      default: 4096,
      value: undefined,
      min: 300,
      max: 8192,
    },
    topP: {
      ...common.topP,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 1,
    },
    topK: {
      ...common.topK,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 2048,
    },
    frequencyPenalty: {
      ...common.frequencyPenalty,
      component: "slider",
      default: 0.1,
      value: undefined,
      min: 0.01,
      max: 1,
    },
    presencePenalty: {
      ...common.presencePenalty,
      component: "slider",
      default: 0,
      value: undefined,
      min: -2,
      max: 2,
    },
  },
  xai:{
    temperature: {
      ...common.temperature,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 2,
    },
    maxOutputTokens: {
      ...common.maxOutputTokens,
      component: "slider",
      default: 4096,
      value: undefined,
      min: 300,
      max: 8192,
    },
    topP: {
      ...common.topP,
      component: "slider",
      default: 1,
      value: undefined,
      min: 0.01,
      max: 1,
    },
  }
} as const;
