#check to see if installed 

VALID_PASSWORD="secret" #this is our password.

echo "Please enter the password:"
read PASSWORD
echo $PASSWORD

if [ "$PASSWORD" == "$VALID_PASSWORD" ]; then
	echo "You have access!"
else
	echo "ACCESS DENIED!"
fi

# python test.py

# mv foo.txt foo.html