import requests, json

class Nominatim:

    def location_from_address(self, query):
        url = f"https://nominatim.openstreetmap.org/search?q={query}&format=json"
        response = requests.get(url)
        json_data = json.loads(response.text)
        latitude = json_data[0]["lat"]
        longitude = json_data[0]["lon"]
        acct_location = {"latitude": latitude, "longitude": longitude}
        return acct_location