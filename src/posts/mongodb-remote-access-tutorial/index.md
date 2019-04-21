---
path: '/posts/mongodb-remote-access-tutorial'
date: '2019-03-19'
title: 'mongodb 원격 접속 및 인증 접속'
---

# 원격 접속을 위한 몽고디비 설정하기

이 가이드는 AWS EC2 우분투 버전에서 테스트 하였습니다.

## mognodb 설정 파일 수정하기

```bash
sudo vim /etc/mongod.conf
```

```
# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0 # change bindIp to 0.0.0.0 from 127.0.0.1
```

```bash
sudo service mongod restart
```

## 인증 원격 접속

### mongodb 설정 파일 수정하기

```bash
sudo vim /etc/mongod.conf
```

add these lines

```
security:
    authorization: 'enabled'
```

```bash
sudo service mongod restart
```

이렇게 해놓으면 앞으로 인증 없이는 원격 접속을 할수가 없습니다.

### 어드민 유저 생성

```bash
mongo

> db.createUser({
... user: "admin",
... pwd: "adminCustomPassword",
... roles: [
... { role: "userAdminAnyDatabase", db: "admin" },
... { role: "readWriteAnyDatabase", db: "admin" },
... { role: "dbAdminAnyDatabase", db: "admin" }
... ]
```

### 특정 데이터베이스를 위한 유저 만들기

```bash
> use YOUR_DB_NAME;

> db.createUser({
... user: "userCustomName",
... pwd: "userCustomPassword",
... roles: [
... { role: "userAdmin", db: "YOUR_DB_NAME" },
... { role: "dbAdmin", db: "YOUR_DB_NAME" },
... { role: "readWrite", db: "YOUR_DB_NAME" }
... ]
... });
```

## 유저 접속 테스트

```bash
mongo -u admin -p adminCustomPassword 127.0.0.1/admin
mongo -u userCustomName -p userCustomPassword 127.0.0.1/YOUR_DB_NAME
```
