#!/bin/bash
set -e

export ANDROID_HOME=/home/ajay/android-sdk
export FLUTTER_HOME=/home/ajay/flutter
export GRADLE_USER_HOME=/home/ajay/.gradle
PROJECT="/mnt/d/Projects/Data Science Academia/dsa_app"

echo "===[A] Downloading Temurin JDK 17 (needed by sdkmanager) ==="
if [ ! -d /home/ajay/jdk17 ]; then
    curl -L --progress-bar \
        "https://api.adoptium.net/v3/binary/latest/17/ga/linux/x64/jdk/hotspot/normal/eclipse" \
        -o /tmp/jdk17.tar.gz
    mkdir -p /home/ajay/jdk17
    tar xf /tmp/jdk17.tar.gz -C /home/ajay/jdk17 --strip-components=1
    rm /tmp/jdk17.tar.gz
    echo "JDK 17 ready"
else
    echo "JDK 17 already present"
fi
export JAVA_HOME=/home/ajay/jdk17
export PATH="$JAVA_HOME/bin:$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$FLUTTER_HOME/bin"
java -version

echo "===[5/6] Accepting licenses and installing SDK packages ==="
yes | sdkmanager --licenses 2>&1 | grep -E "accepted|All SDK" || true
sdkmanager "platform-tools" "build-tools;35.0.0" "platforms;android-35"
echo "SDK packages done"

echo "===[6/6] Updating local.properties and building APK ==="
printf "flutter.sdk=%s\nsdk.dir=%s\n" "$FLUTTER_HOME" "$ANDROID_HOME" > "$PROJECT/android/local.properties"
echo "local.properties:"
cat "$PROJECT/android/local.properties"

cd "$PROJECT"
$FLUTTER_HOME/bin/flutter pub get
$FLUTTER_HOME/bin/flutter build apk --debug

echo "=== BUILD COMPLETE ==="
ls "$PROJECT/build/app/outputs/flutter-apk/"
