from flask import Flask, render_template, request, jsonify
import os
from os import environ
import json
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import sys
from random import randint
import datetime


technicians = ['Diana Prince','Tony Stark', 'Clark Kent', 'Bruce Wayne', 'Peter Parker', 'Wonder Women', 'Natasha Romanoff']
with open('defects.json') as f:
    defects_source = json.load(f)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

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
defects = db['defects']
aircrafts = db['aircrafts']
destinations = db['destinations']
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

@app.route('/create_defect', methods=['POST'])
def create_defect():
    defect_data = request.get_json(silent=True)
    if not defect_data.has_key('time_to_fix'):
        defect_data['time_to_fix'] = defects_source[int(defect_data['defect_type'])-1]['time_to_fix']
    defect_record_id = str(defects.insert_one(defect_data).inserted_id)
    return json.dumps({"defect_record_id" : defect_record_id})


@app.route('/defects/<city_code>')
def get_defects(city_code):
    defect_list = defects.find({'$and':[{'city_code': city_code},
                                        {'$or' : [{'status' : 'created'}, {'status' : 'deferred'}]}]}).sort('timestamp', pymongo.DESCENDING)
    defect_res = []
    for defect in defect_list:
        defect['defect_record_id'] = str(defect['_id'])
        if not defect.has_key('time_to_fix'):
            defect['time_to_fix'] = defects_source[int(defect['defect_type']) - 1]['time_to_fix']
        del(defect['_id'])
        defect_res.append(defect)
    return json.dumps(defect_res)


@app.route('/new_defects/<city_code>')
def get_new_defects(city_code):
    defect_list = defects.find({'$and':[{'city_code': city_code}, {'status' : 'created'}]}).sort('timestamp', pymongo.DESCENDING)
    defect_res = []
    for defect in defect_list:
        defect['defect_record_id'] = str(defect['_id'])
        del(defect['_id'])
        if not defect.has_key('time_to_fix'):
            defect['time_to_fix'] = defects_source[int(defect['defect_type']) - 1]['time_to_fix']
        defect_res.append(defect)
    return json.dumps(defect_res)

@app.route('/deferred_defects/<city_code>')
def get_deferred_defects(city_code):
    defect_list = defects.find({'$and':[{'city_code': city_code}, {'status' : 'deferred'}]}).sort('timestamp', pymongo.DESCENDING)
    defect_res = []
    for defect in defect_list:
        defect['defect_record_id'] = str(defect['_id'])
        del(defect['_id'])
        if not defect.has_key('time_to_fix'):
            defect['time_to_fix'] = defects_source[int(defect['defect_type']) - 1]['time_to_fix']
        defect_res.append(defect)
    return json.dumps(defect_res)

@app.route('/all_defects/<city_code>')
def get_all_defects(city_code):
    defect_list = defects.find({'city_code': city_code}).sort('timestamp', pymongo.DESCENDING)
    defect_res = []
    for defect in defect_list:
        defect['defect_record_id'] = str(defect['_id'])
        del(defect['_id'])
        if not defect.has_key('time_to_fix'):
            defect['time_to_fix'] = defects_source[int(defect['defect_type']) - 1]['time_to_fix']
        defect_res.append(defect)
    return json.dumps(defect_res)


@app.route(('/mark_defect_fixed/<defect_id>'))
def mark_fixed(defect_id):
    defects.find_one_and_update({'_id' : ObjectId(defect_id)}, {'$set':
                                                                    {'status' : 'fixed',
                                                                     'completed_timestamp':str(datetime.datetime.now()),
                                                                     'completed_person_name' : technicians[1]
                                                                     }})
    return 'OK'

@app.route(('/mark_defect_deferred/<defect_id>'))
def mark_deferred(defect_id):
    defects.find_one_and_update({'_id' : ObjectId(defect_id)}, {'$set': {'status' : 'deferred',
                                                                         'deferred_timestamp': str(datetime.datetime.now()),
                                                                         'deferred_person_name': technicians[1]
                                                                         }})
    return 'OK'


@app.route('/analytics', methods=['POST'])
def analytics():
    query_json = request.get_json(silent=True)
    defect_list =[]
    results = defects.find(query_json)
    for r in results:
        r['defect_record_id'] = str(r['_id'])
        del(r['_id'])
        defect_list.append(r)
    return json.dumps(defect_list)



def generate_defects():
    defect_all = []
    with open('data.json','w') as outfile:
        outfile.write('[')
        destination_list = get_array(destinations.find({}))
        aircraft_list = get_array(aircrafts.find({}))
        seats = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

        priority = ['low','medium','high']
        durration_map = {}
        journey_id_map  = {}
        with open('defects.json') as f:
            defects_source = json.load(f)
        start_date = datetime.datetime.now() + datetime.timedelta(-2)
        count = 0
        print destination_list
        for i in range(0,1):
            date = start_date+datetime.timedelta(days=i)

            for j in range(0,2):
                s_ran = randint(0, len(destination_list)-1)
                d_ran = randint(0, len(destination_list)-1)
                while  d_ran== s_ran:
                    d_ran = randint(0, len(destination_list)-1)
                source = destination_list[s_ran]['Code']
                dest = destination_list[d_ran]['Code']
                starttime = date + datetime.timedelta(hours=randint(1,12),minutes=randint(1,60))
                aircraft = aircraft_list[randint(1, len(aircraft_list)-1)]
                journey_id = randint(10001, 99999 )
                while journey_id_map.has_key(journey_id) :
                    journey_id = randint(10001, 99999 )
                journey_id_map[journey_id] = ""
                if durration_map.has_key(source+dest) :
                    duration = durration_map[source+dest]
                else:
                    duration = randint(3, 15)
                    durration_map[source+dest] = duration
                endtime = starttime+datetime.timedelta(hours=duration)
                for k in range(0,5):
                    index = randint(0,11)
                    defect = defects_source[index]
                    defect['journey_id'] = journey_id
                    defect['source'] = source
                    defect['dest'] = 'SFO'
                    defect["city_code"] = 'SFO'
                    defect["status"] =  "deferred"
                    defect["aircraft_id"] = aircraft["aircraft_registration_id"]
                    defect["aircraft"] =  aircraft["aircraft_type"]
                    defect["flight_start_time"] =  str(starttime)
                    defect["flight_end_time"] = str(endtime)
                    defect["priority"] = priority[randint(0,2)]
                    defect['timestamp'] = str(starttime + datetime.timedelta(hours=randint(1,duration),minutes=randint(1,60)))
                    # defect['completed_timestamp'] = str(endtime+datetime.timedelta(hours=randint(1,4), minutes=randint(1,60)))
                    # defect['completed_person_name'] = technicians[randint(0,6)]
                    if defect['defect_type'] < 9:
                        defect['seat_no'] = str(randint(1,50))+seats[randint(0,8)]
                    if defect.has_key('_id'):
                        del(defect['_id'])
                    outfile.write(json.dumps(defect))
                    outfile.write(',')
                    count = count +1
                    # print count
        outfile.seek(-1, os.SEEK_END)
        outfile.truncate()
        outfile.write(']')

def get_array(cursor):
    list = []
    for i in cursor:
        list.append(i)
    return list


def random_date(start,l):
   current = start
   while l >= 0:
      curr = current + datetime.timedelta(minutes=randint(1,60))
      yield curr
      l-=1

if __name__ == '__main__':
    # generate_defects()
    app.run(host='0.0.0.0', port=port, debug=True)
