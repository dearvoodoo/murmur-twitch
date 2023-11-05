function setDatatable(type) {
    if (type == "cmd") {
        setTimeout(function () {
            $('#table_cmds').DataTable({
                data: dataSet,
                columns: [
                    { title: 'Command' },
                    { title: 'Aliases' },
                    { title: 'Description' },
                    { title: 'Permission' },
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function ( row ) {
                                var data = row.data();
                                return 'Details for '+data[0]+' '+data[1];
                            }
                        }),
                        renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                            tableClass: 'table'
                        } )
                    }
                }
            });
        }, 2000);
    } else {
        setTimeout(function () {
            $('#table_playsounds').DataTable({
                data: dataSetPS,
                columns: [
                    { title: 'Command' },
                    { title: 'Aliases' },
                    { title: 'Description' },
                    { title: 'Version Added' },
                    { title: 'GCD' },
                    { title: 'UCD' },
                    { title: 'Copy' },
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function ( row ) {
                                var data = row.data();
                                return 'Details for '+data[0]+' '+data[1];
                            }
                        }),
                        renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                            tableClass: 'table'
                        } )
                    }
                },
                order: [
                    [ 3, 'desc' ]
                ]
            });
        }, 1000);
    }
}

var dataSet = []
var dataSetPS = []
$(document).ready(function() {
    $.get("./assets/json/stream-commands.json", function(data) {
        $.each(data, function(i, item) {
            if (data[i]["type"] == "cmd") {
                console.log("command found.")
                if (data[i]["permission"] == "v") {
                    permission = `<span class="badge bg-viewer">Viewer</span>`
                } else if (data[i]["permission"] == "m") {
                    permission = `<span class="badge bg-moderator">Moderator</span>`
                } else if (data[i]["permission"] == "a") {
                    permission = `<span class="badge bg-streamer">Streamer</span>`
                } else if (data[i]["permission"] == "am") {
                    permission = `<span class="badge bg-staff">Streamer & Moderator</span>`
                } else if (data[i]["permission"] == "s") {
                    permission = `<span class="badge bg-subscriber">Subscriber</span>`
                } else {
                    permission = "N/A"
                }

                var the_command = ""
                var command_copy = ""
                // <button class="clipbord" data-clipboard-text=""></button>
                if (data[i]["command"]["command"]) {
                    command_copy += `${data[i]["command"]["command"]}`
                    the_command += `<span class="badge bg-default">${data[i]["command"]["command"]}</span>`
                }

                if (data[i]["command"]["value"]) {
                    command_copy += ` <${data[i]["command"]["value"]}>`
                    the_command += `<span class="badge bg-dark">${data[i]["command"]["value"]}</span>`
                }

                if (data[i]["command"]["optional"].length >= 1) {
                    $.each(data[i]["command"]["optional"], function(i, item) {
                        command_copy += ` [${item}]`
                        the_command += `<span class="badge bg-light">${item}</span>`
                    })
                }

                if (data[i]['aliases'].length == 0) {
                    var alias = "No alias"
                } else {
                    var alias = data[i]['aliases'].join(", ")
                }
                command_and_copy = `<button class="clipboard mr-2" data-clipboard-text="${command_copy}">${the_command}</button>`
                dataSet.push([command_and_copy, alias, data[i]["description"], permission])
            }
        });
        setDatatable("cmd")
    })

    $.getJSON("./assets/json/stream-commands.json", function(data) {
        $.each(data, function(i, item) {
            if (data[i]["type"] == "playsounds") {
                var ps = data[i]["list"]
                $.each(ps, function(c, cmd) {
                    console.log("playsounds command found.")
                    var ps_command     = ps[c]["command"],
                        ps_alias       = ps[c]['aliases'],
                        ps_description = ps[c]["description"],
                        ps_date        = ps[c]["date"],
                        ps_GCD         = ps[c]["cooldown"]["GCD"],
                        ps_UCD         = ps[c]["cooldown"]["UCD"];

                    var the_command = ""
                    if (ps_command) {
                        the_command += `<span class="badge bg-dark me-3">!${ps_command}</span>`
                    }

                    var aliases = ""
                    $.each(ps_alias, function(i){
                        aliases += `<span class="badge bg-dark me-3">!${ps_alias[i]}</span>`
                    })

                    copy_cmd = `<button class="btn clipboard_ps btn-success" data-clipboard-text="!${ps_command}"><i class="fal fa-clipboard"></i></button>`

                    dataSetPS.push([the_command, aliases, ps_description, ps_date, ps_GCD, ps_UCD, copy_cmd])
                })
            }
        });
        setDatatable("playsounds")
    })
})

var clipboard = new ClipboardJS('.clipboard', { container: document.getElementById('cmdsModal') });
var clipboard_ps = new ClipboardJS('.clipboard_ps', { container: document.getElementById('playsoundsModal') });

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
});

clipboard_ps.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

clipboard_ps.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};