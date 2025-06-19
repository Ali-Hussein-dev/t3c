import { createOpenAI } from '@ai-sdk/openai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createPerplexity } from '@ai-sdk/perplexity';
import { createXai } from '@ai-sdk/xai';

export type ProviderKey = 'openai' | 'deepseek' | 'anthropic' | 'perplexity' | 'xai';

export class CreateProvider {
  apiKey: string;
  constructor({apiKey}: {apiKey:string}) {
    this.apiKey = apiKey;
  }

  model(provider: ProviderKey) {
    switch (provider) {
      case 'openai':
        return createOpenAI({
          apiKey: this.apiKey,
          compatibility: 'strict',
        });
      case 'deepseek':
        return createDeepSeek({
          apiKey: this.apiKey
        });
      case 'anthropic':
        return createAnthropic({
          apiKey: this.apiKey
        });
      case 'perplexity':
        return createPerplexity({
          apiKey: this.apiKey
        });
      case 'xai':
        return createXai({
          apiKey: this.apiKey
        });
      default:
        throw new Error('Unsupported provider');
    }
  }
}
