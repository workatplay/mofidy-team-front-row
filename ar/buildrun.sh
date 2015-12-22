#!/bin/bash

rsync -avz images/ www/world/3_3dModels_1_3dModelOnTarget/images/
sudo cordova build android
sudo cordova run android
