#!/bin/bash
UUID=`/usr/libexec/PlistBuddy -c Print:UUID /dev/stdin <<< \`security cms -D -i JC_Campmate_Dev.mobileprovision\` `
echo "UUID: $UUID"
cp -f "JC_Campmate_Dev.mobileprovision" "$HOME/Library/MobileDevice/Provisioning Profiles/$UUID.mobileprovision"
