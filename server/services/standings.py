import requests
import schedule
import time
from pymongo import MongoClient, errors

# Connect to the database
client = MongoClient('mongodb+srv://ndefelice:iKsNIo8Z6xv5gzez@bestball.jduq6.mongodb.net/?retryWrites=true&w=majority&appName=BestBall')
db = client['2024']
collection = db['best-ball']

# Gets the standings of a sub-league
def get_standings(league_id):

    rosters_url = "https://api.sleeper.app/v1/league/{}/rosters".format(league_id)
    #print(rosters_url)
    response = requests.get(rosters_url)
    #print(response)

    if response.status_code == requests.codes.ok:
        #print(response.json())
        return response.json()
    else:
        print("Error: League ID is not valid.")
        return []



# Get the users of a sub-league
def get_users(league_id):
    users_url = "https://api.sleeper.app/v1/league/{}/users".format(league_id)
    #print(users_url)
    response = requests.get(users_url)
    #print(response)

    if response.status_code == requests.codes.ok:
        #print(response.json())
        return response.json()
    else:
        print("Error: League ID is not valid.")
        return []
    


# Get the merged standings of the entire best ball league.
# Each json object will look like this:
# {
#     "display_name": <display_name>,
#     "fpts": <fpts>.
# }
# THe json should be sorted by points.
def merge_standings_and_users(standings, users):
    # Create a dictionary for quick lookup of users by user_id
    user_dict = {user['user_id']: user for user in users}
    
    # Merge the standings with the corresponding user data
    merged_data = []
    for standing in standings:
        owner_id = standing['owner_id']
        if owner_id in user_dict:
            merged_standing = {
                'display_name': user_dict[owner_id]['display_name'],
                'fpts': standing['settings']['fpts'],
                'owner_id': owner_id,  # Include owner_id in the merged data
            }
            merged_data.append(merged_standing)
    
    return sorted(merged_data, key=lambda x: x['fpts'], reverse=True)


# Main function
def main():
    print("Updating database...")
    league_ids = ["1129049799606558720", "1129055384385323008", "1129055515994148864"]
    total_data = []
    for league_id in league_ids:
        standings = get_standings(league_id)
        users = get_users(league_id)
        merged_data = merge_standings_and_users(standings, users)
        total_data.extend(merged_data)

    # Sort the total data by points
    total_data = sorted(total_data, key=lambda x: x['fpts'], reverse=True)

    # Add rank based on the sort
    for i, data in enumerate(total_data):
        data['rank'] = i + 1

    # Update the database
    try:
        for data in total_data:
            collection.update_one(
                {'owner_id': data['owner_id']},  # Filter by owner_id
                {'$set': data},  # Update the document with new data
                upsert=True  # Insert the document if it does not exist
            )
        print("Database updated")
    except errors.PyMongoError as e:
        print(f"An error occurred: {e}")


# Schedule the update every 5 minutes
schedule.every(0.5).minutes.do(main)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(1)
