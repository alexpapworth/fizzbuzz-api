# Install

Clone this project.

```ruby
git clone git@github.com:alexpapworth/fizzbuzz-app.git
```

Install the dependencies

```ruby
cd fizzbuzz-api
sudo npm install fs
sudo npm install request
sudo npm install minimist
sudo npm link
```
# Usage

Run the API.

```ruby
fizzbuzz show favourites --number 8
```

# Help

To see a full list of commands, run:

```ruby
fizzbuzz --help
```

## Further reading

This repository was built to work with [Fizzbuzz App](https://github.com/alexpapworth/fizzbuzz-app), a Ruby on Rails website.

By default this api is configured to run off localhost:3000. You may switch it to point at the live website by modifying lines 6 and 7 in `api.js`

```ruby
domain = "http://localhost:3000";
// domain = "https://fizzbuzz.alexpapworth.co.uk";
```

or 

```ruby
// domain = "http://localhost:3000";
domain = "https://fizzbuzz.alexpapworth.co.uk";
```