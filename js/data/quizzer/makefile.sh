#check to see if brew installed 
echo "Welcome to My first installer package."
echo 
echo
echo
echo "You may need your admin password handy!"
echo 
echo
echo
echo 
echo
echo
echo 
echo
echo "first we're checking if you have Jekyll running"

EMPTY="" #this is our password.
JEK="$(which jekyll)"

#check if they even have jekyll, because jekyll build --watch can't keep up with the script.
if [ "$JEK" != "$EMPTY" ]; then
	echo "Do you have a jekyll server running locally? We're primarily concerned with 'jekyll serve' and 'jekyll build --watch'."
	echo "Type yes or no. It is case sensitive so type it right!!!"
	read ANSWER
	# Tell them to kill if yes
	if [ "$ANSWER" == "yes" ]; then
		echo "You need kill jekyll servers before running the DOE quiz generator again."
		exit
	# proceed if not!
	elif [ "$ANSWER" == "no" ]; then
		echo "You may proceed!"
	else 
		echo "You typed something wrong, run the script again and answer 'Yes' or 'No' or else..."
		say "come on my friend, run the script again and follow the directions. Next time I will be angry. jk. l o l. but really, run the script again and type in Yes or No."
		exit
	fi	
else
	echo "You don't have jekyll, so no worries! You may need that later tho..."
fi

#Install csvkit stuff
./assets/scripts/installation.sh

#Run Openpxyl and csvkit to get from a xlsx to a few csvs
./assets/scripts/makecsv.sh $1

#Run csvkit to get the needed json out of csv on the other end. 
./assets/scripts/makejson.sh

#Run the script that places the new json in doms!!!
python assets/scripts/createdom.py

#what to do now? Rearrange all the shiz and package it up into a zip/folder
zip -r quiz.zip assets/quiz/
mv data.xlsx assets/data.xlsx
