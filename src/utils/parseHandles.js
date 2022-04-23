import { parseHandle } from "./parseHandle";

export function parseHandles(str) {
  var handles = [];
  str = str.split("\n");
  for (var i = 0; i < str.length; i++) {
    var h = str[i].split(",");
    for (var j = 0; j < h.length; j++) {
      var handle = parseHandle(h[j]);
      if (handle) handles.push(handle);
    }
  }
  return handles;
}
