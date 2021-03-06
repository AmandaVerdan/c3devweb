var lifes = 5;
var flag_winned = false;
var flag_end_game = false;
var guessColor = '';
var randomColors = [];
var string = `AliceBlue,AntiqueWhite,Aqua,Aquamarine,Azure,Beige,Bisque,Black,BlanchedAlmond,Blue, BlueViolet,Brown,BurlyWood,CadetBlue,Chartreuse,Chocolate,Coral, CornflowerBlue,Cornsilk,Crimson,Cyan,DarkBlue,DarkCyan,DarkGoldenRod,DarkGray,DarkGrey, DarkGreen,DarkKhaki,DarkMagenta,DarkOliveGreen,DarkOrange,DarkOrchid,DarkRed,DarkSalmon, DarkSeaGreen,DarkSlateBlue,DarkSlateGray,DarkSlateGrey,DarkTurquoise,DarkViolet,DeepPink, DeepSkyBlue,DimGray,DimGrey,DodgerBlue,FireBrick,FloralWhite,ForestGreen,Fuchsia,Gainsboro, GhostWhite,Gold,GoldenRod,Gray,Grey,Green,GreenYellow,HoneyDew,HotPink,IndianRed,Indigo, Ivory,Khaki,Lavender,LavenderBlush,LawnGreen,LemonChiffon,LightBlue,LightCoral,LightCyan, LightGoldenRodYellow,LightGray,LightGrey,LightGreen,LightPink,LightSalmon,LightSeaGreen,LightSkyBlue, LightSlateGray,LightSlateGrey,LightSteelBlue,LightYellow,Lime,LimeGreen,Linen,Magenta,Maroon, MediumAquaMarine,MediumBlue,MediumOrchid,MediumPurple,MediumSeaGreen,MediumSlateBlue,MediumSpringGreen,MediumTurquoise,MediumVioletRed,MidnightBlue,MintCream,MistyRose,Moccasin,NavajoWhite,Navy,OldLace,Olive,OliveDrab,Orange,OrangeRed,Orchid,PaleGoldenRod,PaleGreen,PaleTurquoise,PaleVioletRed,PapayaWhip,PeachPuff,Peru,Pink,Plum,PowderBlue,Purple,RebeccaPurple,Red,RosyBrown,RoyalBlue,SaddleBrown,Salmon,SandyBrown,SeaGreen,SeaShell,Sienna,Silver,SkyBlue,SlateBlue,SlateGray,SlateGrey,Snow,SpringGreen,SteelBlue,Tan,Teal,Thistle,Tomato,Turquoise,Violet,Wheat,White,WhiteSmoke,Yellow,YellowGreen`
var colors = string.split(',');
initGame();

function getRandom(number) {
    return Math.floor(Math.random() * (Math.floor(number) - 0)) + 0;
}

function selectColor(vector) {
    var integerRandom = getRandom(vector.length);
    return vector[integerRandom];
}

function selectRandomColors(vectorColors, qtdColors) {

    var randomColorsVector = [];
    for (var i = 0; i < qtdColors; i++) {
        var color = selectColor(vectorColors);
        var wantedColor = randomColorsVector.find(function(wantedColor) {
            wantedColor === color;
        })
        while (wantedColor != undefined) {
            //console.log(`Cor: ${color} j??, buscando nova...`)
            color = selectColor(vectorColors);
        }

        randomColorsVector.push(color);
    }

    return randomColorsVector;
}

function insertRandomColorsInHTML(vectorColors) {
    var HTMLList = document.querySelector('.list');

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
    console.log('Recome??ando o jogo...');
    initGame();
}

function verifyAnswer(ans) {

    if (flag_end_game) {
        endGame();
        return;
    }
    switch (ans) {
        case "":
            writeMessage('A resposta n??o pode ficar vazia!');
            break;
        case guessColor:
            rightAnswer();
            break;
        default:
            wrongAnswer(ans);
    }
}

function rightAnswer() {
    writeMessage(`Parab??ns!! A cor que estou pensando ?? ${guessColor}. Recomece o jogo, vamos ver o quanto voc?? ?? bom?!`);
    flag_end_game = true;
    flag_winned = true;
    setBackGroundColor(guessColor);
}

function setBackGroundColor(color) {
    document.querySelector('body').style.background = color;
}

function wrongAnswer(ans) {
    lifes--;
    //diminuirVida();
    if (lifes > 0) {
        writeMessage(`Que pena, n??o estou pensando em ${ans}. Vamos tentar novamente? ${ColorTip()}`);
    } else {
        flag_end_game = true;
        endGame();
    }
}


function ColorTip() {
    var letter = getRandom(guessColor.length);
    return `L?? vai uma dica! A letra N?? ${letter + 1} ?? '${guessColor[letter].toUpperCase()}'`;
}

function endGame() {
    if (!flag_winned) {
        writeMessage(`N??o foi dessa vez :( A cor que eu estava pensando era ${guessColor}. Tente mais uma vez!`);
    }
}

function writeMessage(message) {
    var tips = document.querySelector('.tips');
    tips.innerText = message
}

function paint(color) {
    var divCor = document.querySelector('.painel-cores');
    divCor.style.background = color;
}