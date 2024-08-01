FROM php:8.2-cli
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN apt-get update
RUN apt-get install zip unzip
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY . .
RUN composer install
