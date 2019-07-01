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


async function sendGetRequest(path) {
	getAuthToken.then(function(auth_token) {
		console.log(auth_token);
		options = {
			url: 'http://localhost:3000/api/v1/' + path,
			headers: {
				Cookie: 'auth_token='+auth_token
			},
			json: true
		};
		console.log(options);
		request.get(options, (err, res, body) => {
			if (err) { return console.log(err); }
			console.log(body);
		});
	});
}


if (argv._[0] == 'show') {
	switch(argv._[1]) {
		case "favourites":
			if (argv.id) {
				sendGetRequest("favourite/show/id"+argv.id);
			} else if (argv.name) {
				sendGetRequest("favourite/show/name"+argv.name);
			} else if (argv.number) {
				sendGetRequest("favourite/show/number"+argv.number);
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
