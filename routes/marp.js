const { Marpit } = require("@marp-team/marpit");
const fs = require("fs");

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
  color: #fff;
}
`;
marpit.themeSet.default = marpit.themeSet.add(theme);

// 3. Render markdown
const markdown = `# 오픈소스 개발방법론

---

## 목차

1. 오픈소스란?
2. 오픈소스의 개발 방법론
    1. 분산 개발
    2. 코드 공유와 협업 방식
    3. 이슈 관리 시스템
3. 오픈소스로 기여하기
    1. 버그 리포트 및 수정
    2. 기능 추가 및 코드 개선
    3. 문서 및 번역 기여
4. 오픈소스의 장단점
    1. 장점
    2. 단점
5. 마무리

---

## 1. 오픈소스란?

- 모든 소스코드를 공개하고 누구나 수정하고 배포할 수 있는 소프트웨어 개발 방식
- 라이선스에 따라 자유롭게 사용, 수정, 배포, 복제 가능
- 대표적인 예시: 리눅스 운영체제

---

## 2. 오픈소스의 개발 방법론

### 2-1. 분산 개발

- 모든 개발자들이 동일한 소스코드를 공유하며 함께 개발
- 여러 개발자들이 동시에 작업 가능

### 2-2. 코드 공유와 협업 방식

- 모든 개발자들의 코드가 공유되어 서로 코드를 수정, 검토 가능
- 다수의 개발자들이 함께 코드를 개발, 검토하며 품질이 좋아짐

### 2-3. 이슈 관리 시스템

- 버그 리포트와 수정, 새로운 기능 제안 등을 관리하며 개발 진행
- 개발자와 사용자 간의 의사소통 창구 역할을 함

---

## 3. 오픈소스로 기여하기

### 3-1. 버그 리포트 및 수정

- 오픈소스에서 발견된 버그를 발견하여 이슈 관리 시스템에 보고, 필요하다면 수정도 가능
- 오픈소스 개발 프로젝트의 품질 향상에 일조함

- 자유롭게 수정, 배포 가능하므로 변화가 빠름
- 이슈 관리를 통한 사용자와 개발자 간의 개방적인 의사소통 가능

---

## 4. 단점

- 중복 개발, 유지보수의 어려움 등 프로젝트 통합 문제 발생 가능
- 코드의 보호나 라이선스 적용 등에 관한 여러 문제점 존재

---

## 5. 마무리

- 오픈소스는 개발 방법론과 동시에 철학임
- 개발자로서 오픈소스의 장점을 잘 활용하고 단점을 극복해 나가며 더욱 발전하는 개발문화를 만들어나가야 함`;

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
fs.writeFileSync("example2.html", htmlFile.trim());
fs.writeFileSync("example3.html", htmlFile.trim());
fs.writeFileSync("example4.html", htmlFile.trim());
fs.writeFileSync("example5.html", htmlFile.trim());
