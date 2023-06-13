var express = require("express");
var router = express.Router();
require("dotenv").config({ path: "./.env" });

/* For Marpit */
const fs = require("fs");
const { Marpit } = require("@marp-team/marpit");
const path = require("path");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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
                  참고로 제목 표지 슬라이드에는 적절한 제목을 설정하셔야 합니다.

                  예시)
                  주제 : 효율적인 이슈 관리 방법
                  당신의 응답 :
                  # 효율적인 이슈 관리 방법
                  ---
                  ## 목차

                  1. 이슈 정의
                  2. 이슈 추적
                  3. 이슈 해결
                  4. 이슈 관리 도구
                  ---
                  ## 1. 이슈 정의
                  이슈를 올릴 때는 충분한 정보를 제공해야 하며, 어떤 문제가 발생했는지, 어떻게 발생했는지, 어떤 환경에서 발생했는지 등을 자세히 기술해야 합니다.
                  ---
                  ## 2. 이슈 추적
                  이슈를 추적하기 위해서는 이슈를 효율적으로 분류하고, 우선순위를 설정해야 합니다. 또한 이슈 상태를 표시하고, 담당자를 지정하여 추적해야 합니다.
                  ---
                  ## 3. 이슈 해결
                  이슈 해결을 위해서는 커뮤니케이션과 협업이 매우 중요합니다. 이슈를 담당하고 있는 개발자나 커뮤니티 구성원들끼리 협력하여 문제를 해결해야 합니다. 또한 이슈 해결에 대한 정보를 적극적으로 공유하여 다른 이슈를 해결하는 데에도 도움이 되어야 합니다.
                  ---
                  ## 4. 이슈 관리 도구
                  이슈 관리를 위해 다양한 도구들이 존재합니다. Github, Jira, Trello 등이 대표적인 이슈 관리 도구입니다. 이슈 관리 도구를 효율적으로 활용하여 이슈 추적과 해결을 편리하게 할 수 있습니다.
                  `,
      },
      { role: "user", content: prompt },
    ],
    temperature: 0,
  });

  return response["data"]["choices"][0]["message"]["content"];
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { session: req.session });
});

// 첫 번째 ChatGPT 돌리기
router.post("/subject", async (req, res, next) => {
  const body = req.body;
  const subject = body.subject;

  const response = await chatGPT(subject);

  console.log(response);

  res.json({
    chatGPT: response,
  });
});

/* 테마선택 */
// const availableThemes = {
//   default: marpit.defaultTheme,
//   // customTheme1: `
//   //   /* Custom Theme 1 CSS */
//   // `,
//   // customTheme2: `
//   //   /* Custom Theme 2 CSS */
//   // `,
//   customTheme1: fs.readFileSync("폴더/sample1.css", "utf8"),
//   customTheme2: fs.readFileSync("폴더/sample2.css", "utf8"),
//   customTheme3: fs.readFileSync("폴더/sample3.css", "utf8"),
//   customTheme4: fs.readFileSync("폴더/sample4.css", "utf8"),
//   customTheme5: fs.readFileSync("폴더/sample5.css", "utf8"),

// };

const availableThemes = {
  default: Marpit.defaultTheme,
  customTheme1: "public/theme/sample.css",
  customTheme2: "public/theme/sample2.css",
  customTheme3: "public/theme/sample3.css",
  customTheme4: "public/theme/sample4.css",
  customTheme5: "public/theme/sample5.css",
};


router.post("/createPPT", async (req, res, next) => {
  const body = req.body;
  const response = body.chatGPT; // ChatGPT 응답을 받아옵니다.
  const selectedTheme = body.theme; // 사용자가 선택한 테마로 지정합니다.

  // Markdown 생성
  const markdown =
  `
  ---
  theme: default
  paginate: true
  ---

  ${response}
  `;

  // Marpit 인스턴스 생성 및 테마 추가
  const marpit = new Marpit();
  const selectedThemeCSS = availableThemes[selectedTheme];
  if (selectedThemeCSS) {
    marpit.themeSet.default = marpit.themeSet.add(
      fs.readFileSync(selectedThemeCSS, "utf8")
    );
  } else {
    marpit.themeSet.default = marpit.defaultTheme;
  }

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
  // const pptFilePath = "example.html";

  // res.download(pptFilePath, "example.html", (err) => {
  //   // 다운로드 후 임시 파일 삭제
  //   fs.unlinkSync(pptFilePath);
  // });
});

module.exports = router;
