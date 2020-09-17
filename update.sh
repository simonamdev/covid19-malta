git stash
git pull
python3 download_latest.py
python3 convert_latest.py
git commit -a -m 'Updated to latest data'
git push
git stash pop