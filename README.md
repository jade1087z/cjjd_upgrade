\*\* 02.21
-   view 페이지 다듬고 댓글 기능 -> 좋아요, 조회수 기능 해결하기


\*\* 02.19
내일 할 일

-   view 페이지 다듬고 댓글 기능 -> 좋아요, 조회수 기능 해결하기

오늘 한 일

-   write, read 해결했음
-   listAll 함수 구현 중에 비동기 방식 때문에 어려움을 겪음 해당 함수에 관련 문제 해결 방안을 적어두었음

할 일 순서

1. write 페이지 완성 시키기 user 정보 제외하고

-   게시글 카테고리
-   SQL Injection 보안 이슈: 현재 쿼리 문자열에 직접 변수를 삽입하고 있습니다. 이런 방식은 SQL Injection 공격에 취약하므로, 대신에 파라미터화된 쿼리(parameterized query)나 prepared statement를 사용하는 것이 좋습니다.

\*\* 02.14
리팩토링 시작 날짜
클라이언트 라이브러리 설치
npm i swiper
npm i sass
npm i axios
npm i http-proxy-middleware
npm i react-router-dom
npm i react-redux
npm i @reduxjs/toolkit

서버단 라이브러리 설치
npm i nodemon
npm i mysql
npm i express

- 외래 키
-- 외래 키 검사 해제
SET FOREIGN_KEY_CHECKS=0;

-- 외래 키 검사 재활성화
SET FOREIGN_KEY_CHECKS=1;

- TABLE 
CREATE TABLE drinkMember(
  myMemberId INT(10) UNSIGNED AUTO_INCREMENT,
  youId VARCHAR(20) NOT NULL,
  youPass VARCHAR(20) NOT NULL,
  youName VARCHAR(5) NOT NULL,
  youNick VARCHAR(10) NOT NULL,
  youEmail VARCHAR(40) NOT NULL,
  youBirth INT(8) NOT NULL,
  youAddress VARCHAR(80) NOT NULL,
  youImgFile VARCHAR(100) DEFAULT NULL,
  youImgSize VARCHAR(100) DEFAULT NULL,
  memberDelete BOOLEAN DEFAULT 1,
  regTime INT(20) NOT NULL,
  PRIMARY KEY(myMemberID)
) CHARSET=utf8;

CREATE TABLE drinkBoard (
  boardId INT(10) UNSIGNED AUTO_INCREMENT,
  myMemberId INT(10) UNSIGNED NOT NULL,
  boardCategory VARCHAR(10) NOT NULL,
  boardTitle VARCHAR(255) NOT NULL,
  boardContents LONGTEXT NOT NULL,
  boardAuthor VARCHAR(10) NOT NULL,
  boardView INT(100) NOT NULL,
  boardLike INT(100) NOT NULL,
  boardComment INT(100) NOT NULL,
  boardImgFile VARCHAR(100) DEFAULT NULL,
  boardImgSize VARCHAR(100) DEFAULT NULL,
  boardDelete BOOLEAN DEFAULT 1,
  regTime INT(40) NOT NULL,
  PRIMARY KEY (boardId)
) CHARSET=utf8;

ALTER TABLE drinkBoard ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE CASCADE;

CREATE TABLE drinkLikes (
  likeId INT(10) UNSIGNED AUTO_INCREMENT,
  myMemberId INT(10) UNSIGNED,
  boardId INT(10) NOT NULL,
  acId INT(10) UNSIGNED,
  likeCategory VARCHAR(10) NOT NULL,
  likeDelete BOOLEAN DEFAULT 1,
  regTime INT(40) NOT NULL,
  PRIMARY KEY (likeId)
) CHARSET=utf8;

ALTER TABLE drinkLikes ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE SET NULL, ADD CONSTRAINT FK_acId FOREIGN KEY (acId) REFERENCES drinkList(acId) ON DELETE SET NULL;

CREATE TABLE drinkComment (
  commentId INT(10) UNSIGNED AUTO_INCREMENT,
  myMemberId INT(10) UNSIGNED,
  boardId INT(10) NOT NULL,
  acId INT(10) UNSIGNED,
  commentCategory VARCHAR(10) NOT NULL,
  commentName VARCHAR(20) NOT NULL,
  commentPass VARCHAR(20) NOT NULL,
  commentMsg VARCHAR(225) NOT NULL,
  commentDelete BOOLEAN DEFAULT 1,
  regTime INT(20) NOT NULL,
  PRIMARY KEY (commentId)
) CHARSET=utf8;

ALTER TABLE drinkComment ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE SET NULL, ADD CONSTRAINT FK_acId FOREIGN KEY (acId) REFERENCES drinkList(acId) ON DELETE SET NULL;

CREATE TABLE drinkList (
  acId INT(10) UNSIGNED AUTO_INCREMENT,
  acCategory VARCHAR(10) NOT NULL,
  acImgPath VARCHAR(255) NOT NULL,
  acName VARCHAR(40) NOT NULL,
  acCompany VARCHAR(20) NOT NULL,
  acDesc LONGTEXT NOT NULL,
  acView INT(100) NOT NULL,
  acLike INT(100) NOT NULL,
  acComment INT(100) NOT NULL,
  acAbv FLOAT NOT NULL,
  acDelete BOOLEAN DEFAULT 1,
  PRIMARY KEY (acId)
) CHARSET=utf8;

ALTER TABLE drinkList ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE CASCADE;

ALTER TABLE drinkLikes ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE CASCADE, ADD CONSTRAINT FK_acId FOREIGN KEY (acId) REFERENCES drinkList(acId) ON DELETE CASCADE;