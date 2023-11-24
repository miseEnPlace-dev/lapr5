# Client Clarifications

This document is a collection of clarifications for the first sprint. The doubts are synthesized for easier reading.

---

## [Question 1](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25544)

### US130 - Como administrador do sistema pretendo fazer upload do mapa do campus considerando edifícios e ligações interiores entre os mesmos para ser utilizado pelos robots

> Esta informação é suposto ser carregada onde? Os edificios devem ter alguma localização no mapa?

### Answer

"trata-se de um lapso na tabela. esse requisito não deve ser considerado, mas sim o requisito 1120"

## [Question 2](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25545)

### US535 - Como utilizador pretendo um menu que me permita aceder às funcionalidades de cada módulo

> O que é pretendido que aconteça?

### Answer

"a aplicação web a desenvolver deve ter um menu de opções que permitir aceder às várias funcionaldiades identificadas nos requisitos, ex:

gestão de campus

- adicionar edificio
- adicionar piso
- ...

gestão de frota

- adicionar robot
- ...

gestão e planeamento de tarefas

- obter percurso entre edificios
- ...
- análise de complexidade

Visualização 3D

- visualização interactiva
- animação de percurso
- ...

Administração de sistemas

- MBCO
- Estratégia de recuperaçãod e dados
- ...

Informação

- acerca de nós
- Relatório RGPD
- Politica de privacidade
- ..."

## [Question 3](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25692)

### US1120 - Como administrador do sistema pretendo fazer upload do mapa do campus considerando edifícios e ligações interiores entre os mesmos para ser utilizado pelos robots

> Que permissões os utilizadores registados no sistema devem ter para esta pasta?

### Answer

"Há liberdade para escolheram as permissões a atribuir na pasta pública. Recomendo contudo que seja apenas de leitura (excluindo os administradores) para poder no futuro incluir documentos (instruções, etc.) que se tornem necessárias."

## [Question 4](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25657)

### US300

> Hi, one elevator in one building involved some different floors or the concept of elevator is the space that occupe in a floor. I mean, should the atribute floor_ID be an array string because many floors belong to an elevator?

### Answer

"Please note that the question is phrased in a way that a typical customer would not understand it as it points towards technical questions and not requirements.

From a requirements perspective, an elevator serves several floors of a building. typically it will serve all floors of the building but that might not be the case for all elevators."

## [Question 5](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25821)

### US640

> Could you clarify the user story 640: ''As the system administrator I want the deployment of one of the RFP modules on a DEI VM to be systematic, validating in a scheduled manner with the test plan. '' (Como administrador do sistemaquero que o deployment de um dos módulos do RFP numa VM do DEI sejasistemático, validando de forma agendada com o plano de testes)

> Should I write request for proposal of one of the ‘modules’of RoboDroneGo project or some of our virtual machine? What is the meaning module?

### Answer

"You should implement a way of automatically deploying one of the RFP modules on a DEI VM (to which you have access, regardless of whether it is VCenter3 or the DEI private cloud), taking into account the remaining part of the US: should the deployment take place every day or only when there are changes to the module? Was the deployment successful?
By "module" you should understand as any other component of LAPR5, connected to ALGAV, ARQSI, SGRAI."

## [Question 6](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25575)

### US800/810

> Neste contexto, pretende-se que o sistema esteja operacional o máximo de tempo possível.

> Sendo assim, é aceite algum período de indisponibidade? Se sim, de quanto tempo? O sistema deverá apresentar funcionalidades parciais durante este período?

> Além disso, existe algum máximo de tempo que o sistema, após interromper/paralisar os serviços, deverá voltar a recuperar os dados?

### Answer

"Como descrito na US800 "quero que seja definido o MBCO (Minimum Business Continuity Objective) a propor aos stakeholders" o que implica que terá que definir as funcionalidades que lhe parecem mais importantes que sejam mantidas em caso de desastre.
As cópias de segurança (US810) são necessárias e podem implicar a inoperacionalidade da solução. A estratégia implementada nas cópias têm implicação no RPO e no WRT, pelo que terá de definir a mais apropriada.
Sim, é aceite algum tempo de indisponibilidade mas que terá de ser justificado e, claro, o menor possível."

## [Question 7](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25575)

### US800/810

> Pode indicar-nos qual a escala horária estabelecida para efeitos de utilização do sistema? É espectável que, para efeitos de backup, haja uma breve interrupção do serviço, no entanto, poderemos recorrer a qualquer período do dia para este efeito.

> Neste sentido, gostávamos de saber qual a altura mais favorável do dia para esta breve interrupção.

### Answer

"Atendendo aos termos e exemplo do RFP, quer o robisep quer o droneisep podem executar tarefas que não pressupõem ocupação humana (vigilância, limpeza, por exemplo). Já outras tarefas (buscar/entregar um item, por exemplo) pressupõem ocupação humana.
Deverá definir face ao tempo estimado de indisponibilidade do sistema a melhor altura para a breve interrupção face às funções planeadas para os dispositivos.
Em suma, é aceitável uma breve interrupção de serviço mas a altura da indisponibilidade deverá ser proposta por quem responde ao RFP."

## [Question 8](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25881)

### US650

> Relativamente à US650, onde refere que pretende que apenas os clientes da rede interna do DEI (cabo ou VPN) acedam, tem já alguma gama de IP's pré-definida, ou devemos extrapolar?

### Answer

"Sempre que nos ligamos à rede interna do DEI (cabo ou VPN) obtemos um endereço atribuído dinamicamente por DHCP. A gama de endereços IP são todos esses.
Duvido que tenha noção da gama completa, pelo que recomendo que para prova de conceito possa alterar o(s) endereço(s) a partir de um ficheiro de texto."

## [Question 9](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25889)

### 1120 - Carregar mapa de piso

> Sendo que este requisito corresponde a us 230 do sprintA, as observações de cada um dos requisitos não são correspondentes:

- us230 : PATCH

- us1120 : PUT/PATCH

> Deste modo, agradecia que esclarece-se esta discordância entre os dois requisitos

### Answer

"Deve-se usar o método mais adequado para a funcionalidade implementada."

## [Question 10](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25892)

### US1110

> No desenho da ui para a edição de um piso eu gostaria de saber se o cliente preferia selecionar o piso que pretende editar a partir de uma tabela com todos os edifícios criados na base de dados ou se preferia introduzir o numero do piso e o código do edifício a que o piso pertence para encontrar o piso que pretende editar e assim modificar os seus atributos.

### Answer

"deve ser possivel seleccionar (ex., dropdown, table) qual o edificio e posteriormente qual o piso que se pretende editar"

## [Question 11](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25265)

### US 360 Adicionar um novo robot à frota

> Os atributos do robot têm algum tipo de formatação/restrição?

### Answer

"código identificativo, obrigatório, alfanumerico, max 30 caracteres, único no sistema

nickname, obrigatório, obrigatório, alfanumerico, max 30 caracteres, único no sistema

tipo de robot, obrigatório

número de série, obrigatório, alfanumerico, max 50 caracteres, único para um dado tipo de robot

descrição, opcional, alfanumerico, max. 250 caracteres

ao criar um robot ele fica no estado ativo

Aparentemente alguns de vocês entenderam o facto de um código ser único no sistema como "o sistema gera esse código único". Se o cliente não disse que o código era gerado pelo sistema não o devem assumir como tal. Tal como tudo devem esclarecer com o cliente os requisitos e não assumir.

Por exemplo, neste caso de uso, todos os códigos são introduzidos pelo utilizador. nenhum dos códigos é gerado pelo sistema. ou seja. o utilizador irá introduzir:

código identificativo, ex., "A01"

nickname, ex., "Brian",

tipo de robot, selecionando da lista de tipos de robots existentes

número de série

opcionalmente, também introduzirá a descrição

Tenham cuidado se não fizeram este erro em relação a outros conceitos do sistema. validem sempre os vossos pressupostos com o cliente utilizando este forúm."

## [Question 12](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25940)

### Interface Gráfica

> Na interface gráfica, por exemplo para a criação de um elevador, qual o workflow que vai mais de encontro com o esperado pelo cliente?
> Workflow A:

1. Aceder ao modulo de gestão de campus

2. Aceder a um menu relativo a edifícios

3. Escolher o edifício em que quer adicionar o elevador

4. Inserir os dados & submeter

> Workflow B:

1. Aceder ao modulo de gestão de campus

2. Aceder a um menu relativo a edifícios

   Este menu contém uma listagem dos edifícios existentes no sistema

3. Selecionar um dos edifícios

   Ira carregar uma página com informações relativas ao edifício escolhido (em que se inclui os elevadores)

4. Selecionar uma opção de adicionar elevador ao edifício

5. Inserir os dados & submeter

> Isto, tendo em conta que um gestor de campus poder querer adicionar um edifício e, de seguida criar elevadores---ou até pisos---nesse edifício.
> Qual seria então o workflow mais ajustado as atividades do gestor de campus?

### Answer

"o workflow B é preferivel"

## [Question 13](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25915)

### Visualização 3D - Tamanho de uma célula

> Que elemento das plantas fornecidas devemos utilizar como referência para uma célula. O elevador, seria considerado uma célula, por exemplo?

### Answer

"em relação aos elevadores não há problema se considerarem a dimensão de uma célula. os corredores e as passagesn devem ter 2 células de largura"

## [Question 14](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25929)

### Dimensões dos edifícios

> Em relação às plantas fornecidas quais as dimensões dos edifícios a serem consideradas?

### Answer

"As dimensões dos edificos são as seguintes:

edificio A e B: 22 x 10 células
edificio C e D: 12 x 20 células

notem que o formato de mapas que vos foi fornecido no código exemplo "adiciona" uma linha e uma coluna extra à grelha do mapa"

## [Question 15](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26033)

### US1220 - Como gestor de Tarefas pretendo obter os caminhos entre dois edificos considerando um critério de otimização

> Sera necessário apresentar todos os caminhos possíveis? Ou apenas o caminho mais rápido? Devemos considerar o “custo” entre um ponto e o outro?
> Os pontos a serem considerados tem de ser significativos? Ou seja, o utilizador insere que o robô vai do Edifício A, piso 1, sala A101 para o Edifício B, piso 3 sala B301. Ou então vai de uma célula indicada para outra célula indicada?

### Answer

"o utilizador irá introduzir a sala de inicio e de fim do percurso que pretende obter.
na UI deve ser apresentado o melhor caminho encontrado de acordo com o critério de otimização "duração do percurso". Podem utilizar tempos médios fixos para contabilizar a deslocação do Robot.

Notem, que em termos do módulo de planeamento (de forma isolada) pode ser interessante conseguir saber todos os percursos possiveis entre esses dois pontos, por exemplo, para efeitos de debug."

## [Question 16](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26105)

### US601 - O formato base do mapa que descreve a planta de um piso de um edifício do campus (um ficheiro/piso/edifício) deve ser complementado com informação do módulo de gestão de campus: dimensão do piso, etc

> Para a realização desta US é necessário obter a informação do módulo de gestão de campus através de um pedido GET à base de dados ou deve ser adquirida de outro modo?

### Answer

"este requisito está intimamente ligado com os requisitos 700, 710 e 730. O módulo de visualização deve ler o mapa do piso que foi carregado no módulo web e complementar com a informação "em falta" (necessária) para o módulo funcionar corretamente. Tecnicamente podem escolher a forma que vos parecer mais adequada; devem justificar essa decisão na análise/design desse requisito."

## [Question 17](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26178)

### US820

> Pretende que a pasta seja visível através da UI ou através do próprio sistema operativo dos usuários?
> Quando se refere a todos os utilizadores registados no sistema, isto inclui os users, campus managers, fleet managers, task managers que são criados via sign up pela nossa solução ou apenas o users já registados nas maquinas?
> Ou pretende que a pasta seja de acesso publico apenas com permissões de leitura para o acesso geral, e apenas os managers (campus , fleet, task, system admins ou users registados nas maquinas) tenham de fazer login para terem as permissões de escrita e leitura?

### Answer

"Através da UI seria mais apelativo por nem todos saberão aceder vi sistema operativo, não concorda? Contudo, é aceitável que seja apenas nesta fase visível por sistema operativo.
Relativamente às permissões note que a US é (propositadamente) omissa sobre isso. O que imagina que o cliente irá colocar na pasta? Instruções (pasta só de leitura para utilizadores "normais", leitura e escrita para internos)? Ou algo diferente que implique que qualquer utilizador tenha permissões de escrita?
Apresente e implemente de acordo com o princípio que considerarem - o máximo que pode acontecer é o cliente dizer na reunião final "Ah, mas não era essa a minha ideia", tornando-se numa definição incorrecta das especificações da exclusiva responsabilidade do cliente."

---

_LAST UPDATE: 24/11/2023 13:45H_
