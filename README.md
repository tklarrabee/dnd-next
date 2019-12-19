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
> Update
