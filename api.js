const fs = require('fs');
const request = require('request');
const argv = require('minimist')(process.argv.slice(2));
// console.log(argv.id);

// fs.writeFile(__dirname+"auth_token", "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 

var auth_token;

getAuthToken = new Promise(function(resolve, reject) {
	file = __dirname+"/auth_token";
	fs.access(file, fs.constants.F_OK, (err) => {
	  if (err) {
	  	resolve("");
	  } else {
	  	fs.readFile(file, "utf8", (err, data) => {
		  if (err) throw err;
		  console.log('got the token');
		  data = data.replace(/\n$/, '')
		  resolve(data);
		});
	  }
	});
});


async function sendDeleteRequest(path) {
	getAuthToken.then(function(auth_token) {
		console.log("auth_token:" + auth_token);
		options = {
			url: 'http://localhost:3000/api/v1/' + path,
			headers: {
				Cookie: 'auth_token='+auth_token
			},
			json: true
		};
		console.log(options);
		console.log();
		request.delete(options, (err, res, body) => {
			if (err) { return console.log(err); }
			console.log(body);
			if (eval(body).auth_token != undefined && eval(body).auth_token.length == 0) {
				file = __dirname+"/auth_token";

				fs.unlink(file, (err) => {
					if (err) throw err;
				});
			}
		});
	});
}

async function sendGetRequest(path) {
	getAuthToken.then(function(auth_token) {
		console.log("auth_token:" + auth_token);
		options = {
			url: 'http://localhost:3000/api/v1/' + path,
			headers: {
				Cookie: 'auth_token='+auth_token
			},
			json: true
		};
		console.log(options);
		console.log();
		request.get(options, (err, res, body) => {
			if (err) { return console.log(err); }
			console.log(body);
		});
	});
}

async function sendPostRequest(path) {
	getAuthToken.then(function(auth_token) {
		console.log("auth_token:" + auth_token);
		options = {
			url: 'http://localhost:3000/api/v1/' + path,
			headers: {
				Cookie: 'auth_token='+auth_token
			},
			json: true
		};
		console.log(options);
		console.log();
		request.post(options, (err, res, body) => {
			if (err) { return console.log(err); }
			console.log(body);
			if (eval(body).auth_token) {
				file = __dirname+"/auth_token";

			  	fs.writeFile(file, eval(body).auth_token, 'utf8', (err) => {
				  if (err) throw err;
				  console.log('\n  Wrote the auth_token to local system. You many now run `show favourites` and `create/destroy favourite`');
				});

			}
		});
	});
}


if (argv._[0] == 'create') {
	switch(argv._[1]) {
		case "favourite":
			if (argv.number) {
				sendPostRequest("favourite/create/number/"+argv.number);
			} else {
				console.log("\nNo arguments given for `create favourite`\n");
				console.log(" Select a number using --number\n");
			}
		break;

		case "session":
			if (argv.id) {
				sendPostRequest("session/create/id/"+argv.id);
			} else if (argv.name) {
				sendPostRequest("session/create/name/"+argv.name);

			} else {
				console.log("\nNo arguments given for `create session`\n");
				console.log(" Select a user using --id or --name\n");
			}
		break;

		case "user":
			if (argv.name) {
				sendPostRequest("user/create/name/"+argv.name);
			} else {
				sendPostRequest("user/create");
			}
		break;

	}
}

if (argv._[0] == 'destroy') {
	switch(argv._[1]) {
		case "favourite":
			if (argv.number) {
				sendDeleteRequest("favourite/destroy/number/"+argv.number);
			} else {
				console.log("\nNo arguments given for `destroy favourite`\n");
				console.log(" Select a number using --number\n");
			}
		break;

		case "session":
			getAuthToken.then(function(auth_token) {
				if (auth_token.length > 10) {
					sendDeleteRequest("session/destroy/");
				} else {
					console.log("\nLooks like there aren't any sessions to destroy.`\n");
					console.log(" Run `create session --id 1`");
					console.log(" Or `create session --name HealthyCactusPlant` to create one");
				}
			});
		break;

		case "user":
			if (argv.id) {
				sendDeleteRequest("user/destroy/id/"+argv.id);
			} else if (argv.name) {
				sendDeleteRequest("user/destroy/name/"+argv.name);
			} else {
				console.log("\nNo arguments given for `destroy user`\n");
				console.log(" Select a user using --id or --name\n");
			}
		break;

	}
}

if (argv._[0] == 'show') {
	switch(argv._[1]) {
		case "favourite":
			console.log("\nNo command found for `show favourite`. Did you mean `show favourites`?");
		break;

		case "favourites":
			if (argv.id) {
				sendGetRequest("favourites/show/id/"+argv.id);
			} else if (argv.name) {
				sendGetRequest("favourites/show/name/"+argv.name);
			} else if (argv.number) {
				sendGetRequest("favourites/show/number/"+argv.number);
			} else {
				getAuthToken.then(function(auth_token) {
					if (auth_token.length > 10) {
						sendGetRequest("favourite/show");
					} else {
						console.log("\nNo arguments given for `show favourite`\n");
						console.log(" Choose a user using --id or --name");
						console.log(" Or choose a number using --number");
						console.log(" Or run `create session` to use `show favourite` without arguments\n");
					}
				});
			}
		break;

		case "number":
			if (argv.id) {
				sendGetRequest("number/show/id/"+argv.id);
			} else {
				console.log("\nNo arguments given for `show number`\n");
				console.log(" Choose a number using --id");
				console.log(" Or show all numbers using `show numbers`");
			}
		break;

		case "numbers":
			if (argv.page && argv.size) {
				sendGetRequest("numbers/show/page/"+argv.page+"/size/"+argv.size);
			} else if (argv.page) {
				sendGetRequest("numbers/show/page/"+argv.page);
			} else if (argv.size) {
				sendGetRequest("numbers/show/size/"+argv.size);
			} else {
				sendGetRequest("numbers/show/");
			}
		break;

		case "session":
				getAuthToken.then(function(auth_token) {
					if (auth_token.length > 10) {
						sendGetRequest("session/show/");
					} else {
						console.log("\nLooks like there aren't any sessions enabled yet.`\n");
						console.log(" Run `create session --id 1`");
						console.log(" Or `create session --name HealthyCactusPlant` to create one");
					}
				});
		break;

		case "user":
			if (argv.id) {
				sendGetRequest("user/show/id/"+argv.id);
			} else if (argv.name) {
				sendGetRequest("user/show/name/"+argv.name);
			} else {
				console.log("\nNo arguments given for `show user`\n");
				console.log(" Choose a user using --id or --name");
				console.log(" Or show all users using `show users`\n");
			}
		break;

		case "users":
			sendGetRequest("users/show/");
		break;

	}
}
if (argv.version == true) {
	console.log("Fizzbuzz cli api v1.0.0");
} else if (argv.help == true || argv._.length == 0) {
	var help = "Usage: api.js <command> [options]\n\n";
	help += "Commands:";
	help += "\n  node api.js show favourites\t\tShow information about favourites";
	help += "\n  node api.js show numbers\t\tShow all numbers";
	help += "\n  node api.js show number\t\tShow information about a single number";
	help += "\n  node api.js show session\t\tShow information about current session";
	help += "\n  node api.js show users\t\tShow all users ";
	help += "\n  node api.js show user\t\t\tShow information about a single user";
	help += "\n\nOptions:";
	help += "\n  --version\tShow version number";
	help += "\n  --help\tShow help";
	help += "\n\nExamples:";
	help += "\n  node api.js show users\t\t\t\tlist of all users";
	help += "\n  node api.js show user --id 1\t\t\t\tshow user with id 1";
	help += "\n  node api.js show user --name HealthyCactusPlant\tshow user with name of HealthyCactusPlant";
	help += "\n  node api.js create user\t\t\t\tcreate user with random name";
	help += "\n  node api.js create user --name HealthyCactusPlant\tcreate user with name of HealthyCactusPlant";
	help += "\n  node api.js destroy user --id 1\t\t\tdestroy user with id 1";
	help += "\n  node api.js destroy user --name HealthyCactusPlant\tdestroy user with name of HealthyCactusPlant";
	help += "\n\n  node api.js show session\t\t\t\tshow session for this cli";
	help += "\n  node api.js create session --id 1\t\t\tcreate session for user with id 1";
	help += "\n  node api.js create session --name HealthyCactusPlant\tcreate session for user with name HealthyCactusPlant";
	help += "\n  node api.js destroy session --id 1\t\t\tshow session for this cli";
	help += "\n\n  node api.js show number --id 1\t\t\tshow number with id 1";
	help += "\n  node api.js show numbers\t\t\t\tshow all numbers";
	help += "\n  node api.js show numbers --page 1 --size 100\t\tshow 100 numbers starting at page 1";
	help += "\n\n  node api.js show favourites\t\t\t\tshow favourites for current session user";
	help += "\n  node api.js show favourites --id 1\t\t\tshow favourites for user with id 1";
	help += "\n  node api.js show favourites --name HealthyCactusPlant\tshow favourites for user with name HealthyCactusPlant";
	help += "\n  node api.js create favourite --number 1\t\tcreate favourite for current session user for number 1";
	help += "\n  node api.js destroy favourite --number 1\t\tdestroy favourite for current session user for number 1";
	help += "\n\n";
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
