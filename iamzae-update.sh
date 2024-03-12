cd ..
cp -r /home/iamdeejzae/iamzae-deploy/public ./
cd iamzae-deploy
sudo git pull
sudo npm install
cd ..
sudo rm -rf public
cd iamzae-deploy
pm2 reload index.js


