import { CreateProvider } from "@/src/services/model-service";

import { streamText } from "ai";

export const POST = async (req: Request) => {
  const body = await req.json();
  const providerService = new CreateProvider({
    apiKey: body.apiKey,
  });

  const provider = providerService.model(body.provider);
  const options= body.options || {} 
  try {
    const result = streamText({
      model: provider(body.model),
      messages: body.messages,
      ...options
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error as string }), {
      status: 500,
    });
  }
};
