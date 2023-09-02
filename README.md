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
$ npm run generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Encrypt Request

```
curl -X POST -H "Content-Type: application/json" -d '{"plaintext":"${text}"}' localhost:3000
```

## Decrypt Request

```
curl localhost:3000/${id}
```

## Watch Database

```bash
$ npm run studio
```
