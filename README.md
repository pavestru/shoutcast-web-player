# Radio player for ShoutCast and CentovaCast

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setup

```
npm install
```

### Config

Create a similar config.json file inside src folder:

```
{
  "shoutCastUrl": "http://shoutcast.example.com:8888/;",
  "centovaCastUrl": "http://centova.example.com:8080/external/rpc.php"
}
```

### Logo and favicon

Put a logo.png file to src folder. Replace the favicon.ico inside public folder.

### Files index.html and manifest.json

Modify contents f index.html and manifest.json files inside your public folder.

## Development build

```
npm start
```

## Production build

```
npm run build
```
