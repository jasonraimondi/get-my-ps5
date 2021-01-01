# Get My PS5

![Reddit conversation](./src/assets/bot-validation.jpg)

A simple command line interface (CLI) utility that checks for PlayStation 5 (disc or digital edition) every 5 seconds, then opens your browser as soon as it's available.

## How is this fork different than camtheperson/get-my-ps5

This fork contains dotenv support so you don't need to enter configuration options every boot. Take a look at [.env.sample](./.env.sample) and copy it to a file `.env` to enable. 

```
# disc/digital
#PS5_VERSION=disc

# true/false
#PLAY_ALARM=1

# MS
#CHECK_INTERVAL=30000

# chrome, firefox or /path/to/browser.exe
#BROWSER=firefox

# true/false
#INCOGNITO=0
```

## How can I support this project?

Follow me on Twitter: [@CamThePerson](https://twitter.com/CamThePerson) (feel free to hit me up if you have any trouble)

Donations greatly appreciated (this work takes time):
* [Cash App](https://cash.app/$CamThePerson)
* [Venmo](https://venmo.com/Cameron-Hermens-1)


## Quick start guide

1. Install the LTS version of [node](https://nodejs.org/en/).

1. Download this repository above.

1. After installing node, go into the `get-my-ps5` folder and run `npm install`.

1. After it finishes installing, run `npm run watch` to start monitoring for PlayStation 5 restocks.

_Still need help?_ Check out our [detailed installation guide](./docs/installation.md).

## Important note

By using this software, you are doing so at your own risk. 

The biggest consequence of running this software is getting an IP-based ban on the PlayStation Direct store. This can easily be circumvented by using a VPN, which is highly recommended.

## Additional documentation

* [How to install](./docs/installation.md)
* [How to use](./docs/usage.md)
* [Troubleshooting](./docs/issues.md)
* [Frequently asked questions](./docs/faq.md)
* [Contributing](./docs/contributing.md)
