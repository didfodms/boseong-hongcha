const { Marpit } = require("@marp-team/marpit");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const chatGPT = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  console.log(response["data"]["choices"][0]["message"]["content"]);
  return response["data"]["choices"][0]["message"]["content"];
};

// 1. Create instance (with options if you want)
const marpit = new Marpit();

// 2. Add theme CSS
const theme = `
/* @theme example */

section {
  background-color: #369;
  color: #fff;
  font-size: 30px;
  padding: 40px;
}

h1,
h2 {
  text-align: center;
  margin: 0;
}

h1 {
  color: #8cf;
}
`;
marpit.themeSet.default = marpit.themeSet.add(theme);

// 3. Render markdown
const markdown = `

# Hello, Marpit!

Marpit is the skinny framework for creating slide deck from Markdown.

---

## Ready to convert into PDF!

You can convert into PDF slide deck through Chrome.

`;

const chatResponse = chatGPT(
  "저는 오픈소스 라이센스에 대해 발표를 진행하려고 합니다. 마크다운 언어로 정리해주세요. 생성된 마크다운 언어는 Marp 앱으로 ppt를 생성할 예정이니 참고하셔서 목차 별로 슬라이드를 구분하여 마크 다운 언어를 생성해주세요."
);

// const { html, css } = marpit.render(chatResponse);

const { html, css } = marpit.render(markdown);

// 4. Use output in your HTML
const htmlFile = `
<!DOCTYPE html>
<html><body>
  <style>${css}</style>
  ${html}
</body></html>
`;

fs.writeFileSync("example.html", htmlFile.trim());
