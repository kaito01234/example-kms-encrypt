# Example KMSEncrypt

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/kaito01234/example-kms-encrypt)

KMSで文字列を暗号化するためのサンプル

## Installation

```bash
$ npm install
$ npm run db:generate
```

## Setup Database

```bash
$ docker compose up -d db
$ npm run db:reset
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
$ npm run db:studio
```

## Docker Artifacts

```bash
$ docker pull ogules/kmsencrypt-sample:latest
```

### Environment Variables

| Environment Variable    | Description          |
| ----------------------- | -------------------- |
| `DATABASE_URL`          | DataBase URL         |
| `KMS_KEY_ID`            | KMS Key ID           |
| `AWS_ACCESS_KEY_ID`     | AWS Accesskey        |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Accesskey |
