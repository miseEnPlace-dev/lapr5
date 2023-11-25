:- module(server, []).

:- use_module(planning).


:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/html_write)). % produce html
:- use_module(library(http/http_parameters)). % GET query params
:- use_module(library(http/html_head)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
% :- use_module(library(http/http_files)).

:- set_setting(http:cors, [*]).

% to reload, use make. in the console & refresh the page

:- json_object student(student_name:string).

api_url('http://localhost:4000/api').

% define route aliases
http:location(api, root(api), []). % /api

% define your routes here
:- http_handler(root(.), say_hi, []). % /
:- http_handler(root(hello), say_hi_html, []). % /hello
:- http_handler(api(route), api_get_route, []). % /api/route?from=abc&to=xyz&method=elevators
:- http_handler(root(greet), greet, []). % /greet?name=johny
:- http_handler(api(hello), api_hello, []). % /api/hello
:- http_handler(api(greet), api_greet, []). % /api/greet

say_hi(_):-
    format('Content-type: text/plain~n~n'),
    format('Hello World!~n').

say_hi_html(_):-
    reply_html_page(
        title('Hello World!'),
        [ \html_requires(css('style.css')) ],
        [ h1('Hello World!'), p(['sponsored by prolog. ', i('bye')]) ]
    ).

greet(Request):-
    format('Content-type: text/plain~n~n'),
    http_parameters(Request, [ name(Name, [ optional(true), length >= 2 ]) ]),
    (
        var(Name) ->
        format("What's your name?~n", []), !; % Person is a variable (it's empty)
        format("Hello, ~w!~n", [Name]) % Person exists
    ).


api_hello(_):-
    R = json([message='Hello World!']),
    prolog_to_json(R, JsonOut),
    reply_json(JsonOut).

api_greet(Request):-
    http_read_json(Request, JsonIn, [json_object(dict)]),
    % R = json([message=JsonIn.name]),
    R = student(JsonIn.name),
    prolog_to_json(R, JsonOut),
    reply_json(JsonOut).

read_api(Url, Dict):-
    setup_call_cleanup(
        http_open(Url, In, []),
        json_read_dict(In, Dict),
        close(In)
    ).

fetch_buildings(Buildings):-
    api_url(Url),
    atom_concat(Url, '/buildings', BuildingsUrl),
    read_api(BuildingsUrl, Buildings).

fetch_connectors(Connectors):-
    api_url(Url),
    atom_concat(Url, '/connectors', ConnectorsUrl),
    read_api(ConnectorsUrl, Connectors).

fetch_floors(BuildingCode, Floors) :-
    api_url(Url),
    atom_concat(Url, '/buildings/', FloorsUrl),
    atom_concat(FloorsUrl, BuildingCode, FloorsUrl2),
    atom_concat(FloorsUrl2, '/floors', FloorsUrl3),
    read_api(FloorsUrl3, Floors).

api_get_route(Request):-
    http_parameters(Request, [ fromX(FromX, [ optional(false), length >= 1 ]) ]),
    http_parameters(Request, [ fromY(FromY, [ optional(false), length >= 1 ]) ]),
    http_parameters(Request, [ fromFloor(FromFloor, [ optional(false), length >= 1 ]) ]),
    http_parameters(Request, [ toX(ToX, [ optional(false), length >= 1 ]) ]),
    http_parameters(Request, [ toY(ToY, [ optional(false), length >= 1 ]) ]),
    http_parameters(Request, [ toFloor(ToFloor, [ optional(false), length >= 1 ]) ]),
    http_parameters(Request, [ method(_, [ optional(false), length >= 1 ]) ]),

    atom_number(FromX, FromX2),
    atom_number(FromY, FromY2),
    atom_number(ToX, ToX2),
    atom_number(ToY, ToY2),
    atom_string(FromFloor2, FromFloor),
    atom_string(ToFloor2, ToFloor),
    C1=cel(FromFloor2, FromX2, FromY2),
    C2=cel(ToFloor2, ToX2, ToY2),

    planning:caminho_celulas_elevador(C1,C2, R),
    prolog_to_json(R, JsonOut),
    reply_json(JsonOut).

init_server(Port):-
    debug(http(request)), % debug http requests & responses
    http_server(http_dispatch, [port(Port)]).

:- init_server(5000).
