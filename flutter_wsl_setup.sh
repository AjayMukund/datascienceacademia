#!/bin/bash
set -e

FLUTTER_HOME=/home/ajay/flutter
ANDROID_HOME=/home/ajay/android-sdk
GRADLE_HOME=/home/ajay/.gradle
PROJECT="/mnt/d/Projects/Data Science Academia/dsa_app"

echo "===[1/6] Verifying tools (no apt-get needed) ==="
echo "  curl:    $(curl --version 2>&1 | head -1)"
echo "  xz:      $(xz --version 2>&1 | head -1)"
echo "  tar:     $(tar --version 2>&1 | head -1)"
echo "  python3: $(python3 --version)"
echo "  java:    $(java -version 2>&1 | head -1)"
echo "All OK"

echo "===[2/6] Getting Flutter stable download URL ==="
FLUTTER_JSON=$(curl -sf "https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json")
CURRENT_HASH=$(echo "$FLUTTER_JSON" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['current_release']['stable'])")
FLUTTER_ARCHIVE=$(echo "$FLUTTER_JSON" | H="$CURRENT_HASH" python3 -c "import sys,json,os; d=json.load(sys.stdin); r=[x for x in d['releases'] if x['hash']==os.environ['H']][0]; print(r['archive'])")
FLUTTER_VERSION=$(echo "$FLUTTER_JSON" | H="$CURRENT_HASH" python3 -c "import sys,json,os; d=json.load(sys.stdin); r=[x for x in d['releases'] if x['hash']==os.environ['H']][0]; print(r['version'])")
FLUTTER_URL="https://storage.googleapis.com/flutter_infra_release/releases/${FLUTTER_ARCHIVE}"
echo "Flutter $FLUTTER_VERSION => $FLUTTER_URL"

echo "===[3/6] Downloading Flutter SDK (~1.5 GB) ==="
curl -L --progress-bar "$FLUTTER_URL" -o /tmp/flutter_sdk.tar.xz
echo "Extracting Flutter..."
tar xf /tmp/flutter_sdk.tar.xz -C /home/ajay/
rm /tmp/flutter_sdk.tar.xz
echo "Flutter ready at $FLUTTER_HOME"

echo "===[4/6] Downloading Android cmdline-tools (Linux) ==="
mkdir -p $ANDROID_HOME/cmdline-tools
curl -L --progress-bar "https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip" -o /tmp/cmdtools.zip
echo "Extracting with Python zipfile..."
python3 -c "
import zipfile, os
with zipfile.ZipFile('/tmp/cmdtools.zip') as z:
    z.extractall('$ANDROID_HOME/cmdline-tools/')
"
mv $ANDROID_HOME/cmdline-tools/cmdline-tools $ANDROID_HOME/cmdline-tools/latest
rm /tmp/cmdtools.zip
echo "Android cmdline-tools ready"

export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$FLUTTER_HOME/bin"
export ANDROID_HOME=$ANDROID_HOME

echo "===[5/6] Accepting licenses and installing Android SDK packages ==="
yes | sdkmanager --licenses 2>&1 | grep -E "accepted|All SDK" || true
sdkmanager "platform-tools" "build-tools;35.0.0" "platforms;android-35"
echo "Android SDK ready at $ANDROID_HOME"

echo "===[6/6] Updating local.properties and building APK ==="
printf "flutter.sdk=%s\nsdk.dir=%s\n" "$FLUTTER_HOME" "$ANDROID_HOME" > "$PROJECT/android/local.properties"
echo "local.properties:"
cat "$PROJECT/android/local.properties"

cd "$PROJECT"
export GRADLE_USER_HOME=$GRADLE_HOME
$FLUTTER_HOME/bin/flutter pub get
$FLUTTER_HOME/bin/flutter build apk --debug

echo "=== BUILD COMPLETE ==="
ls "$PROJECT/build/app/outputs/flutter-apk/" 2>/dev/null || echo "APK dir not found"
