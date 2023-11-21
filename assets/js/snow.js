const Snow = (canvas, count, options) => {
    const ctx = canvas.getContext("2d");
    const snowflakes = [];

    const add = item => snowflakes.push(item(canvas));

    const update = () => _.forEach(snowflakes, el => el.update());

    const resize = () => {
        ctx.canvas.width = canvas.offsetWidth;
        ctx.canvas.height = canvas.offsetHeight;

        _.forEach(snowflakes, el => el.resized());
    };

    const draw = () => {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        _.forEach(snowflakes, el => el.draw());
    };

    const events = () => {
        window.addEventListener("resize", resize);
    };

    const loop = () => {
        draw();
        update();
        animFrame(loop);
    };

    const init = () => {
        _.times(count, () => add(canvas => SnowItem(canvas, null, options)));
        events();
        loop();
    };

    init(count);
    resize();

    return { add, resize };
};

const defaultOptions = {
    color: "red",
    radius: [0.5, 3.0],
    speed: [0.5, 1.5],
    wind: [-0.5, 3.0]
};


const SnowItem = (canvas, drawFn = null, opts) => {
    const options = { ...defaultOptions, ...opts };
    const { radius, speed, wind, color } = options;
    const params = {
        color,
        x: _.random(0, canvas.offsetWidth),
        y: _.random(-canvas.offsetHeight, 0),
        radius: _.random(...radius),
        speed: _.random(...speed),
        wind: _.random(...wind),
        isResized: false
    };

    const ctx = canvas.getContext("2d");

    const updateData = () => {
        params.x = _.random(0, canvas.offsetWidth);
        params.y = _.random(-canvas.offsetHeight, 0);
    };

    const resized = () => params.isResized = true;

    const drawDefault = () => {
        ctx.beginPath();
        ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
        ctx.fillStyle = params.color;
        ctx.fill();
        ctx.closePath();
    };

    const draw = drawFn ? () => drawFn(ctx, params) : drawDefault;

    const translate = () => {
        params.y += params.speed;
        params.x += params.wind;
    };

    const onDown = () => {
        if (params.y < canvas.offsetHeight) return;

        if (params.isResized) {
            updateData();
            params.isResized = false;
        } else {
            params.y = 0;
            params.x = _.random(0, canvas.offsetWidth);
        }
    };

    const update = () => {
        translate();
        onDown();
    };

    return {
        update,
        resized,
        draw
    };

};

const el = document.querySelector(".container");
const wrapper = document.querySelector("body");
const canvas = document.getElementById("snow");

const animFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;



$(document).ready(function() {
    if (getUrlVars()["color"]) {
        var snow_color = getUrlVars()["color"]
    } else {
        var snow_color = "white"
    }
    Snow(canvas, 150, { color: snow_color });
});

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