# Contact Entry

A simple contact entry system with REST APIs that will enable a client to perform CRUD operations on the contact collection.


## Installation
```
1. git clone https://github.com/pawanpinjarkar/contact-entry.git
2. cd contact-entry
3. npm install
4. # export the environment variables described below
5. npm start
```

### Environment Variable

- iamApiKey - Reach out to me over email for the value of this IAM APIKEY


## Request & Response Examples

### API Resources:

  - [POST /contacts](#post-contacts) Create a new contact
  - GET /contacts List all contacts
  - PUT /contacts/{id} Update a contact
  - GET /contacts Get a specific contact
  - DELETE /contacts Delete a contact

### POST /contacts

This will create a new contact in the NoSQL cloudant database.


Request body:
```
{
  "name": {
    "first": "Harold",
    "middle": "Francis",
    "last": "Gilkey
  },
  "address": {
    "street": "8360 High Autumn Row",
    "city": "Cannon",
    "state": "Delaware",
    "zip": "19797"
  },
  "phone": [
    {
      "number": "302-611-9148",
      "type": "home"
    },
    {
      "number": "302-532-9427",
      "type": "mobile"
    }
  ],
  "email": "harold.gilkey@yahoo.com"
}

```

## Istanbul & Travis

Istanbul is the code coverage tool and is defined with the following minimum code coverage:

```
check:
  # Existing coverage checks.
  # For all files as an *aggregate*.
  global:
    statements: 75
    lines: 75
    branches: 50
    functions: 100

  # For each and every file on an individual basis.
  each:
    statements: 75
    lines: 75
    branches: 50
    functions: 100
```

These settings are defined in .istanbul.yml. For all available options go to: ..\node_modules\istanbul

Win
```
node  .\lib\cli.js help config
```

Mac/Linux
```
istanbul help config
```

to ignore branches you can use:

```
/* istanbul ignore if */
/* istanbul ignore else */
/* istanbul ignore next */
```

## Contributing
* Pawan Pinjarkar
