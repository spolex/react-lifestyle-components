"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("react"));const a=({onClick:e,children:a,color:l,type:c="button"})=>t.default.createElement("button",{type:c,onClick:e,className:"btn btn-".concat(l)},a),l=({item:e,metadata:t,onItemChange:a})=>React.createElement("tr",null,Object.keys(t).map((l=>{if("id"!==l)return React.createElement("td",{key:l},React.createElement("input",{className:"form-control",type:t[l].type,value:e[l],onChange:c=>{a({...e,[l]:"number"===t[l].type?Number(c.target.value):c.target.value})}}))})));exports.Row=l,exports.Table=({title:e,metadata:t,data:c,handleOnSave:n,onItemChange:r,handleOnDelete:m,handleOnAdd:o})=>React.createElement("div",null,React.createElement("div",null,React.createElement("h2",null,e)),React.createElement("table",{className:"table table-hover"},React.createElement("thead",null,React.createElement("tr",null,Object.keys(t).map((e=>{if("id"!==e)return React.createElement("th",{key:t[e].name,scope:"col"},t[e].name)})))),React.createElement("tbody",null,c.map((e=>React.createElement(l,{key:e.id.value,item:e,metadata:t,onItemChange:r}))))),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-10"},React.createElement(a,{color:"success",onClick:e=>n(c)},"Submit")),React.createElement("div",{className:"col-2"},React.createElement(a,{color:"danger",onClick:m},"-"),React.createElement(a,{color:"primary",onClick:o},"+"))));