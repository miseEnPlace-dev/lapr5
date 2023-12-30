:- module(genetic, []).

:- use_module(planning).

% geracoes(NGeracoes).
geracoes(10).

% populacao(TamanhoPopulacao).
populacao(5).

% prob_selecao(ProbabilidadeSelecaoAleatoria).
prob_selecao(0.8).

% prob_cruzamento(ProbabilidadeCruzamento).
prob_cruzamento(0.7).

% prob_mutacao(ProbabilidadeMutacao).
prob_mutacao(0.2).

%lim_time(Tempo_segundos). 
lim_time(2).

% n_tarefas(NTarefas).
% n_tarefas(5).

:- dynamic n_tarefas/1.
:- dynamic tarefas/3.
:- dynamic t/3.

debug_mode(0).

% t(id_tarefa, inicio, fim).
% t(t1, cel("b2",8,21),cel("c3",8,2)).
% t(t2, cel("b1",7,20),cel("b2",6,20)).
% t(t3, cel("b3",9,20),cel("b3",8,20)).
% t(t4, cel("b2",6,19),cel("b2",9,18)).
% t(t5, cel("b3",8,18),cel("b3",8,17)).

% t(t6,cel("c3",8,2),cel("b2",8,21)).
% t(t7,cel("b2",6,20),cel("b1",7,20)).
% t(t8,cel("b3",8,20),cel("b3",9,20)).
% t(t9,cel("b2",9,18),cel("b2",6,19)).
% t(t10,cel("b3",8,17),cel("b3",8,18)).

count([],N,N):-!.
count([_|T],N1,N):-
	N2 is N1+1,
	count(T,N2,N).


load_tasks([H|T],N):-
	((H.type=="pick_delivery",
		asserta(
		t(
			H.deviceTaskId,
			cel(H.startFloorCode,H.startCoordinateX,H.startCoordinateY),
			cel(H.endFloorCode,H.endCoordinateX,H.endCoordinateY)
		))
	);
		asserta(
		t(
			H.deviceTaskId,
			cel(H.floorId,H.startCoordinateX,H.startCoordinateY),
			cel(H.floorId,H.endCoordinateX,H.endCoordinateY)
		))
	),
	N1 is N+1,
	load_tasks(T,N1).

load_tasks([],N):-
	load_tarefas(),
	asserta(n_tarefas(N)).


load_tarefas:-
	findall(T,t(T,_,_),L),
	load_tarefas(L).

load_tarefas([]).

load_tarefas([T|Resto]):-
	load_tarefa(T,Resto),
	load_tarefas(Resto).


load_tarefa(_,[]).
load_tarefa(Tarefa,[H|T]):-
	load_tarefa2(Tarefa,H),
	load_tarefa(Tarefa,T).

load_tarefa2(T1,T2):-
	debug_mode(D),
	t(T1,S1,F1), t(T2,S2,F2),
	((D==1,nl,write('Tarefa '), write(T1), write(' e '), write(T2), write(': '), nl);true),
	((D==1,write('F1: '), write(F1), write(' S2: '), write(S2));true),
	planning:caminho_celulas_edificios(F1,S2,_,W1),
	((D==1,write(' W1: '), write(W1), nl);true),
	((D==1,write('F2: '), write(F2), write(' S1: '), write(S1),nl);true),
	planning:caminho_celulas_edificios(F2,S1,_,W2),
	((D==1,write(' W2: '), write(W2), nl);true),
	asserta(tarefas(T1,T2,W1)),
	asserta(tarefas(T2,T1,W2)).

gera_best_bruteforce:-
	debug_mode(D),
	get_time(Ti),
	findall(Tarefa,t(Tarefa,_,_),Tarefas),
	findall(P, permutation(Tarefas,P), Pop),
	avalia_populacao(Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
	melhor_individuo(PopOrd,Ind),
	get_time(Tf),
	((D==1,write('Melhor individuo: '), write(Ind), nl);true),
	((D==1,write('Tempo de execução: '), T is Tf - Ti, write(T), nl, nl);true).

gera_lim_ger(Melhor):-
	debug_mode(D),
	gera_populacao(Pop),
	((D==1,write('Pop='),write(Pop),nl);true),
	avalia_populacao(Pop,PopAv),
	((D==1,write('PopAv='),write(PopAv),nl);true),
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao_ger(0,NG,PopOrd,Melhor),!.

gera_lim_time(Melhor):-
	debug_mode(D),
	gera_populacao(Pop),
	((D==1,write('Pop='),write(Pop),nl);true),
	avalia_populacao(Pop,PopAv),
	((D==1,write('PopAv='),write(PopAv),nl);true),
	ordena_populacao(PopAv,PopOrd),
	get_time(Ti),
	gera_geracao_time(Ti,0,PopOrd,Melhor), !.

gera_estab:-
    debug_mode(D),
    gera_populacao(Pop), 
    ((D==1,write('Pop='),write(Pop),nl);true),
    avalia_populacao(Pop, PopAv),
    ((D==1,write('PopAv='),write(PopAv),nl);true),
    ordena_populacao(PopAv, PopOrd),
    gera_estab_ger(0, PopOrd, 2, Pop).

gera_estab_ger(_, _, 0, Pop):-
    debug_mode(D),
    ((D==1,write('Condição de paragem atingida. População estável por duas gerações consecutivas.'), nl,write('População final: '), write(Pop), nl);true).

gera_estab_ger(G, Pop, GerIguais, PopAnterior):-
    debug_mode(D),
    ((D==1,write('Geração '), write(G), write(':'), nl, write(Pop), nl);true),
    cruzamento(Pop, NPop1),
    mutacao(NPop1, NPop),
    avalia_populacao(NPop, NPopAv),
    ordena_populacao(NPopAv, NPopOrd),
    melhor_individuo(NPopOrd, Ind),
    ((D==1,write('Melhor individuo: '), write(Ind), nl, nl);true),
		(GerIguais > 0, avaliar_semelhanca_entre_pop(Pop, PopAnterior, GerIguais),
				G1 is G + 1,
				NovoGerIguais is GerIguais - 1,
				gera_estab_ger(G1, NPopOrd, NovoGerIguais, NPop)
		; 
				G1 is G + 1,
				gera_estab_ger(G1, NPopOrd, GerIguais, NPop)
		).

gera_nao_elit:-
    debug_mode(D),
    gera_populacao(Pop),
    ((D==1,write('Pop='),write(Pop),nl);true),
    selecao_individuos(Pop, PopAv),
    ((D==1,write('PopAv='),write(PopAv),nl);true),
    ordena_populacao(PopAv, PopOrd),
    gera_estab_ger(0, PopOrd, 2, Pop).

gera_nao_elit(_, _, 0, Pop):-
    debug_mode(D),
    ((D==1,write('Condição de paragem atingida. População estável por duas gerações consecutivas.'), nl,write('População final: '), write(Pop), nl);true).
	
gera_nao_elit(G, Pop, GerIguais, PopAnterior):-
	debug_mode(D),
	((D==1,write('Geração '), write(G), write(':'), nl, write(Pop), nl);true),
	cruzamento(Pop, NPop1),
	mutacao(NPop1, NPop),
	selecao_individuos(NPop, NPopAv),
	ordena_populacao(NPopAv, NPopOrd),
	melhor_individuo(Pop, Ind),
	retira_pior(NPopOrd, Ind, NPopNova),
	((D==1,write('Melhor individuo: '), write(Ind), nl, nl);true),
	(GerIguais > 0, avaliar_semelhanca_entre_pop(Pop, PopAnterior, GerIguais),
			G1 is G + 1,
			NovoGerIguais is GerIguais - 1,
			gera_estab_ger(G1, NPopNova, NovoGerIguais, NPop)
	; 
			G1 is G + 1,
			gera_estab_ger(G1, NPopNova, GerIguais, NPop)
	).

selecao_individuos(Pop, PopSelec):-
    populacao(TamPop),
    findall(Ind, (avalia(Ind, V), V/TamPop >= ProbSelec), PopSelec). % prob selecao p cada ind


avaliar_semelhanca_entre_pop(_, _, 0):-!.
avaliar_semelhanca_entre_pop([P1|Populacao],[P2|ProxGeracao], _):-
    P1=P2, 
    avaliar_semelhanca_entre_pop(Populacao, ProxGeracao, _).


gera_populacao(Pop):-
	populacao(TamPop),
	n_tarefas(NumT),
	findall(Tarefa,t(Tarefa,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	\+member(Ind,Resto).

gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).


gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT+1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).


retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([H|Resto],[H*V|Resto1]):-
	avalia(H,V),
	avalia_populacao(Resto,Resto1).

avalia([T1,T2|Resto],V):-
	tarefas(T1,T2,V1),
	avalia([T2|Resto],V2),
	V is V1 + V2.
avalia([_],0).
avalia([],0).


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao_ger(G,G,Pop,Ind):-
	debug_mode(D),
	((D==1,write('Geração '), write(G), write(':'), nl, write(Pop), nl);true),
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	melhor_individuo(NPopOrd,Ind),
	((D==1,write('Melhor individuo: '),write(Ind), nl, nl);true), !.

gera_geracao_ger(N,G,Pop,Melhor):-
	debug_mode(D),
	((D == 1,write('Geração '),write(N),write(':'),nl, write(Pop), nl);true),
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	melhor_individuo(Pop,Ind),
	retira_pior(NPopOrd,Ind,NPopNova),
	((D == 1,write('Melhor individuo: '),write(Ind), nl, nl);true),
	N1 is N+1,
	gera_geracao_ger(N1,G,NPopNova,Melhor).

gera_geracao_time(T,G,Pop,Ind):-
	debug_mode(D),
	lim_time(Lim),
	get_time(Ti),
	Tf is Ti - T,
	Tf > Lim,
	((D==1,write('Geração '), write(G), write(':'), nl, write(Pop), nl);true),
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	melhor_individuo(NPopOrd,Ind),
	((D==1,write('Melhor individuo: '), write(Ind), nl, nl);true),!.

gera_geracao_time(T, N, Pop,Melhor) :-
	debug_mode(D),
	((D == 1, write('Geração '), write(N), write(':'), nl, write(Pop), nl); true),
	cruzamento(Pop, NPop1),
	mutacao(NPop1, NPop),
	avalia_populacao(NPop, NPopAv),
	ordena_populacao(NPopAv, NPopOrd),
	melhor_individuo(Pop, MelhorInd),
	retira_pior(NPopOrd, MelhorInd, NPopNova),
	((D == 1, write('Melhor individuo: '), write(MelhorInd), nl, nl); true),
	N1 is N + 1,
	gera_geracao_time(T, N1, NPopNova,Melhor).

retira_pior([_|Resto], Melhor, [Melhor|Resto]) :- !.

melhor_individuo([Ind*V | Resto], Ind1) :-
    melhor_individuo(Resto, Ind*V, Ind1).

melhor_individuo([], Ind, Ind):- !.

melhor_individuo([Ind*V | Resto], Ind1*V1, Ind2) :-
    (V < V1, melhor_individuo(Resto, Ind*V, Ind2));
    melhor_individuo(Resto, Ind1*V1, Ind2).


gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	n_tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).


preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).


rotate_right(L,K,L1):-
	n_tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).


insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	n_tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).


cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	n_tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).


mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd=Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).

