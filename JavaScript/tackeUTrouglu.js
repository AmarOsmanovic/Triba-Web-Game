function daLiJeUTrouglu(x,y){
  let uslov = 0;
  for(let k = 0; k < vrhovi.length; k++){
      const trougao = vrhovi[k];
      ctx.beginPath();
      ctx.moveTo(trougao.x1, trougao.y1);
      ctx.lineTo(trougao.x2, trougao.y2);
      ctx.lineTo(trougao.x3, trougao.y3);
      ctx.closePath();
      if(ctx.isPointInPath(x,y)){
          uslov += 1;
      }
  }
  return uslov
}