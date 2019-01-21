#!/bin/sh
set -e
#
cd /opt/prod/www/oa_frontend

if [ -n "$OA_FRONTEND_URL" ]; then
    sed -i "s@{{\s*OA_FRONTEND_URL\s*}}@$OA_FRONTEND_URL@g" static/js/*.js
    sed -i "s@{{\s*OA_FRONTEND_URL\s*}}@$OA_FRONTEND_URL@g" static/js/*.js.map
fi
if [ -n "$OA_BACKEND_URL" ]; then
    sed -i "s@{{\s*OA_BACKEND_URL\s*}}@$OA_BACKEND_URL@g" /etc/nginx/conf.d/oa_nginx.conf
fi
###############
exec "$@"