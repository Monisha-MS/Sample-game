**Bowling game**

![BowlingGame](https://github.com/Dhinesh-M-7/Initial_Setup/assets/89065192/2da568cd-232a-405e-8d65-63258d0f0d94)

**Description**

Interactive bowling game with physics.

**How to Play**

Move the ball to the left or right to position it.
Make use the projectcile arrow to aim the pins.
Drag the ball to adjust the speed with which the ball hit the pins.

**Built With**

[https://www.babylonjs.com/](url)

[https://www.npmjs.com/package/@babylonjs/havok](url)

**How to Clone**

```bash
    git clone https://github.com/Dhinesh-M-7/BowlingBallVR.git
    npm install
    npm run dev
```

**How to deploy to github-pages**

```bash
    npm install gh-pages --save-dev
    npm run deploy
```
prerequisites:
npm install gh-pages --save-dev

**before** : 
npm run build --> (vite build)
creates a 'dist' directory with index.html and assets(JS & CSS files)
creates locally (base: /) and it is needed for us to add ./
other larger assets like images, audios, glbs needed to be manually added through github.
Needs new repository to hold deployment and development seperately

**new changes** :
npm run deploy
- predeploy: vite build -> copies additional assets (images, audios, glbs)
- deploy: (predeploy) -> runs gh-pages on 'build' directory

creates a 'build' directory with all necessities for deployment
publishes to new branch 'gh-pages' under the same (project personal) repo
deploys automatically every time the command gets executed

vite.config.js : changes dist to build, adds ./ in index.html and omits the chunkSizeWarning limit
