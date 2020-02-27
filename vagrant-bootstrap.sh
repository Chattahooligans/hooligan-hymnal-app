#!/usr/bin/env bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g expo-cli
echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p