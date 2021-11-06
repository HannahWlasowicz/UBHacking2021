import requests
import json

API = "veronica i swear to god if u put the api on ur git"



USData = requests.get("https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=" + API).json()

StatesData = requests.get("https://api.covidactnow.org/v2/states.json?apiKey=" + API).json()


#format
#"positiveCases": 0, "caseDensity": 0, "vaccination": 0
#retuns the data for the given state"
def getStateData(state):
	retVal = {}
	for state in StatesData:
		if((state["state"] == state):
			print("hello")
			retVal["positiveCases"] = state["metrics"]["testPositiveRatio"]
			retVal["caseDensity"] = state["metrics"]["caseDensity"]
			retVal["vaccination"] = state["metrics"]["vaccinationsCompletedRatio"]

			return retVal

	return retVal 

def getUSData():
	return