# Make the csv become the JSON
# IF Error, throw error
# IF no error, continue
# mv data.csv data_YY_MM_DD_RAND.csv
#

#Make the date a variable
TODAY=$(date +%y-%m-%d)
echo "Today's Date is $TODAY"

#make a random string for this process of 6
NEW_UUID=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 6 | head -n 1)
echo "This random ID is $NEW_UUID"

#make a copy of the original data
cp data.csv csv/data-$TODAY-$NEW_UUID.csv

#transform the data into a json
csvjson data.csv > data.json

cp data.json json/data-$TODAY-$NEW_UUID.json

## how to clear the NEW_UUID from the system?................when you close out it will erase the variables you created.

### TEST TO MAKE SUREthat each has 4 answers, each is validated, that the data has the correct names.
# make sure that each column is named correctlyu using csvstat

csvjson footer.csv > footer.json
csvjson header.csv > header.json

#remove csv intermediates.
rm footer.csv header.csv data.csv