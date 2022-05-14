# Simple test to check if the endpoints are working as desired.
# To run, start backend server in a separate terminal tab and then run this script

# Try to add without being logged in (expect failure)
printf "Testing login\n"
curl --request POST http://localhost:8080/pantry/add -H "accountID: mockID" -H "Content-Type: application/json" -d '[{"item_name":"beans","item_expiration":"2022-05-21T10:55:17.595865-04:00","item_quantity":1}]'
printf "Data sent\n"
if curl --request GET http://localhost:8080/pantry/list -H "accountID: mockID" | grep -q beans; then
    echo -en "\033[7m"
    echo "Failure"
else
    echo -en "\033[5m"
    echo "Success"
fi
echo -en "\033[0m"

# Login and run same
printf "Testing pantry\n"
curl --cookie cookies.txt --cookie-jar cookies.txt --request POST http://localhost:8080/register -H "Content-Type: application/json" -d '{"user_id":"mockID","user_name":"BDR","user_email":"fake@fake.com","-":"fakePassword"}'
curl --cookie cookies.txt --cookie-jar cookies.txt --request POST http://localhost:8080/login -H "Content-Type: application/json" -d '{"user_id":"mockID","user_name":"BDR","user_email":"fake@fake.com","-":"fakePassword"}'
printf "\nLogged in\n"
curl --cookie cookies.txt --cookie-jar cookies.txt --request POST http://localhost:8080/pantry/add -H "Content-Type: application/json" -d '[{"item_name":"beans","item_expiration":"2022-05-21T10:55:17.595865-04:00","item_quantity":1}]'
printf "Data sent\n"
if curl --cookie cookies.txt --cookie-jar cookies.txt --request GET http://localhost:8080/pantry/list | grep -q beans; then
    echo -en "\033[5m"
    echo "Success"
else
    echo -en "\033[7m"
    echo "Failure"
fi
echo -en "\033[0m"