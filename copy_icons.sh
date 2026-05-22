#!/bin/bash
SRC="/home/ajay/flutter/packages/flutter_tools/templates/app/android.tmpl/app/src/main/res"
DST="/mnt/d/Projects/Data Science Academia/dsa_app/android/app/src/main/res"
for density in mipmap-mdpi mipmap-hdpi mipmap-xhdpi mipmap-xxhdpi mipmap-xxxhdpi; do
    mkdir -p "$DST/$density"
    cp "$SRC/$density/ic_launcher.png" "$DST/$density/ic_launcher.png"
    echo "Copied $density/ic_launcher.png"
done
ls "$DST"
