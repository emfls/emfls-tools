# Launch Checklist

- [x] `npm run check`
- [x] `npm run build`
- [x] Production custom domain HTTP 및 trailing slash 확인
- [x] canonical, robots.txt, sitemap.xml 확인
- [x] Homepage, Tool Hub, 대표 Tool 모바일 확인
- [x] GA4/AdSense Production-only loader 확인
- [x] Google Search Console `sc-domain:emfls.com`에서 `/sitemap.xml` 성공 확인 (2026-09-29; last read 2026-09-23; 15 pages)
- [ ] Naver Search Advisor 소유권·sitemap 상태 확인 (로그인 필요; 이 사이트 단계는 중단)
- [ ] Daum Search 등록 (공식 신청은 이름/이메일 및 필수 동의 필요; 미제출)
- [x] Daum Sitemap 제출 N/A 확인 (공식 검색등록 폼에 sitemap 기능 없음)
- [ ] IndexNow key 파일 생성됨 (`public/bbfbbcb5f78a67dbf37152b3bab913e6.txt`); Production 배포와 실제 notification pending
- [ ] AdSense 승인 확인

## Current checkpoint · 2026-09-29

- Registry: Google Search `SET`, Google Sitemap `SUBMITTED`, Daum Sitemap `N/A`; Naver, Daum Search, IndexNow remain uncompleted.
- Search Launch remains `IN_PROGRESS` and Sitemap Summary remains `PARTIAL` until remaining applicable states are evidenced.
- Production is served from `779c535`; trust/accuracy updates and IndexNow key file are local and not deployed.
- Changed-code Chrome preview previously could not start because sandbox denied `127.0.0.1:4321` with `EPERM`; obtain permitted hosted preview before visual sign-off.
