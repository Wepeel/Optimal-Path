class Hospital:
    def __init__(self, id_, dist, has_dept, load_percentage):
        self.id = id_
        self.dist = dist
        self.has_dept = has_dept
        self.load_percentage = load_percentage


def get_hsp(hosp_list, stable):
    """
    
    :param stable:
    :param hosp_list: list of (name, dist, has_dept, load_percentage, stable)
    :return: 
    """
    # model.predict(hosp)
    closest = ''
    hospitals = []
    has_dept = []
    for hosp in hosp_list:
        hospitals.append(Hospital(*hosp))

    # approximation of the distance
    for hosp1 in hospitals:
        d = hosp1.dist
        print(d)
        for hosp2 in hospitals:
            if abs(hosp2.dist - d) < 1:
                hosp2.dist = d

    hospitals.sort(key=lambda x: x.dist)

    if not stable:
        closest = [h for h in hospitals if h.dist == hospitals[0].dist]
        names = [(h.id, h.dist) for h in closest]
        print(names)
        for hosp in closest:
            if hosp.has_dept:
                return hosp.id
        else:
            return hospitals[0].id

    if stable:
        has_dept = [h for h in hospitals if h.has_dept]
        for hosp in has_dept:
            if hosp.dist < 50:
                return hosp.id
        else:
            return hospitals[0].id


def translate_data(json):
    hospitals = []
    stable = json['stable']
    for hosp in json:
        if hosp == 'stable':
            continue
        hosp_data = [hosp, *json[hosp]]
        hospitals.append(hosp_data)
    hospitals.sort(key=lambda x: x[1])
    return get_hsp(hospitals, stable)


def main(json):
    translate_data(json)
