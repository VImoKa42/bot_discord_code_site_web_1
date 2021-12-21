type N = number;

const aleatoire = (d:N,f:N):N => {
  return Math.floor(Math.random() * (f - d)) + d
}
const pythagore = (a:N,b:N):N => {
  return Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
}
const ispremier = (n:N) => {
  let t:number[] = [];
  for (let i = 2; i < Math.floor(Math.sqrt(n)+1); i++) {
    if(n%i==0) t.push(i);
  }
  return t.length==1?true:false
}

module.exports = {
  aleatoire,
  pythagore,
  ispremier,
}


/*const aleatoire = (d,f) => {
  if ((typeof d !== "number" && typeof f !== "number") || (typeof d !== "number" || typeof f !== "number")) return;
  return Math.floor(Math.random() * (f - d)) + d
}
const pythagore = (a,b) => {
  if ((typeof a !== "number" && typeof b !== "number") || (typeof a !== "number" || typeof b !== "number")) return;
  return Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
}
const ispremier = (n) => {
  if (typeof n !=="number") return;
  let t = [];
  for (let i = 2; i < Math.floor(Math.sqrt(n)+1); i++) {
    if(n%i==0) t.push(i);
  }
  return t.length==1?true:false
}

module.exports = {
  aleatoire,
  pythagore,
  ispremier,
}*/