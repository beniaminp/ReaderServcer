echo 'stop server'
./stop.sh
echo 'create old versions dir'
mkdir /home/beniaminp/sublime/old_versions
echo 'move current app to old version dir'
mv /home/beniaminp/sublime/ebook-0.0.1-SNAPSHOT.jar /home/beniaminp/sublime/old_versions/
echo 'copy new version'
cp target/ebook-0.0.1-SNAPSHOT.jar /home/beniaminp/sublime/
echo 'cd to sublime folder'
cd /home/beniaminp/sublime/
echo 'start server'
sudo ./start.sh