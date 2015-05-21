#start by converting the xlsx to 3 multiple xlsx's
python multiples.py

#convert these three xlsx's to csv
in2csv wb1.xlsx > data.csv
in2csv wb2.xlsx > header.csv
in2csv wb3.xlsx > footer.csv

#delete xlsx files
rm wb1.xlsx wb2.xlsx wb3.xlsx