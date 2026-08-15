#!/usr/bin/env bash
# Deploy estático a Server 3 (/opt/frontends/<subcarpeta>), servido por politeia-nginx.
# Uso: frontend-prod-deploy.sh <dir-build> <subcarpeta>
set -euo pipefail

SOURCE_DIR="${1:?Uso: frontend-prod-deploy.sh <dir-build> <subcarpeta>}"
REMOTE_SUBDIR="${2:?subcarpeta requerida}"
SERVER3_HOST="${SERVER3_HOST:-deploy@10.0.0.3}"
REMOTE_DIR="/opt/frontends/${REMOTE_SUBDIR}"
SSH_OPTS="${SSH_OPTS:--o BatchMode=yes -o StrictHostKeyChecking=accept-new}"

if [ ! -d "${SOURCE_DIR}" ]; then
  echo "ERROR: no existe ${SOURCE_DIR}"
  exit 1
fi

if [ ! -f "${SOURCE_DIR}/index.html" ]; then
  echo "ERROR: falta ${SOURCE_DIR}/index.html"
  exit 1
fi

echo "Subiendo frontend ${REMOTE_SUBDIR} → ${SERVER3_HOST}:${REMOTE_DIR}"
tar -C "${SOURCE_DIR}" -czf - . | ssh ${SSH_OPTS} "${SERVER3_HOST}" \
  "mkdir -p '${REMOTE_DIR}' && tar -xzf - -C '${REMOTE_DIR}' && chmod -R a+rX '${REMOTE_DIR}'"

FILE_COUNT="$(ssh ${SSH_OPTS} "${SERVER3_HOST}" "find '${REMOTE_DIR}' -type f | wc -l | tr -d ' '")"
echo "Deploy frontend ${REMOTE_SUBDIR} completado (${FILE_COUNT} archivos)"
echo "DocumentRoot: ${REMOTE_DIR} → nginx /usr/share/nginx/html/${REMOTE_SUBDIR}"
