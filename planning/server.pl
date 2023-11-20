:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/html_write)). % produce html
:- use_module(library(http/http_parameters)). % GET query params
:- use_module(library(http/html_head)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
% :- use_module(library(http/http_files)).

:- set_setting(http:cors, [*]).

% to reload, use make. in the console & refresh the page

:- json_object student(student_name:string).

% define route aliases
http:location(api, root(api), []). % /api

% define your routes here
:- http_handler(root(.), say_hi, []). % /
:- http_handler(root(hello), say_hi_html, []). % /hello
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

init_server(Port):-
    debug(http(request)), % debug http requests & responses
    http_server(http_dispatch, [port(Port)]).

:- init_server(5000).
