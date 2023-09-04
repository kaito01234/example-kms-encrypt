## Description

KMSで文字列を暗号化するためのサンプル

## Installation

```bash
$ npm install
$ npm run generate
```

## Setup Database

```bash
$ docker compose up -d db
$ npm run reset
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Encrypt Request

```bash
$ curl localhost:3000/encrypt?plaintext=${text}
```

## Decrypt Request

```bash
$ curl localhost:3000/decrypt?id=${id}
```

## View Database

```bash
$ npm run studio
```

## Docker Artifacts

```bash
$ docker pull ogules/kmsencrypt-sample:latest
```

### Environment Variables

| Environment Variable | Description |
| --- | --- |
| `DATABASE_URL` | DataBase URL |
| `KMS_KEY_ID` | KMS Key ID |
| `AWS_ACCESS_KEY_ID` | AWS Accesskey |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Accesskey |
