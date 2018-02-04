from flask import Flask, render_template, request, jsonify
import os
from os import environ
from twitter import *
import json
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
from p2p import *



db_name = 'heroku_z9q1btk4'
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
feed_collection = db['feed_new']
#------------------------------

port = int(os.getenv('PORT', 8000))




@app.route('/entry')
def entry():
    return render_template('entry.html')

@app.route('/logs')
def logs():
    return render_template('logs.html')

@app.route('/')
def dashboard():
    return render_template('dashboard.html')


@app.route('/peer-lend')
def peer():
    return render_template('peer.html')

@app.route('/top_feed')
def top_feed():
    pos_feed = feed_collection.find({"sentiment":"Positive"}).sort('pos_count', pymongo.DESCENDING).limit(5)
    pres = []
    for pfeed in pos_feed:
        pfeed['id'] = str(pfeed['_id'])
        del(pfeed['_id'])
        pres.append(pfeed)

    nres = []
    neg_feed = feed_collection.find({"sentiment":"Negative"}).sort('neg_count', pymongo.DESCENDING).limit(5)
    for nfeed in neg_feed:
        nfeed['id'] = str(nfeed['_id'])
        del(nfeed['_id'])
        nres.append(nfeed)

    res = {}
    res['top_positive'] = pres
    res['top_negative'] = nres
    return json.dumps((res))

@app.route('/feed')
def feed():
    feed = feed_collection.find_one({"marked":None})
    feed['id'] = str(feed['_id'])
    del (feed['_id'])
    return json.dumps(feed)

@app.route('/vote')
def vote():
    id = request.args.get('id')
    senti = request.args.get('sentiment')
    feed = feed_collection.find_one({'_id' : ObjectId(id)})
    if senti == 'p':
        count = feed['p_count']+1
        feed = feed_collection.find_one_and_update({'_id' : ObjectId(id)}, {'$set':
                                                                                {'pos_count': count,"marked":1}})
    elif senti == 'n':
        count = feed['n_count'] + 1
        feed = feed_collection.find_one_and_update({'_id': ObjectId(id)}, {'$set':
                                                                               {'neg_count': count,"marked":1}})
    else :
        count = feed['neutral_count'] + 1
        feed = feed_collection.find_one_and_update({'_id': ObjectId(id)}, {'$set':
                                                                               {'neutral_count': count,"marked":1}})
    return 'OK'


@app.route('/create')
def create():
    n = request.args.get("n")
    return json.dumps(create_n_records(int(n)))

@app.route('/get_min_tokens')
def token():
    eth = float(request.args.get("eth"))
    currency = request.args.get("currency")
    return json.dumps(get_min_tokens(eth,currency))




def populate_news_feed():
    # Use twitter api to get tweets related to crypto
    # currency and run through a pipeline which identifies
    # whether its a market mover
    return "work in progress"



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
