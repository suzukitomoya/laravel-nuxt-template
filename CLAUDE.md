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

### レビュー観点

- セキュリティリスク（SQLインジェクション, XSS, 認証・認可の不備, バリデーションの不備など）
- コード品質（コーディング規約, 単一責任原則, DRY原則, 変数名・関数名が明確で説明的か, 複雑なロジックにコメントがあるかなど）
- パフォーマンス（N+1クエリ, 大量データ処理のページネーション・ストリーミング, 不要な再レンダリングなど）
- テスト（エッジケースがテストされているか, カバレッジのためではなく意味あるテストかなど）
- エラーハンドリング（適切な例外処理, エラーメッセージがユーザーフレンドリーで機密情報を漏らしていないかなど）

### 出力フォーマット

- 出力は日本語で記述し、特定のコードに対する指摘はインラインコメントで指摘してください。
- モデルの知識が最新でない可能性を考慮してください。最新の情報が必要な場合はWebから取得してください。
- 特定のファイルに対するコメントは、`mcp__github_inline_comment__create_inline_comment`を使用してインラインコメントとして作成してください。
- 以下のフォーマットでレビュー結果を提供してください：

### 概要
変更内容の簡潔な概要と全体的な評価。

### 発見された問題
重要度別に問題を分類して列挙：
- **Critical（重大）**: マージ前に必ず修正が必要
- **Major（重要）**: 修正すべきだが、フォローアップで対応可
- **Minor（軽微）**: 改善の提案
