/**
 * yaml-to-bemjson
 * =================
 *
 * Собирает *bemjson*-файл на основе *yaml*.
 *
 * **Опции**
 *
 * * *String* **source** — Исходный YAML-файл. По умолчанию — `?.yaml`.
 * * *String* **target** — Результирующий BEMJSON-файл. По умолчанию — `?.bemjson.js`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-yaml-to-bemjson/techs/yaml-to-bemjson'));
 * ```
 */
var vfs = require('enb/lib/fs/async-fs'),
    jsYaml = require('js-yaml');

module.exports = require('enb/lib/build-flow').create()
    .name('enb-yaml-to-bemjson')
    .target('target', '?.bemjson.js')

    .useSourceFilename('yamlFile', '?.yaml')
    .optionAlias('yamlFile', 'yamlFileTarget')

    .optionAlias('target', 'destTarget')
    .builder(function(yamlFileName) {

        return vfs.read(yamlFileName, 'utf-8')
            .then(function(yaml) {
                return '(' + JSON.stringify(jsYaml.safeLoad(yaml)) + ')';
            })
            .fail(function(data) {
                console.log('Fail with: ', data);
            });
    })
    .createTech();
