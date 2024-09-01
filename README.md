# laravel-nuxt-template

## Duplicate repository
https://docs.github.com/ja/repositories/creating-and-managing-repositories/duplicating-a-repository

```
git clone --bare https://github.com/suzukitomoya/laravel-nuxt-template.git

cd laravel-nuxt-template.git
git push --mirror https:///EXAMPLE-USER/NEW-REPOSITORY.git

cd ..
rm -rf laravel-nuxt-template.git
```

## Local development
```
cat /etc/hosts
127.0.0.1 nginx-container
```
```
docker compose up -d

docker compose exec php composer install
docker compose exec php cp .env.example .env
docker compose exec php php artisan key:generate

docker compose exec node npm install
docker compose exec node npm run dev
```

## Deploy serverless
```
npm install -g serverless@3

docker compose exec php php artisan config:clear
docker compose exec node npm run build:serverless

cd app
serverless deploy --aws-profile <YOUR_AWS_PROFILE>
```

## Remove serverless
```
cd app
serverless remove --aws-profile <YOUR_AWS_PROFILE>
```
