# echo "test"
# echo $1

#start by converting the xlsx to 3 multiple xlsx's
python assets/scripts/multiples.py

#convert these three xlsx's to csv
in2csv assets/wb1.xlsx > assets/data.csv
in2csv assets/wb2.xlsx > assets/header.csv
in2csv assets/wb3.xlsx > assets/footer.csv

#delete xlsx files
rm assets/wb1.xlsx assets/wb2.xlsx assets/wb3.xlsx