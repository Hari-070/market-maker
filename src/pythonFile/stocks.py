
import requests
from bs4 import BeautifulSoup
import json
import time

# URL for cryptocurrency data on Google Finance
url = 'https://www.google.com/finance/markets/cryptocurrencies?hl=en'

# Function to fetch the data
def fetch_crypto_data():
    # Send GET request to the page
    response = requests.get(url)

    # Parse the response content with BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # The class of the <ul> containing the cryptocurrency <li> items
    class1 = "sbnBtf"

    # Find the <ul> element with class 'sbnBtf'
    ul_element = soup.find('ul', class_=class1)

    # Find all the <li> elements within this <ul>
    list_items = ul_element.find_all('li') if ul_element else []

    # Initialize an empty list to store cryptocurrency data
    crypto_data = []

    # Loop through the list of items and extract details
    for item in list_items:
        # Extract the symbol (e.g., BTC, ETH, etc.)
        symbol = item.find('div', class_='COaKTb')
        symbol = symbol.text.strip() if symbol else "N/A"
        
        # Extract the name (e.g., Bitcoin, Ether)
        name = item.find('div', class_='ZvmM7')
        name = name.text.strip() if name else "N/A"
        
        # Extract the current price (e.g., 85,064.08)
        price = item.find('div', class_='YMlKec')
        price = price.text.strip() if price else "N/A"
        
        # Extract the price change (e.g., +2,505.66)
        price_change = item.find('span', class_='P2Luy')
        price_change = price_change.text.strip() if price_change else "N/A"
        
        # Extract the percentage change (e.g., +3.04%)
        percent_change = item.find('span', class_='NydbP')
        percent_change = percent_change.text.strip() if percent_change else "N/A"
        
        # Append the extracted data into the list
        crypto_data.append({
            'symbol': symbol,
            'name': name,
            'price': price,
            'price_change': price_change,
            'percent_change': percent_change
        })

    # Convert the data into JSON format
    json_data = json.dumps(crypto_data, indent=4)

    # Return the JSON data
    return json_data

# Loop to fetch data 10 times with a 3-second delay between each
for i in range(10):
    print(f"Fetching data... Iteration {i + 1}")
    data = fetch_crypto_data()
    print(data)
    
    # Wait for 3 seconds before the next request
    time.sleep(3)

print("Finished fetching data 10 times.")
