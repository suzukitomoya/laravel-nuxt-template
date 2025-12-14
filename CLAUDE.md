# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Laravel 12 (バックエンド API) と Nuxt 4 (フロントエンド) を組み合わせたフルスタックテンプレート。Docker環境でのローカル開発と、AWS Lambda (Bref) へのサーバーレスデプロイをサポート。

## 開発コマンド

### ローカル開発の起動

```bash
# /etc/hosts に以下を追加（初回のみ）
# 127.0.0.1 nginx-container

# Dockerコンテナ起動
docker compose up -d

# Laravel セットアップ
docker compose exec php composer install
docker compose exec php cp .env.example .env
docker compose exec php php artisan key:generate

# Nuxt セットアップと開発サーバー起動
docker compose exec node npm install
docker compose exec node npm run dev
```

### テスト実行

```bash
# Laravel テスト
docker compose exec php php artisan test

# 特定のテストファイル
docker compose exec php php artisan test --filter=ExampleTest

# PHPUnit 直接実行
docker compose exec php ./vendor/bin/phpunit
```

### リント

```bash
# Laravel (Pint)
docker compose exec php ./vendor/bin/pint

# Nuxt (ESLint)
docker compose exec node npm run lint
docker compose exec node npm run lint:fix
```

### サーバーレスデプロイ

```bash
docker compose exec php php artisan config:clear
docker compose exec node npm run build:serverless

cd app
serverless deploy --aws-profile <YOUR_AWS_PROFILE>
```

## アーキテクチャ

```
/
├── app/                      # Laravel アプリケーション
│   ├── app/                  # Laravelコア (Http, Models, Providers)
│   ├── routes/api.php        # API エンドポイント定義
│   ├── frontend/             # Nuxt 4 アプリケーション
│   │   ├── app/              # Nuxtコア (pages, composables, plugins)
│   │   └── nuxt.config.ts    # Nuxt設定
│   └── serverless.yml        # AWS Lambda デプロイ設定
├── docker/                   # Docker設定 (nginx, php, node, mysql)
└── compose.yaml              # Docker Compose設定
```

### API通信

- フロントエンド (Nuxt) は `NUXT_SSR_API_BASE_URL` (SSR時) と `NUXT_PUBLIC_API_BASE_URL` (クライアント時) を使用してバックエンドAPIにアクセス
- ローカル環境: SSR時は `http://nginx` (Dockerネットワーク経由)、クライアント時は `http://localhost`
- APIエンドポイントは `/api/` プレフィックス

### サーバーレス構成

- Laravel API: `php-83-fpm` ランタイム、`/api/{proxy+}` パスで動作
- Nuxt フロントエンド: `nodejs20.x` ランタイム、`/{proxy+}` パスで動作
- デプロイリージョン: ap-northeast-1 (東京)

### Docker サービス

- `nginx`: ポート80でリクエストを受信、PHPに転送
- `php`: Laravel実行環境、`/var/www/app` にマウント
- `node`: Nuxt開発サーバー、ポート3000、`/app` にマウント
- `mysql`: データベース (user: local, password: local)