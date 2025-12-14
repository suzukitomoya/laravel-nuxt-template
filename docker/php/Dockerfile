FROM php:8.5-fpm-alpine

RUN apk update && \
    apk add --no-cache bash icu-dev mysql-client autoconf gcc g++ make linux-headers libpng libjpeg libpng-dev libjpeg-turbo-dev libzip-dev && \
    docker-php-ext-configure gd --with-jpeg=/usr/include/ && \
    docker-php-ext-install -j$(nproc) pdo pdo_mysql exif bcmath intl gd zip && \
    apk del libpng-dev libjpeg-turbo-dev

COPY ./php.ini /usr/local/etc/php/conf.d/

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    rm -rf /tmp/src && \
    rm -rf /var/cache/apk

CMD ["php-fpm"]

EXPOSE 9000
