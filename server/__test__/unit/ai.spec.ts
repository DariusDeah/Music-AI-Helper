import { AIClient } from "../../libs/ai-client/ai-client.libs";
import OpenAI from "openai";

jest.mock("openai");

const mockedProvider = <jest.Mock<OpenAI>>(<unknown>OpenAI);

describe("when using AI client lib", () => {
  let aiClient: AIClient;
  beforeEach(() => {
    aiClient = new AIClient({
      defaultTemperature: 0.7,
      model: "gpt-3.5-turbo",
      provider: new mockedProvider(),
    });
  });

  it("should call provider chat creation when .createChatCompletion().execute() is called", async () => {
    const chatRequest = [{ content: "test", role: "user" }];
    await aiClient.createChatCompletion(chatRequest).execute();

    expect(mockedProvider.chat.completions.create).toHaveBeenCalledWith(
      chatRequest
    );
  });
});
