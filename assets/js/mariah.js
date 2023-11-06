$(document).ready(function() {
    var level = getUrlVars()["level"];
    var img = $("#mariah-img")
    if (level == 0) {
        img.attr("src", `./assets/images/mariah/${level}.png`)
    } else if (level <= 24) {
        img.attr("src", `./assets/images/mariah/${level}.png`)
        sleep(500).then(() => {
            img.attr("src", `./assets/images/mariah/${level - 1}.png`)
            sleep(500).then(() => {
                img.attr("src", `./assets/images/mariah/${level}.png`)
                sleep(100).then(() => {
                    img.attr("src", `./assets/images/mariah/${level - 1}.png`)
                    sleep(100).then(() => {
                        img.attr("src", `./assets/images/mariah/${level}.png`)
                        sleep(50).then(() => {
                            img.attr("src", `./assets/images/mariah/${level - 1}.png`)
                            sleep(50).then(() => {
                                img.attr("src", `./assets/images/mariah/${level}.png`)
                                sleep(100).then(() => {
                                    img.attr("src", `./assets/images/mariah/${level - 1}.png`)
                                    sleep(20).then(() => {
                                        img.attr("src", `./assets/images/mariah/${level}.png`)
                                        sleep(50).then(() => {
                                            img.attr("src", `./assets/images/mariah/${level - 1}.png`)
                                            sleep(150).then(() => {
                                                img.attr("src", `./assets/images/mariah/${level}.png`)
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    } else {
        mariahAnimation()
    }
})

function mariahAnimation() {
    var img = $("#mariah-img")
    sleep(250).then(() => {
        img.attr("src", `./assets/images/mariah/${getRandomInt(1,25)}.png`)
        setTimeout(mariahAnimation(img), 1000)
    });
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}