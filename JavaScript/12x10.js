const canvas = document.getElementById("canvas12x10");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");
const root = document.documentElement;
const style = getComputedStyle(root);
const circleColor = style.getPropertyValue('--canvasCircle-color');
const connectedCircleColorIgrac1 = style.getPropertyValue('--canvasConnectedCircle-color-igrac1');
const connectedCircleColorIgrac2 = style.getPropertyValue('--canvasConnectedCircle-color-igrac2');
const triangleColorIgrac1 = style.getPropertyValue('--canvasTriangle-color-igrac1');
const triangleColorIgrac2 = style.getPropertyValue('--canvasTriangle-color-igrac2');
ctx.fillStyle = circleColor;


for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 10; j++) {
        const x = canvas.offsetWidth / 20 + i * canvas.offsetWidth / 10;
        const y = canvas.offsetHeight / 20 + j * canvas.offsetHeight / 10;
        const r = canvas.offsetWidth / 80;
        const start = 0;
        const end = 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(x, y, r, start, end);
        ctx.fill();


    }
};

let kruzici = [];
let kruziciIgrac1 = [];
let kruziciIgrac2 = [];
let vrhovi = [];
dodiruje = true;
let prviIgrac = true;
let brojacIgrac1 = 0;
let brojacIgrac2 = 0;
let bar1 = document.getElementById("igrac1");
let bar2 = document.getElementById("igrac2");
let zavrsiBtn = document.getElementById("zavrsi");
let restartBtn = document.getElementById("restart");




if (brojacIgrac1 > 0) {
    restartBtn.disabled = false;
}

canvas.addEventListener("click", function (event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    ctx.lineWidth = 3;



    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 10; j++) {
            const kruzicX = canvas.offsetWidth / 20 + i * canvas.offsetWidth / 10;
            const kruzicY = canvas.offsetHeight / 20 + j * canvas.offsetHeight / 10;
            const r = canvas.offsetWidth / 80;

            if (Math.pow(x - kruzicX, 2) + Math.pow(y - kruzicY, 2) < Math.pow(r, 2)) {

                ctx.beginPath();
                ctx.arc(kruzicX, kruzicY, r, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = prviIgrac ? connectedCircleColorIgrac1 : connectedCircleColorIgrac2;
                ctx.fill();
                kruzici.push({ x: kruzicX, y: kruzicY });


                if (kruzici.length === 3) {
                    let x1 = kruzici[0].x;
                    let y1 = kruzici[0].y;
                    let x2 = kruzici[1].x;
                    let y2 = kruzici[1].y;
                    let x3 = kruzici[2].x;
                    let y3 = kruzici[2].y;

                    let povrsinaTrougla = ((1 / 2) * Math.abs((x1 * y2) + (x2 * y3) + (x3 * y1) - (y1 * x2) - (y2 * x3) - (y3 * x1)));

                    if (vrhovi.length == 0) {
                        vrhovi.push({ x1: kruzici[0].x, y1: kruzici[0].y, x2: kruzici[1].x, y2: kruzici[1].y, x3: kruzici[2].x, y3: kruzici[2].y });
                        dodiruje = false;
                    } else {
                        let t1 = daLiJeUTrouglu(x1, y1);
                        let t2 = daLiJeUTrouglu(x2, y2);
                        let t3 = daLiJeUTrouglu(x3, y3);

                        if (t1 == t1 && t2 == t3) {
                            vrhovi.push({ x1: kruzici[0].x, y1: kruzici[0].y, x2: kruzici[1].x, y2: kruzici[1].y, x3: kruzici[2].x, y3: kruzici[2].y });
                            dodiruje = false;
                        } else {
                            dodiruje = true;
                        }
                    };


                    if (povrsinaTrougla > 10) {
                        if (dodiruje == false) {
                            if (prviIgrac) {
                                brojacIgrac1 += 1;
                                bar1.style.borderColor = connectedCircleColorIgrac2;
                                bar2.style.borderColor = connectedCircleColorIgrac2;
                                kruziciIgrac1.push(kruzici[0], kruzici[1], kruzici[2]);
                                zavrsiBtn.disabled = false;
                                restartBtn.disabled = false;

                                for (let i = 0; i < kruziciIgrac1.length; i++) {
                                    ctx.beginPath();
                                    ctx.arc(kruziciIgrac1[i].x, kruziciIgrac1[i].y, r, 0, 2 * Math.PI);
                                    ctx.closePath();
                                    ctx.fillStyle = connectedCircleColorIgrac1;
                                    ctx.fill();

                                }

                            } else {
                                brojacIgrac2 += 1
                                bar1.style.borderColor = connectedCircleColorIgrac1;
                                bar2.style.borderColor = connectedCircleColorIgrac1;
                                kruziciIgrac2.push(kruzici[0], kruzici[1], kruzici[2]);
                                for (let i = 0; i < kruziciIgrac2.length; i++) {
                                    ctx.beginPath();
                                    ctx.arc(kruziciIgrac2[i].x, kruziciIgrac2[i].y, r, 0, 2 * Math.PI);
                                    ctx.closePath();
                                    ctx.fillStyle = connectedCircleColorIgrac2;
                                    ctx.fill();

                                }
                            }
                            document.getElementById("rezIgrac1").innerHTML = brojacIgrac1;
                            document.getElementById("rezIgrac2").innerHTML = brojacIgrac2;
                            zavrsiBtn.addEventListener("click", function (event) {
                                let porukaPobjedniku = "";
                                if (prviIgrac) {
                                    document.getElementById("modalP").style.backgroundColor = connectedCircleColorIgrac2;
                                    porukaPobjedniku = "Drugi igrač je pobjedinik jer je prvi igrač ostao bez poteza";
                                } else {
                                    document.getElementById("modalP").style.backgroundColor = connectedCircleColorIgrac1;
                                    porukaPobjedniku = "Prvi igrač je pobjedinik jer je drugi igrač ostao bez poteza";

                                };
                                document.getElementById("tekstPobjednik").innerHTML = porukaPobjedniku
                            });
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.lineTo(x3, y3);
                            ctx.closePath();

                            ctx.strokeStyle = prviIgrac ? triangleColorIgrac1 : triangleColorIgrac2;
                            ctx.stroke();
                            kruzici = [];
                            brojacUTrouglu = 0;
                            prviIgrac = !prviIgrac;
                        }
                        else {
                            alert("Trouglovi se ne smiju sijeći");
                            kruzici = [];
                            brojacUTrouglu = 0;
                            ctx.beginPath();
                            ctx.arc(x1, y1, r, 0, 2 * Math.PI);
                            ctx.closePath();
                            ctx.fillStyle = circleColor;
                            ctx.fill();
                            ctx.beginPath();
                            ctx.arc(x2, y2, r, 0, 2 * Math.PI);
                            ctx.closePath();
                            ctx.fillStyle = circleColor;
                            ctx.fill();
                            ctx.beginPath();
                            ctx.arc(x3, y3, r, 0, 2 * Math.PI);
                            ctx.closePath();
                            ctx.fillStyle = circleColor;
                            ctx.fill();
                        };

                    } else {
                        alert("Površina trougla mora biti veća od nule.");
                        kruzici = [];
                        brojacUTrouglu = 0;
                        ctx.beginPath();
                        ctx.arc(x1, y1, r, 0, 2 * Math.PI);
                        ctx.arc(x2, y2, r, 0, 2 * Math.PI);
                        ctx.arc(x3, y3, r, 0, 2 * Math.PI);
                        ctx.closePath();
                        ctx.fillStyle = circleColor;
                        ctx.fill();
                    };
                }
            }
        }
    }
});

