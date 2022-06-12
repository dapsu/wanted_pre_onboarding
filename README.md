# wanted_pre_onboarding
프리온보딩 백엔드 코스 3차 선발과제입니다.

---

# 목차

1. 프로젝트 소개
2. DB 설계
3. API 설계
4. Test code 설계
5. Git commit 메시지 컨벤션

---

# 1. 프로젝트 소개

이 과제는 기업의 채용을 위한 웹 서비스를 구현한 것입니다. 회사는 채용 공고를 생성하고, 지원자는 지원할 수 있는 API를 구현하는 것이 목적입니다.


## Run

#### 1. 환경변수 파일 생성

* DB와 연동되어야 서버 실행이 가능합니다.
* **.env** 파일 내용
```
# ? 부분에 사용하는 DB 정보를 입력합니다.
DB_USER = ?
DB_PASSWORD = ?
DB_DATABSE = ?
```

#### 2. 서버 실행
```
# 작업 경로로 이동
$ cd /back

# 서버 실행 명령어 실행
$ npm start
```

#### 3. 접속
```
http://localhost:3000
```


## Skill stack / Dependencies
* Back
  * Node.js (v16.13.0)
  * Express (v4.18.1)
  * MySQL (v8.0.28)
  * Sequelize (v6.20.1)
* Test
  * Mocha (v10.0.0)
  * Should (v13.2.3)
  * Supertest (v6.2.3)

---

# 2. DB 설계
추후 추가 예정

---

# 3. API 설계
추후 추가 예정

---

# 4. Test code 설계
추후 추가 예정

---

# 5. Git commit 메시지 컨벤션

> 커밋 메시지를 어떠한 근거로 작성할 것인지 명시

* "태그 : 제목" 의 형태이며, : 뒤에만 space가 있습니다.

작업 | 설명 | 비고
--- | --- | --- |
Feat | 새로운 기능 생성 및 파일 추가 | 
Docs | 문서 생성 및 수정 | 
Upgrade | 기존 기능 수정 | 성능 향상 O
Refactor | 기존 기능 수정 | 성능 향상 X
Delete | 기능 제거 및 파일 삭제 | 
Test | 테스트 코드 추가 및 리팩토링
Fix | 오류 수정

#### 제목
- 제목의 총 글자 수는 50자 이내로 작성

#### 본문
- 본문은 한 줄당 72자 내로 작성
- 본문의 내용은 양에 구애받지 않고 최대한 상세히 작성
- 어떻게 변경했는지보다 **무엇을 변경했는지** 또는 **왜 변경했는지** 설명

#### Commit Message 예시
```
Feat: 초기 환경 설정

* index.js : 프로젝트의 메인 코드 파일
* bin/www.js : express 모듈 연결하고 포트 지정하는 부분
* config/config.js : 시퀄라이즈 환경 설정
```

