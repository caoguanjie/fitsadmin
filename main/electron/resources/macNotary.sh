#!/bin/bash
uNames=`uname -s`
echo $uNames
if["$uNames"=="Darwin"]then
xcrun notarytool submit --team-id "323R8KUSV5" --apple-id "374348532@qq.com" --password "pbta-swua-ovon-qiny"  --wait "/Users/fits-vue/Documents/FitsAdmin_V2.0/main/release/2.0.0-beta.1/FitsAdmin-v2.0.0-beta.1-darwin.dmg" 
eta.1-darwin.dmg"