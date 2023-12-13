:- module(planning, []).

:- use_module(server).

:-dynamic ligacel/3.
%linha 1:1,1,1,1,1,1,1,1
%linha 2:0,0,0,0,0,0,0,1
%linha 3:0,0,0,0,0,0,0,1
%linha 4:0,0,0,0,0,0,0,1
%linha 5:1,1,1,1,0,0,0,1
%linha 6:1,1,1,1,0,0,0,1
%linha 7:1,1,1,1,0,0,0,1
%coluna :1,2,3,4,5,6,7,8
%
%
%
%m(piso,col,lin,valor)
:-dynamic m/4.
:-dynamic liga/2.
:-dynamic pisos/2.
:-dynamic elevador/2.
:-dynamic corredor/4.
:-dynamic exit/4.

peso_hv(1).
peso_diagonal(W):- W is sqrt(2).

debug_mode(0).

peso_corr(5).
peso_elev(30).

caminho_edificios(EdOr,EdDest,LEdCam):-	caminho_edificios2(EdOr,EdDest,[EdOr],LEdCam).

caminho_edificios2(EdX,EdX,LEdInv,LEdCam):-!,reverse(LEdInv,LEdCam).

caminho_edificios2(EdAct,EdDest,LEdPassou,LEdCam):-
	(liga(EdAct,EdInt);liga(EdInt,EdAct)), 
	\+member(EdInt,LEdPassou),
	caminho_edificios2(EdInt,EdDest,[EdInt|LEdPassou],LEdCam).

todos_caminhos_edificios(EdOr,EdDest,LTCamEd):-
	findall(LEdCam,caminho_edificios(EdOr,EdDest,LEdCam),LTCamEd).

caminho_pisos(PisoOr,PisoDest,LEdCam,LLig):-pisos(EdOr,LPisosOr),member(PisoOr,LPisosOr),
	pisos(EdDest,LPisosDest),member(PisoDest,LPisosDest),
	caminho_edificios(EdOr,EdDest,LEdCam),
	segue_pisos(PisoOr,PisoDest,LEdCam,LLig).
segue_pisos(PisoDest,PisoDest,_,[]).
segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)]):-
	PisoDest\==PisoDest1,
	elevador(EdDest,LPisos), member(PisoDest1,LPisos), member(PisoDest,LPisos).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[cor(PisoAct,PisoSeg)|LOutrasLig]):-
	(corredor(EdAct,EdSeg,PisoAct,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct)),
	segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig]):-
	(corredor(EdAct,EdSeg,PisoAct1,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct1)),
	PisoAct1\==PisoAct,
	elevador(EdAct,LPisos),member(PisoAct,LPisos),member(PisoAct1,LPisos),
	segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).


melhor_caminho_pisos_elevadores(PisoOr,PisoDest,LLigMelhor):-
	findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
	menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).
menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
	menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
	conta(LLig,NElev1,NCor1),
	(((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,
	NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
	(NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

melhor_caminho_pisos_edificios(PisoOr,PisoDest,LLigMelhor):-
	findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
	menos_edificios(LLLig,LLigMelhor,_,_).

menos_edificios([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).
menos_edificios([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
	menos_edificios(OutrosLLig,LLigM,NElev,NCor),
	conta(LLig,NElev1,NCor1),
	(((NCor1<NCor;(NCor1==NCor,NElev1<NElev)),!,
	NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
	(NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).
conta([elev(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.
conta([cor(_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.


cria_grafo(_,_,0):-!.
cria_grafo(F,Col,Lin):-cria_grafo_lin(F,Col,Lin),Lin1 is Lin-1,cria_grafo(F,Col,Lin1).



cria_grafo_lin(_,0,_):-!.
cria_grafo_lin(F,Col,Lin):-(m(F,Col,Lin,0);m(F,Col,Lin,11);m(F,Col,Lin,12);m(F,Col,Lin,4);m(F,Col,Lin,5)),!,
			ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
			peso_diagonal(D),
			peso_hv(P),
    ((m(F,ColS,Lin,0),m(F,Col,LinS,0),m(F,ColS,LinS,0),asserta(ligacel(cel(F,Col,Lin),cel(F,ColS,LinS),D));true)),
    ((m(F,ColS,Lin,0),m(F,Col,LinA,0),m(F,ColS,LinA,0),asserta(ligacel(cel(F,Col,Lin),cel(F,ColS,LinA),D));true)),
    ((m(F,ColA,Lin,0),m(F,Col,LinA,0),m(F,ColA,LinA,0),asserta(ligacel(cel(F,Col,Lin),cel(F,ColA,LinA),D));true)),
    ((m(F,ColA,Lin,0),m(F,Col,LinS,0),m(F,ColA,LinS,0),asserta(ligacel(cel(F,Col,Lin),cel(F,ColA,LinS),D));true)),
    ((m(F,ColS,Lin,0),assertz(ligacel(cel(F,Col,Lin),cel(F,ColS,Lin),P));true)),
    ((m(F,ColA,Lin,0),assertz(ligacel(cel(F,Col,Lin),cel(F,ColA,Lin),P));true)),
    ((m(F,Col,LinS,0),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinS),P));true)),
    ((m(F,Col,LinA,0),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinA),P));true)),
    ((m(F,ColS,Lin,11),assertz(ligacel(cel(F,Col,Lin),cel(F,ColS,Lin),P));true)),
    ((m(F,ColA,Lin,11),assertz(ligacel(cel(F,Col,Lin),cel(F,ColA,Lin),P));true)),
    ((m(F,Col,LinS,11),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinS),P));true)),
    ((m(F,Col,LinA,11),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinA),P));true)),
    ((m(F,ColS,Lin,12),assertz(ligacel(cel(F,Col,Lin),cel(F,ColS,Lin),P));true)),
    ((m(F,ColA,Lin,12),assertz(ligacel(cel(F,Col,Lin),cel(F,ColA,Lin),P));true)),
    ((m(F,Col,LinS,12),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinS),P));true)),
    ((m(F,Col,LinA,12),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinA),P));true)),
    ((m(F,ColS,Lin,4),assertz(ligacel(cel(F,Col,Lin),cel(F,ColS,Lin),P));true)),
    ((m(F,ColA,Lin,4),assertz(ligacel(cel(F,Col,Lin),cel(F,ColA,Lin),P));true)),
    ((m(F,Col,LinS,4),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinS),P));true)),
    ((m(F,Col,LinA,4),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinA),P));true)),
    ((m(F,ColS,Lin,5),assertz(ligacel(cel(F,Col,Lin),cel(F,ColS,Lin),P));true)),
    ((m(F,ColA,Lin,5),assertz(ligacel(cel(F,Col,Lin),cel(F,ColA,Lin),P));true)),
    ((m(F,Col,LinS,5),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinS),P));true)),
    ((m(F,Col,LinA,5),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinA),P));true)),
    Col1 is Col-1,
    cria_grafo_lin(F,Col1,Lin).
cria_grafo_lin(F,Col,Lin):-Col1 is Col-1,cria_grafo_lin(F,Col1,Lin).


peso([_],0).
peso([A,B|T],W):-ligacel(A,B,W1),peso([B|T],W2), W is W1+W2, write(W), !.


dfs(Orig,Dest,Cam,W):-
	dfs2(Orig,Dest,[Orig],Cam), peso(Cam,W).
dfs(Orig,Dest,Cam):-
	dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest, Dest, LA, Cam) :-
    reverse(LA, Cam).
    % write('Chegou ao destino: '), write(Dest), write(' Caminho encontrado: '), write(Cam), nl.

dfs2(Act, Dest, LA, Cam) :-
    ligacel(Act, X, _),
    \+ member(X, LA),
    % write('Explorando vizinhos de: '), write(Act), write(' Vizinho: '), write(X), nl,
    dfs2(X, Dest, [X | LA], Cam).

all_dfs(Orig,Dest,LCam):-findall(Cam,dfs(Orig,Dest,Cam,_),LCam).


better_dfs(Orig,Dest,Cam):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).
better_dfs(Orig,Dest,Cam,W):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_), peso(Cam,W).


shortlist([L],L,N):-!,length(L,N).
shortlist([L|LL],Lm,Nm):-shortlist(LL,Lm1,Nm1),
				length(L,NL),
			((NL<Nm1,!,Lm=L,Nm is NL);(Lm=Lm1,Nm is Nm1)).

bfs(Orig,Dest,Cam,W):-bfs2(Dest,[[Orig]],Cam),peso(Cam,W).
bfs(Orig,Dest,Cam):-bfs2(Dest,[[Orig]],Cam).

bfs2(Dest,[[Dest|T]|_],Cam):-
	reverse([Dest|T],Cam).

bfs2(Dest,[LA|Outros],Cam):-
	LA=[Act|_],
	findall([X|LA],
		(Dest\==Act,ligacel(Act,X,_),\+ member(X,LA)),
		Novos),
	append(Outros,Novos,Todos),
	bfs2(Dest,Todos,Cam).

all_bfs(Orig,Dest,LCam):-findall(Cam,bfs(Orig,Dest,Cam,_),LCam).

better_bfs(Orig,Dest,Cam):-all_bfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).
better_bfs(Orig,Dest,Cam,W):-all_bfs(Orig,Dest,LCam), shortlist(LCam,Cam,_), peso(Cam,W).



aStar(Orig,Dest,Cam,Custo):-
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo), !.

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
	reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,(ligacel(Act,X,CustoX);ligacel(X,Act,CustoX)),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo).

estimativa(cel(F,X1,Y1),cel(F,X2,Y2),Estimativa):-
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).

load_data() :-
	debug_mode(D),
	server:authenticate(),
	((D==0,write("Authenticated..."), nl);true),
	server:fetch_buildings(Buildings),
	((D==0,write("Fetching buildings..."), nl);true),
	server:fetch_connectors(Connectors),
	((D==0,write("Fetching connectors..."), nl);true),
	create_buildings(Buildings),
	create_connectors(Connectors).

create_buildings([H|T]) :-
	debug_mode(D),
	((D==0,write("Loading building "), write(H.code), write(" ..."), nl);true),
	create_elevator(H),
	create_floors(H),
	create_buildings(T).

create_buildings([]).

create_elevator(Building) :-
	debug_mode(D),
	((D==0,write("  Elevator -> "), write(Building.elevatorFloors), nl);true),
	asserta(elevador(Building.code, Building.elevatorFloors)).

create_floors(Building) :-
	server:fetch_floors(Building.code, Floors),
	create_floors_matrix(Floors),
	floorCodes(Floors, FloorCodes),
	asserta(pisos(Building.code, FloorCodes)).


create_floor_exits(Floor) :-
	create_exits(Floor.map.maze.exits, Floor.code).

create_exits([H|T], FloorCode) :-
	debug_mode(D),
	((D==0,write("      Exit -> "), write("X: "), write(H.x), write(" Y: "), write(H.y), nl);true),
	asserta(exit(FloorCode, H.floorCode, H.x, H.y)),
	create_exits(T, FloorCode).

create_exits([], _).

create_floors_matrix([H|T]):-
	debug_mode(D),
	((D==0,write("  Floor -> "), write(H.code), nl);true),
	is_dict(H.get(map)),
	create_floor_exits(H),
	((D==0,write("      Matrix "),  write(H.map.maze.size.width), write("x"), write(H.map.maze.size.depth), nl);true),
	((D==0,write("      "), write(H.map.maze.map), nl);true),
	W is H.map.maze.size.width+1,
	L is H.map.maze.size.depth+1,
	reverse(H.map.maze.map, H1),
	create_floor_matrix(H.code, H1, W, L),
	((D==0,write("       cria_grafo("), write(H.code), write(","), write(H.map.maze.size.depth), write(","), write(H.map.maze.size.width), write(")"), nl);true),
	cria_grafo(H.code,H.map.maze.size.depth,H.map.maze.size.width),
	create_floors_matrix(T).


create_floors_matrix([]).

create_floors_matrix([_|T]) :-
	debug_mode(D),
	((D==0,write("     No Map"), nl);true),
	create_floors_matrix(T).


create_floor_matrix(_, _, _, 0).
create_floor_matrix(FloorCode, [H|T], Width, Length) :-
	reverse(H, H1),
	create_floor_matrix_line(FloorCode, H1, Width, Length),
	Length1 is Length - 1,
	create_floor_matrix(FloorCode, T, Width, Length1).


create_floor_matrix_line(_, _, 0, _).
create_floor_matrix_line(FloorCode, [H|T], Width, Col) :-
	asserta(m(FloorCode, Col, Width, H)),
	Width1 is Width - 1,
	create_floor_matrix_line(FloorCode, T, Width1, Col).


floorCodes([H|T], [H.code|Codes]) :-
	floorCodes(T, Codes).

floorCodes([], []).

create_connectors([H|T]) :-
	create_connector(H),
	create_connectors(T).

create_connectors([]).

create_connector(Connector):-
	debug_mode(D),
	((D==0,write("Loading Connector "), write(Connector.code), write(" ..."), nl);true),
	((D==0,write("  From -> "), write(Connector.floor1BuildingCode), write(" - "), write(Connector.floor1Code), nl);true),
	((D==0,write("  To -> "), write(Connector.floor2BuildingCode), write(" - "), write(Connector.floor2Code), nl);true),
	asserta(liga(Connector.floor1BuildingCode, Connector.floor2BuildingCode)),
	asserta(corredor(Connector.floor1BuildingCode, Connector.floor2BuildingCode, Connector.floor1Code, Connector.floor2Code)).

caminho_celulas_elevador(cel(F1,X1,Y1),cel(F2,X2,Y2),C,W) :-
	melhor_caminho_pisos_elevadores(F1,F2,L),
	caminho_celulas(L,cel(F1,X1,Y1),cel(F2,X2,Y2),C,W).

caminho_celulas_edificios(cel(F1,X1,Y1),cel(F2,X2,Y2),C,W) :-
	melhor_caminho_pisos_edificios(F1,F2,L),
	caminho_celulas(L,cel(F1,X1,Y1),cel(F2,X2,Y2),C,W), !.

caminho_celulas([H|T],C1,C2,L,W) :-
	debug_mode(D),
	H=..[cor,F1,F2],
	((D==0,write("  Corredor -> "), write(F1), write(" - "), write(F2), nl);true),
	exit(F1,F2,Ex,Ey),
	((D==0,write("  aStar("), write("cel("), write(F1), write(","), write(Ex), write(","), write(Ey), write(")"), write(","), write(C1), write(")"), nl);true),
	aStar(C1,cel(F1,Ex,Ey),L1,W1),
	exit(F2,F1,E1x,E1y),
	peso_corr(Wc),
	W2=W1+Wc+W,
	caminho_celulas(T,cel(F2,E1x,E1y),C2,L2, W2),
	append([cor(F1,F2)],L2,L3),
	append(L1,L3,L).

caminho_celulas([H|T],C1,C2,L,W) :-
	debug_mode(D),
	H=..[_,F1,F2],
	((D==0,write("  Elevador -> "), write(F1), write(" - "), write(F2), nl);true),
	(m(F1,Ex,Ey,4);m(F1,Ex,Ey,5)),
	((D==0,write("  aStar("), write("cel("), write(F1), write(","), write(Ex), write(","), write(Ey), write(")"), write(","), write(C1), write(")"), nl);true),
	aStar(C1,cel(F1,Ex,Ey),L1,W1),
	((D==0,write("  L -> "), write(L1), nl);true),
	(m(F2,E1x,E1y,4);m(F2,E1x,E1y,5)),
	peso_elev(We),
	W2=W1+We+W,
	caminho_celulas(T,cel(F2,E1x,E1y),C2,L2,W2),
	append([elev(F1,F2)],L2,L3),
	append(L1,L3,L).

caminho_celulas([],C1,C2,L,W) :-
	aStar(C1,C2,L,W).

