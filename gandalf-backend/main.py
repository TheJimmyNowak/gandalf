from flask import Flask, request
from flask_cors import CORS
import socket

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
IFACE = "wlp4s0"


client_socket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

@app.route("/web/", methods=['POST'])
def web():
    host = (request.json['host'], 8000)
    url = request.json['url']
    message = f"web {url}"
    encoded_message = str.encode(message)
    client_socket.sendto(encoded_message, host)
    return "Succes"

