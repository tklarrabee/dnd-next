# dnd-next
dnd initiative tracker using react and socket.io



> Create a game record on "New Game" 
> DM mode or player mode
> DM can pause unpause, global next/previous, create/remove characters, specify PC and NPC
> Use Express Session to remember users and assign them characters
> When a user enters a game, the server will check for a cookie, and find any characters associated with that session Id
> Client will change client color on turn of your character. 
> DM Mode will highlight NPCs on their initiative count.
> Every person starts by entering a player name
> Select player or DM
> Both can then add character details: pc or npc, name, claimed or unclaimed (Characters created by default are claimed by user) 
> Character has an array field with ids of players. This will determine if they are tracking the character

*Game Model*
> Game is just an Id to associate with games and users
> String to change state between active game and encounter setup.
> status values: roll, pause, stop, and play
> roll: bring up modal to update initiative rolls
> play: Starts timer, sorts characters
> stop: clear initiative rolls, bring users back to create edit characters screen.
> pause: stops the timer, does not clear initiative
> Order: order will be assigned based on initiative and then change based on being moved up or down

*User Model*
> When a player enters with a new session Id they will be prompted to add a player name.
> Each time a user joins a set of alert records is generated for each character created.

*Character Model*
> Player enters a character name and player name (client will default to selected name)
> Database creates user_alert record for each user
> NPC true or false for removing NPCs after encounter

*User Alert Model*
> track character boolean field.

*Create Character Screen Pre-Encounter*
> Player name (Default Name Entered)
> Character name

*Routes*
> Create Game
> Add Player
> Add character
> Start Game
> End Encounter, remove NPCs
> Remove character, remove NPCs

*Real Time Updates*
> Create a room for each game
> Using Socket.io to update client. 
> Pause
> Set and update timer interval/ timer off
> Roll initiative
> Remove Character
> Add Character
> Next turn
> Swap Character Position after initiative.
> Update initiative roll to change order
> Clear NPCs, end encounter
> in encounter T/F
> Any number of DM's is ok, switch between DM and Player



Socket Utility
> Socket will put players in a contained room for emitting updates to all connected users
> Creating game will first make a call to the database to create a game entry
> On successful write to database, the client will send a create room request to the server.
> Socket will handle broadcasting
    >Changes of game state: pause, stop, play, rolling
    >Characters added
    >Character updates
    >Order Updates


> Socket 'create game' will create a room named after game id from mysql.
> Url will include mysql game id
> You can send the link to people so they can immediately join the game
> Once they enter a player name, select GM or Player they will be able to add characters. 
> When you hit create charactermodal will show player name and character name fields with default name the one they entered the room with. 
> The characters you create will show notification on their turn. 
> You can turn off and turn on notifications for any character.
> Character object has array field with ids of users tracking a character.
> Server will remember player name for room.


Express-Session
> The session id will be added to the user object so that the user session will reconnect and preserve notifications and remember name.
> When an end user joins a game, server will check game for related user record.
> Existing users will have their player name populated and previous notifications 

Client State:
> Current Turn field 
> Each characer component will have an associated boolean value for current turn and character Id value
> State will include an array of character Ids you are following.
> Component will toggle visuals when it's your character's turn. 
> Roll for initiative will bring up a modal asking for initiative values for all tracked characters
> Add character, change order of started game by switching to paused. 

Modals:
> New Player
> New Character
> Roll of Initiative: Show all tracked characters or all characters and enter rolls for all of them at once.
> Edit character and player name

TODD
1. Build model for game and character.
2. Create routes for creating game, creating character, deleting character, check for game settings associated with session id, notification for character.
3. Route to move npcs, emit start timer and set timer on client side, next turn change is emitted from server, next button will emit turn change and restart timer. 
4. Emit database changes with socket on routes. 
5. Make a sorting algorithm that starts by prioritizing 

> Roll for initiative action will clear out initiative values from last encounter and bring up a modal for all players to fill out. By default the modal will show all of your characters and provide the option to enter initiative for all characters. Also add, remove, and track characters. 