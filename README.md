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



*Create Character Screen*
> Player name
> Character name
> Creator claims their character unless it is an NPC which is claimed by the GM. only one user can claim a character at a time


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


TODD
1. Build model for game and character.
2. Create routes for creating game, creating character, deleting character, check for game settings associated with session id, notification for character.
3. Route to move npcs, emit start timer and set timer on client side, next turn change is emitted from server, next button will emit turn change and restart timer. 
4. Emit database changes with socket on routes. 
5. Make a sorting algorithm that starts by prioritizing 

> Roll for initiative action will clear out initiative values from last encounter and bring up a modal for all players to fill out. By default the modal will show all of your characters and provide the option to enter initiative for all characters. Also add, remove, and track characters. 