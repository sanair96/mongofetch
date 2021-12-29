# Mongo Fetch docs

Follow the instructions below to run the repo on your machine.

### Setting up dev environment
* Install NodeJs
* A text editor
* A package manager of your choice

### Steps to run code

1. Clone the repo to your machine
2. Open terminal and navigate to repo directory
3. Run `npm i` or `yarn`
4. Run `npm start` or `yarn start` to start the server

### Routes

`/getrecords`

**Request**

*Method* - POST

*Request Body*

```
{
    startDate: String (format: 'YYYY-MM-DD'),
    endDate: String (format: 'YYYY-MM-DD'),
    minCount: number,
    maxCount: number
}
```

*Response*

```
{
    code: number,
    msg: string,
    records: {
        key: string,
        createdAt: string,
        totalCount: number
    }[]
}
```
*Sample Request Body*

```
{
    "startDate": "2010-10-09",
    "endDate": "2020-11-09",
    "minCount": 110,
    "maxCount": 125
}
```

*Sample Response*

```
{
    "code": 0,
    "msg": "success",
    "records": [
        {
            "createdAt": "2015-12-02T06:34:16.549Z",
            "key": "NhXxfjoH",
            "totalCount": 125
        },
        {
            "createdAt": "2016-12-10T15:54:43.438Z",
            "key": "LdgIraiB",
            "totalCount": 125
        },
    ]
} 
```



### Testing the repo

You can run the tests using the command `npm jest` or `yarn jest`