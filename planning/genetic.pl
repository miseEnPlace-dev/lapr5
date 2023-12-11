% geracoes(NGeracoes).
geracoes(8).

% populacao(TamanhoPopulacao).
populacao(10).

% prob_cruzamento(ProbabilidadeCruzamento).
prob_cruzamento(0.7).

% prob_mutacao(ProbabilidadeMutacao).
prob_mutacao(0.2).

%lim_time(Tempo_segundos).
lim_time(5).

% tarefas(NTarefas).
tarefas(5).

% tarefa(Id,TempoProcessamento,TempConc).
tarefa(t1,2,5).
tarefa(t2,4,7).
tarefa(t3,1,11).
tarefa(t4,3,9).
tarefa(t5,3,8).

factorial(0, 1).
factorial(N, F) :-
	N > 0,
	N1 is N - 1,
	factorial(N1, F1),
	F is N * F1.

is_empty([]).

gera_best_bruteforce:-
	tarefas(NTarefas),
	findall(Tarefa,tarefa(Tarefa,_,_),Tarefas),
	factorial(NTarefas,NTotal),
	gera_best_bruteforce(NTotal,NTarefas,Tarefas,Pop),
	avalia_populacao(Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
	melhor_individuo(PopOrd,Ind),
	write('Melhor individuo: '), write(Ind), nl, nl.

gera_best_bruteforce(N, NT, T, P):-
	!,
	gera_best_bruteforce(N, NT, T, [], P).

gera_best_bruteforce(0,_,_,P1,P1):- !.

gera_best_bruteforce(TPop,NTarefas,Tarefas,Temp,Pop):-
	gera_individuo(Tarefas,NTarefas,Ind),
	(not(member(Ind,Temp));is_empty(Temp)),
	!,
	TPop1 is TPop - 1,
	append(Temp,[Ind],Temp1),
	gera_best_bruteforce(TPop1,NTarefas,Tarefas,Temp1,Pop).

gera_best_bruteforce(TPop,NTarefas,Tarefas,Temp,Pop):-
	gera_best_bruteforce(TPop,NTarefas,Tarefas,Temp,Pop).

gera_lim_ger:-
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao_ger(0,NG,PopOrd).

gera_lim_time:-
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	get_time(Ti),
	gera_geracao_time(Ti,0,PopOrd).


gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa(Tarefa,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).

gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).


gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).


retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).


avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
	tarefa(T,Dur,Prazo),
	InstFim is Inst+Dur,
	avalia(Resto,InstFim,VResto),
	((InstFim =< Prazo,!, VT is 0);(VT is (InstFim-Prazo))),
	V is VT+VResto.


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


gera_geracao_ger(G,G,Pop):-!,
	write('Geração '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao_ger(N,G,Pop):-
	write('Geração '), write(N), write(':'), nl, write(Pop), nl,
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	melhor_individuo(NPopOrd,Ind),
	write('Melhor individuo: '), write(Ind), nl, nl,
	N1 is N+1,
	gera_geracao_ger(N1,G,NPopOrd).

gera_geracao_time(T,G,Pop):-
	lim_time(Lim),
	get_time(Ti),
	Tf is Ti - T,
	Tf > Lim,
	!,
	write('Geração '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao_time(T,N,Pop):-
	write('Geração '), write(N), write(':'), nl, write(Pop), nl,
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	melhor_individuo(NPopOrd,Ind),
	write('Melhor individuo: '), write(Ind), nl, nl,
	N1 is N+1,
	gera_geracao_time(T,N1,NPopOrd).

melhor_individuo([Ind*V|Resto],Ind1):-
	melhor_individuo(Resto,Ind*V,Ind1).

melhor_individuo([],Ind,Ind):-!.

melhor_individuo([Ind*V|Resto],Ind1*V1,Ind2):-
	(V < V1,! ,melhor_individuo(Resto,Ind*V,Ind2));
	melhor_individuo(Resto,Ind1*V1,Ind2).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
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
	tarefas(N),
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
	tarefas(T),
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
	tarefas(NumT),
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
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
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

