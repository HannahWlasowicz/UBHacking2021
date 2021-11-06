import requests
import json

API = "veronica i swear to god if u put the api on ur git"

USData = requests.get("https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=" + API).json()

statesReq = requests.get("https://api.covidactnow.org/v2/states.json?apiKey=" + API)
print(statesReq.encoding)
StatesData = statesReq.json()


#format
#"positiveCases": 0, "caseDensity": 0, "vaccination": 0
#retuns the data for the given state"
def getStateData(state):
	retVal = {}
	for states in StatesData:
		if states["state"] == state:
			retVal["positiveCases"] = states["metrics"]["testPositivityRatio"]
			retVal["caseDensity"] = states["metrics"]["caseDensity"]
			retVal["vaccination"] = states["metrics"]["vaccinationsCompletedRatio"]

			return retVal

	return retVal 

def getUSData():
	return