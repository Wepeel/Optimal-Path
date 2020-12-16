import socket
import json

dic = {
    'nausea': 'nausea',
    'unhahe': 'unequal hand height',
    'confspe': 'confused speech',
    'palpit': 'palpitations',
    'elngex': 'elongated exhale',
    'cldswt': 'cold sweat',
    'weak': 'weakness',
    'fever': 'fever',
    'anxconf': 'anxiety and confusion',
    'chepa': 'chest pain',
    'ceapecy': 'central and peripheral cyanosis',
    'facpa': 'facial Paralysis',
    'longse': 'long - lasting seizure',
    'squeaks': 'squeaks',
    'shrtbr': 'shortness of breath',
    'foammo': 'foaming at the mouth',
    'difbr': 'difficulty breathing',
    'resaumu': 'use of respiratory auxiliary muscles',
    'cough': 'cough',
    'dampcu': 'damp cough'
}

problems = ["stroke", "mi", "asthma", "status_epilepticus", "pneumonia"]

data = {
    'stroke': ['unequal hand height', 'confused speech', 'facial paralysis'],
    'mi': ['weakness', 'cold sweat', 'chest pain', 'difficulty breathing', 'shortness of breath', 'nausea',
           'palpitations', 'anxiety and confusion'],
    'asthma': ['elongated exhale', 'difficulty breathing', 'squeaks', 'cough', 'use of respiratory auxiliary muscles'],
    'status_epilepticus': ['long-lasting seizure', 'central and peripheral cyanosis', 'foaming at the mouth'],
    'pneumonia': ['fever', 'damp cough', 'chest pain', 'weakness', 'shivering', 'squeaks', 'cough']
}

imp_symptoms = {
    'stroke': ['unequal hand height', 'confused speech', 'facial paralysis'],
    'mi': ['weakness', 'cold sweat'],
    'asthma': ['elongated exhale'],
    'status_epilepticus': ['long-lasting seizure'],
    'pneumonia': ['fever', 'damp cough', 'chest pain']
}

IP = '127.0.0.1'

PORT = 5555


def any_in(a, b):
    return any(i in b for i in a)


def understand_problem(symptoms):
    for problem in problems:
        if any_in(symptoms, data[problem]) and any_in(symptoms, imp_symptoms[problem]):
            return problem


def translate_symptoms(symptoms):
    translated = []
    for i in symptoms:
        translated.append(dic[i])
    return understand_problem(translated)


def main():
    while True:
        # open socket with client
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind(("127.0.0.1", PORT))
        server_socket.listen()
        (client_socket, client_address) = server_socket.accept()
        # handle requests until user asks to exit
        rec = client_socket.recv(8192).decode()
        rec = json.loads(rec)
        symptom_codes = rec['symptoms']
        if rec['breathing'] == 1:
            symptom_codes += 'difbr'
        res = translate_symptoms(symptom_codes)
        client_socket.send(res.encode())
        print("Closing connection")
        client_socket.close()
        server_socket.close()


if __name__ == "__main__":
    main()
