# ProjectL-Web

프로젝트 마키나 공식 사이트입니다. GitHub Pages에서 빌드 없이 정적 HTML/CSS/JavaScript로 제공됩니다.

- `index.html`: 공식 홈 (GAME/INTRODUCE/ABOUT/JOURNEY/DOWNLOAD 메뉴)

## 다운로드 캠페인 (`/download/`)

- `download/index.html`: 연구소 문 오프닝, 캐릭터 등장, 게임 배너, Google Play 및 iOS 사전예약
- `assets/campaign.css`, `assets/campaign.js`: 캠페인 페이지 스타일과 연출·캐러셀·사전예약 동작
- `assets/img/intro/`: 업로드된 투명 PNG 일러스트의 인트로용 경량 WebP (원본은 `assets/img/`에 보존)
- `assets/img/market-1.jpg` ~ `market-6.jpg`: 자동 전환 게임 배너

인트로는 방문 세션 첫 진입에 재생되며 건너뛰기 버튼이 있습니다. 움직임 줄이기 설정이 켜져 있으면 바로 본 화면을 보여줍니다. 배너는 자동 전환되고 버튼·점·터치 스와이프로 조작할 수 있습니다.

외부 링크로 `/download/`에 들어온 Android 기기는 Google Play로 바로 이동합니다. 기존 `/more/` 약관·계정 삭제 경로도 유지합니다.

## 사전예약

다운로드 페이지의 iOS 버튼을 누르면 접힌 신청 폼이 열립니다. 폼은 기존 Google Forms `formResponse`로 전송합니다. Google Forms가 교차 출처 응답을 제공하지 않으므로 브라우저에서는 서버의 실제 접수 여부를 직접 확인할 수 없습니다.

## 로컬 미리보기

```sh
python3 -m http.server 8765
```

브라우저에서 `http://localhost:8765/`을 엽니다.

## 배포

`main` 브랜치에 push하면 GitHub Pages가 루트 정적 파일을 배포합니다. 커스텀 도메인은 `CNAME`을 사용합니다.
