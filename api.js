const argv = require('minimist')(process.argv.slice(2));
console.log(argv.id);

if (argv._[0] == 'show') {
	switch(argv._[1]) {
		case "favourites":
			if (argv.id) {

			} else if (argv.name) {
				showFavourites();
			} else if (argv.number) {
				showFavourites();
			} else {
				if (false) {
					showFavourites();
				} else {
					console.log("\nNo arguments given for `show favourite`\n");
					console.log(" Choose a user using --id or --name");
					console.log(" Or choose a number using --number");
					console.log(" Or run `create session` to use `show favourite` without arguments\n");
				}
			}
		break;

		case "number":
			
		break;

		case "numbers":
			
		break;

		case "session":
			
		break;

		case "user":
			
		break;

		case "users":
			
		break;

	}
}

if (argv.help == true) {
	var help = "Usage: api.js <command> [options]\n\n";
	help += "Commands:\n\tapi.js show user  | Show information about users";
	console.log(help);
}


// Usage: api.js <command> [options]

// Commands:
//   api.js show user  | Show information about users

// Options:
//   --version   Show version number                                                                              [boolean]
//   -h, --help  Show help                                                                                        [boolean]
//   -                                                                                                           [required]

// Examples:
//   api.js show user --all                      | Show all users
//   api.js show user --id 1                     | Show user with id 1
//   api.js show user --name HealthyCactusPlant  | Show user with name HealthyCactusPlant

// Missing required argument: 
