# TEC2
An IRC bot for a specific channel.

## How to run locally
  1. `npm install`
  2. Set the config or environment variables
  3. `npm run migrations`
  4. `npm start`

## How to run production
This bot is made to run on AWS. It's pretty simple to setup. Just create an elastic beanstalk instance, make sure to set the environment variables, and deploy the code there.

## Commands
  * `!hello` - Hello World!
  * `!8ball <question>` Ask 8 Ball a question
  * Seen:
    * `!seen` - Tells you when the bot last saw you
    * `!seen <user>` - Tells you when the bot last saw an user
  * Strikes
    * `!strike` - Gives yourself a strike
    * `!strike <user>` - Gives an user a strike
  * Rankings - **Coming Soon**
    * `!rank <metric>` - Tells you your rank. List of Metrics:
      * coins
      * sexhad
      * messages
      * strikes
    * `!rank <metric> <user>` - Tells you an user's rank
  * Currency
    * `!coins` - Tells you how many coins you have
    * `!coins <user>` - Tells you how many coins an user has
    * `!give <user> <amount>` - Subtracts coins from you and gives it to another user
  * Blackjack - **Coming Soon**
    * `!wager` - Sets how many coins to wager
    * `!deal` - New deal
    * `!hit` - Adds a card
    * `!stand` - Holds
    * `!split` - I don't know what this does
    * `!double` - Don't know what this does either, yet
  * Hookers - **Coming Soon**
    * `!payhooker <amount>` - Pays a hooker the amount specified
    * `!stds` - Tells you what STDs you have
    * `!stds <user>` - Tells you what STDs an user has
    * `!sexhad` - Tells you how much sex you had
    * `!sexhad <user>` - Tells you how much sex an user had
