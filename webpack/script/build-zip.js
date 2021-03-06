#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const iconv = require('iconv-lite');

const extManifestJson = require('../../dist/manifest.json');

const DEST_DIR = path.join(__dirname, '../../dist');
const DEST_ZIP_DIR = path.join(__dirname, '../../dist-zip');

const extractExtensionData = () => ({
  name: extManifestJson.name,
  version: extManifestJson.version
});

const makeDestZipDirIfNotExists = () => {
  if (!fs.existsSync(DEST_ZIP_DIR)) {
    fs.mkdirSync(DEST_ZIP_DIR);
  }
};

//读取目录及文件
const readDir = (obj, nowPath) => {
  let files = fs.readdirSync(nowPath); //读取目录中的所有文件及文件夹（同步操作）
  files.forEach((fileName, index) => {
    //遍历检测目录中的文件
    let fillPath = nowPath + '/' + fileName;
    let file = fs.statSync(fillPath); //获取一个文件的属性
    if (file.isDirectory()) {
      //如果是目录的话，继续查询
      let dirlist = obj.folder(fileName); //压缩对象中生成该目录
      readDir(dirlist, fillPath); //重新检索目录文件
    } else {
      obj.file(fileName, fs.readFileSync(fillPath)); //压缩目录添加文件
    }
  });
};

const main = () => {
  const { name, version } = extractExtensionData();
  const zipFilename = `/${name}.zip`;
  const zip = new JSZip();

  makeDestZipDirIfNotExists();

  readDir(zip, DEST_DIR);

  zip
    .generateAsync({
      //设置压缩格式，开始打包
      type: 'uint8array', //nodejs用
      compression: 'DEFLATE', //压缩算法
      compressionOptions: {
        //压缩级别
        level: 1
      }
      // encodeFileName: string => {
      //   return iconv.encode(string, 'o@)%s5>~*b');
      // }
    })
    .then(function(content) {
      fs.writeFileSync(DEST_ZIP_DIR + zipFilename, content, 'utf-8'); //将打包的内容写入 当前目录下的 result.zip中
      console.log(`打包zip文件${zipFilename}`);
    });
};

main();
