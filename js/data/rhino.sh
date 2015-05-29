#CURL IS CORRUPTING THE DOWNLOAD SOMEHOW!!!

#if curling from the web
# curl ftp://ftp.mozilla.org/pub/mozilla.org/js/rhino1_7R3.zip > /tmp/rhino3.zip
# cd /tmp
# unzip rhino3.zip

echo 'testing if you have rhino'



mkdir ~/Library/Java
mkdir ~/Library/Java/Extensions
mv /tmp/rhino1_7R3/js.jar ~/Library/Java/Extensions/