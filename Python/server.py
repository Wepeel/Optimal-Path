import socket
import requests
import json


PORT_Client = 3333


def main():
    while True:
        # open socket with client
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind(("127.0.0.1", PORT_Client))
        server_socket.listen()
        (client_socket, client_address) = server_socket.accept()
        print("Connected")
        # handle requests until user asks to exit
        rec = client_socket.recv(8192).decode()
        print(rec)
        url = 'http://127.0.0.1:3000/case'
        res = requests.post(url, data=json.loads(rec))
        res = json.loads(res.text)["name"]
        print(res)
        client_socket.send(res.encode())
        print("Closing connection")
        client_socket.close()
        server_socket.close()
        
main()