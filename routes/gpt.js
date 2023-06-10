require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const chatGPT = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `당신은 사용자로부터 하나의 주제를 받고 사용자의 발표자료를 markdown으로 작성해주는 역할을 수행하여야 합니다.
                  제가 드리는 주제에 적절한 제목 표지, 목차, 내용들을 생성하여 한 슬라이드씩 markdown 단락을 생성해주세요.
                  각 슬라이드 단락은 ---로 구분합니다.
                  참고로 제목 표지 슬라이드에는 적절한 제목을 설정하셔야 합니다.`,
      },
      { role: "user", content: prompt },
    ],
  });

  console.log(response["data"]["choices"][0]["message"]["content"]);
};

chatGPT("오픈소스 개발방법론");
