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
%m(col,lin,valor)
m(1,1,1).
m(2,1,1).
m(3,1,1).
m(4,1,1).
m(5,1,1).
m(6,1,1).
m(7,1,1).
m(8,1,1).

m(1,2,0).
m(2,2,0).
m(3,2,0).
m(4,2,0).
m(5,2,0).
m(6,2,0).
m(7,2,0).
m(8,2,1).

m(1,3,0).
m(2,3,0).
m(3,3,0).
m(4,3,0).
m(5,3,0).
m(6,3,0).
m(7,3,0).
m(8,3,1).

m(1,4,0).
m(2,4,0).
m(3,4,0).
m(4,4,0).
m(5,4,0).
m(6,4,0).
m(7,4,0).
m(8,4,1).

m(1,5,1).
m(2,5,1).
m(3,5,1).
m(4,5,1).
m(5,5,0).
m(6,5,0).
m(7,5,0).
m(8,5,1).

m(1,6,1).
m(2,6,1).
m(3,6,1).
m(4,6,1).
m(5,6,0).
m(6,6,0).
m(7,6,0).
m(8,6,1).

m(1,7,1).
m(2,7,1).
m(3,7,1).
m(4,7,1).
m(5,7,0).
m(6,7,0).
m(7,7,0).
m(8,7,1).

liga(a,h).
liga(b,g).
liga(b,i).
liga(g,h).
liga(h,i).
liga(i,j).

pisos(a,[a1]).
pisos(b,[b1,b2,b3,b4]).
pisos(g,[g2,g3,g4]).
pisos(h,[h1,h2,h3,h4]).
pisos(i,[i1,i2,i3,i4]).
pisos(j,[j1,j2,j3,j4]).

elevador(b,[b1,b2,b3,b4]).
elevador(g,[g2,g3,g4]).
elevador(i,[i1,i2,i3,i4]).
elevador(j,[j1,j2,j3,j4]).

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


cria_grafo(_,0):-!.
cria_grafo(Col,Lin):-cria_grafo_lin(Col,Lin),Lin1 is Lin-1,cria_grafo(Col,Lin1).


cria_grafo_lin(0,_):-!.
cria_grafo_lin(Col,Lin):-m(Col,Lin,0),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    ((m(ColS,Lin,0),m(Col,LinS,0),m(ColS,LinS,0),assertz(ligacel(cel(Col,Lin),cel(ColS,LinS),sqrt(2)));true)),
    ((m(ColS,Lin,0),m(Col,LinA,0),m(ColS,LinA,0),assertz(ligacel(cel(Col,Lin),cel(ColS,LinA),sqrt(2)));true)),
    ((m(ColA,Lin,0),m(Col,LinA,0),m(ColA,LinA,0),assertz(ligacel(cel(Col,Lin),cel(ColA,LinA),sqrt(2)));true)),
    ((m(ColA,Lin,0),m(Col,LinS,0),m(ColA,LinS,0),assertz(ligacel(cel(Col,Lin),cel(ColA,LinS),sqrt(2)));true)),
    ((m(ColS,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin),1));true)),
    ((m(ColA,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin),1));true)),
    ((m(Col,LinS,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinS),1));true)),
    ((m(Col,LinA,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinA),1));true)),
    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin).
cria_grafo_lin(Col,Lin):-Col1 is Col-1,cria_grafo_lin(Col1,Lin).


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

estimativa(cel(X1,Y1),cel(X2,Y2),Estimativa):-
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).

:- cria_grafo(8,7).
