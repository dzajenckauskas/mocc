#!/bin/bash
set -e

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 22

cd /var/www/mocc

echo "→ Pulling latest code..."
git fetch origin main
git reset --hard origin/main

echo "→ Installing dependencies..."
npm install --ignore-scripts

echo "→ Building Next.js..."
npm run build

echo "→ Restarting services..."
/root/.nvm/versions/node/v18.18.0/bin/pm2 restart mocc

echo "✓ Deploy complete"
