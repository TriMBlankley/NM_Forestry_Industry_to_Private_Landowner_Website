from geopy.geocoders import Nominatim

def strAddresstoLogLat(adress):
    geolocator = Nominatim(user_agent="geocoding_app") # Replace "geocoding_app" with a descriptive name

    location = geolocator.geocode(adress)

    if location:
        latitude = location.latitude
        longitude = location.longitude
        return [latitude, longitude]
    else:
        return "Cannot be Found"

def main ():
    print("in main")
    adressLongLat = strAddresstoLogLat(input("Adress in: "))
    print(adressLongLat)


if __name__ == "__main__":
    main()

    

    

