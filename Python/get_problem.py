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
    print(understand_problem(translated))
