from bottle import get, route, redirect, run, Bottle, static_file, view, post, request, template
import bottle
import json
import backend

app = Bottle()

@app.route('/')
def home():
    return static_file("index.html", root = "")

@app.route('/<state>')
def serveState(state):
	return template('Stats for {{state}}', state=state)
	
# format
# [{"date":"", "positiveCases": 0, "caseDensity": 0, "vaccintion": 0}]
@app.get('/covid/total')
def serverAllStats():
	retVal = backend.getUSData()
	return json.dumps(retVal)

#format
#"positiveCases": 0, "caseDensity": 0, "vaccination": 0
@app.get('/covid/<state>')
def serveStateStats(state):
	state = state.upper()
	retVal = backend.getStateData(state)
	return json.dumps(retVal)

run(app, host='localhost', port=8080)