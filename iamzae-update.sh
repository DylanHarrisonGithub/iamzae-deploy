cd ..
cp -r /home/iamdeejzae/iamzae-deploy/public ./
cd iamzae-deploy
sudo git pull
sudo npm install
cd ..
cp -r public /home/iamdeejzae/iamzae-deploy
sudo rm -rf public
cd iamzae-deploy
pm2 restart index.js
pm2 save