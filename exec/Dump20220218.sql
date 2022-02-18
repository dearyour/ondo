-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: i6a601.p.ssafy.io    Database: ondo
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge` (
  `challenge_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT 'null',
  `owner` bigint NOT NULL,
  `s_date` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;
/*!40000 ALTER TABLE `challenge` DISABLE KEYS */;
INSERT INTO `challenge` VALUES (1,'2022-02-15 22:00:33','2022-02-15 22:00:33','학습','개발자의 꽃이라고 할 수 있는 1일 1커밋!\n하지만 혼자서는 무리예요.. 같이 1일 1커밋 해보실 분 구합니다!!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/2372a72c-76db-4b22-af26-e991fc860105staticprofileimage',1,'20220217','1일 1커밋 하기'),(2,'2022-02-15 22:10:38','2022-02-15 22:10:38','학습','백준, 프로그래머스 상관없습니당 3일 만에 탐색 알고리즘 마스터 가즈아~~','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/9dd5a596-54cb-4b76-a147-0802d8414fa1staticprofileimage',1,'20220218','3일 동안 dfs/bfs만 같이 풀어보실분@@'),(3,'2022-02-15 22:15:08','2022-02-15 22:15:08','식습관','이젠 진짜 건강 챙겨야 한다.. 형이랑 같이 촉촉해질 사람 구한다.','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/6aedc945-8767-491b-970d-14b6ac591cb0staticprofileimage',1,'20220215','하루 물 1L 마시기 챌린지'),(6,'2022-02-16 11:03:08','2022-02-16 11:03:08','외모관리','예뻐지자','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/aa0b732f-2da1-43ab-8003-d3afd2b27b15staticprofileimage',1,'20220216','하루 3번 세수하기'),(7,'2022-02-16 20:20:17','2022-02-16 20:20:17','운동','같이 달려봐요! 인증은 런닝 시 가볍게 사진 찍어 주시면 됩니다~','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/7becf964-d932-42b7-96de-bb2a228140ddstaticprofileimage',3,'20220217','3일 동안 매일 5km 달려요'),(8,'2022-02-16 20:42:09','2022-02-16 20:42:09','취미','하루에 적어도 한 곡 연습하기!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/590077ea-f70f-4f05-bcc9-8315bfc41954staticprofileimage',3,'20220223','매일매일 피아노 연습'),(9,'2022-02-16 20:48:56','2022-02-16 20:48:56','운동','힘들더라도 같이 근력을 키워봅시다!! 운동하는 모습을 사진으로 찍어 인증해 주시면 됩니다 ㅎㅎ','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/ead43d6a-8325-41c6-acb2-9707c0769a2fstaticprofileimage',2,'20220217','근력 운동하기(30분 이상)'),(10,'2022-02-16 20:53:21','2022-02-16 20:53:21','식습관','잊지말고 홍삼 챙겨 먹읍시다! 건강 챙기셔야죠 ㅎㅎㅎㅎ\n3일동안 홍삼 한포씩 찍어서 올려주세요 ㅎㅎ 화이팅입니다!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/436bc639-48b5-47c8-baa8-817abe3797f8staticprofileimage',2,'20220216','홍삼 챙겨먹기'),(11,'2022-02-16 22:23:51','2022-02-16 22:23:51','취미','좋은 구절 찍어서 올려주시면 돼요!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/e6be045e-31fb-4632-bda5-9710b0b4862dstaticprofileimage',3,'20220216','3일간 하루에 책 10페이지 씩 읽기'),(12,'2022-02-16 22:42:05','2022-02-16 22:42:05','취미','반려동물 키우시는 분들, 저희 집은 뚱이라는 고양이를 키우는데용!\n매일 안놀아줘서 새벽에 자꾸 울어요 ㅠ 오늘부터 저와 함께 같이 놀아줘 보는 것은 어떨까요??','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/c5d765d1-0b02-4ea1-b187-9f9620f32c28staticprofileimage',1,'20220216','반려동물 놀아주기'),(13,'2022-02-16 22:49:16','2022-02-16 22:49:16','취미','요즘 배달비가 너무 비싸서 제가 만든 챌린지입니다.\n같이 음식한 사진 공유하고 집에서 해먹는 습관을 들여서 배달비를 아낍시다!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/45e4dacd-970b-4d14-82e7-5f5dbddca23estaticprofileimage',1,'20220216','음식 집에서 해먹기 챌린지!!'),(21,'2022-02-17 21:14:40','2022-02-17 21:14:40','운동','3일동안 0.3키로 감량해보아여! 3일동안 몸무게 찍어 올려주시면 됩니다 ㅎㅎ','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/55534938-f9f1-4afc-8ed7-66513b3447b5staticprofileimage',2,'20220218','매일 0.1kg 감량하기'),(22,'2022-02-17 21:18:22','2022-02-17 21:18:22','식습관','매일 잊지 말고 하루 한잔 우유를 마시면서 키큽시다!!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/b621f803-2ea5-482a-9376-11340fc2e18fstaticprofileimage',2,'20220218','우유/두유 마시기'),(23,'2022-02-17 21:20:47','2022-02-17 21:20:47','학습','useEffect에 대해 이해해 보아요! ','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/66474e39-7592-4f62-a2f2-6b7b74196807staticprofileimage',5,'20220217','리액트 라이프사이클 이해하기'),(24,'2022-02-17 21:21:47','2022-02-17 21:21:47','취미','평소 읽고 싶었던 책이나 꼭 읽어야하는 책을 읽고 인증해봅시다!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/8a421a83-0591-4565-955c-5c0cab44bbe6staticprofileimage',2,'20220218','책읽기'),(25,'2022-02-17 21:23:19','2022-02-17 21:23:19','학습','3일동안 꾸준히 인강 보기로 해요!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/070375cc-9b92-4dfe-b99a-ee483314d469staticprofileimage',2,'20220218','인강듣기'),(26,'2022-02-17 21:25:19','2022-02-17 21:25:19','친환경','사용한 마스크를 접은 뒤 끈으로 묶은 사진이나 끈을 자른 사진을 올려주세요.','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/343abc1b-3ff1-49cd-abc4-3b6cb21c915cstaticprofileimage',2,'20220218','마스크 안전하게 버리기'),(27,'2022-02-17 21:27:09','2022-02-17 21:27:09','외모관리','마스크팩 하는 모습을 올려주세요. 다들 물광피부 원하시죠~','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/a9680364-291f-4ddc-8aae-b6e39cbf6cccstaticprofileimage',2,'20220218','1일 1팩하기'),(28,'2022-02-17 21:28:50','2022-02-17 21:28:50','학습','매일매일 스터디카페 출석 인증샷! ','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/692569c5-390b-4271-8f3f-ec3038142826staticprofileimage',5,'20220217','스터디카페 출석하기'),(29,'2022-02-17 22:19:57','2022-02-17 22:19:57','학습','아무 문제나 자유롭게 푸셔도 됩니다! 같이 하실 분?','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/challenge/441bef97-3bc7-496c-ad42-0af30d857e80staticprofileimage',7,'20220217','1일 1알고리즘 풀기!');
/*!40000 ALTER TABLE `challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_participate`
--

DROP TABLE IF EXISTS `challenge_participate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_participate` (
  `challenge_participate_id` bigint NOT NULL AUTO_INCREMENT,
  `archived` int DEFAULT NULL,
  `challenge_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`challenge_participate_id`),
  KEY `FKos3wus7e10xk3rf4i87qjjdh5` (`challenge_id`),
  KEY `FK91xxmqqy43hae9oqm4b3a1m9r` (`user_id`),
  CONSTRAINT `FK91xxmqqy43hae9oqm4b3a1m9r` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKos3wus7e10xk3rf4i87qjjdh5` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_participate`
--

LOCK TABLES `challenge_participate` WRITE;
/*!40000 ALTER TABLE `challenge_participate` DISABLE KEYS */;
INSERT INTO `challenge_participate` VALUES (1,0,1,1),(2,0,2,1),(3,0,3,1),(7,0,6,1),(9,0,7,3),(10,1,1,3),(11,0,8,3),(12,0,8,1),(13,0,7,1),(14,1,9,2),(15,2,10,2),(16,1,10,3),(17,1,10,1),(18,0,9,3),(19,1,10,5),(20,1,11,3),(21,1,12,1),(22,0,11,1),(23,1,13,1),(24,0,9,5),(25,1,7,11),(26,0,8,7),(27,1,9,7),(28,0,2,7),(30,0,1,2),(34,0,9,1),(38,0,21,2),(39,0,22,2),(40,1,23,5),(41,0,24,2),(42,0,25,2),(43,0,26,2),(44,0,27,2),(45,0,28,5),(46,0,1,7),(47,1,29,7);
/*!40000 ALTER TABLE `challenge_participate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `feed_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKmq57ocw5jrw8rd2lot1g8t0v2` (`feed_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKmq57ocw5jrw8rd2lot1g8t0v2` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'2022-02-16 20:47:33','2022-02-16 20:47:33','잔디밭이 풍성하네요..',2,1),(2,'2022-02-16 21:00:25','2022-02-16 21:00:25','저도 깃헙관리 열심히 해야겠네요!',2,2),(3,'2022-02-16 21:02:01','2022-02-16 21:02:01','홍삼이 왜 맛없죠ㅠㅠ',3,2),(4,'2022-02-16 21:06:40','2022-02-16 21:06:40','홍삼 한 포면 밥 한공기 뚝딱',3,3),(5,'2022-02-16 21:45:11','2022-02-16 21:45:11','다른사람 깃헙 올리시면 곤란해요',2,5),(7,'2022-02-16 22:26:21','2022-02-16 22:26:21','프사 감자가 아니라 똥같음 ㅋㅋ',5,1),(9,'2022-02-16 22:30:47','2022-02-16 22:30:47','ㅋㅋㅋㅋㅋ악플러네 ㅠㅠ',5,5),(11,'2022-02-16 22:31:26','2022-02-16 22:31:26','무슨 말인진 모르겠지만 눈물나여 ㅠㅠㅠㅠㅠㅠㅠ',6,5),(12,'2022-02-16 23:30:17','2022-02-16 23:30:17','ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',10,2),(13,'2022-02-16 23:30:58','2022-02-16 23:30:58','나만 없어 고양이',7,2),(14,'2022-02-17 01:11:44','2022-02-17 01:11:45','으~~~~',5,8),(15,'2022-02-17 01:09:33','2022-02-17 01:09:33','후라이팬 추천받아요..',10,1),(16,'2022-02-17 01:15:32','2022-02-17 01:15:32','ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',10,7),(17,'2022-02-17 01:47:35','2022-02-17 01:47:35','감자가 아니라 똥ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',5,2),(18,'2022-02-17 01:49:47','2022-02-17 01:49:47','누누야 인누와',7,2),(21,'2022-02-17 02:00:25','2022-02-17 02:00:25','프사 본인 이신가요?..ㄷㄷ',11,5),(22,'2022-02-17 02:02:00','2022-02-17 02:02:00','ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',11,1),(23,'2022-02-17 02:19:45','2022-02-17 02:19:45','홍쓰코어',4,5),(24,'2022-02-17 10:36:33','2022-02-17 10:36:33','레알임?',10,11),(25,'2022-02-17 12:55:37','2022-02-17 12:55:37','진짜입니다 ㅠ',10,1),(37,'2022-02-17 21:27:38','2022-02-17 21:27:38','Vue 라이프사이클 올려도 되나요?',15,2),(38,'2022-02-18 00:12:34','2022-02-18 00:12:34','프사도 잘생기시고,, 힘도좋으시고,, 부럽습니다',16,5),(40,'2022-02-18 00:15:03','2022-02-18 00:15:03','dfs인가여? 뭐죵',17,5),(41,'2022-02-18 00:15:59','2022-02-18 00:15:59','yeah~ 감자와 함께합시다!',15,5);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed` (
  `feed_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `challenge_id` bigint NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed`
--

LOCK TABLES `feed` WRITE;
/*!40000 ALTER TABLE `feed` DISABLE KEYS */;
INSERT INTO `feed` VALUES (2,'2022-02-16 20:23:05','2022-02-16 20:23:05',1,'오늘도 커밋 !','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/f44b9d86-20b5-4fca-982a-07d6750cac5fstaticprofileimage',3),(3,'2022-02-16 21:00:32','2022-02-16 21:00:32',10,'1일 1홍삼 합시다!! 엑 맛없어','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/436b1882-7ecb-4524-ae4c-7fb0d772bb6cstaticprofileimage',1),(4,'2022-02-16 21:04:51','2022-02-16 21:04:51',10,'홍삼은 쓰고~ 코딩은 어려워~','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/14649587-49c2-4269-8977-cb99e0954aa4staticprofileimage',3),(5,'2022-02-16 21:42:18','2022-02-16 21:42:18',10,'말하는감자도 홍삼먹었따~ 누나가 사줬지롱~','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/d20999ca-426d-49c5-aa97-52290ad8438astaticprofileimage',5),(6,'2022-02-16 22:26:16','2022-02-16 22:26:16',11,'좋은 구절 공유해봅니다','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/710becd8-3816-459f-9901-dedb0aba2e94staticprofileimage',3),(7,'2022-02-16 22:43:18','2022-02-16 22:43:18',12,'놀아줬더니 정말 좋아하네요 ^^ 내일도 또 놀아줘야징','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/1e0275e9-5913-45f3-ac0e-f85e71bc14f9staticprofileimage',1),(10,'2022-02-16 23:04:11','2022-02-16 23:04:11',13,'오늘 김치볶음밥하다가 방패 생긴 썰 푼다..','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/c0bae2f9-e8cc-43b5-a6b5-93b5a6cb83d7staticprofileimage',1),(11,'2022-02-17 01:47:05','2022-02-17 01:47:05',10,'3개 먹어도 인정이쥬?','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/68bdf20b-8a81-4ba5-b580-fecf3acd1bcastaticprofileimage',2),(15,'2022-02-17 21:24:44','2022-02-17 21:24:44',23,'오늘 라이프사이클 뿌셨습니다!! ','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/21b38f66-02f4-4fca-a159-758f8880842fstaticprofileimage',5),(16,'2022-02-17 21:34:53','2022-02-17 21:34:53',9,'저 잘하고 있나요? 후.. 한 손으로 들고 한 손으로 인증하기 힘드네요...ㅎ','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/40e836ac-7a47-4bbd-bde7-8032ef6acaa4staticprofileimage',2),(17,'2022-02-17 22:24:38','2022-02-17 22:24:38',29,'오늘부터 하나씩!','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/feed/0fd97b9d-8bb8-4aa4-9566-a0d4386e8fb5staticprofileimage',7);
/*!40000 ALTER TABLE `feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_like`
--

DROP TABLE IF EXISTS `feed_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_like` (
  `feed_like_id` bigint NOT NULL AUTO_INCREMENT,
  `feed_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`feed_like_id`),
  KEY `FKgurobtyio3jh1vn4n8tmqt842` (`feed_id`),
  KEY `FKie3wsosw5w1vclgev0ofclm5b` (`user_id`),
  CONSTRAINT `FKgurobtyio3jh1vn4n8tmqt842` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`),
  CONSTRAINT `FKie3wsosw5w1vclgev0ofclm5b` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=656 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_like`
--

LOCK TABLES `feed_like` WRITE;
/*!40000 ALTER TABLE `feed_like` DISABLE KEYS */;
INSERT INTO `feed_like` VALUES (1,2,1),(2,2,3),(3,2,7),(4,3,7),(5,3,2),(6,3,3),(12,5,2),(14,5,1),(15,6,1),(16,4,1),(17,3,1),(24,10,3),(26,7,3),(28,5,7),(30,7,1),(38,2,2),(428,10,7),(489,2,5),(510,10,5),(511,7,5),(517,3,5),(526,6,5),(624,11,5),(627,11,2),(639,15,5),(640,16,5),(651,17,5);
/*!40000 ALTER TABLE `feed_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_tag`
--

DROP TABLE IF EXISTS `feed_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_tag` (
  `feed_tag_id` bigint NOT NULL AUTO_INCREMENT,
  `feed_id` bigint DEFAULT NULL,
  `tag_id` bigint DEFAULT NULL,
  PRIMARY KEY (`feed_tag_id`),
  KEY `FK62bjxf2ug56taebkuhhyqch85` (`feed_id`),
  KEY `FKsvdflgl0mnqvpirg0yc8dmcn6` (`tag_id`),
  CONSTRAINT `FK62bjxf2ug56taebkuhhyqch85` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`),
  CONSTRAINT `FKsvdflgl0mnqvpirg0yc8dmcn6` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_tag`
--

LOCK TABLES `feed_tag` WRITE;
/*!40000 ALTER TABLE `feed_tag` DISABLE KEYS */;
INSERT INTO `feed_tag` VALUES (2,2,2),(3,2,3),(4,3,4),(5,3,5),(6,4,6),(7,4,4),(8,4,7),(9,5,8),(10,5,9),(11,6,10),(12,6,11),(13,6,12),(14,7,13),(15,7,14),(16,7,15),(20,10,18),(21,10,19),(22,11,20),(25,15,23),(26,15,24),(27,15,25),(28,16,26),(29,16,27),(30,17,28);
/*!40000 ALTER TABLE `feed_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follow_id` bigint NOT NULL AUTO_INCREMENT,
  `from_user_id` bigint DEFAULT NULL,
  `to_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `FKepp5qc1696afiyipw8jhk6et7` (`from_user_id`),
  KEY `FKbo8snnjqnckmjhm2d71j3bc84` (`to_user_id`),
  CONSTRAINT `FKbo8snnjqnckmjhm2d71j3bc84` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKepp5qc1696afiyipw8jhk6et7` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (2,2,6),(3,2,5),(4,1,6),(11,1,2),(12,3,1),(15,5,2),(16,7,5),(19,5,6),(20,1,5),(21,5,3),(22,7,3),(27,5,8),(28,11,2),(29,11,7),(32,7,2),(33,7,6),(34,1,3),(42,2,7),(44,5,1),(45,5,7);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `styles`
--

DROP TABLE IF EXISTS `styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `styles` (
  `styles_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `style_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`styles_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles`
--

LOCK TABLES `styles` WRITE;
/*!40000 ALTER TABLE `styles` DISABLE KEYS */;
INSERT INTO `styles` VALUES (1,'첫 도전 완료','자 이제 시작이야'),(2,'건강 챌린지 5번 완료','헬스왕'),(3,'친환경 챌린지 5번 완료','환경미화원'),(4,'취미 챌린지 5번 완료','취향입니다 존중해주시죠'),(5,'학습 챌린지 5번 완료','공부벌레'),(6,'식습관 챌린지 5번 완료','바른 먹거리'),(7,'기타 챌린지 5번 완료','넓고 깊은'),(8,'외모관리 챌린지 5번 완료','아이돌'),(9,'온도 40도 이상','따뜻한'),(10,'온도 60도 이상','뜨거운'),(11,'온도 80도 이상','불타오르는'),(12,'온도 100도 이상','태양');
/*!40000 ALTER TABLE `styles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'zxc'),(2,'커밋'),(3,'잔디심기'),(4,'홍삼'),(5,'건강 챌린지'),(6,'냠냠'),(7,'08베이식'),(8,'말하는감자'),(9,'홍삼먹자'),(10,'글귀'),(11,'월식'),(12,'형'),(13,'고양이'),(14,'뚱이'),(15,'반려동물 놀아주기'),(16,'gg'),(17,'소시지의 유혹'),(18,'음식 해먹기'),(19,'망했다...'),(20,'홍삼킹'),(21,'잠깐'),(22,'테스트'),(23,'리액트'),(24,'lifecycle'),(25,'mount'),(26,'몸짱'),(27,'헬스왕'),(28,'알고리즘');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `choose_style` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT 'null',
  `ondo` int NOT NULL DEFAULT '36',
  `password` varchar(255) NOT NULL,
  `role` varchar(10) DEFAULT 'user',
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2022-02-15 21:55:53','2022-02-16 23:08:02','자 이제 시작이야','qweadzs@naver.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/user/db4541b9-c73b-49a6-8e3a-709ef707ed9estaticprofileimage',36,'$2a$10$BsfSU5a.urs2CyWZJXuRp.MJdchYR9QvfDtqTYaPof0K30H8YTDm2','USER','누누'),(2,'2022-02-15 22:06:02','2022-02-17 19:29:14',NULL,'ryan_h@kakao.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/user/1afa7948-2239-43d9-bc05-79f287d5dc0estaticprofileimage',36,'$2a$10$mSthtyYNICeESXTgQcRZYOUhW5iyyn53JGCXr33wm4WWhL8HKt9Ba','USER','다랑어치킨'),(3,'2022-02-15 22:09:46','2022-02-16 16:29:16',NULL,'goodly119@nate.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/user/8d77960f-5478-4f34-b265-357f86fb0c9cstaticprofileimage',36,'$2a$10$HTPYd2fe63Msz.a6sd.vXe5hDcopP00jc9KjlONHaDEIgW6EeIAru','USER','스윙스아닙니다'),(5,'2022-02-16 09:37:04','2022-02-16 23:54:22',NULL,'kimyh2725@naver.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/user/8df9f908-114e-4b12-9bad-8bcec6eb1fa4staticprofileimage',36,'$2a$10$fcSEvd4Pi9D.TPOxL6gcmO6NcpXxGGVKORKxP2bLSFg.SKlfXQd5a','USER','말하는 감자 ♨'),(6,'2022-02-16 10:31:08','2022-02-16 10:31:08',NULL,'dang0113@naver.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/default.jpg',36,'$2a$10$LZJAI5Kx4vTAfILlSuU5Cee/mnRfm1o67DDlo7A7siFiPtHooY.om','USER','dang0113'),(7,'2022-02-16 19:07:49','2022-02-17 21:22:14',NULL,'vkdlfl225@naver.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/user/20433795-1fe1-44f1-814f-4107a733bce0staticprofileimage',36,'$2a$10$rpWbFcgFbfVnWtbVoWHbYOfS/njJURPyu5h6oumhUoSyBeq62WbTC','USER','전기쥐'),(8,'2022-02-17 00:01:57','2022-02-17 00:01:57',NULL,'ldy1853@naver.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/default.jpg',36,'$2a$10$aRC1n81qzXEkc5.MMQXty.92sPp5IA6rG7S5JXmzgkEhaXGwhvt/.','USER','2119799341'),(9,'2022-02-17 01:32:24','2022-02-17 01:32:24',NULL,'jeonghwan.dev@kakao.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/default.jpg',36,'$2a$10$bS3FJFS4cCnXfc8xW.3LUeAI8jglOeUUaSM1vH.nS6Ttv5Ox9JKF6','USER','2123147219'),(10,'2022-02-17 03:01:16','2022-02-17 03:01:16',NULL,'jnh03231@naver.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/default.jpg',36,'$2a$10$aKAtlBE3uj9s3nJxJvJZUOa.nFTIoIiVm2ESwAPkEcXIAO/b0f8uO','USER','2123182411'),(11,'2022-02-17 10:27:09','2022-02-17 10:35:51',NULL,'samsee@kakao.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/user/30e91f55-0960-4587-bc56-37957151c76dstaticprofileimage',36,'$2a$10$wXeHsiiiqawN9UF3b5qD6uEhvM2jg97syI40TBACVdk2ah0.ARvT6','USER','ㅋㅅㅌㅌ'),(12,'2022-02-18 04:56:28','2022-02-18 04:57:18','undefined','dnjstlr3686@naver.com','https://ondobucket.s3.ap-northeast-2.amazonaws.com/static/user/4c94d766-c1fc-4cf5-ba17-6b67aa352910staticprofileimage',36,'$2a$10$KR4PZarMLl50oBnUXn13FO.khO9GRqZuFoiG9RQIYOU5KV.jzZWPi','USER','wooooo');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_style`
--

DROP TABLE IF EXISTS `user_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_style` (
  `user_style_id` bigint NOT NULL AUTO_INCREMENT,
  `styles_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_style_id`),
  KEY `FKabvsgm5132gmawjncqsid0qx7` (`styles_id`),
  KEY `FKattm4mm8aybv6jk7ascxdb5pc` (`user_id`),
  CONSTRAINT `FKabvsgm5132gmawjncqsid0qx7` FOREIGN KEY (`styles_id`) REFERENCES `styles` (`styles_id`),
  CONSTRAINT `FKattm4mm8aybv6jk7ascxdb5pc` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_style`
--

LOCK TABLES `user_style` WRITE;
/*!40000 ALTER TABLE `user_style` DISABLE KEYS */;
INSERT INTO `user_style` VALUES (1,1,1);
/*!40000 ALTER TABLE `user_style` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 10:02:26
