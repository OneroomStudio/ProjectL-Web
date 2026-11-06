# ProjectL-Web

주식회사 원룸스튜디오 홈페이지입니다. GitHub Pages에서 빌드 없이 정적 HTML/CSS로 제공됩니다.

- `index.html`: 회사 소개 (로고·JOURNEY·연락처)
- `more/`: 기존 앱 약관·개인정보·계정 삭제·연령 등급 안내. 스토어 등록 정보에서 참조할 수 있어 URL을 유지하며, 메뉴에는 노출하지 않습니다.
- `home/`: 예전 `/home/` 주소를 `/`로 넘기는 리다이렉트

## 로컬 미리보기

```sh
npx serve .
```

## 배포

`main` 브랜치에 push하면 GitHub Pages가 루트 정적 파일을 배포합니다. 커스텀 도메인은 `CNAME`을 사용합니다.
