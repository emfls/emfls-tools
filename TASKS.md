# P0 — 기반 구축

- [DONE] 사이트 기술 구조 확정
- [DONE] Cloudflare Pages 배포 가능 상태 구축
- [DONE] 공통 레이아웃
- [DONE] 기본 SEO
- [DONE] sitemap
- [DONE] robots.txt
- [DONE] About
- [DONE] Privacy Policy
- [DONE] Contact
- [DONE] 404

# P1 — 핵심 도구

초기 핵심 생활 웹도구 개발

- [DONE] 초기 도구 범위와 우선순위 확정
- [DONE] 첫 번째 도구 구현: 퍼센트·할인율·비율 계산기
- [DONE] P1-2 날짜/시간 도구: 날짜 차이·나이·시간 계산기
- [DONE] P1-3 텍스트·숫자·랜덤 도구
- [DONE] P1-4 단위 변환
- [DONE] P1 Launch QA

# P2 — 콘텐츠/SEO

각 도구 페이지 설명, 내부링크, metadata 개선

- [DONE] 도구별 설명·사용법·처리 방식 콘텐츠 작성
- [DONE] 관련 도구 내부 링크 구성
- [DONE] 도구별 metadata 개선
- [DONE] P2-1 Tool Hub / Navigation
- [DONE] P2-2 Tool Content Quality
- [DONE] P2-3 기술 SEO / Metadata

# P3 — UX/성능

Core Web Vitals, 접근성, 모바일 UX 개선

- [TODO] 모바일 입력·결과 흐름 점검
- [TODO] 접근성 점검
- [TODO] Core Web Vitals 점검 및 개선
- [DONE] Full Visual Design QA / Fixed Viewport QA

# 배포

- [DONE] Production Deploy / QA — Cloudflare Pages 프로젝트, custom domain 및 Production QA 완료

# Analytics

- [DONE] GA4 G-KRE4Z2HCY6

# Search Console

- [DONE] Google Search Console property / ownership verification
- [DONE] Production sitemap `/sitemap.xml` submission
- [DONE] Production sitemap `/sitemap.xml` technical validation
- [DONE] Legacy `/sitemap-index.xml` 301 compatibility redirect
- [DONE] Search Console `/sitemap.xml` 재제출 및 처리 상태 확인

# AdSense

- [DONE] AdSense Readiness QA
- [DONE] AdSense 사이트 등록 상태 확인 — `emfls.com`에 `tools.emfls.com`이 포함된 것으로 처리됨
- [DONE] AdSense 코드 스니펫 공통 삽입 — `pub-8830524482034754`
- [DONE] Root `emfls.com/ads.txt` 확인 — 동일 Publisher ID 확인
- [TODO] AdSense 소유권 확인
- [DONE] AdSense 심사 요청 상태 확인 — 2026-09-14 요청됨
- [TODO] AdSense 승인

# EMFLS Network Baseline v1

- [DONE] 단일 `/sitemap.xml` urlset 구조 및 기존 sitemap 301 호환
- [DONE] `trailingSlash: always` 및 canonical 정책
- [DONE] GA4/AdSense Production custom-domain only loader
- [DONE] SEO head contract 및 접근성 baseline 보강
- [DONE] Repo 문서 baseline 정리
- [DONE] Tools 전용 1200×630 OG image asset 추가
- [DONE] Search Console `/sitemap.xml` 재제출
- [DONE] Search Console `/sitemap.xml` processing success 확인

# 2026-09-28 — P0 Trust / Accuracy Regression

- [DONE] Home/About/Contact의 현재 제공 상태를 실제 페이지와 일치시킴.
- [DONE] Privacy에 Production-only GA4/AdSense loader와 광고 스크립트 동작 설명을 반영함.
- [DONE] 단위 변환기의 컵 기준을 NIST 237mL, 미국 영양표시 240mL, 호주 보건 안내 250mL로 분리하고 출처를 연결함.
- [DONE] 글자 수를 Unicode 문자소 기준으로 세고 공백·단어·줄 계산을 문서화함.
- [DONE] 시간 계산기가 0일/복수일 오프셋을 모두 표시하도록 보강함.
- [DONE] 위 회귀에 대한 `npm test`를 추가함.
- [BLOCKED] 수정 코드의 Chrome preview는 sandbox가 `127.0.0.1:4321` 바인딩을 `EPERM`으로 거부해 실행하지 못함; Production에는 아직 배포되지 않음.
