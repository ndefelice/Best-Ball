const mongoose = require('mongoose');
const https = require('https');
const User = require('../../schemas/user');
const { fetchLeagueUsers, fetchLeagueRosters } = require('../sleeper');

// MongoDB connection string
const db = "mongodb+srv://ndefelice28:rXQC1yBVNLPfTKEE@bestball.isljx.mongodb.net/bestball?retryWrites=true&w=majority&appName=bestball";

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  console.log('Connected to the database');
});

// Create each user to match our database schema. This will do it by league, and
// also calculate the league rank based on total points.
async function createUsers(league_id) {
    try {
        const users = await fetchLeagueUsers(league_id);
        const rosters = await fetchLeagueRosters(league_id);
        // console.log(users);
        // console.log(rosters);

        const leagueUsers = [];
        // Loop through each user and find the corresponding roster by owner_id
        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            // Find the roster where roster.owner_id matches user.user_id
            const roster = rosters.find(r => r.owner_id === user.user_id);

            const userInfo = new User({
                displayName: user.display_name,
                ovrRank: null,
                leagueRank: null,
                userAvatar: user.avatar || null,
                leagueId: league_id,
                userId: user.user_id, 
                roster: roster?.players || [], 
                totalPoints: roster?.settings.fpts
            });

            // console.log(userInfo);
            leagueUsers.push(userInfo);
        }
        // Sort users by totalPoints in descending order (highest points first)
        leagueUsers.sort((a, b) => b.totalPoints - a.totalPoints);

        // Assign leagueRank based on sorted order
        leagueUsers.forEach((user, index) => {
            user.leagueRank = index + 1; // Rank starts from 1
        });

        // Log or process the sorted users
        // console.log(leagueUsers);

        return leagueUsers.slice(0, 12); // Remove and ghost commishes
    }
    catch (error) {
        console.error('Error:', error);
    }
}

// Append each users in the league and calculate the overall rank.
async function appendUsers(allUsers) {
    // Sort combined users by totalPoints for ovrRank
    allUsers.sort((a, b) => b.totalPoints - a.totalPoints);

    // Assign ovrRank based on sorted order
    for (let i = 0; i < allUsers.length; i++) {
        allUsers[i].ovrRank = i + 1; // Rank starts at 1
    }

    //console.log(allUsers);

    return allUsers;
}

// Get the league users for each league, populate their data accordingly, and insert
// them into our database. If the user already exists, then the data will just be updated
async function updateUsers() {
    try {
        // Get users from all three leagues
        const league1Users = await createUsers('1129049799606558720');
        const league2Users = await createUsers('1129055384385323008');
        const league3Users = await createUsers('1129055515994148864');
    
        // Combine users from all three leagues into one array
        const allUsers = [...league1Users, ...league2Users, ...league3Users];

        // Rank the users
        const rankedUsers = await appendUsers(allUsers);
        
        // Map the ranked users to plain objects
        const newAllUsers = rankedUsers.map(user => user.toObject());

        // Iterate through each user and either insert or update their data
        for (const user of newAllUsers) {
            const { _id, ...userData } = user; // Destructure to remove _id
            
            // Find the user by userId and update, or insert if not found (upsert)
            await User.findOneAndUpdate(
                { userId: user.userId }, // Find the user by userId
                { $set: userData }, // Update the user data without _id
                { upsert: true, new: true } // Create new user if not found, return the updated document
            );
        }

        console.log('Users inserted/updated successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting/updating users:', error);
        mongoose.connection.close();
    }
}

async function main() {
    await updateUsers();
}

main();