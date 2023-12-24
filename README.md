# Infinite Scroll Posts

An Angular front-end to infinite Scroll Post datas , read from back-end.
Back-end is a simple express application with just an GET api that listen on port 3000,
and return Posts.

Posts data just are an array.

### To build and run :

#### Prerequisite: You need docker and docker-compose han been installed on your OS.
After clone project by git, do followings:

```
$ cd infinit-scrolling-posts
```
```
$ sh ./run.sh
```

Docker compose  builds docker images and run containers and finnaly open angular app on browser.

- If app don't open automatically browse following address manually on browser:
```
http://localhost:8080
```

### To stop app:
If not in the cloned app path, first run :
```
$ cd infinit-scrolling-posts
```
and then run :
```
$ docker compose down
```
