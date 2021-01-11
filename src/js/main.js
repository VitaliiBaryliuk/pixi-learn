var fs = require('file-system');
const writeJsonFile = require('write-json-file');
import * as PIXI from 'pixi.js'

// 'assets/images3'

async function createAssetsListJson(list) {
  const listJson = JSON.stringify(list);

  await writeJsonFile("assets.json", listJson);
  // fs.writeFile("assets.json", listJson);
}

async function getAssetsList(path) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.send();
    xhr.responseType = 'document';
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        const resArr = [];
        const elements = xhr.response.getElementsByTagName("a");
        for (let x of elements) {
          if ( x.href.match(/\.(jpe?g|png|gif)$/) ) {
            resArr.push(x.href);
          } 
        };

        resolve(resArr);
      } 
      else {
        reject('Request failed. Returned status of ' + xhr.status);
      }
    }
  })
}

getAssetsList('assets/images3').then(res => {
  createAssetsListJson(res);
})



const app = new PIXI.Application({
  width: 720,
  height: 1280,
  backgroundColor: 0x1099bb,
  view: document.querySelector('#scene'),
  resolution: window.devicePixelRatio || 1
});

// PIXI.loader
//   .add([
//     "images/imageOne.png",
//     "images/imageTwo.png",
//     "images/imageThree.png"
//   ])
//   .load(setup);

const texture = PIXI.Texture.from('assets/bunny.png');
const bunny = new PIXI.Sprite(texture);
bunny.anchor.set(0.5);
bunny.x = 160
bunny.y = 160
app.stage.addChild(bunny);

app.ticker.add((delta) => {
  bunny.rotation -= 0.01 * delta;
});