Slack Bot App Setup Guide

Creating a Slack App

Follow these steps to create and configure your Slack bot app:

1. Create a Slack App

We're going to use bot and app tokens for this guide.

Go to Slack API and create a new app.

Choose "From scratch" and provide an app name.

Select the workspace where the app will be installed.

2. Configure OAuth & Permissions

Navigate to OAuth & Permissions in the left sidebar.

Scroll down to the Bot Token Scopes section and click Add an OAuth Scope.

Add the following scopes:

chat:write - Allows the app to post messages in channels it’s a member of.

3. Install the App to Your Workspace

Scroll to the top of the OAuth & Permissions page.

Click Install App to Workspace.

Follow Slack’s OAuth UI to allow installation in your development workspace.

Once installed, you’ll see a Bot User OAuth Access Token.

4. Store Tokens in Environment Variables

Copy the Bot User OAuth Access Token and add it to your .env file.

Refer to .env.example for naming conventions.

5. Enable Socket Mode

Go to your app’s configuration page (select the app from your settings page).

Navigate to Socket Mode in the left sidebar and toggle it to enable.

6. Generate App-Level Token

Go to Basic Information and scroll down to the App-Level Tokens section.

Click Generate Token and Scopes.

Add the connections:write scope to this token.

Save the generated xapp token in your .env file.

7. Enable Event Subscriptions

Under Event Subscriptions, toggle the switch labeled Enable Events.

Add the following event listeners:

message.channels - Listens for messages in public channels where the app is added.

message.groups - Listens for messages in private channels where the app is added.

message.im - Listens for messages in DMs with users.

message.mpim - Listens for messages in multi-person DMs where the app is added.

8. Configure Bot Token Scopes

Add the following scopes under Bot Token Scopes:

channels:history - View messages in public channels where the bot is added.

chat:write - Send messages as the bot.

groups:history - View messages in private channels where the bot is added.

im:history - View messages in direct messages where the bot is added.

im:write - Start direct messages with users.

mpim:history - View messages in group direct messages where the bot is added.

9. Set Up Google Sheets API

Go to Google Cloud Console.

Create a new project or select an existing one.

Enable the Google Sheets API.

Generate and download service account credentials (JSON file).

Add the required Google Sheets API credentials to your .env file.

Create a new Google Sheet and format it as follows:

First row (header): Column A = Name, Column B = Location

Add sample data in the subsequent rows.

Note down the Sheet ID from the URL and add it to .env.

Ensure the sheet name is Sheet1.

10. Add port number in .env

Additional Resources

For more details, refer to Slack's Bolt.js Getting Started Guide. You can skip the coding sections and follow only the setup steps.