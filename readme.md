# iamzae
demo:
https://dharrsnprojects.com/iamzae

development:
1. in root iamzae directory run: npm install
2. in client directory run: npm install
3. in server directory run: tsc -w
4. in build directory run: node index.js
5. in client directory run: npm start

build:
1. in root iamzae directory run: npm install
2. in client directory run: npm install
3. in server directory run: tsc
4. in client directory run: npm build --prod
5. build directory is ready to be deployed

environment:
1.  IAMZAE_SERVER_SECRET: optional server secret, default random secret is generated
2.  IAMZAE_DATABASE_URL: required postgresql connection string `postgres://${user}:${url}:${port}/${database}`
3.  IAMZAE_PORT: optional port number, default 3000,
4.  IAMZAE_EMAIL: required 2fa enabled gmail with app password
5.  IAMZAE_PASSWORD: required 2fa enabled gmail app password
6.  IAMZAE_MAX_HD_SIZE_GB: optional storage size in GB
7.  IAMZAE_REPO_URL: optional github repo, enables self-update (no prefix, e.g. github.com/myrepo.git )
8.  IAMZAE_REPO_PAT: optional github repo personal access token, enables self-update for private repo

building for deployment to non-root baseurl:
1.  client/src/package.json -> "homepage": "/path/to/baseurl"
2.  client/src/app.tsx -> <BrowserRouter basename='/path/to/baseurl'>               or      <BrowserRouter basename={process.env.PUBLIC_URL}>
3.  client/src/config/config.ts -> URI.PRODUCTION: "/path/to/baseurl/"              or      PRODUCTION: process.env.PUBLIC_URL + "/"
4.  client/src/config/config.ts -> ASSETS.PRODUCTION: "/path/to/baseurl/public/"    or      PRODUCTION: `${process.env.PUBLIC_URL}/public/`
5.  npm run build --prod
6.  /etc/nginx/sites-available/default location example:
  location /iamzae/ {
    proxy_pass http://localhost:3000/;
    client_max_body_size 5G;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass \$http_upgrade;
  }
