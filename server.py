from bottle import get, route, redirect, run, Bottle, static_file, view, post, request
import bottle
import json

app = Bottle()

@app.route('/')
def home():
    return static_file(index.html)

@app.route('/<state>')
def serveState(state):
	return template('Stats for {{state}}', state=state)
	
# format
# [{"date":"", "positiveCases": 0, "caseDensity": 0, "vaccintion": 0}]
@app.get('/covid/total')
def serverAllStats():
	retVal = []
	return json.dumps(retVal)

#format
#"positiveCases": 0, "caseDensity": 0, "vaccintion": 0
@app.get('/covid/<state>')
def serveStateStats(state):
	retVal = {}
	return json.dumps(retVal)

app.run(app, host='localhost', port=8080)