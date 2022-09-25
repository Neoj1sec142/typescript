# Intro to Typescript:
***     
### To Init Typescript Project:
```s 
npm init -y # init json congi

npm i -D ts-node typescript # add these packages in devDependancies

npx tsc --init # add tsc config
```
***     
### Run TS-Node on TS file (serverless node wrapper)
```s
npx ts-node <filename>.ts
```
***      
### Objects: 
- To declare an object multiple times without decalring types multiple times declare an interface with the types, then use inheritance to implement the type declaration.