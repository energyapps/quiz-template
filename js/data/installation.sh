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
echo

EMPTY="" #this is our password.

#loop through arbitrary number of 
for (( i = 0; i < 10; i++ )); do
	CSVSTAT="$(which csvstat)"
	if [ "$CSVSTAT" != "$EMPTY" ]; then
		echo "You have csvstat!"
		echo "Ok, let's get started!" 
		break
	else
		echo "You don't have csvstat!"

		PIP="$(which pip)"
		if [ "$PIP" != "$EMPTY" ]; then
			echo "You have pip, so we're going to install csvkit!"
			pip install csvkit

		else
			echo "You don't have pip!"

			EASY="$(which easy_install)"
			if [ "$EASY" != "$EMPTY" ]; then
				echo "You have easy_install, so we're going to update pip!"
				sudo easy_install pip
			else
				echo "You don't have easy_install, and I need you to figure out how to download that!!! Google it. Sorry! Then run this again."				
			fi
		fi
	fi
done
	

#run the help?
echo "Now we're going to test csvstat help menu. If you don't get an error, you're doing it right!"
echo 
echo
csvstat -h