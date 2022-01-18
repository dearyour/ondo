# 웹/모바일(웹 디자인) 스켈레톤 프로젝트

# dev

## commit messages

### The Type

The type is contained within the title and can be one of these types:

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Changes to documentation
- **style:** Formatting, missing semi colons, etc; no code change
- **refactor:** Refactoring production code
- **test:** Adding tests, refactoring test; no production code change
- **chore:** Updating build tasks, package manager configs, etc; no production code change

### The Subject

Subjects should be no greater than 50 characters, should begin with a capital letter and do not end with a period.

Use an imperative tone to describe what a commit does, rather than what it did. For example, use **change**; not changed or changes.

### The Body

Not all commits are complex enough to warrant a body, therefore it is optional and only used when a commit requires a bit of explanation and context. Use the body to explain the **what** and **why** of a commit, not the how.

When writing a body, the blank line between the title and the body is required and you should limit the length of each line to no more than 72 characters.

### The Footer

The footer is optional and is used to reference issue tracker IDs.

### simple ex

```
git commit -m "docs: add commit message description #1"
```

### Example Commit Message

```
feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

## 카테고리

| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :black_square_button: AI | :white_check_mark: JavaScript | :black_square_button: Vue.js |
| :white_check_mark: Mobile Web | :black_square_button: Big Data | :white_check_mark: TypeScript | :white_check_mark: React |
| :white_check_mark: Responsive Web | :black_square_button: Blockchain | :black_square_button: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :black_square_button: IoT | :black_square_button: C# | :white_check_mark: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :black_square_button: Python | :black_square_button: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :white_check_mark: Java | :white_check_mark: Spring/Springboot |
| | | :black_square_button: Kotlin | |

---

## 프로젝트 소개

* 프로젝트명: ondo(오늘의 도전)
* Description
  * 3일도 33번이면 100일
  * SNS 형식의 챌린지 서비스
  * 일찍 일어나기, 1일 1commit하기 등 계획 해놓고 잘 못 지키는 일이 있다면 오늘부터 3일만 도전해보세요



- 사용 기술과 특징
  - IDE
    - IntelliJ - Spring boot
      - 강력한 추천 기능
      - 다양한 리팩토링과 디버깅 기능
      - 이클립스의 Git에 비해 높은 자유도
      - Maven, Gradle과 같은 빌드 도구 지원
      - Git과 같은 버전 관리 시스템 기능 지원
    - VSCode - React
      - 쉽게 추가할 수 있는 Add On(Extension)
      - 협업 시 도움이 되는 직관적 UI/UX
  - Back-End
    - **Spring boot(2.2.2.RELEASE)** - 2.0.0부터 @Nullable, @NotNull, Java 11, Junit 5 지원.
  - Front-End
    - React
  - DB
    - **MariaDB**
  - CI/CD
    - Jenkins - 프로젝트 시, 개발자들의 commit, push 내용을 지속적으로 통합하여 빌드, 테스트하며 관리.

---

## 팀 소개
* 김용희: 팀장, 프론트엔드 개발
* 이민규: 백엔드 개발
* 박현우: 백엔드 개발
* 엄희성: 프론트엔드 개발
* 전건하: 프론트엔드 개발

---

## 프로젝트 상세 설명

