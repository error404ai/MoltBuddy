#!/bin/bash
set -a
source .env
set +a

mysql --protocol=TCP -u $DB_USERNAME -p$DB_PASSWORD -e "DROP DATABASE IF EXISTS $DB_NAME; CREATE DATABASE $DB_NAME;"

mysqldump --protocol=TCP --set-gtid-purged=OFF --single-transaction -h $LIVE_DB_HOST -P $LIVE_DB_PORT -u $LIVE_DB_USERNAME -p$LIVE_DB_PASSWORD $LIVE_DB_NAME | mysql --protocol=TCP -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -p$DB_PASSWORD $DB_NAME