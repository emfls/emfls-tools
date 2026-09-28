# Launch Checklist

- [x] `npm run check`
- [x] `npm run build`
- [x] Production custom domain HTTP 및 trailing slash 확인
- [x] canonical, robots.txt, sitemap.xml 확인
- [x] Homepage, Tool Hub, 대표 Tool 모바일 확인
- [x] GA4/AdSense Production-only loader 확인
- [x] Google Search Console `/sitemap.xml` 처리 성공 이력 기록 확인 (`PROJECT_HISTORY.md`, 2026-09-15; 이번 사이클에는 Search Console 계정 상태를 다시 확인하지 않음)
- [ ] Naver Search Advisor 소유권·sitemap 상태 확인
- [ ] Daum 검색등록 절차 적용 또는 N/A 근거 확인
- [ ] IndexNow key/endpoint 및 URL 제출 확인
- [ ] AdSense 승인 확인

## Current checkpoint · 2026-09-28

- Registry: Google Search `SET`, Google Sitemap `SUBMITTED`, GA4 `SET`, AdSense `REVIEW`; Naver, Daum, IndexNow는 아직 `NOT_SET`.
- Search Launch remains `IN_PROGRESS` and Sitemap Summary remains `PARTIAL` until remaining applicable states are evidenced.
- Production is still served from `779c535`; the current recovery changes are local and have not been pushed or deployed.
- Changed-code Chrome preview could not start because sandbox denied `127.0.0.1:4321` with `EPERM`; Production remains the prior deployed version.
