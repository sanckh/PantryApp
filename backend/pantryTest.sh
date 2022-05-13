# Simple test to check if the endpoints are working as desired.
# To run, start backend server in a separate terminal tab and then run this script

printf "Testing pantry\n"
curl --request POST http://localhost:8080/pantry/add -H "accountID: mockAccount" -H "item: beans"
printf "Data sent\n"
if curl --request GET http://localhost:8080/pantry/list -H "accountID: mockAccount" | grep -q beans; then
    echo -en "\033[5m"
    echo "Success"
else
    echo -en "\033[7m"
    echo "Failure"
fi
echo -en "\033[0m"