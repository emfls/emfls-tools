# emfls-tools 프로젝트 이력

## 2026-09-15

### EMFLS Network Baseline v1 Production QA

- Production 배포 성공 및 `https://tools.emfls.com` 기준 Baseline 변경 반영 확인.
- Homepage, Tool Hub, 10개 Tool, About, Privacy, Contact는 모두 HTTP 200이며 존재하지 않는 URL은 HTTP 404임.
- slash 없는 `/tools/percentage`는 `/tools/percentage/`로 HTTP 308 redirect됨.
- Production canonical은 custom domain과 trailing slash 기준으로 확인함.
- `/sitemap.xml`은 HTTP 200 `application/xml`, `<urlset>` 구조, Production URL 15개를 제공함.
- `/sitemap-index.xml` 및 `/sitemap-0.xml`은 최종 sitemap 파일로 존재하지 않으며, 구 index URL은 `/sitemap.xml`로 HTTP 301 compatibility redirect됨.
- `/robots.txt`는 HTTP 200이며 `Sitemap: https://tools.emfls.com/sitemap.xml`을 사용함.
- Production HTML의 GA4/AdSense loader는 `tools.emfls.com` hostname 조건에서만 동작하도록 확인함. pages.dev 응답에는 guard 코드만 있고 loader 실행 조건은 충족하지 않음.
- skip link, semantic main landmark, 기존 label/focus, reduced-motion baseline을 확인함.
- Tools 전용 OG image asset은 아직 없어 metadata에 존재하지 않는 URL을 추가하지 않음.
- Search Console `/sitemap.xml` 재제출은 현재 세션에서 수행하지 못해 TODO로 유지함.

## 2026-09-15

### EMFLS Network Baseline v1 정리

- `@astrojs/sitemap` index/child 및 post-build rename hack을 제거하고 `src/pages/sitemap.xml.ts` endpoint로 현재 15개 indexable URL을 `<urlset>`으로 생성함.
- `trailingSlash: 'always'`를 명시하고 Production canonical 정책을 slash URL로 통일함.
- GA4 `G-KRE4Z2HCY6`와 AdSense `ca-pub-8830524482034754` loader를 hostname이 `tools.emfls.com`일 때만 동적으로 실행하도록 변경함. localhost, preview, pages.dev, workers.dev에서는 실행하지 않음.
- SEO head에 선택적 OG image, Twitter metadata, theme-color, jsonLd 계약을 추가함. 실제 Tools OG image asset은 없어 연결하지 않음.
- skip link, main landmark id, keyboard focus 유지, reduced-motion media query를 보강함. 기존 Tool 로직과 디자인은 변경하지 않음.
- README, SITE_STRATEGY, DESIGN_SYSTEM, CONTENT_POLICY, LAUNCH_CHECKLIST, REPOSITORY_CONNECTION을 emfls-tools 기준으로 추가함.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공. `dist/sitemap.xml`만 생성되고 index/child sitemap은 생성되지 않음.
- sitemap urlset, Production URL 15개, robots directive, canonical slash, loader host guard를 로컬 산출물에서 확인함.
- Production 배포 및 전체 QA는 커밋 후 진행 예정.

## 2026-09-15

### Sitemap Production 배포 확인

- Cloudflare Pages Production에 커밋 `da50322`가 반영된 것을 확인함.
- `https://tools.emfls.com/sitemap.xml`: HTTP 200, `application/xml`, sitemap index 및 child reference 정상.
- `https://tools.emfls.com/sitemap-0.xml`: HTTP 200, Production URL 15개 확인.
- `https://tools.emfls.com/sitemap-index.xml`: HTTP 301, `Location: /sitemap.xml` 확인.
- `https://tools.emfls.com/robots.txt`: HTTP 200, `Sitemap: https://tools.emfls.com/sitemap.xml` 확인.
- 기존 페이지·Tool·SEO·GA4·AdSense는 수정하지 않음.
- 현재 세션에서 Search Console sitemap 제출 화면에 접근할 수 없어 새 `/sitemap.xml` 제출은 TODO로 유지함. 성공으로 추측하지 않음.

## 2026-09-15

### Sitemap 대표 URL 변경

- 대표 sitemap URL을 `/sitemap-index.xml`에서 `/sitemap.xml`로 변경함.
- `@astrojs/sitemap` 자동 생성을 유지하고 `scripts/rename-sitemap.mjs`에서 build 후 `dist/sitemap-index.xml`을 `dist/sitemap.xml`로 rename함.
- child sitemap `sitemap-0.xml`과 자동 URL 관리는 유지함.
- `public/robots.txt`의 Sitemap directive를 `https://tools.emfls.com/sitemap.xml`로 변경함.
- `public/_redirects`에 기존 `/sitemap-index.xml` → `/sitemap.xml` 301 redirect를 추가함.
- `<link rel=sitemap>` 참조는 프로젝트에 없어 변경하지 않음.

### 검증 및 상태

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공.
- `dist/sitemap.xml` 및 `dist/sitemap-0.xml` 생성, 기존 `dist/sitemap-index.xml` 미생성 확인.
- child sitemap URL 15개, Production domain 및 child reference 정상 확인.
- Search Console 새 sitemap 제출은 Production 배포 후 실제 UI에서 진행함.

## 2026-09-15

### AdSense 및 Root ads.txt 재점검

- AdSense `emfls.com` 상세 상태는 실제 UI에서 `준비 중`으로 표시됨.
- 소유권 확인 단계가 계속 표시되며, 리뷰 요청은 2026-09-14 11:32에 접수된 상태임.
- 승인 완료 또는 정책 문제 해결 완료로 추측하지 않음.
- `https://emfls.com/ads.txt`: HTTP 200, `text/plain`, Publisher ID `pub-8830524482034754` 포함.
- 기대 항목 `google.com, pub-8830524482034754, DIRECT, f08c47fec0942fa0`와 일치함.
- 동일 Publisher ID를 사용하는 하위 도메인이므로 `tools.emfls.com/ads.txt`는 별도 생성하지 않음.
- `tools.emfls.com` Production HTML에서 AdSense script 1회, `ca-pub-8830524482034754` 1회, GA4 유지, GTM 0회를 확인함.
- 이번 점검에서 `emfls-tools` 코드 변경 없음. 루트 `emfls.com` Repo도 수정하지 않음.

### 상태

- Root ads.txt 확인: DONE.
- tools.emfls.com 전용 ads.txt: 불필요.
- AdSense 소유권 확인 및 승인: TODO.

## 2026-09-15

### AdSense 연결

- AdSense 계정에서 Publisher ID `pub-8830524482034754`와 기존 등록 사이트 `emfls.com`을 확인함.
- `tools.emfls.com` 추가 시 AdSense가 “이미 추가한 사이트”로 처리했으며, 기존 `emfls.com` 사이트 상세의 소유권 확인 대상에 포함된 상태로 판단함.
- 실제 AdSense UI가 제공한 코드 스니펫을 `src/layouts/BaseLayout.astro`에 공통으로 1회 삽입함.
- Google Tag Manager 및 별도 Analytics dependency는 사용하지 않음.
- 광고 슬롯과 `ads.txt`는 추가하지 않음. 실제 Ads.txt 값이 UI에서 제공되지 않았고, 광고 게재 코드는 심사 승인 전 사용하지 않음.
- GA4와 AdSense 모두 Tool 입력값을 custom event parameter로 전송하지 않음.

### 검증 및 상태

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, static 16개 페이지 생성.
- 커밋 `c2fc606`을 `main`에 반영하고 Cloudflare Pages Production HTML에서 스니펫과 Publisher ID를 확인함.
- `emfls.com` 상세 화면에서 AdSense 리뷰 요청 시간이 2026-09-14 11:32로 표시되며, Google 확인은 며칠에서 2~4주 걸릴 수 있다고 안내됨.
- AdSense UI에서 소유권 확인 단계는 여전히 표시되므로 소유권 확인 완료로 표시하지 않음.
- AdSense 승인 전이므로 광고 슬롯과 `ads.txt`는 추가하지 않음.

## 2026-09-15

### AdSense Readiness QA

- Production `https://tools.emfls.com` 기준으로 Homepage, Tool Hub, 10개 Tool, About, Privacy, Contact, custom 404를 점검.
- Homepage와 Tool Hub의 역할이 구분되고 실제 10개 Tool 접근이 가능함.
- 10개 Tool 모두 HTTP 200이며 사용법·처리 기준·예시·FAQ·관련 도구 콘텐츠를 포함.
- placeholder, lorem ipsum, 빈 카드, 미구현 Tool 링크, 의미 없는 `href="#"` 없음.
- 전체 주요 내부 링크 broken 0, navigation 정상.
- Privacy Policy가 GA4 사용 상태와 일치하며 입력값을 Analytics custom event로 보내지 않음.
- AdSense script(`adsbygoogle`, `pagead2.googlesyndication.com`, `ca-pub-`) 없음.
- Publisher ID가 없어 `ads.txt`를 생성하지 않음.
- Production 404는 HTTP 404, custom UI, Home 이동, noindex 확인.
- canonical/OG/sitemap/robots/GA4 및 기존 Production QA 상태 정상.
- 모바일 기존 320px Production QA에서 horizontal scroll 없음, Tool Hub·입력 UI·내비게이션 정상.
- 대표 Production 기능: 퍼센트 `100의 20% = 20`, 단위 `100cm = 1m` 확인.
- 치명적 console error 및 기본 CSS/favicon 오류 없음.

### 판정

- AdSense Readiness QA: PASS.
- 현재 AdSense 심사 신청을 진행해도 되는 상태로 판단.
- 신청 전 필수 수정 사항 없음.
- AdSense 승인 후 실제 Publisher ID를 확보하면 광고 코드와 `ads.txt`를 별도 작업으로 추가.

## 2026-09-15

### Search Console sitemap 기술 진단

- `https://tools.emfls.com/sitemap-index.xml`: 일반 User-Agent와 Googlebot 모두 HTTP 200, `application/xml`, XML body 정상.
- Index child URL `https://tools.emfls.com/sitemap-0.xml` 직접 확인: Googlebot HTTP 200, `application/xml`, well-formed `urlset`.
- Child sitemap URL 15개 모두 `https://tools.emfls.com/` Production URL이며 중복·localhost·pages.dev·404·redirect 없음.
- 15개 URL 모두 Production HTTP 200 확인.
- robots.txt Googlebot 요청 HTTP 200, Production sitemap directive 정상, Googlebot 전체 차단 없음.
- Cloudflare API에서 `tools.emfls.com`에 Access가 활성화되지 않았고 Worker route/Worker custom domain이 없으며, zone hold 없음·DNSSEC disabled·CAA 없음 확인.
- Search Console 표의 sitemap 상태는 여전히 `가져올 수 없음`이나, Production sitemap 기술 문제는 발견되지 않음.
- 코드·Cloudflare 설정 변경 없음. 신규 속성/사이트의 Search Console 처리 지연 가능성이 높은 상태로 판단.

### 상태

- Sitemap technical validation: DONE.
- Search Console sitemap processing success 및 초기 색인: TODO.

## 2026-09-15

### Google Search Console

- Property: `https://tools.emfls.com/` URL-prefix property.
- 로그인 계정에서 소유권 자동 확인 성공.
- Production sitemap `sitemap-index.xml` 제출 성공.
- 제출 표의 현재 상태는 `가져올 수 없음`이며 Google의 sitemap 처리 완료로 간주하지 않음.
- Homepage URL Inspection 수행: 현재 Google에 등록되지 않았고 아직 알려지지 않은 URL로 표시됨.
- Homepage 색인 생성 요청을 접수했고 Google 처리 중 상태를 확인함.
- robots.txt와 sitemap Production 응답은 정상이며, 이번 작업에서 Repo 코드와 기존 DNS record는 수정하지 않음.

### 상태

- Google Search Console property / ownership: DONE.
- Production sitemap submission: DONE.
- Sitemap processing success 및 초기 색인 상태: TODO.
- Tool Hub와 대표 Tool URL Inspection은 이번 단계에서 추가 요청하지 않음.

## 2026-09-15

### Google Analytics 4 연결

- Measurement ID: `G-KRE4Z2HCY6`.
- `src/layouts/BaseLayout.astro`에 Google 공식 `gtag.js` 방식으로 공통 삽입.
- Google Tag Manager와 별도 Analytics dependency는 사용하지 않음.
- 일반 페이지마다 GA4 tag가 1회 삽입되며 Tool별 복사나 입력값 custom event는 없음.
- `/privacy/`에 GA4, 쿠키/유사 기술, 방문·이용 정보 처리, 사이트 개선 목적을 반영.
- 회원가입·DB·입력값 서버 저장 없음 및 광고 서비스 미설치 상태는 유지.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, static 16개 페이지 생성.
- Production deployment `3d1f18ba-4d79-4e8f-9c70-54ffa4eade32` 성공.
- Production 일반 페이지에서 `gtag.js` 1개, Measurement ID 2회(스크립트 URL/config), GTM 0개 확인.
- `https://www.googletagmanager.com/gtag/js?id=G-KRE4Z2HCY6`: HTTP 200 확인.
- 실제 GA4 관리자 실시간 사용자/수집 데이터는 현재 접근하지 않아 확인 완료로 간주하지 않음.

### 상태

- `GA4 G-KRE4Z2HCY6`: DONE.
- Production HTML 코드 연결 확인 완료.
- 실제 Analytics 수집 확인: 별도 관리자 확인 필요.

## 2026-09-15

### Production Deploy / QA 완료

- Cloudflare Pages project `emfls-tools` 생성 및 `emfls/emfls-tools` GitHub source 연결.
- Production branch `main`, build command `npm run build`, output directory `dist` 확인.
- Deployment `1f6e38c8-b75c-4b63-9066-6d2c9d34f45c` 성공.
- pages.dev와 `tools.emfls.com` 모두 정상 응답 확인.
- Custom Domain 상태 `active`, DNS verification `active`, HTTP validation `active` 확인.
- DNS: `tools.emfls.com CNAME emfls-tools.pages.dev`, proxied.

### Production QA

- Homepage, Tool Hub, Tool 10개, About/Privacy/Contact: 모두 HTTP 200.
- 존재하지 않는 경로: HTTP 404, custom 404 UI 및 `noindex, nofollow` 확인.
- 전 페이지 canonical 및 `og:url`: `https://tools.emfls.com/...` 확인.
- Homepage `WebSite` JSON-LD, Tool 페이지 `BreadcrumbList` JSON-LD 확인.
- sitemap index/child sitemap 및 robots.txt: HTTP 200, Production URL 사용, 15개 indexable URL 및 404 제외 확인.
- `/tools/percentage`는 `/tools/percentage/`로 308 redirect.
- 홈페이지 CSS/favicon 및 페이지 내부 링크 정상, Production asset 오류 없음.
- 브라우저 대표 기능: 퍼센트 `100의 20% = 20`, 단위 `100cm = 1m` 확인.
- 모바일 viewport(약 320px)에서 Tool Hub 확인: horizontal scroll 없음, 콘솔 error 없음, 카드/내비게이션 정상 표시.

### 상태

- `Production Deploy / QA`: DONE.
- 현재 Repo 외 다른 프로젝트, Pages 프로젝트, DNS 레코드는 수정하지 않음.

## 2026-09-15

### Cloudflare Pages 생성 및 배포

- Cloudflare account: `Qordltkr247@naver.com's Account` (`b09ea15798dde6fe98d4f7ae7b75fb94`)
- `emfls.com` zone이 해당 계정에서 active이며 DNS edit 권한을 확인.
- Pages project `emfls-tools` 생성.
- GitHub source: `emfls/emfls-tools`, production branch: `main`.
- Build command: `npm run build`, output directory: `dist`, root: `/`.
- Project URL: `https://emfls-tools.pages.dev`.
- 첫 Production deployment `1f6e38c8-b75c-4b63-9066-6d2c9d34f45c` 성공.
- `https://emfls-tools.pages.dev/` 및 `/tools/` HTTP 200 확인.

### Custom Domain

- Pages Custom Domain에 `tools.emfls.com` 등록.
- DNS CNAME `tools.emfls.com -> emfls-tools.pages.dev` 생성, proxied 상태.
- 외부 DNS에서 Cloudflare IP가 조회되고 Pages verification은 active.
- 인증서/HTTP validation은 아직 pending이며 `https://tools.emfls.com` 요청은 현재 HTTP 522.

### 상태

- `Production Deploy / QA`: TODO 유지.
- Pages project와 GitHub 연결 및 pages.dev 배포는 성공.
- 최종 blocker: Custom Domain certificate/HTTP validation pending으로 Production URL이 522를 반환함.
- validation이 active가 된 뒤 전체 Production QA(10개 Tool, 404, SEO, sitemap/robots, 모바일)를 수행해야 함.
- 다른 Pages 프로젝트와 다른 서브도메인 DNS는 수정하지 않음.

## 2026-09-15

### Cloudflare Pages / Production QA 재시도

- 로컬 저장소가 `emfls/emfls-tools`, `main` 브랜치인지 확인.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, static 16개 페이지 생성.
- 인증된 Cloudflare 계정의 Pages 프로젝트 목록에서 `emfls-tools`가 조회되지 않음.
- `tools.emfls.com`은 기본 DNS 및 공용 resolver에서 A/CNAME 응답이 없어 HTTPS 접근도 실패함.

### 상태

- `Production Deploy / QA`: TODO 유지.
- 실제 Cloudflare Pages 프로젝트·GitHub 연결·배포·custom domain·HTTPS·Production QA는 확인하지 못함.
- 다른 Cloudflare Pages 프로젝트나 DNS 레코드는 수정하지 않음.
- blocker: 현재 사용 가능한 Cloudflare 계정에서 `emfls-tools` Pages 프로젝트와 `tools.emfls.com` DNS 연결이 확인되지 않음.

## 2026-09-14

### Production QA 재시도

- Cloudflare Pages 및 Custom Domain 연결 완료 안내 후 `https://tools.emfls.com`을 재점검.
- 기본 DNS와 공용 리졸버 `1.1.1.1`, `8.8.8.8` 모두 A/CNAME 응답이 없었음.
- HTTPS 요청 전체가 `Could not resolve host`로 실패하여 실제 페이지·Tool 10개·404·SEO·sitemap·robots·모바일 검증을 진행할 수 없었음.

### 상태

- `Production Deploy / QA`: TODO 유지.
- 실제 Production 성공으로 간주하지 않음.
- blocker: `tools.emfls.com` DNS 레코드가 외부 DNS에서 아직 조회되지 않음.

## 2026-09-14

### Production QA 재확인

- Cloudflare Pages 설정 완료 후 `https://tools.emfls.com` Production QA 재시도.
- `dig`에서 `tools.emfls.com`의 A/CNAME 응답이 없었고, 모든 HTTPS 요청이 `Could not resolve host`로 실패함.
- 따라서 Homepage, Tool Hub, Tool 10개, 정책 페이지, 404 HTTP status, trailing slash, 실제 canonical/OG/JSON-LD, sitemap, robots, asset, 모바일 QA는 Production 기준으로 확인하지 못함.
- 로컬 build 산출물 기준 canonical·OG·WebSite·BreadcrumbList·sitemap·robots 설정은 앞선 검증에서 정상 확인됨.

### 상태

- `Production Deploy / QA`: TODO 유지.
- 정확한 blocker: `tools.emfls.com` DNS가 현재 해석되지 않음.
- DNS가 전파된 뒤 Production URL을 재검증해야 함.

## 2026-09-14

### Production 배포 조사

- 저장소: `emfls/emfls-tools`
- 브랜치: `main`
- 빌드 명령: `npm run build`
- 출력 디렉터리: `dist`
- Astro 설정: `site: https://tools.emfls.com`, `output: static`
- 검증된 커밋을 `origin/main`에 push함.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 정적 16개 페이지 생성.
- 로컬 산출물에서 Production canonical, OG, WebSite JSON-LD, BreadcrumbList JSON-LD, sitemap, robots.txt 확인.
- 실제 `https://tools.emfls.com`은 현재 DNS가 해석되지 않아 HTTP 200, HTTPS, custom domain, Cloudflare Pages project, 404 status, 모바일 Production QA를 확인하지 못함.
- Cloudflare Pages/Wrangler 설정 파일이나 연결된 프로젝트 정보는 저장소에 존재하지 않음.

### 상태

- `Production Deploy / QA`: TODO
- 배포했다고 보고하지 않음.
- 다음 수동 단계: Cloudflare Pages에서 `emfls-tools` 프로젝트를 `emfls/emfls-tools`의 `main`에 연결하고 `npm run build` / `dist`로 배포한 뒤 `tools.emfls.com` custom domain과 DNS를 연결해야 함.


## 2026-09-14

### 작업

- P2-3 기술 SEO·metadata·구조화 데이터·내부 링크 최종 개선.
- Tool 페이지에 공통 breadcrumb UI와 BreadcrumbList JSON-LD 추가.
- 홈페이지에 사실 기반 WebSite JSON-LD 추가.
- 404에 noindex, nofollow 적용.

### 결정

- 기존 title/description/canonical/OG 구조 유지; canonical은 `https://tools.emfls.com/`의 trailing slash 정책과 일치.
- FAQPage, QAPage, SoftwareApplication, Organization, SearchAction은 실제 요건·정보가 없어 추가하지 않음.
- Breadcrumb URL은 실제 홈·`/tools/`·현재 페이지 canonical과 일치.
- 기존 favicon.svg와 robots.txt는 정상이라 교체하지 않음.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 정적 16개 페이지 생성.
- 16개 페이지 title/description/canonical/H1 점검, title 중복 없음.
- Homepage/Tool Hub 각각 10개 Tool 링크, sitemap 15개 URL, 404 sitemap 제외 확인.
- JSON-LD JSON 파싱 성공, 내부 링크 broken 0, 미구현 Tool 링크 0.
- 404 noindex 확인.

### 상태

- P2-3 완료.
- P2 기존 계획 범위 완료.
- 다음 단계는 P3 또는 Cloudflare production QA.

## 2026-09-14

### 작업

- GitHub 저장소 `https://github.com/emfls/emfls-tools.git`를 `/Users/whitesmile/Documents/emfls-tools/`에 연결.
- 프로젝트 구축 및 운영 지침을 확인.
- 저장소 작업 규칙을 `AGENTS.md`에 기록.

### 상태

- 저장소는 현재 초기 상태이며 아직 커밋이 없음.

## 2026-09-14

### 작업

- 실제 기능 구현 전 저장소 구조와 배포 준비 상태를 분석.
- `TASKS.md`를 생성하고 기반 구축부터 단계별 작업을 등록.

### 분석 결과

- `main` 브랜치의 커밋이 없고, 추적 파일은 `AGENTS.md`와 `PROJECT_HISTORY.md`뿐임.
- 기술 스택, 빌드 명령, 페이지, Cloudflare Pages 설정이 아직 없음.
- 정적 배포에 적합한 단순한 프론트엔드 구조를 새로 결정해야 함.

## 2026-09-14

### 작업

- Astro + TypeScript 기반 정적 사이트 골격 생성.
- `BaseLayout`, 홈 화면, 전역 CSS, favicon, robots.txt, 자동 sitemap 구성을 추가.
- 실제 생활 웹도구와 정책 페이지는 이번 단계에서 구현하지 않음.

### 추가/변경 파일

- `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`
- `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/styles/global.css`
- `public/favicon.svg`, `public/robots.txt`
- `TASKS.md`

### 기술 결정

- Astro를 선택한 이유: 정적 HTML 중심, 낮은 클라이언트 JavaScript 비용, 도구별 독립 라우트와 SEO에 적합함.
- `output: static`을 선택한 이유: 서버·API 없이 Cloudflare Pages의 정적 배포 흐름에 맞추기 위함.
- Cloudflare adapter를 사용하지 않은 이유: 현재 단계는 SSR이나 Pages Functions가 필요 없는 완전 정적 사이트이기 때문.

### 검증

- `npm install` 성공.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, `dist/` 생성.
- 생성 확인: `dist/index.html`, `dist/robots.txt`, `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, `dist/favicon.svg`.
- 생성 파일과 의존성 디렉터리는 `.gitignore`에 등록.

### 다음 작업

- 정책 페이지(About, Privacy Policy, Contact, 404)와 관련 P0 항목 검토.

## 2026-09-14

### 작업

- `/about/`, `/privacy/`, `/contact/`, 커스텀 `/404` 페이지 추가.
- `BaseLayout.astro`의 공통 Header/Footer에 최소한의 사이트 내비게이션 추가.
- 각 페이지에 고유 title, description, canonical이 적용되도록 기존 레이아웃 재사용.
- 개인정보·문의 페이지는 현재 실제 운영 상태만 반영하고, 존재하지 않는 수집·연락처를 만들지 않음.

### 수정한 구조

- `src/pages/about/index.astro`
- `src/pages/privacy/index.astro`
- `src/pages/contact/index.astro`
- `src/pages/404.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `TASKS.md`

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공.
- `dist/`에 홈, About, Privacy, Contact, 404 HTML 생성 확인.
- sitemap과 robots.txt 생성 확인.
- 내부 링크는 홈·About·Privacy·Contact와 favicon으로만 구성되며, 미구현 도구 링크는 없음.

### 다음 단계

- P0 기반 작업 완료.
- 다음은 P1 핵심 생활 웹도구 구현이며, 아직 실제 Tool 구현은 시작하지 않음.

## 2026-09-14

### 작업

- P1 첫 단계로 퍼센트, 할인율, 비율 계산기를 구현.
- 도구 URL을 `/tools/percentage/`, `/tools/discount/`, `/tools/ratio/`로 구성.
- `ToolPage.astro` 공통 컴포넌트를 만들어 제목·설명·도구 영역을 재사용.
- 홈 화면에 실제 구현된 세 도구만 연결.

### 주요 결정

- Astro 정적 페이지와 각 페이지의 최소 Vanilla TypeScript/JavaScript로 계산.
- 외부 계산 라이브러리, UI 프레임워크, 상태 관리 라이브러리는 추가하지 않음.
- 빈 입력, 비수치, 0으로 나누기, 할인율 범위 오류를 사용자 메시지로 처리.
- 정수 비율은 최대공약수로 단순화하고 소수 비율은 안전하게 원래 비율과 나눗셈 결과를 표시.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 8개 정적 페이지 생성.
- 대표 계산값 확인: 100의 20% = 20, 20은 100의 20%, 50,000의 20% 할인 = 10,000 / 최종 40,000, 150:100 = 3:2 / A÷B = 1.5.
- 생성 확인: 세 도구 HTML, sitemap, robots.txt.

### 다음 단계

- P2 콘텐츠·SEO 개선 또는 추가 P1 도구 구현.

## 2026-09-14

### 작업

- P1-2 날짜/시간 도구 3개 구현.
- `/tools/date-difference/`: 두 날짜의 절대 경과 일수, 주·일 표시.
- `/tools/age/`: 생년월일과 기준일을 비교한 정확한 만 나이 계산.
- `/tools/time-calculator/`: 분 단위 정수 기반 시간 더하기·빼기와 날짜 이동 표시.

### 주요 결정

- 날짜 입력은 `YYYY-MM-DD` 값을 UTC 자정으로 검증·계산하여 브라우저 timezone에 따른 날짜 밀림을 방지.
- 시간은 시·분을 총 분으로 변환한 뒤 24시간 범위로 정규화.
- 기존 `ToolPage.astro`, 전역 CSS, 정적 Astro 라우트를 재사용했으며 외부 라이브러리는 추가하지 않음.
- 홈페이지에는 실제 구현된 6개 Tool만 연결하고, 날짜/시간 Tool끼리 관련 링크를 구성.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 정적 11개 페이지 생성.
- 대표값: 날짜 13일·0일·윤년 2일, 만 나이 26세 및 생일 전 25세, 시간 13:15·09:30·다음 날 01:30.
- 기존 회귀값: 20, 20%, 10,000/40,000, 3:2 확인.
- 홈에서 6개 Tool URL 접근 가능, sitemap·robots.txt 생성 확인.

### 다음 단계

- P1-3 텍스트·숫자·랜덤 도구 검토.

## 2026-09-14

### 작업

- P1-3 글자수 계산기, 숫자 포맷 변환기, 랜덤 추첨기 구현.
- `/tools/character-count/`, `/tools/number-format/`, `/tools/random-picker/` 추가.
- 홈페이지에서 실제 구현된 9개 Tool에 접근하도록 목록 확장.

### 처리 기준

- 글자수는 JavaScript 문자열 길이 기준이며 공백 포함·제외, 공백 기준 단어 수, 줄 수를 표시.
- 숫자는 쉼표를 제거하고 문자열 기반으로 정수부를 그룹화해 음수·소수·쉼표 입력을 처리.
- 랜덤 추첨은 빈 줄과 앞뒤 공백을 제외하고 `Math.random()`으로 선택하며 중복 항목은 각각 유지.
- 세 도구 모두 브라우저에서만 입력을 처리하고 외부 서비스나 새 dependency를 추가하지 않음.

### 구조·SEO

- 기존 `ToolPage.astro`와 전역 CSS를 재사용.
- 각 페이지에 고유한 제목·설명·canonical이 공통 레이아웃을 통해 적용.
- 관련 도구 링크와 짧은 사용법·예시·FAQ를 추가.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 14개 정적 페이지 생성.
- 대표값 확인: “안녕 하세요” 6자/공백 제외 5자/2단어/1줄, `-1234567.89` 포맷, 빈 줄 포함 A/B 후보 2개.
- 홈페이지 9개 Tool 링크와 sitemap 생성 확인.
- 기존 대표 계산기 회귀 로직도 유지됨.

### 다음 단계

- P1-4 단위 변환 도구 구현 방향 검토.

## 2026-09-14

### 작업

- P1-4 단위 변환기 구현: `/tools/unit-converter/`.
- 길이(mm, cm, m, km, inch, ft), 무게(mg, g, kg, oz, lb), 부피(mL, L, 컵, 큰술, 작은술), 온도(°C, °F, K) 지원.
- 길이·무게·부피는 기준 단위 factor 방식으로 처리하고, 부피는 1컵=240mL, 1큰술=15mL, 1작은술=5mL 기준을 명시.
- 온도는 섭씨 기준 공식으로 변환하며 켈빈 음수 입력을 차단.
- 입력 즉시 결과 갱신, 동일 단위 변환, 소수·음수·빈 입력 오류를 지원.

### 주요 결정

- 기존 `ToolPage.astro`와 전역 CSS를 재사용.
- 단위 데이터와 변환 로직은 `src/scripts/unit-converter.ts`로 분리해 페이지 HTML과 브라우저 동작을 구분.
- 결과는 최대 10자리 소수까지 표시하고 불필요한 trailing zero를 제거.
- 외부 변환 라이브러리와 새 dependency는 추가하지 않음.
- 홈페이지에 단위 변환기를 추가해 초기 Launch Tool 10개를 완성.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 정적 15개 페이지 생성.
- 길이: 100cm→1m, 1m→100cm, 1inch→2.54cm, 1ft→12inch.
- 무게: 1000g→1kg, 1kg→1000g, 1lb→453.59237g.
- 부피: 1000mL→1L, 1컵→240mL, 1큰술→15mL, 1작은술→5mL.
- 온도: 0°C→32°F, 100°C→212°F, 32°F→0°C, 0°C→273.15K, 273.15K→0°C.
- 0, 음수, 소수, 동일 단위, 음수 켈빈 경계값 확인.
- 기존 9개 Tool 라우트와 홈페이지 링크 유지 확인.

### 다음 단계

- P1 Launch Tool 전체 QA 및 모바일·접근성·SEO 점검.

## 2026-09-14

### 작업

- P1 Launch Tool 10개 전체 QA 수행.
- 정상 입력, 빈 입력, 0·음수·소수·잘못된 입력, 대표값 회귀, 정적 라우트와 내부 링크를 점검.
- 15개 정적 페이지의 metadata와 H1 구조, 홈페이지 10개 Tool 링크, sitemap·robots.txt를 확인.
- 320px 대응을 위해 결과 영역에 긴 숫자·긴 항목 줄바꿈 안전성을 추가.

### QA 결과

- 기능·회귀 테스트 문제 없음.
- 접근성: input/textarea/select label, 명확한 버튼, keyboard focus, 결과 `aria-live` 확인.
- SEO: 15개 페이지 title·description·canonical 고유성 확인, sitemap 14개 URL 확인. 404는 sitemap에서 제외.
- 내부 링크: broken link 0, 미구현 Tool 링크 0.
- dependency: React/Vue/Svelte/Tailwind/jQuery 및 외부 계산·날짜·변환 라이브러리 없음.
- 사용자 노출 산출물에서 NaN, Infinity, undefined, [object Object] 없음.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 정적 15개 페이지 생성.

### 상태

- P1 Launch QA 완료.
- 남은 known issue 없음.
- 다음 단계는 P2 콘텐츠·SEO 개선.

## 2026-09-14

### 작업

- P2-1 도구 허브 `/tools/` 생성.
- 10개 Tool을 계산, 날짜/시간, 텍스트/숫자, 랜덤, 변환으로 분류.
- 홈페이지에서 공통 metadata를 사용하도록 `src/data/tools.ts`를 도입하고 `/tools/` 링크를 추가.
- Header/Footer에 Tools 경로를 추가해 개별 Tool에서 허브로 돌아오는 경로를 확보.

### 주요 결정

- Tool 이름·설명·카테고리·URL을 작은 공통 데이터 파일로 관리해 Homepage와 Hub의 중복을 제거.
- 검색·필터·JavaScript 탐색 기능은 10개 규모에서는 불필요하므로 추가하지 않음.
- 기존 Tool 계산 로직과 `ToolPage.astro` 구조는 수정하지 않음.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 정적 16개 페이지 생성.
- Homepage Tool 링크 10개, Tool Hub Tool 링크 10개 확인.
- 16개 페이지의 title·description·canonical과 H1 1개 확인.
- sitemap 15개 URL에 `/tools/` 포함, 404 제외 확인.
- 내부 링크 broken 0, 미구현 Tool 링크 0.
- 320px 대응 CSS와 focus·semantic navigation 구조 점검.

### 상태

- P2-1 Tool Hub / Navigation 완료.
- 다음 단계는 P2-2 도구별 콘텐츠·내부 링크·metadata 개선.

## 2026-09-14

### 작업

- P2-2 Tool Content Quality 수행.
- 10개 Tool의 사용법, 계산·처리 기준, 예시, FAQ, 관련 도구 콘텐츠를 실제 구현과 대조해 보강.
- 퍼센트·할인율·비율의 공식과 오류 조건, 날짜·나이·시간의 경계와 포함 기준, 글자수·숫자·랜덤의 처리 기준을 명확히 기록.
- 단위 변환의 지원 범위와 컵/큰술/작은술 기준, 켈빈 음수 제한을 명시.

### 콘텐츠 및 링크

- 각 Tool에 과도한 장문 없이 짧은 사용법·예시·FAQ를 유지.
- 관련 도구 링크는 기능상 연관된 페이지로만 구성.
- 현재 브라우저 내 처리 구조와 서버 저장 없음 문구가 실제 구현과 일치함을 확인.
- `src/data/tools.ts` metadata와 화면 설명의 기능 범위가 모순되지 않음을 확인.

### 검증

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 성공, 정적 16개 페이지 생성.
- 10개 Tool 모두 사용법·예시·FAQ·관련 도구·H1 1개 확인.
- Homepage/Tool Hub 각각 10개 Tool 링크, sitemap 15개 URL, 내부 링크 정상 확인.

### 상태

- P2-2 Tool Content Quality 완료.
- 다음 단계는 P2-3 metadata·구조화 데이터·내부 링크 SEO 개선.
