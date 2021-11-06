import requests
import json

API = "veronica i swear to god if u put the api on ur git"


USData = requests.get("https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=" + API).json()

statesReq = requests.get("https://api.covidactnow.org/v2/states.json?apiKey=" + API)
StatesData = statesReq.json()



#format
#"positiveCases": 0, "caseDensity": 0, "vaccination": 0
#retuns the data for the given state
def getStateData(state):
	retVal = {}
	for states in StatesData:
		if states["state"] == state:
			retVal["positiveCases"] = states["metrics"].get("testPositivityRatio", -1)
			retVal["caseDensity"] = states["metrics"].get("caseDensity", -1)
			retVal["vaccination"] = states["metrics"].get("vaccinationsCompletedRatio", -1)

			return retVal

	return retVal 

# format
# [{"date":"", "positiveCases": 0, "caseDensity": 0, "vaccintion": 0}]
#returns overall us data
def getUSData():
	retVal = []
	for val in USData["metricsTimeseries"]:
		addVal = {"date" : val["date"], "positiveCases": val["testPositivityRatio"], "caseDensity": val["caseDensity"], "vaccination":val.get('vaccinationsCompletedRatio', -1)}
		retVal.append(addVal)

	return retVal