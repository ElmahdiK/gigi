window.onload = () => {
    var _tabMenu = ["health", "notes", "todo", "rdv", "buy"];//menu
    var _tabMenuLabel = ["Santé", "Planning", "A faire", "Rendez-vous", "Liste d'achat"];//Menu
    var _tabIcon = ["heart", "arrow-right", "bullseye", "calendar", "shopping-cart"]

    buildMenu(_tabMenu, _tabMenuLabel, _tabIcon);

    // update app
    loadArticles(_tabMenu);
}
//window.addEventListener("load", function() { window. scrollTo(0, 0); });

function buildMenu(_tabMenu, _tabMenuLabel, _tabIcon) {
    var _calendarUi = document.createElement("calendar-ui");
    let _nav = document.querySelector("#nav_menu");

    let _ul = document.createElement("ul");
    var _a, _li, _i, _span;
    _tabMenu.forEach((e, i) => {
        _a = document.createElement("a");
        _a.id = "#div_" + e;
        _a.href = "#";
        _a.addEventListener("click", () => viewPage(e));


        _i = document.createElement("i");
        _i.className = "fa fa-" + _tabIcon[i];
        _a.appendChild(_i);
        _a.title = _tabMenuLabel[i];
        _span = document.createElement("span");
        _span.innerHTML = _tabMenuLabel[i];
        _a.appendChild(_span);
        //_a.appendChild(document.createTextNode(_tabMenuLabel[i]));
        _li = document.createElement("li");
        _li.appendChild(_a);
        _ul.appendChild(_li);
    });

    _nav.appendChild(_ul);
    _nav.appendChild(_calendarUi);
}

function viewPage(_type) {
    let links = document.querySelectorAll("#nav_menu ul li > a");
    links.forEach((l) => {
        if (l.id == "#div_" + _type) {
            l.className = "a_active";
        } else if (l.className == "a_active") {
            l.className = "";
        }
    });


    let articles = document.querySelectorAll("#section_content > article");
    articles.forEach((a) => {
        if (a.id == "article_" + _type) {
            a.style.display = "flex";
        } else if (a.style.display == "flex") {
            a.style.display = "none";
        }
    });
}

function loadArticles(_tabMenu) {

    // LOAD JSON & CONTENT
    fetch("./assets/data/ek.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(_json => {

            var _element;
            var _value;
            var _value_ss;
            var _ul;
            var _li;
            var _div, _div_b;
            var _label;
            var _input;
            var _span, _span_b;
            _json.forEach((e) => {
                _value = e.value;
                _element = document.querySelector("#article_" + e.type);
                _element.style.display = "none";
                switch (e.type) {
                    case "todo":
                    case "buy":
                    case "notes": {
                        _ul = document.createElement("ul");
                        _ul.id = "div_" + e.type;
                        _value.forEach((d) => {
                            _li = document.createElement("li");
                            _label = document.createElement("label");
                            _label.className = "span_day";

                            _span = document.createElement("span");
                            _span.appendChild(document.createTextNode(d.label));

                            _label.appendChild(_span);

                            _li.appendChild(_label);
                            _ul.appendChild(_li);

                            _value_ss = d.value;
                            _value_ss.forEach((v) => {
                                _li = document.createElement("li");
                                _label = document.createElement("label");
                                _input = document.createElement("input");
                                _input.type = "checkbox";

                                _span = document.createElement("span");
                                _span.appendChild(document.createTextNode(v.label));

                                _label.appendChild(_input);
                                _label.appendChild(_span);

                                if (e.type == "notes") {
                                    _span_b = document.createElement("span");
                                    _span_b.appendChild(document.createTextNode(v.time));
                                    _span_b.className = "span_price";

                                    _label.appendChild(_span_b);
                                }

                                if (e.type == "buy") {
                                    _span_b = document.createElement("span");
                                    _span_b.appendChild(document.createTextNode(v.price));
                                    _span_b.className = "span_price";

                                    _label.appendChild(_span_b);
                                }
                                _li.appendChild(_label);
                                _ul.appendChild(_li);
                            });
                        });

                        _element.appendChild(_ul);
                    }
                        break;
                    case "health": {
                        _div = document.createElement("div");
                        _div.id = "div_" + e.type;

                        _div_b = document.createElement("div");
                        _div_b.id = "div_" + e.type + "_content";
                        _div_b.style.height = "400px";

                        _span = document.createElement("span");
                        _span.className = "span_weight";
                        _span.id = "span_weight";

                        _div.appendChild(_span);
                        _div.appendChild(_div_b);

                        _element.appendChild(_div);
                        loadGraphics();
                    }
                        break;
                    case "rdv": {
                        _div = document.createElement("div");
                        _div.id = "div_" + e.type;
                        _ul = document.createElement("ul");
                        _value.forEach((e) => {
                            _li = document.createElement("li");
                            _label = document.createElement("label");

                            _input = document.createElement("input");
                            _input.type = "checkbox";
                            _span = document.createElement("span");
                            _span.appendChild(document.createTextNode(e.label));

                            _label.appendChild(_input);
                            _label.appendChild(_span);
                            _li.appendChild(_label);
                            _ul.appendChild(_li);
                        });
                        _div.appendChild(_ul);

                        _element.appendChild(_div);
                    }
                        break;
                }
            });
            viewPage(_tabMenu[0]);
        })
};

function clearElement() {
    // empty div_app_content
    while (div_app_content.firstChild) {
        div_app_content.removeChild(div_app_content.firstChild);
    }
}

function loadGraphics() {
    // masse, pompes, altères, vélo, squat
    var _data, _suffix, _min, _objectif = '';
    let _id = "div_health_content";
    _suffix = 'kg';
    _min = 65;
    _max = 120;
    _objectif = 70;
    _data = [
        [Date.UTC(2016, 6, 24), 83.9], //2016
        [Date.UTC(2016, 9, 24), 90],
        [Date.UTC(2016, 11, 6), 87.5],
        [Date.UTC(2017, 0, 4), 87.1], //2017
        [Date.UTC(2017, 1, 27), 87.9],
        [Date.UTC(2017, 5, 17), 79.8],
        [Date.UTC(2017, 7, 26), 85.0],
        [Date.UTC(2017, 11, 24), 83],
        [Date.UTC(2018, 0, 1), 84.2], //2018
        [Date.UTC(2018, 0, 8), 82],
        [Date.UTC(2018, 3, 1), 83.5],
        [Date.UTC(2018, 10, 1), 85.1],
        [Date.UTC(2019, 1, 10), 78.7], //2019
        [Date.UTC(2019, 6, 29), 84.9],
        [Date.UTC(2019, 10, 30), 86.2],
        [Date.UTC(2019, 11, 28), 85.9],
        [Date.UTC(2020, 1, 18), 89.4], //2020
        [Date.UTC(2020, 5, 29), 89.7],
        [Date.UTC(2020, 6, 25), 92.5],
        [Date.UTC(2020, 9, 24), 93.6],
        [Date.UTC(2020, 10, 20), 90.0],
        [Date.UTC(2021, 5, 13), 88.4], //2021
        [Date.UTC(2022, 4, 2), 99.8], //2022
        [Date.UTC(2022, 5, 11), 104.3],
        [Date.UTC(2023, 10, 4), 105.2], //2023
        [Date.UTC(2024, 5, 1), 111.3], // 2024
        [Date.UTC(2024, 9, 14), 108.5]
    ];

    const poidsActuel = _data[_data.length - 1][1];
    const weightToLoose = poidsActuel - _objectif;
    const nbWeightPerSem = 1;
    const nbSemToGoal = Math.round(weightToLoose / nbWeightPerSem);
    const nbMonthToGoal = Math.round(nbSemToGoal / 4);
    document.querySelector('#span_weight').innerHTML = `${poidsActuel} to ${_objectif} => ${weightToLoose} kg à perdre ~ ${nbSemToGoal} sem ~ ${nbMonthToGoal} mois`;
    let _title = "masse";
    let _margin = 40;
    $('#' + _id).highcharts({
        chart: {
            backgroundColor: '',
            margin: [_margin, _margin, _margin, _margin]
        },
        title: {
            //text: 'Evolution de votre masse',
            text: '',
            x: -20 //center
        },
        subtitle: {
            //text: 'Masse en fonction du temps',
            text: '',
            x: -20
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            }
            /*,
            title: {
                text: _title//+' ('+_suffix+')'
            }
            */
        },
        yAxis: {
            title: {
                text: ''//+' ('+_suffix+')'
            },
            max: _max,
            min: _min,
            plotLines: [{
                value: _objectif,
                color: '#ffab91',
                width: 1,
                zIndex: 4,
                label: {
                    text: _objectif
                }
            }]

        },
        tooltip: {
            valueSuffix: _suffix
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            showInLegend: false,
            name: _title,
            data: _data
        }],
        exporting: {
            enabled: false
        }
    });
}