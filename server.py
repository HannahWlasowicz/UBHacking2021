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
	

@app.get('/covid/total')
def serverAllStats():
	return 1

@app.get('/covid/<state>')
def serveStateStats(state):
	return 1

app.run(app, host='localhost', port=8080)