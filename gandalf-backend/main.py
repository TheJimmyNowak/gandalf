from flask import Flask, request
import socket
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SERVER_ADDRESS_PORT = ("0.0.0.0", 8000)

client_socket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

@app.route("/web/", methods=['POST'])
def web():
    print(request.json)
    url = request.json['url']
    message = f"web {url}"
    encoded_message = str.encode(message)
    client_socket.sendto(encoded_message, SERVER_ADDRESS_PORT)
    return "Succes"
