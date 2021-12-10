var lifes = 5;
var flag_winned = false;
var flag_end_game = false;
var guessColor = '';
var randomColors = [];
var string = `AliceBlue,AntiqueWhite,Aqua,Aquamarine,Azure,Beige,Bisque,Black,BlanchedAlmond,Blue, BlueViolet,Brown,BurlyWood,CadetBlue,Chartreuse,Chocolate,Coral, CornflowerBlue,Cornsilk,Crimson,Cyan,DarkBlue,DarkCyan,DarkGoldenRod,DarkGray,DarkGrey, DarkGreen,DarkKhaki,DarkMagenta,DarkOliveGreen,DarkOrange,DarkOrchid,DarkRed,DarkSalmon, DarkSeaGreen,DarkSlateBlue,DarkSlateGray,DarkSlateGrey,DarkTurquoise,DarkViolet,DeepPink, DeepSkyBlue,DimGray,DimGrey,DodgerBlue,FireBrick,FloralWhite,ForestGreen,Fuchsia,Gainsboro, GhostWhite,Gold,GoldenRod,Gray,Grey,Green,GreenYellow,HoneyDew,HotPink,IndianRed,Indigo, Ivory,Khaki,Lavender,LavenderBlush,LawnGreen,LemonChiffon,LightBlue,LightCoral,LightCyan, LightGoldenRodYellow,LightGray,LightGrey,LightGreen,LightPink,LightSalmon,LightSeaGreen,LightSkyBlue, LightSlateGray,LightSlateGrey,LightSteelBlue,LightYellow,Lime,LimeGreen,Linen,Magenta,Maroon, MediumAquaMarine,MediumBlue,MediumOrchid,MediumPurple,MediumSeaGreen,MediumSlateBlue,MediumSpringGreen,MediumTurquoise,MediumVioletRed,MidnightBlue,MintCream,MistyRose,Moccasin,NavajoWhite,Navy,OldLace,Olive,OliveDrab,Orange,OrangeRed,Orchid,PaleGoldenRod,PaleGreen,PaleTurquoise,PaleVioletRed,PapayaWhip,PeachPuff,Peru,Pink,Plum,PowderBlue,Purple,RebeccaPurple,Red,RosyBrown,RoyalBlue,SaddleBrown,Salmon,SandyBrown,SeaGreen,SeaShell,Sienna,Silver,SkyBlue,SlateBlue,SlateGray,SlateGrey,Snow,SpringGreen,SteelBlue,Tan,Teal,Thistle,Tomato,Turquoise,Violet,Wheat,White,WhiteSmoke,Yellow,YellowGreen`
var colors = string.split(',');
initGame();

function getRandom(n: number) : number{
    return Math.floor(Math.random() * (Math.floor(n) - 0)) + 0;
}

function selectColor(vet: string[]) : string{
    var integerRandom = getRandom(vet.length);
    return vet[integerRandom];
}

function selectRandomColors(vectorColors: string[], qtdColors: number) {

    var randomColorsVector = [];
    for (var i = 0; i < qtdColors; i++) {
        var color = selectColor(vectorColors);
        var wantedColor = randomColorsVector.find(function(wantedColor) {
            wantedColor === color;
        })
        while (wantedColor != undefined) {
            //console.log(`Cor: ${color} já, buscando nova...`)
            color = selectColor(vectorColors);
        }

        randomColorsVector.push(color);
    }

    return randomColorsVector;
}

function insertRandomColorsInHTML(vectorColors: string[]) {
    var HTMLList : HTMLTextAreaElement | null = document.querySelector('.list');

    while (HTMLList.firstChild) {
        HTMLList.removeChild(HTMLList.lastChild);
    }

    for (var color of vectorColors) {
        var element = document.createElement('li');
        element.textContent = color;
        element.className = 'item-lista';
        element.style.background = color;
        HTMLList.append(element);
    }

    var list = HTMLList.querySelectorAll('li')
    for (var li of list) {
        let newColor = li.innerText;
        li.addEventListener('mouseover', function() {
            paint(newColor);
        }, false)
        let ans = li.innerText;
        li.addEventListener('click', function() {
            verifyAnswer(ans);
        }, false)
    }
}


function initGame() {
    lifes = 5;

    flag_winned = false;
    flag_end_game = false;

    randomColors = selectRandomColors(colors, 10);
    guessColor = selectColor(randomColors);

    setBackGroundColor('white');
    insertRandomColorsInHTML(randomColors);
    writeMessage(ColorTip());
}

function reload() {
    console.log('Recomeçando o jogo...');
    initGame();
}

function verifyAnswer(ans: string) {

    if (flag_end_game) {
        endGame();
        return;
    }
    switch (ans) {
        case "":
            writeMessage('A resposta não pode ficar vazia!');
            break;
        case guessColor:
            rightAnswer();
            break;
        default:
            wrongAnswer(ans);
    }
}

function rightAnswer() {
    writeMessage(`Parabéns!! A cor que estou pensando é ${guessColor}. Recomece o jogo, vamos ver o quanto você é bom?!`);
    flag_end_game = true;
    flag_winned = true;
    setBackGroundColor(guessColor);
}

function setBackGroundColor(color: string) {
    document.querySelector('body').style.background = color;
}

function wrongAnswer(ans: string) {
    lifes--;
    //diminuirVida();
    if (lifes > 0) {
        writeMessage(`Que pena, não estou pensando em ${ans}. Vamos tentar novamente? ${ColorTip()}`);
    } else {
        flag_end_game = true;
        endGame();
    }
}


function ColorTip() {
    var letter = getRandom(guessColor.length);
    return `Lá vai uma dica! A letra Nº ${letter + 1} é '${guessColor[letter].toUpperCase()}'`;
}

function endGame() {
    if (!flag_winned) {
        writeMessage(`Não foi dessa vez :( A cor que eu estava pensando era ${guessColor}. Tente mais uma vez!`);
    }
}

function writeMessage(message: string) {
    var tips : HTMLTextAreaElement | null = document.querySelector('.tips');
    tips.innerText = message
}

function paint(color: string) {
    var divCor : HTMLTextAreaElement | null= document.querySelector('.painel-cores');
    divCor.style.background = color;
}