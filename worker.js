function randn(){
  let u = 0;
  let v = 0;

  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

self.onmessage = function(event){

  const winrate = event.data.winrate;
  const sd = event.data.sd;
  const hands = event.data.hands;
  const runs = event.data.runs;
  const step = event.data.step;

  const runLines = [];

  for(let r = 0; r < runs; r++){

    let result = 0;
    const line = [];

    for(let h = 0; h <= hands; h += step){

      if(h === 0){
        line.push(0);
      } else {
        result += winrate + sd * randn();
        line.push(result);
      }
    }

    runLines.push(line);
  }

  self.postMessage({
    runLines: runLines
  });
};
