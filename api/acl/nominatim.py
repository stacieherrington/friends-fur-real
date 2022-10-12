import requests, json

class Nominatim:

    def location_from_address(self, query):
        print(query)
        url = f"https://nominatim.openstreetmap.org/search?q={query}&format=json"
        response = requests.get(url)
        json_data = json.loads(response.text)
        print(json_data)
        if len(json_data) == 0:
            return None
        latitude = json_data[0]["lat"]
        longitude = json_data[0]["lon"]
        location = {"type": "Point", "coordinates": [longitude, latitude]}
        return location
