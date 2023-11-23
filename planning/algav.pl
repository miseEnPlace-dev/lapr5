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
:-dynamic m/4.
%m(piso,col,lin,valor)
m(f1,1,1,1).
m(f1,2,1,1).
m(f1,3,1,1).
m(f1,4,1,1).
m(f1,5,1,1).
m(f1,6,1,1).
m(f1,7,1,1).
m(f1,8,1,1).

m(f1,1,2,0).
m(f1,2,2,0).
m(f1,3,2,0).
m(f1,4,2,0).
m(f1,5,2,0).
m(f1,6,2,0).
m(f1,7,2,0).
m(f1,8,2,1).

m(f1,1,3,0).
m(f1,2,3,0).
m(f1,3,3,0).
m(f1,4,3,0).
m(f1,5,3,0).
m(f1,6,3,0).
m(f1,7,3,0).
m(f1,8,3,1).

m(f1,1,4,0).
m(f1,2,4,0).
m(f1,3,4,0).
m(f1,4,4,0).
m(f1,5,4,0).
m(f1,6,4,0).
m(f1,7,4,0).
m(f1,8,4,1).

m(f1,1,5,1).
m(f1,2,5,1).
m(f1,3,5,1).
m(f1,4,5,1).
m(f1,5,5,0).
m(f1,6,5,0).
m(f1,7,5,0).
m(f1,8,5,1).

m(f1,1,6,1).
m(f1,2,6,1).
m(f1,3,6,1).
m(f1,4,6,1).
m(f1,5,6,0).
m(f1,6,6,0).
m(f1,7,6,0).
m(f1,8,6,1).

m(f1,1,7,1).
m(f1,2,7,1).
m(f1,3,7,1).
m(f1,4,7,1).
m(f1,5,7,0).
m(f1,6,7,0).
m(f1,7,7,0).
m(f1,8,7,1).

:-dynamic liga/2.
liga(a,h).
liga(b,g).
liga(b,i).
liga(g,h).
liga(h,i).
liga(i,j).

:-dynamic pisos/2.
pisos(a,[a1]).
pisos(b,[b1,b2,b3,b4]).
pisos(g,[g2,g3,g4]).
pisos(h,[h1,h2,h3,h4]).
pisos(i,[i1,i2,i3,i4]).
pisos(j,[j1,j2,j3,j4]).

:-dynamic elevador/2.
elevador(b,[b1,b2,b3,b4]).
elevador(g,[g2,g3,g4]).
elevador(i,[i1,i2,i3,i4]).
elevador(j,[j1,j2,j3,j4]).

:-dynamic corredor/4.
corredor(a,h,a1,h2).
corredor(b,g,b2,g2).
corredor(b,g,b3,g3).
corredor(b,i,b3,i3).
corredor(g,h,g2,h2).
corredor(g,h,g3,h3).
corredor(h,i,h2,i2).
corredor(i,j,i1,j1).
corredor(i,j,i2,j2).
corredor(i,j,i3,j3).

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
cria_grafo_lin(F,Col,Lin):-m(F,Col,Lin,0),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    ((m(F,ColS,Lin,0),m(F,Col,LinS,0),m(F,ColS,LinS,0),assertz(ligacel(cel(F,Col,Lin),cel(F,ColS,LinS),sqrt(2)));true)),
    ((m(F,ColS,Lin,0),m(F,Col,LinA,0),m(F,ColS,LinA,0),assertz(ligacel(cel(F,Col,Lin),cel(F,ColS,LinA),sqrt(2)));true)),
    ((m(F,ColA,Lin,0),m(F,Col,LinA,0),m(F,ColA,LinA,0),assertz(ligacel(cel(F,Col,Lin),cel(F,ColA,LinA),sqrt(2)));true)),
    ((m(F,ColA,Lin,0),m(F,Col,LinS,0),m(F,ColA,LinS,0),assertz(ligacel(cel(F,Col,Lin),cel(F,ColA,LinS),sqrt(2)));true)),
    ((m(F,ColS,Lin,0),assertz(ligacel(cel(F,Col,Lin),cel(F,ColS,Lin),1));true)),
    ((m(F,ColA,Lin,0),assertz(ligacel(cel(F,Col,Lin),cel(F,ColA,Lin),1));true)),
    ((m(F,Col,LinS,0),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinS),1));true)),
    ((m(F,Col,LinA,0),assertz(ligacel(cel(F,Col,Lin),cel(F,Col,LinA),1));true)),
    Col1 is Col-1,
    cria_grafo_lin(F,Col1,Lin).
cria_grafo_lin(F,Col,Lin):-Col1 is Col-1,cria_grafo_lin(F,Col1,Lin).


peso([_],0).
peso([A,B|T],W):-ligacel(A,B,W1),peso([B|T],W2),W is W1+W2 ,!.


dfs(Orig,Dest,Cam,W):-
	dfs2(Orig,Dest,[Orig],Cam), peso(Cam,W).
dfs(Orig,Dest,Cam):-
	dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-
	reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam):-
	ligacel(Act,X,_),
  \+ member(X,LA),
	dfs2(X,Dest,[X|LA],Cam).

all_dfs(Orig,Dest,LCam):-findall(Cam,dfs(Orig,Dest,Cam,_),LCam).


better_dfs(Orig,Dest,Cam):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).
better_dfs(Orig,Dest,Cam,W):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_), peso(Cam,W).


shortlist([L],L,N):-!,length(L,N).
shortlist([L|LL],Lm,Nm):-shortlist(LL,Lm1,Nm1),
				length(L,NL),
			((NL<Nm1,!,Lm=L,Nm is NL);(Lm=Lm1,Nm is Nm1)).

bfs(Orig,Dest,Cam,W):-bfs2(Dest,[[Orig]],Cam),peso(Cam,W).
bfs(Orig,Dest,Cam):-bfs2(Dest,[[Orig]],Cam).

all_bfs(Orig,Dest,LCam):-findall(Cam,bfs(Orig,Dest,Cam,_),LCam).

better_bfs(Orig,Dest,Cam):-all_bfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).
better_bfs(Orig,Dest,Cam,W):-all_bfs(Orig,Dest,LCam), shortlist(LCam,Cam,_), peso(Cam,W).

bfs2(Dest,[[Dest|T]|_],Cam):-
	reverse([Dest|T],Cam).

bfs2(Dest,[LA|Outros],Cam):-
	LA=[Act|_],
	findall([X|LA],
		(Dest\==Act,ligacel(Act,X,_),\+ member(X,LA)),
		Novos),
	append(Outros,Novos,Todos),
	bfs2(Dest,Todos,Cam).


aStar(Orig,Dest,Cam,Custo):-
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo), !.

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
	reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,ligacel(Act,X,CustoX),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo).

estimativa(cel(F,X1,Y1),cel(F,X2,Y2),Estimativa):-
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).

:- cria_grafo(_,8,7).

load_data() :-
	server:fetch_buildings(Buildings),
	server:fetch_connectors(Connectors),
	create_buildings(Buildings),
	create_connectors(Connectors).

create_buildings([H|T]) :-
	write("Loading building "), write(H.code), write(" ..."), nl,
	create_elevator(H),
	create_floors(H),
	create_buildings(T).

create_buildings([]).

create_elevator(Building) :-
	write("  Elevator -> "), write(Building.elevatorFloors), nl,
	asserta(elevador(Building.code, Building.elevatorFloors)).

create_floors(Building) :-
	server:fetch_floors(Building.code, Floors),
	create_floors_matrix(Floors),
	floorCodes(Floors, FloorCodes),
	asserta(pisos(Building.code, FloorCodes)).


create_floors_matrix([H|T]) :-
	write("    Floor "), write(H.code), write(" -> "), is_dict(H.get(map)), nl,
	write("      Matrix "),  write(H.map.maze.size.width), write("x"), write(H.map.maze.size.depth), nl,
	write("      "), write(H.map.maze.map), nl,
	W is H.map.maze.size.width+1,
	L is H.map.maze.size.depth+1,
	reverse(H.map.maze.map, H1),
	create_floor_matrix(H.code, H1, W, L),
	create_floors_matrix(T).

create_floors_matrix([]).

create_floors_matrix([_|T]) :-
	write("No Map"), nl, create_floors_matrix(T).


create_floor_matrix(_, _, _, 0).
create_floor_matrix(FloorCode, [H|T], Width, Length) :-
	reverse(H, H1),
	create_floor_matrix_line(FloorCode, H1, Width, Length),
	Length1 is Length - 1,
	create_floor_matrix(FloorCode, T, Width, Length1).


create_floor_matrix_line(_, _, 0, _).
create_floor_matrix_line(FloorCode, [H|T], Width, Col) :-
	asserta(m(FloorCode, Width, Col, H)),
	Width1 is Width - 1,
	create_floor_matrix_line(FloorCode, T, Width1, Col).




floorCodes([H|T], [H.code|Codes]) :-
	floorCodes(T, Codes).

floorCodes([], []).

create_connectors([H|T]) :-
	create_connector(H),
	create_connectors(T).

create_connectors([]).

create_connector(Connector) :-
	write("Loading Connector "), write(Connector.code), write(" ..."), nl,
	write("  From -> "), write(Connector.floor1BuildingCode), write(" - "), write(Connector.floor1Code), nl,
	write("  To -> "), write(Connector.floor2BuildingCode), write(" - "), write(Connector.floor2Code), nl,
	asserta(liga(Connector.floor1BuildingCode, Connector.floor2BuildingCode)),
	asserta(corredor(Connector.floor1BuildingCode, Connector.floor2BuildingCode, Connector.floor1Code, Connector.floor2Code)).

