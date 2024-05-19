FROM mysql:8.0

ARG TZ=Asia/Tokyo
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && chown -R mysql:root /var/lib/mysql/

COPY my.cnf /etc/my.cnf
COPY init.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]

EXPOSE 3306
