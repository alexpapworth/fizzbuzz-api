Users
Numbers
Favourite
Session

Users
=====
show users (blank)
show user (id / name)
create user (blank / name)
destroy user (id / name)

	node api.js show users = list of all users
	node api.js show user --id 1 = show user with id 1
	node api.js show user --name HealthyCactusPlant = show user with name of HealthyCactusPlant
	node api.js create user = create user with random name
	node api.js create user --name HealthyCactusPlant = create user with name of HealthyCactusPlant
	node api.js destroy user --id 1 = destroy user with id 1
	node api.js destroy user --name HealthyCactusPlant = destroy user with name of HealthyCactusPlant

Sessions
========
show session (blank)
create session (id / name) (stored in local variable?)
destroy session (id / name)

	node api.js show session = session for this cli
	node api.js create session --id 1 = create session for user with id 1
	node api.js create session --name HealthyCactusPlant = create session for user with name HealthyCactusPlant
	node api.js destroy session = destroy current session

Numbers
=======
show numbers (blank / page / size)

	node api.js show number --id 1 = show number with id 1
	node api.js show numbers
	node api.js show numbers --page 1 --size 100

Favourites
==========
show favourites (id / name)

	node api.js show favourites = show favourites for current session user
	node api.js show favourites --id 1 = show favourites for user with id 1
	node api.js show favourites --name HealthyCactusPlant = show favourites for user with name HealthyCactusPlant
	node api.js create favourite --number 1 = create favourite for current session user for number 1
	node api.js destroy favourite --number 1 = destroy favourite for current session user for number 1

@turn into executable
https://scotch.io/@Youngestdev/how-to-build-a-nodejs-commandline-apps-with-yargs
