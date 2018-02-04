from flask import Flask, render_template, request, jsonify
import os
from os import environ
import json
from pymongo import MongoClient





db_name = 'heroku_0t309l33'
app = Flask(__name__)


# Setup MongoDB
uri = ''
if "MONGODB_URI" in os.environ:
    uri = environ.get('MONGODB_URI')
else:
    with open('mongo-cred.json') as f:
        uri = json.load(f)['uri']
client = MongoClient(uri)
db = client[db_name]

#------------------------------

port = int(os.getenv('PORT', 8000))

@app.route('/entry')
def entry():
    return render_template('entry.html')

@app.route('/logs')
def logs():
    return render_template('logs.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
