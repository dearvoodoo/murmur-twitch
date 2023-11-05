var showDelay = 2000,
    hideDelay = showDelay + 12000;
$(document).ready(function() {

    var user = getUrlVars()["username"],
        type = getUrlVars()["type"],
        description = decodeURIComponent(getUrlVars()["description"]),
        value = getUrlVars()["value"],
        color = getUrlVars()["color"],
        bomb = getUrlVars()["bomb"];

    var bits_icon = `
        <svg class="bits-icon" width="100%" fill="white" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 12l7-10 7 10-7 6-7-6zm2.678-.338L10 5.487l4.322 6.173-.85.728L10 11l-3.473 1.39-.849-.729z"></path>
        </svg>
    `
    if (color == "undefined") {
        $(".bg-obs").attr("style", `--color1:transparant; --color2:transparant;`)
    } else {
        $(".bg-obs").attr("style", `--color1:#${color}85; --color2:#${color}40;`)
    }

    if (bomb == "none") {
        if (type == "sub") {
            $('.event-title').html("SUBSCRIBE")
            $.get(`https://decapi.me/twitch/avatar/${user}`, function(data){
                $("img.user").attr("src", data)
            })
            $('.username').html(user)
            if (description == "undefined") {
                $('.description').hide()
            } else {
                $('.description').html(description)
            }
            $('.alert-type').html("SUB")
            $('.alert-value').html(value)
        } else if (type == "sub-prime") {
            $('.event-title').html("SUB PRIME")
            $.get(`https://decapi.me/twitch/avatar/${user}`, function(data){
                $("img.user").attr("src", data)
            })
            $('.username').html(user)
            if (description == "undefined") {
                $('.description').hide()
            } else {
                $('.description').html(description)
            }
            $('.alert-type').html("SUB")
            $('.alert-value').html(value)
        } else if (type == "sub-gift") {
            $('.event-title').html("SUB GIFT")
            var users = user.split(',')
            $.get(`https://decapi.me/twitch/avatar/${users[0]}`, function(user1){
                $.get(`https://decapi.me/twitch/avatar/${users[1]}`, function(user2){
                    $("img.user").after(`
                        <div class="gift-img">
                            <img class="user-gift" style="margin: 20px 5px 0;" src="${user1}" width="125px">
                            <i class="fa-light fa-gift fa-3x m-3"></i>
                            <img class="user-gift" style="margin: 20px 5px 0;" src="${user2}" width="125px">
                        </div>
                    `)
                    $("img.user").remove()
                })
            })
            $('.username').html(users[0]).after(`<h4>TO</h4><h2 class="username animate__animated animate__fadeInDown animate__slow mt-1">${users[1]}</h2>`)
            $('.description').hide()
            $('.alert-type').html("SUB GIFT")
            $('.alert-value').html(value)
        } else if (type == "resub") {
            $('.event-title').html("RESUB")
            $.get(`https://decapi.me/twitch/avatar/${user}`, function(data){
                $("img.user").attr("src", data)
            })
            $('.username').html(user)
            if (description == "undefined") {
                $('.description').hide()
            } else {
                $('.description').html(description)
            }
            $('.alert-type').html("RESUB")
            $('.alert-value').html(value)
        } else if (type == "donation") {
            $('.event-title').html("DONATION")
            $.get(`https://decapi.me/twitch/avatar/${user}`, function(data){
                $("img.user").attr("src", data)
            })
            $('.username').html(user)
            if (description == "undefined") {
                $('.description').hide()
            } else {
                $('.description').html(description)
            }
            $('.alert-type').html("TIPS")
            $('.alert-value').html(value + "€")
        } else if (type == "raid") {
            $('.event-title').html("RAID")
            $.get(`https://decapi.me/twitch/avatar/${user}`, function(data){
                $("img.user").attr("src", data)
            })
            $('.username').html(user)
            if (description == "undefined") {
                $('.description').hide()
            } else {
                $('.description').html(description)
            }
            $('.alert-type').html("RAID")
            $('.alert-value').html(`${value} <i class="fa-light fa-user"></i>`)
        } else if (type == "follow") {
            $('.event-title').html("FOLLOW")
            $.get(`https://decapi.me/twitch/avatar/${user}`, function(data){
                $("img.user").attr("src", data)
            })
            $('.username').html(user)
            $('.description').hide()
            $('.alert-type').hide()
            $('.alert-value').hide()
        } else if (type == "shoutout") {
            $('.event-title').html("SHOUTOUT")
            $.get(`https://decapi.me/twitch/avatar/${user}`, function(data){
                $("img.user").attr("src", data)
            })
            $('.username').html(user)
            if (description == "undefined") {
                $('.description').hide()
            } else {
                $('.description').html(description)
            }
            $('.alert-type').hide()
            $('.alert-value').hide()
        } else if (type == "bits") {
            $('.event-title').html("BITS")
            $.get(`https://decapi.me/twitch/avatar/${user}`, function(data){
                $("img.user").attr("src", data)
            })
            $('.username').html(user)
            if (description == "undefined") {
                $('.description').hide()
            } else {
                $('.description').html(description)
            }
            $('.alert-type').html("BITS")
            $('.alert-value').html(`${value} ${bits_icon}`)
        } else if (type == "train") {
            $('.event-title').html("TCHOU TCHOUUU")
            $("img.user").attr("src", "https://i.giphy.com/media/3o7529o2bwGupeaaoo/giphy.webp").attr("width", "100%")
            $('.username').html("HYPE TRAIN")
            $('.description').hide()
            $('.alert-type').hide()
            $('.alert-value').hide()
        }

        setTimeout(function(){
            showAlert()
        }, showDelay)

        setTimeout(function(){
            hideAlert()
        }, hideDelay)
    } else {
        var users = user.split(',')
        var time = showDelay;
        $.each(users, function(i, item){
            if (i != 0) {
                setTimeout( function(){
                    $(".card").html(`<div class="card-body">
                        <h1 class="event-title">EVENT</h1>
                        <img class="user" src="https://static-cdn.jtvnw.net/jtv_user_pictures/4fb6d904-f8db-45fd-9a64-a173c5b45cd9-profile_image-300x300.png" width="125px">
                        <h2 class="username animate__animated animate__fadeInDown animate__slow">Username</h2>
                        <p class="description animate__animated animate__fadeInDown animate__slow">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat viverra nibh, in sodales metus dignissim sed. Ut semper ullamcorper libero dictum dignissim. Maecenas semper eros ex, eget pulvinar ipsum scelerisque eu. Quisque aliquet porttitor justo, vel tristique elit efficitur sit amet.
                        </p>
                        <div class="row" style="width: 100%; margin-right: 0; margin-left: 0">
                            <div class="col" style="padding-left: 0">
                                <h2 class="alert-type animate__animated animate__fadeInDown animate__slow">Type</h2>
                            </div>
                            <div class="col" style="padding-right: 0">
                                <h2 class="alert-value animate__animated animate__fadeInDown animate__slow">Value</h2>
                            </div>
                        </div>
                    </div>`)
                    $('.event-title').html("SUB GIFT X"+bomb)
                    $.get(`https://decapi.me/twitch/avatar/${users[0]}`, function(user1){
                        $.get(`https://decapi.me/twitch/avatar/${users[i]}`, function(user2){
                            $("img.user").after(`
                                <div class="gift-img">
                                    <img class="user-gift" style="margin: 20px 5px 0;" src="${user1}" width="125px">
                                    <i class="fa-light fa-gift fa-3x m-3"></i>
                                    <img class="user-gift" style="margin: 20px 5px 0;" src="${user2}" width="125px">
                                </div>
                            `)
                            $("img.user").remove()
                        })
                    })
                    $('.username').html(users[0]).after(`<h4>TO</h4><h2 class="username animate__animated animate__fadeInDown animate__slow mt-1">${users[i]}</h2>`)
                    $('.description').hide()
                    $('.alert-type').html("SUB GIFT")
                    $('.alert-value').html(`${i}/${bomb}`)


                    setTimeout(function(){
                        showAlert()
                    }, showDelay)

                    setTimeout(function(){
                        hideAlert()
                    }, hideDelay)
                }, time)
            time += hideDelay+2000;
            }
        })
    }
})

function showAlert(){
    $(".alert").removeClass("d-none")
}

function hideAlert(){
    $(".alert").removeClass("animate__fadeInDown").addClass("animate__fadeOut")
    setTimeout(function(){
        $(".alert").addClass("d-none")
        resetAlert()
    }, 2000)
}

function resetAlert(){
    $(".alert").removeClass("animate__fadeOut").addClass("animate__fadeInDown")
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