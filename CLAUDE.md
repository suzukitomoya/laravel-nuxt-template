# CLAUDE.md

## プロジェクト概要

Laravel 12 (バックエンド API) と Nuxt 4 (フロントエンド) を組み合わせたフルスタックテンプレート。Docker環境でのローカル開発と、AWS Lambda (Bref) へのサーバーレスデプロイをサポート。

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

## コードレビュー

### レビューの進め方

- レビューに必要な最新の情報を`WebFetch`や`WebSearch`を使用してWebから取得してください。

### レビュー観点

- セキュリティリスク（SQLインジェクション, XSS, 認証・認可の不備, バリデーションの不備など）
- コード品質（コーディング規約, 単一責任原則, DRY原則, 変数名・関数名が明確で説明的か, 複雑なロジックにコメントがあるかなど）
- パフォーマンス（N+1クエリ, 大量データ処理のページネーション・ストリーミング, 不要な再レンダリングなど）
- テスト（エッジケースがテストされているか, カバレッジのためではなく意味あるテストかなど）
- エラーハンドリング（適切な例外処理, エラーメッセージがユーザーフレンドリーで機密情報を漏らしていないかなど）

### 出力フォーマット

- 日本語で記述してください。
- **重要** レビューコメントをまとめて書くのは禁止です。すべての指摘箇所ごとに、必ずファイルに対してインラインコメントで記載してください。インラインコメントは`mcp__github_inline_comment__create_inline_comment`を使用して作成できます。
