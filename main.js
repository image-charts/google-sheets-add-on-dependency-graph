var _URL_MAX_LENGTH = 2000;
/**
 * Get an Image-Charts graph image URL, usage:
 *
 * `=image(DEPENDENCY_GRAPH_URL('Feuille 1'!B2:B23; 'Feuille 1'!F2:F23; "ortho"); 2)`
 *
 * @param {A1:A} itemRows the items column range
 * @param {C1:C} dependsOnRows the dependencies column range (each cell must contain comma separated item name)
 * @param {"line"} edgeRepresentation could be either: line, polyline, curved, ortho, spline
 * @return The graph dependency image
 * @customfunction
 */
function DEPENDENCY_GRAPH_URL(itemRows, dependsOnRows, edgeRepresentation) {
  // items = [row1 'item name 1', row2 'item name 2', row3 'item name 3']
  // dependsOn = [row1 '', row2 'item name 1,item name 3', row3 'item name 2']
  // edgeRepresentation = 'line'

  if (!Array.isArray(itemRows)) {
    throw new Error("`itemRows` must be specified and a range");
  }

  if (!Array.isArray(dependsOnRows)) {
    throw new Error("`dependsOnRows` must be specified and a range");
  }

  const edgeLinesAllowed = "line,polyline,curved,ortho,spline".split(",");
  if (!edgeRepresentation) {
    edgeRepresentation = edgeLinesAllowed[0];
  }

  if (!inArray(edgeLinesAllowed, edgeRepresentation)) {
    throw new Error(
      "`edgeRepresentation` must be specified one of:" +
        JSON.stringify(edgeLinesAllowed)
    );
  }

  // String => Array[String]
  // 'item name 1,item name 3' => ['item name 1','item name 3']
  function getParentDependencies(dependsOn) {
    return String(dependsOn || "").split(",");
  }

  /**
   *
   * @param {Array<String>} itemRows
   * @param {Array<String>} dependsOnRows
   * @return {Object}
   * {
   *  'item name 1': ['item name 2'],
   *   // item name 1 & item name 3 depends on item name 2
   *  'item name 2': ['item name 1', 'item name 3'],
   *  'item name 3': ['item name 2']
   *
   * }
   */
  function getItemsAndDependencies(itemRows, dependsOnRows) {
    return dependsOnRows.reduce(function(nodes, dependsOn, i) {
      const to = itemRows[i][0];

      getParentDependencies(dependsOn).forEach(function(parentDependency) {
        if (!parentDependency) {
          nodes[to] = [];
          return;
        }

        if (!nodes[parentDependency]) {
          nodes[parentDependency] = [];
        }

        nodes[parentDependency].push(to);
      });

      return nodes;
    }, {});
  }

  /**
   * [dotGraph description]
   * @param  {Object} itemsAndDependencies
   * @return {String} graph representation in dot language
   */
  function dotGraph(itemsAndDependencies, edgeRepresentation) {
    function dependenciesSet(dependencies) {
      return (
        "{" +
        dependencies
          .map(function(dep) {
            return JSON.stringify(dep);
          })
          .join(" ") +
        "}"
      );
    }

    return (
      'digraph {splines="' +
      edgeRepresentation +
      '";rankdir=LR;' +
      reduce(
        itemsAndDependencies,
        function(m, dependencies, item, i) {
          m.push(
            [JSON.stringify(item), dependenciesSet(dependencies)].join("->")
          );
          return m;
        },
        []
      ).join(";") +
      "}"
    );
  }

  function reduce(obj, callback, memo) {
    "use strict";
    var key;
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      memo = callback(memo, obj[key], key, obj);
    }
    return memo;
  }

  function inArray(arr, value) {
    return arr.some(function(item) {
      return item === value;
    });
  }

  const url =
    "https://image-charts.com/chart?cht=gv&chl=" +
    encodeURIComponent(
      dotGraph(
        getItemsAndDependencies(itemRows, dependsOnRows),
        edgeRepresentation
      )
    );

  if (url.length > _URL_MAX_LENGTH) {
    throw new Error(
      "URL_MAX_LENGTH: Google sheet does not allow URL larger than " +
        _URL_MAX_LENGTH +
        " chars."
    );
  }

  return url;
}

if (typeof module !== "undefined") {
  // Google script is ES5 :(
  module.exports.DEPENDENCY_GRAPH_URL = DEPENDENCY_GRAPH_URL;
  module.exports.URL_MAX_LENGTH = _URL_MAX_LENGTH;
}
