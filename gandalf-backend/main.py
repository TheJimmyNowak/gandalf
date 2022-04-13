from flask import Flask, request
from flask_cors import CORS
import socket

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
IFACE = "wlp4s0"

BASE_URL = "/api/"

client_socket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

@app.route(BASE_URL + "web/", methods=['POST'])
def web():
    host = (request.json.get('host', ""), 8000)
    url = request.json['url']
    message = f"web {url}"
    encoded_message = str.encode(message)
    if host == "":
        for i in range(18):
            client_socket.sendto(encoded_message, f"172.16.10.{i+100}")

        return "Succes"
            
    client_socket.sendto(encoded_message, host)
    return "Succes"

