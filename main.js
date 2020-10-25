const fs = require('fs');
const readEachLineSync = require('read-each-line-sync')

function Onkun() {
  var dict = {};
  readEachLineSync(__dirname + '/Unihan-kJapaneseOnKun.txt', 'utf8', (line) => {
    var [kanji, on, kun] = line.split('\t');
    if (on) { on = on.split(' '); }
    if (kun) { kun = kun.split(' '); }
    dict[kanji] = [on, kun];
  });
  this.dict = dict;
}

Onkun.prototype.get = function(kanji) {
  return this.dict[kanji];
};

module.exports = Onkun;

