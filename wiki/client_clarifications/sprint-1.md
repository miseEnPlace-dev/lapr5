# Client Clarifications

This document is a collection of clarifications for the first sprint. The doubts are synthesized for easier reading.

## [Question 1](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=24951)

> Quanto às tarefas que o robot realiza, eu e o meu grupo ficámos com incertezas relativamente a alguns tópicos.Realmente, um robot pode ser do tipo robisep ou droneisep e, sabemos que cada um destes tipos de robot, tem possíveis tarefas associadas. No entanto, supondo que, por exemplo, as tarefas de vigilância, limpeza e entrega de objetos estavam associadas ao tipo robisep, era possível existir um robot desse mesmo tipo que realizasse todas essas tarefas e, em simultâneo, existir outro robot também desse tipo mas, com permissões de apenas fazer limpeza e vigilância ou, até mesmo, só poder fazer limpeza?

#### Resposta

"Roboisep são robots. droneisep são drones.

neste momento vamos apenas focar o âmbito nos robots e deixar os drones para fases posteriores.

de momento apenas existem dois tipos de tarefas conhecidas que o sistema deve suportar: vigilância e entrega de objectos. quando criam um tipo de robot deve ser possivel identificar qual ou quais destas tarefas esse tipo de robot pode executar."

## [Question 2](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=24983)

> No ponto 1 do documento pode ler-se: "O sistema deve ser constituído pelos seguintes módulos: 1. Gestão de dispositivo; 2. Gestão de requisição de tarefas; 3. Planeamento de execução de uma tarefas" e, no ponto 3: Pretende-se ter um módulo de gestão de informação em ambiente web (...). Em paralelo, o módulo de planeamento (...). O sistema possuirá ainda um módulo de visualização 3D" pelo que gostaríamos, assim, de perguntar de que forma estes pontos se relacionam.

#### Resposta

"no ponto 1 devia ler-se

O sistema deve ser constituído pelos seguintes módulos: 1. Gestão de dispositivo; 2. Gestão de requisição de tarefas; 3. Planeamento de execução de uma tarefas; 4. visualização 3D"

quando no ponto 3 se lê

Pretende-se ter um módulo de gestão de informação em ambiente web (...). Em paralelo, o módulo de planeamento (...). O sistema possuirá ainda um módulo de visualização 3D"

o módulo de gestão de informação corresponde a gestão de dispositivos e de requisição de tarefas, o módulo de planeamento ao planeamento de execução de tarefas e o módulo de visualização à visualização 3D
"

## [Question 3](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=24982)

> Na primeira página do documento de especificações pode ler-se: " Numa primeira fase, a aprovação de pedidos de tarefas bem como o seu escalonamento será efetuado de forma manual pelo Gestor de Tarefas, podendo no futuro evoluir para um sistema automático." Sendo que é aqui a primeira vez que no documento é referido "gestor de tarefas", gostaria de clarificar o que é este "gestor de tarefas (é o gestor de tarefas do windows?!), e também perceber o que se pretende com a "forma manual" referida.

#### Resposta

"o gestor de tarefas é um dos papeis desempenhados pelos utilziadores do sistema. é a pessoa responsavel por aprovar os pedidos de tarefas, e atribuir esses pedidos a um robot.

a "forma manual" referido, indica que existirá uma funcionalidade na aplicação para o utilizador gestor de tarefas poder consultar os pedidos efetuados e atribuir esses pedidos a um robot particular. No futuro\* existirá um algoritmo de escalonamento que fará essa atribuição de forma automática.

- fora do âmbito do projeto para o semestre"

## [Question 4](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=24982)

> Professor, mais um pequeno esclarecimento sobre isto, se possível: No documento são enumerados 4 tipos de utilizadores:
>
> - Administrador de sistema – gere os utilizadores e autorizações dos mesmos;
> - Gestor de frota – gere os dados dos robots e drones e tipos de tarefas
> - Gestor de campus – gere os dados dos percursos e mapas
> - Utente (aluno, docente, funcionário) – pede a execução de tarefas
>
> O gestor de tarefas corresponde ao gestor de frota? Ou podemos considerar que é um utilizador adicional?

#### Resposta

"É outro tipo de utilizadores"

## [Question 5](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25007)

> A US 260 (listar passagens entre 2 edifícios) deixou-me com uma dúvida: haverão múltiplas passagens entre 2 edifícios, isto é (por exemplo), haverá múltiplas passagens entre os edifícios A e B em pisos diferentes ou até no mesmo piso?
>
> Caso a resposta seja "Sim", surgiram-me as seguintes opções para desenvolver esta US:
>
> -esta listagem refere-se a uma lista de passagens entre (por exemplo) o edifício A e B;
> -esta listagem refere-se a uma lista de passagens entre todos os edifícios;
>
> -esta listagem necessita de uma questão ao utilizador para fazer uma das duas opções anteriormente referidas e, após, fazer a listagem.
>
> Qual destas seria a esperada por si?

#### Resposta

"sim podem existir várias passagens entre edificios. Por exemplo, no edificio B do ISEP existe uma passagem no piso 2 para o edificio G, uma passagem no piso 3 para o edificio G e uma passagem no piso 3 para o edificio I

o objetivo deste requisito é permitir consultar quais as passagens existentes entre dois edificios. se nada for indicado devem ser devolvidas todas as passagens entre todos os edificios. se for indicado um par de edificios devem apenas ser devolvidas as passagens entre esses dois edificios.

notem que uma vez que as passagens são bidirecionais, uma passagem entre o edificio B e o I, significa que se pode atravessar de B para I ou de I para B. o par de edificios utilizado para filtrar esta consulta não implica nenhum tipo de restrição no sentido da passagem."

## [Question 6](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25033)

> Relativamente à criação de edifícios é suposto criar-mos um edifício sem nenhum piso inicialmente e depois adicionarmos os pisos?
>
> Por exemplo: Criar o edifício A apenas, sem nenhum piso, e só depois na US 190 criar-mos os respetivos pisos do edifício A.
>
> Ou é necessário sempre que criarmos um edifício especificar os pisos que o mesmo tem?
>
> Por exemplo: Criar o edifício A, com os pisos A1, A2, A3 com as dimensões da grelha para cada um dos pisos.

#### Resposta

"são dois requisitos independentes. 150 apenas define o edificio. posteriormente o utilizador invocará o caso de uso correspondete ao requisito 190 para criar cada piso desse edificio"

## [Question 7](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25045)

> A minha dúvida é em relação às tarefas e às suas definições.
>
> Existem diferentes tipos de tarefas, por isso, cada uma terá os seus atributos. No entanto, que atributos definem uma tarefa em geral? Apenas a sua designação?
>
> Em relação às tarefas existentes (vigilância de um piso e transporte de um objeto) existem algum requerimento especial? Para além da especificação do piso na vigilância e especificação do objeto e local de recolha e entrega no caso do transporte.

#### Resposta

"de momento todos os robots da frota apenas suportam estes dois tipos de tarefas. a existirem novos tipos de tarefas será necessário desenvolvimento especifico para tal. Em consequência não existem "tarefas em geral"

As tarefas de vigilância caracterizam-se por indicar qual o edificio e piso(s) que se pretende vigiar bem como o número de contacto em caso de incidente. tipicamente o segurança irá requisitar que um robot "dê uma volta pelos pisos X, Y e Z do edificio N". Caso o robot detete alguma situação anómala, o robot irá enviar um SMS para o contacto indicado (\*)

As tarefas de "piclup & delivery" caracterizam-se por indicar qual a sala que se pretende de pickup e qual a sala de delivery, bem como um nome e um contacto para pickup e outro para delivery. deve também ser indicado um código de confirmação que a pessoa que receberá deverá introduzir no painel do robot. adicionalmente deve ser indicada uma descrição da entrega, ex., "Marcadores de cor vermelha (1x) e azul (2x)"

(\*) fora do âmbito do protótipo"

## [Question 8](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25047)

> O nome do edifício tem limitações como, por exemplo, tem de ter uma letra e números? E para além do nome do edifício, que mais informação deve ser guardada sobre o edifício.

#### Resposta

"ver (https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25016#p31679)

o código do edificio é obrigatório, no máximo 5 caracteres, letras e digitos, podendo conter espaços no meio
o nome do edificio é opcional, no máximo 50 caracteres alfanuméricos"

## [Question 9](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25049)

> Todas as tarefas podem ser começadas no momento em que são aceites. No entanto, atividades como "Pedir de manhã uma caneta para a 1a aula da tarde" ou então "Vigilância à noite das 20:00 às 22:00" ou até "Vigilância todas as noites entre as 20:00 e as 22:00" seriam possíveis?

#### Resposta

" de momento não é possivel requisitar tarefas para um dia e hora"

## [Question 10](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25050)

> relativamente aos robots, qual o elemento que identifica um robot?
>
> Podemos atribuir um ID ao mesmo? Se sim, alguma especificação para o mesmo?
>
> Difere caso seja robIsep ou droneisep?

#### Resposta

"cada Robot possui um número de série do fabricante e que deve ser registado quando se cria o robot no sistema. cada robot é identificado por um código e um nickname atribuidos pelo administrador. Por exemplo, um robot da marca X com número de série 1234567 tem o código "picker-0001" e o nickname "Robert" enquanto um outro robot da marca Y com número de série 456789 tem o código "sec-A-001" e o nickname "Jason""

> O número de série será único para cada robot ou será comum para o mesmo tipo de robots?

"o número de série é único para cada robot da mesma marca"

## [Question 11](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25046)

> Dentro do ficheiro RFP-LAPR5-2023-2024, este excerto está presente:
>
> Elevadores de cada piso e sua localização na grelha do mapa:
>
> • (a, a1, elevador(2, 8, oeste))
>
> • …
>
> Passagens entre piso e sua localização na grelha do mapa:
>
> • (a, j, a1, j2, passagem(5, 8, oeste))
>
> • (a, h, a1, h2, passagem(2, 0, oeste))
>
> • …
>
> São representados os elevadores e as passagens, respetivamente, e dentro de "elevador(...)" ou "passagem(...)" estão indicadas as coordenadas mais a Norte das duas células onde o elevador e as passagens estão presentes (pois estão encostadas lateralmente).
>
> O elevador e/ou a passagem têm 2 espaços na grelha sempre (no caso de ter o atributo oeste, assumir que há mais uma célula a baixo, e com o atributo norte, assumir que há mais uma célula à direita) ou teremos que mencionar a existência de uma segunda célula numa nova descrição (como, no caso dos elevadores, (a, a1, elevador(2, 8, oeste)) e (a, a1, elevador(3, 8, oeste)))?

#### Resposta

"como indicado no RFP, essa informação é uma representação conceptual sobre o tipo de informação que será necessário lidar no âmbito do sistema. podem livremente decidir como implementar tecnicamente essa representação. de um ponto de vista de requisitos o importante é que o utilizador possa definir a localização da passagem ou do elevador pelo que ambas as opções são viaveis. No futuro existirá um editor visual de mapas que esconderá do utilizador toda essa manipulação de informação. de momento podem optar por assumir que as passagens e os elevadores ocupam sempre duas células e que apenas é necessário indicar a célula de "topo" dessas duas"

## [Question 12](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25048)

> É visível na grelha do ficheiro RFP-LAPR5-2023-2024, página 3, que a porta da sala A109 encontra-se na célula do canto da sala e, para que um robô possa entrar numa célula dentro da sala, é necessário mover-se em diagonal para que não entre numa célula de parede. Como tal, é de assumir que o robô se mova em diagonal num geral, ou seja, no seu caminho para alguma sala, ou apenas seria de esperar nesta entrada?

#### Resposta

"não sei se compreendi a questão...
o robot desloca-se movendo-se de uma célula para a outra ortogonalmente. ou seja pode deslocar-se para a célula a norte, sul, este ou oeste da célula atual (supondo que não existem paredes)
no mapa exemplo indicado no RFP, o robot pode perfeitamente fazer o percurso da passagem H2 para a sala A109 da seguinte forma (exemplo):

    entra pela passagem H2, ou seja está na célula 6, 7
    desloca-se para oeste para a célula 6, 6
    desloca-se para norte para a célula 5,6
    desloca-se para norte para a célula 4,6
    entra na sala A109, deslocando-se para a célula 4,5

"

## [Question 13](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25051)

> A minha dúvida prende-se com o propósito do carregamento de um mapa de piso.
>
> Quando nos referimos a um mapa de um determinado piso de um edifício, qual é, precisamente, o objetivo desse carregamento? Adicionar informações novas a esse piso?
>
> Por exemplo, se considerarmos a situação em que temos um edifício A criado, ao carregar um mapa de piso é suposto criar o piso se ele não existir e adicionar as respetivas salas presentes nesse mapa?

#### Resposta

"o edificio e o piso já devem estar criados. a funcionalidade de carregamento do mapa é complementar a esses dois requisitos e permite fazer o upload da planta (mapa) do piso para a posterior visualização"

### [Question 13.1](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25051)

> Seria possível ser mais específico quando refere "mapa é complementar a esses dois requisitos"? Sinto que não compreendi a 100%.

#### Resposta

"indica que são requisitos independentes mas que para o sistema funcionar toda a informação deve estar presente já que a informação que cada requisito refere é necessária para o sistema funcionar"

## [Question 14](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25016)

> Será possível esclarecer como funcionarão estas user stories? Com a 230 (Carregar mapa do piso) o nosso entendimento foi que as células seriam carregadas já com a criação de salas e pisos, e assim sendo não faria sentido as outras duas user stories, onde é pedido para criar um piso de um edifício e uma sala. Não entendemos o que é pretendido com as us's 190 e 310.

#### Resposta

"

- o requisito 150 Criar edificio permite criar um edificio, exemplo, edificio "B", com um nome opcional e com uma breve descrição (ex., "departamento de engenharia informática") indicando a dimensão máxima de cada piso em termos de células (ex., 10 x 10)

- o requisito 190 Criar piso permite definir um piso para um dos edificios criados anteriormente, por exemplo, o piso 1 do edificio B com uma breve descrição (ex., "salas TP")
- o requisito 230 Carregar mapa de piso permite ao utilizador fazer upload de um ficheiro descrevendo o mapa de um dado piso. esse ficheiro deve ser validado se tem a estrutura correta e se obedece ao tamanho máximo definido aquando da criação do edificio
- o requisito 310 Criar sala permite definir um sala num dado piso de um edificio, exemplo sala "B310" no 3º piso do edificio B, com uma categorização dessa sala (Gabinete, Anfiteatro, Laboratório, Outro) e uma breve descrição, ex., "Laboratório de Engenharia de Qualidade"
  "

### [Question 14.1](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25016)

> Em relação ao requisito 310, para além do que foi dito, devem também ser especificadas as dimensões e posições das salas dentro do piso? Isso ajudaria a evitar a sobreposição de salas com elevadores e até mesmo com outras salas.

#### Resposta

"essa informação é necessária para o sistema como indicado no RFP. pode ser recolhida ao criar a sala no requisito 310 ou pode fazer parte do ficheiro que é carregado no requisito 230"

## [Question 15](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25052)

> Gostaria de saber se quando uma sala e criada o mapa do piso deve ser alterado para adicionar está sala e por sua vez quando é carregado um mapa no sistema se as salas do piso devem ser alteradas (por exemplo se o mapa carregado tiver apenas 3 salas e o piso anteriormente tinha 4)

#### Resposta

"no futuro existirá um editor de pisos que garantirá toda a consistência de informação. de momento não necessitam fazer tratamento adicional e podem assumir que o utilizador (ou o futuro editor) introduz essa informação de forma coerente"

## [Question 16](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25070)

> Segundo o que já foi respondido no forum para carregar o mapa é necessário que já exista o edifício e o piso. Será necessário também ter os elevadores, as salas e as passagens já criadas?.
> Assim dessa forma existiria um ficheiro só com as dimensões para a grelha.
>
> Algo do genero:
> {
> "floorId":"1",
> "walls":[
>
>      {
>         "positionX":0,
>         "positionY":0,
>         "direction":"Oeste"
>      },
>      {
>         "positionX":0,
>         "positionY":1,
>         "direction":"Oeste"
>     }
>
> ], (...)

#### Resposta

"sim, é necessário que essa informação já esteja presente no sistema. quanto ao formato do mapa, será fornecido um projeto exemplo em SGRAI para desenho de labirintos que podme utilizar como base para o módulo de visualização. poderão adaptar o código e o formato de mapa de acordo com o que acharem mais adequado aos requisitos e às vossas decisões de design."

### End of Sprint 1

_LAST UPDATE: 11/10/2023 12:38H_
