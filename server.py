from twilio.rest import Client
from bottle import get, route, redirect, run, Bottle, static_file, view, post, request, template
from twilio.twiml.messaging_response import Body, Message, MessagingResponse
import bottle
import json
import backend

app = Bottle()
account_sid = ""
auth_token = ""
client = Client(account_sid, auth_token)

@app.route('/')
def home():
    return static_file("index.html", root = "")

@app.route('/modules/main.js')
def main():
    return static_file('main.js', root='./modules')

@app.route('/modules/line.js')
def line():
    return static_file('line.js', root='./modules')

@app.route('/modules/map.js')
def maps():
    return static_file('map.js', root='./modules')

@app.route('/<state>')
def serveState(state):
	return template('Stats for {{state}}', state=state)
	
# format
# [{"date":"", "positiveCases": 0, "caseDensity": 0, "vaccintion": 0}]
@app.get('/covid/total')
def serverAllStats():
	retVal = backend.getUSData()
	return json.dumps(retVal)

@app.get('/covid/states')
def serveAllStateStats():
	retVal = backend.getAllStates()
	return json.dumps(retVal)

#format
#"positiveCases": 0, "caseDensity": 0, "vaccination": 0
@app.get('/covid/<state>')
def serveStateStats(state):
	state = state.upper()
	retVal = backend.getStateData(state)
	return json.dumps(retVal)

@app.post('/sms')
def serveText():

	body = bottle.request.forms['Body']

	print(body)

	parsed = body.split(",")

	state = parsed[1].strip()
	county=parsed[0].strip()

	resp = MessagingResponse()
	msg = Message()
	msg.body(backend.getCountyInfo(state.upper(), county.upper()))
	resp.append(msg)

	return str(resp)


run(app, host='localhost', port=8080)