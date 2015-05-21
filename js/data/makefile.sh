#Install csvkit stuff
./installation.sh

#Run Openpxyl and csvkit to get from a xlsx to a few csvs
./makecsv.sh

#Run csvkit to get the needed json out of csv on the other end. 
./makejson.sh

#Run some script that places the new json in the script and reruns the JAUNT!