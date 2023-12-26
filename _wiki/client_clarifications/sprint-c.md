# Client Clarifications

This document is a collection of clarifications for the third sprint. The doubts are synthesized for easier reading.

---

## [Question 1](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26296)

### US490

> Em relação a esta US, nós estamos com umas dúvidas em relação ao que o cliente considera um tipo de dispositivo, por exemplo, seria robots e drones ou tipos especificos de robots?

### Answer

"considerar "tipo de robot"

## [Question 2](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25545)

### US850

> O que é que é pretendido por "a gestão dos ficheiros resultantes desse backup" no contexto desta US??

### Answer

"O texto completo da US é :"Como administrador de sistemas quero que utilizando o Backup elaborado na US 840, seja criado um script quer faça a gestão dos ficheiros resultantes desse backup, no seguinte calendário. 1 Backup por mês no último ano, 1 backup por semana no último mês, 1 backup por dia na última semana". Na US 840 são realizadas cópias de segurança de acordo com um dado critério. Com "gestão" pretende-se a eliminação dos backups que não obedeçam aos princípios enunciados.
"

## [Question 3](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26304)

### US480

> Queria esclarecer nesta US se o pretendido é consultar as requisições de tarefas que ainda não foram aprovadas, nem recusadas (ou seja, apresentar só as "pendentes"). Ou se seria pretendido consultar as tarefas "pendentes" + as tarefas recusadas.?

### Answer

"pretende-se a listagem das requisições pendentes de decisão. Nessa mesma listagem deve existir um botão que permita aprovar ou recusar cada requisição"

> Só para esclarecer, a parte de ter um botão para aprovar ou recusar cada requisição seria feita pelo meu colega de grupo que está responsável pela US470, certo?

### Answer

"a organização do trabalho é algo da responsabilidade da equipa. a regra geral é "todos fazemos o que for preciso para o projeto ter sucesso".
essas duas user stories devem ser trabalhadas em conjunto já que existe uma dependencia entre elas. se as atribuiram a pessoas diferentes da equipa é fundamental que façam a ánalise e design em conjunto tendo em conta essa dependencia
"

## [Question 4](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26357)

### US110

> Gostaria de saber como a cópia dos dados pessoais deve ser feita?

### Answer

"deve ser gerado um ficheiro json com a informação que o sistema guardou sobre a pessoa."

## [Question 5](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26405)

### US10/US20

> Que dados são necessários para a criação/registo de um utilizador, para além do seu Role?

### Answer

"criação de utilizadores e registo de utilizadores são dois casos de uso diferentes e com necessidades distintas.

a criação de utilizadores serve para os administradores de sistema criarem os diversos utilizadores de backoffice do sistema num dos papeis designados, ex., gestor de campus, gestor de frota, gestor de tarefas

o registo de utentes serve para o registo de utilizadores com o papel utente

em ambos os casos será necessário obter nome, email e telefone.

no registo de utentes deve adicionalmente ser recolhido o número de contribuinte para faturação de serviços

apenas serão aceites emails da organização, ex., isep.ipp.pt.

NOTA: a parametrização do dominio de email aceite deve ser mantida fora do código fonte do projeto, ex., ficheiro de propriedades ou variavel de ambiente."

## [Question 6](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25575)

### ID10 - ID80

> Our group has questions about USs 10 and 80. What is meant by creating a user with permissions and why would you create a user when a user can sign up (having selected his role) and administrator needs to approve the sign up?

### Answer

"user registration is for the students/employees of the university to use the system as a "utente"

user creation is for the administrator to create new backoffice users, e.g., campus manager, fleet manager
"

## [Question 7](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25575)

### US10/US20/US80 - Atribuição do Role ao Utilizador

> Como pretende que a atribuição de um Role seja feito?
>
> 1.  Durante o registo do utente pelo Administrator (US10)
>
> 2.  Durante o registo do utente pelo próprio utente (US20)
>
> 3.  Durante a aprovação do registo do utente pelo Administrator (US80)

### Answer

"o administrador atribui o papel na criação de utilizadores.

os utilizadores que utilizem a funcionalidade de registo serão sempre do tipo "utente"
"

## [Question 8](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26421)

### US460

> Gostaríamos de saber se pretende que fique registado qual foi o utente que requisitou a tarefa.

### Answer

" sim. o requerente é uma informação importante a manter."

## [Question 9](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25889)

### US10 Password do utilizador criado

> No desenvolvimento da US10 surgiu uma questão em relação à password do utilizador criado. Esta password deve ser gerada automaticamente? Se sim, que requisitos considera para uma password segura e como deve ser a password gerada?

### Answer

"de momento a password inicial deve ser introduzida pelo administrador quando cria a conta. a politica de passwords é a seguinte:

- minimo 10 caracteres
- pelo menos 1 letra maiuscula
- pelo menos 1 letra minuscula
- pelo menos 1 digito
- pelo menos 1 simbolo

Nota: as funcionlidades de autenticação e autorização num sistema real serão bem mais complexas do que as abarcadas aqui no projeto em termos académicos. Neste âmbito pretende-se apenas um mecanismo básico de utilizadores e o principal foco está nas componentes relacionadas com os dados pessoais para os utilizaodres do tipo "utente" "

## [Question 10](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25892)

### US920 - Pasta partilhada pública (SMB/CIFS)

> A pasta pública CIFS/SMB que pretende que seja criada, deverá ser de leitura apenas, ou pretende que os utilizadores (presume-se que qualquer pessoa não administrativa) possa aceder e escrever novos conteúdos na pasta?

### Answer

"A US é (propositadamente) omissa nesse ponto. O que imaginam que será colocado na pasta partilhada? Instruções de funcionamento do jogo e/ou da aplicação, ou algo similar (avisos aos utilizadores registados, etc.)? Se sim, deverá ser apenas de escrita."

## [Question 11](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25892)

### US900 - clustering system

> Could you clarify the purpose of the clustering system US900 requirement?

### Answer

"It seems to me that if SPA fails, everything fails, as users will no longer be able to access the user interface.
As so, clustering must be configured to avoid that SPOF. It can be in failover or load balancing, however some clustering method should be deployed."

## [Question 12](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25892)

### US500/1410/1430 - task execution planning

> Based on what data/criteria (of a request) should the execution sequence of approved tasks be made? What is the priority to place some task ahead of another one? Should it be more sophisticated than executing approved (and assigned to a robot) requests in requesting order (first come first served)?

### Answer

"according to what is stated in requirement 1410: "seja gerado um plano de atendimento das tarefas indicadas que indique uma sequência de execução das tarefas que seja criada através da geração de todas as sequências e escolha da que durar menos tempo.", that is, the sequence that takes the least amount of time to execute.

You can consider average times to calculate the duration of a request execution, for instance:

    move from one cell to another cell
    traverse a passage from one building to another
    use the elevator from one floor to an adjacent one
    pickup an object
    deliver an object

for simplicity you might assume a standard time for:

    pickup and delivery in the same building/floor
    pickup and delivery in the same building, different floor
    pickup and delivery in different buildings
    surveillance of a floor

all assumptions and simplifications must be properly identified, justified and explained.

There are currently no priority request. all request of the same type should be considered with equal priority
"

## [Question 13](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25892)

### US910 - certificate

> By "access to the virtual machine, only through a certificate", do you mean utilizing SSH Key Pair or something else?

### Answer

"Yes, the SSH Key Pair"

## [Question 14](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25892)

### US60

> A US60 pede que especifiquemos ao utilizador por quanto tempo os seus dados seram conservados, como tal, gostaria de saber oq acharia melhor das seguintes opções ou se prefere uma diferente das seguintes:
>
> 1. Os dados são conservados até acabar um periodo de tempo especificado.
> 2. Os dados são conservados até que o user seja removido da app.
> 3. Os dados são conservados até acabar um periodo de tempo especificado, após o user ser removido da app.

### Answer

"atento os princípios da finalidade e da limitação da conservação a solução mais correta parece-me «2. Os dados são conservados até que o user seja removido da app.», sendo certo que deverá ser condição essencial à qualidade de user a vinculação funcional ao ISEP."

## [Question 15](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26441)

### US10 - Identificação do utilizador

> No contexto da criação de utilizadores, desejo entender como posso identificar e distinguir um utilizador dos demais utilizadores.

### Answer

"o email será o username que identifica cada utilizador"

## [Question 16](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26394)

### US609

> Gostaria de saber como é que o percurso automatico se procede. É o utilizador que chega ao módulo de visualização 3D e escolhe um ponto inicial e depois um final e o robot percorre esse percurso, ou é através de uma tarefa que já foi aceite e o utilizador quer ver o percurso dessa tarefa?

### Answer

"a partir da US 500 "consultar plano de execução" o utilizador poderá ver a sequencia de tarefas a executar, por exemplo numa tabela. em cada linha dessa tabela deve existir uma ação que permita saltar para o módulo de visualização 3D e ver a animação do percurso relativo à tarefa selecionada."

> Is the animation of the route something like a "preview" of the route that a robot would take (can be replayed as many times as wanted), or is it a live representation of a robot's task progress / current position (data that would need to be calculated and kept track of in the backend)?

### Answer

"the animation is a preview of the route the robot will execute"

## [Question 17](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26451)

### US750 - Como arquiteto da solução pretendo a utilização de um módulo de IAM (ex., Azure, auth0, Google, Linkedin) para gestão de identidades e permissões (role-based)

> Quem é que pode fazer login através de um IAM? Apenas os utentos ou os utilizadores de back-office?
>
> Como é que estes utilizadores devem ser registados na aplicação?

### Answer

"antes de mais recordo que este requisito é um requisito de baixa prioridade.
a utilização de uma sistema de IAM é primariamente para os utentes mas pode ser utilizado para todos os utilizaodres do sistema. em relação à criação/registo de utilizadores, consultar as respostas anteriores no forum."

## [Question 18](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26358)

### US460 - Requisitar tarefa

> Na tarefa de Supervision deve ser indicado um contacto para o qual deve ser enviada uma mensagem em caso de necessidade. Este contacto pode/deve ser o do utente que faz a requisição da tarefa? Por exemplo, se um segurança pedir esta tarefa, e em caso de necessidade de contacto, o robot contacta o mesmo segurança que foi quem fez o pedido e é quem deve obter informações acerca da tarefa.
>
> A mesma questão aplica-se à tarefa de Pickup & Delivery onde o contacto de pickup pode/deve ser o do utilizador que faz a requisição da tarefa, passando apenas o contacto de delivery.

### Answer

"o utilizador pode introduzir um contacto que não o dele. exemplo, o docente ABC requista a recolha de uma caneta na secretaria do departamento indicando o contacto de XYZ para entrega na sala de aula XXX ao docente ASD.

de um ponto de vista de usabilidade, será interessante se permitirem ter esses campos pré-preenchidos com os dados do utilizador requisitante."

> O contacto indicado pelo utilizador deve ser o e-mail ou número de telemóvel?

### Answer

"na requisição de uma tarefa será necessário indicar um contacto de "pickup" e um contacto de "delivery" (nome e número de telefone)."

## [Question 19](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26478)

### US930 - automatizar a reposição dos backups

> "Como administrador de sistemas temos de garantir que em caso de necessidade os backups foram efetuados corretamente. Para isso devemos automatizar a sua reposição, validando no final o funcionamento do sistema (Ex. Base de Dados - executar uma query SQL com sucesso após reposição)."
>
> Caro cliente,
>
> O que se pretende em concreto neste requisito? é relativo à US840? O objetivo é comparar o backup com a base de dados?

### Answer

"Não exclusivamente. A menção à DB é apresentada como um exemplo. O pretendido é definir um procedimento para validar que em caso de necessidade de reposição não se obtém a surpresa desagradável de verificar que o backup não foi realizado com sucesso.
Como exemplo - aliás, apresentado como tal na US - repor a DB ou parte dela para outro local e validar se os dados estão conformes. Claro que há outros métodos, como faz para verificar se o backup dos seus dados foi feito com sucesso?"

## [Question 20](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26474)

### Número Telefone | Número Contribuinte

> O formato do número de telefone e número de contribuinte, deve ser o português? Caso contrário, quais os outros formatos a serem aceites?

### Answer

" número de telefone e contrinuinte portugueses"

## [Question 21](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26328)

### [US610] Feedback visual adequado na mudança de uma passagem

> Venho por este meio questionar o que o cliente entende por feedback visual adequado ao fazer a mudança entre passagens.

### Answer

"dealmente, quando o robot está a movimentar-se de um piso para outro através de uma passagem, a cena visualizada deve ser o corredor de passagem. Ou seja, quando se movimenta num piso visualizam/"desenham" o piso, ao aproximar-se de uma passagem, visualizam/"desenham a passagem, ao aproximar-se do "fim" da passagem e entrar noutro piso, visualizam/"desenham esse piso.

É também aceitavel uma versão mais simples que faça aparecer uma "pop up" de alerta ao utilizador indicando que está a transitar de um piso para outro edificio. quando o utilizador fechar o alerta, visualizam/"desenham" o novo piso.

Quer num caso, quer noutro, sempre que se deslocam de um edifico/piso para outro, os respetivos controlos de UI devem ser atualizados, permitindo assim ao utilizador saber que ediifcio e piso está presentemente a visualizar.  
"

> Relativamente à [US 611] "A utilização de elevadores deve ter feedback visual adequado", não parece viável a ideia apresentada para a [US610] sendo que pop up já estaria incluido na questão da seleção do piso. O que seria, desta forma, o feedback visual expectável na utilização de elevadores?

### Answer

"a pop up a perguntar qual o piso de destino é um feedback adequado, no entanto podem extender esse feedback mostrando uma animação do elevador em movimento para se deslocar para o piso de destino."

## [Question 22](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26477)

### US 20/100/750

> O cliente em uma outra resposta relativamente às US 10 e 20 disse que para o registo de utentes, seriam necessarios o nome, email, telefone e numero de contribuinte. Então nós estamos na duvida como seria integrada a US 750 com a US 20 e 100.
>
> Nós pensamos em um registo por passos, basicamente o utente primeiramente se registaria com a sua conta google, por exemplo, e depois apareceria um form para completar o registo, onde então iria pedir os restantes dados mencionados.
>
> Gostavamos de saber a sua opinião/sugestão em relação a isto.

### Answer

"no caso de usarem um fornecedor de IAM, ex., google, no registo de utentes, podem faze-lo por passos inciando pela autenticação no IAM e posteriormente pela recolha dos dados mencionados
"

## [Question 23](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26414)

### US890

> Relativamente à US890 é pedido para "...implementar uma gestão de acessos que satisfaça os critérios apropriados de segurança", queria pedir informação sobre quais os critérios apropriados a ter em conta.

### Answer

"Há tipos diferentes de utilizadores, pertencentes a grupos distintos. Cada grupo terá inerentemente um critério de segurança (tríade CIA) diferente, por certo - ainda que alguns possam ser iguais ou similares.
Deve implementar os mecanismos apropriados para assegurar os critérios para cada utilizador/grupo."

> Quando refere gestão de acessos, é exatamente ao quê? A uma pasta? A um módulo da aplicação? Por exemplo, o administrador tem acesso a todos os módulos enquanto que o Gestor de Campus tem acesso somente ao módulo de Gestão de Campus?

### Answer

"A gestão de acessos é aos componentes do UI, pastas, dados, etc.. Também é para os clientes internos (colaboradores) que possuem credenciais locais.
Como planeiam criar a ligação à(s) base(s) de dados? Sempre com as mesmas credenciais que tudo permitem ou credenciais diferentes? Como planeiam controlar e monitorizar os acessos internos às pastas e informação on store?"

## [Question 24](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26500)

### US920

> "...agilização entre as várias equipas,seja criada uma partilha pública de ficheiro..."
> Poderia esclarecer que equipas são estas a que se refere?

### Answer

"Mas a organização não tem vários tipos de equipas? Deve haver uma equipa de desenvolvimento, uma outra de gestão da base de dados, outra ainda para helpdesk, etc."

## [Question 25](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26467)

### US460

> Relativamente ao 'Código de Confirmação', mencionado em https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25045#p31683, gostava de perceber se este código segue algum formato específico. Além disso, o código será introduzido pelo utilizador que está a requisitar a tarefa, ou deverá ser gerado automaticamente pelo sistema?

### Answer

"o código de confirmação é introduzido pelo requisitante. é um número entre 4 e 6 digitos"

> Gostávamos de saber se a descrição de entrega deve ter algum limite de caracteres?

### Answer

"para a descrição devem limitar a 1000 caracteres alfanumericos"

## [Question 26](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26511)

### US1320 - Validações de permissões pelos serviços do backend

> Na US1320 é pedido para que todos os serviços do backend validem as permissões do utilizador para determinada operação.
>
> Gostaria de saber se o cliente já tem uma lista de permissões/cargos definidos (ex.: gestor de campus; gestor de frota; etc...) e quais as ações que são permitidas por cada permissão/cargo.
> Gostaria também de saber quais as ações que são permitidas a todos os utilizadores, independentemente do cargo.

### Answer

"os requisitos indicam qual o tipo de utilizador que tem acesso a essa funcionalidade, ex., "como gestor de tarefas pretendo ..."
se existirem situações em que tal informação não é indicada, coloquem aqui explicitamente qual o requisito em causa
"

## [Question 27](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26504)

### US_1430 - Posição inicial dos robots

> Como é obtida a posição inicial para os robots na execução de tarefas?

### Answer

"Cada robot deve saber qual a sua posição "atual" definida pelas coordenadas de uma célula num dado piso de um edificio.
Por simplificação podem assumir que cada robot tem uma "posição base" à qual volta antes da execução das tarefas requisitadas.
Idealmente, quando se regista um robot deve ser possivel indicar qual a sua posição base, no entanto é aceitavel para efeitos de protótipo que essa informação esteja apenas presente nos dados e não exista user interface para a sua introdução."

## [Question 28](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26523)

### Us 1310 e Us 1320

> Será que podia especificar melhor o momento em que deve ser feita a verificação das autorizações? Deve ser feita no momento do login onde será demonstrado o menu de acordo com o utilizador (com a us 1300), ou deve ser feita apenas no backend?

### Answer

"no momento de login deve ser verificado se o utilizador tem acesso à aplicação. em caso afirmativo o menu de opções deve ser ajustado às suas permissões.
por uma questão de segurança, todas as operações de serviços devem novamente validar se o pedido é efetuado por um utilizador com permissões para executar essa operação.
"

## [Question 29](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26458)

### Varias questoes

> Gostariamos de colocar algumas questões relativamente aos resquisitos do cliente, assim como colocar uma questão técnica que, até ao momento, ainda não obtivemos qualquer informação.
>
> Questões ao cliente:
> US460 - Quando se refere a "tarefa pretendida" está a referir-se ao tipo de tarefa (entrega ou vigilância)?
>
> US470 - O termo requisição referere-se à tarefa em si, tendo cada requisição uma única tarefa?
>
> US490 - O que é entendido por "tipo de dispositivo"?
>
> Questão técnia:
>
> Atualmente ainda não recebemos qualquer indicação de como é que o modulo de tarefas deve ser construiudo.
> Alguns grupos estão a continuar na solução já iniciada para os outros modulos, outros grupos estão a inicair uma solução nova (na mesma tecnologia) e há ainda quem esteja a inicar a solução em C# .NET com base de dados relacional. Há efetivamente alguma indicação neste sentido?

### Answer

"460 - este requisito é relativo à requisição de uma tarefa, essa tarefa deve indicar qual o tipo de tarefa a executar

470 - este requisito é a aprovação/recusa de uma requisição. no caso de ser aprovada, "transforma-se" numa tarefa que o robot terá que executar

490 - tipo de dispositivo = tipo de robot

em relação à questão técnica deverão tomar a decisão internamente tendo em conta os critérios de avaliação de ARQSI

Em relação à questão técnica, reforço a recomendação anterior: considerem os critérios de avaliação de ARQSI.
Saliento ainda que os critérios de avaliação de ARQSI são definidos como forma de aferir/avaliar as competências dos estudantes, nomeadamente de design arquitetural, considerando os requisitos e as restrições definidas no projeto, bem como as boas práticas, estilos e padrões lecionados na UC e no curso.
Assim, sugiro que analisem e concebam designs alternativos, e selecionem (justificando) aquele que consideram melhor responder a essas dimensões.

"

## [Question 30](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26533)

### US120/US840/US850/US870

> Perante o caso de uso 120, que sugere o apagamento dos dados do utilizador, existe um possível conflito com os casos de uso 840, 850 e 870 (relacionados com backups). Sendo que é necessário persistir 1 backup por mês no último ano, 1 backup por semana no último mês e backup por dia na última semana, como seria a abordagem desejada para tratar os backups que contêm informações de utilizadores que já solicitaram o apagamento dos seus dados.

### Answer

"
Essa é uma excelente questão.
Poderão propor uma metodologia para em caso de reposição de um backup validar os pedidos de apagamento que surgiram entretanto."

## [Question 31](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26541)

### US30 Dar o meu consentimento ou não à recolha e tratamento dos meus dados pessoais

> O que sucede caso o utente não consinta com a recolha e tratamento dos seus dados? Ficará impossibilitado de se registar?

### Answer

"se os consentimentos não forem dados, não será posisvel continuar o registo"

## [Question 32](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26576)

### US480

> Neste requisito, o que é considerada uma requisição ainda não aprovada? As requisições recusadas também contam como ainda não aprovadas ou apenas as requisições pendentes de aprovação/recusacão;

### Answer

"esta opção deve mostrar ao utilizador as requisções que ainda não tiveram qualquer tipo de decisão: aprovação/recusa"

## [Question 33](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26552)

### US490

> Neste requisito é suposto o utilizador filtrar uma lista de requisições de tarefas ou apenas escolher o tipo de listagem (estado,tipo de dispositivo ou utente) que quer ver e mostrar lhe apenas isso.

### Answer

"na listagem resultante deve ser possivel filtrar os dados pelos atributos indicados. Esta opção mostra todas as requisições do sistema, incluindo de datas passadas pelo que deverá também ser possivel filtrar por data de requisição.

notem que o volume de dados pode ser muito grande pelo que devem avaliar tecnicamente como equilibrar este requisito funcional com a sua implementação tecnica. Por exemplo, ao fim de algum tempo o sistema poderá ter milhares (ou dezenas de milhares) de requisições. Embora seja aceitavel para efeitos de prototipo que existam limitações na vossa implementação, tais limitações devem ser devidamente e explicitamente documentadas bem como propostas de alternativas para contornar essas limitações."

## [Question 34](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26547)

### [US110] Cópia de segurança dos dados pessoais

> Em que formato deve ser adquirida a cópia de segurança dos dados pessoais?

### Answer

"
ver https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26357#p33451
"

## [Question 35](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26511)

### US1320 - Validações de permissões pelos serviços do backend

> Na US1320 é pedido para que todos os serviços do backend validem as permissões do utilizador para determinada operação.
>
> Gostaria de saber se o cliente já tem uma lista de permissões/cargos definidos (ex.: gestor de campus; gestor de frota; etc...) e quais as ações que são permitidas por cada permissão/cargo.
> Gostaria também de saber quais as ações que são permitidas a todos os utilizadores, independentemente do cargo.

### Answer

"os requisitos indicam qual o tipo de utilizador que tem acesso a essa funcionalidade, ex., "como gestor de tarefas pretendo ..."
se existirem situações em que tal informação não é indicada, coloquem aqui explicitamente qual o requisito em causa"

> O módulo de visualização 3D é para todos os utilizadores ou para algum em específico?

### Answer

"para os utilizadores do tipo gestor de campus, gestor de frota e gestor de tarefas"

## [Question 36](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26583)

### ID490

> To search for task requests by 'type of robot', at which point we should assign the robot type (or perhaps a robot?) to the task?

### Answer

"tasks are requested by users and approved by the task manager. the task manager will also trigger the planning module which will take the list of approved requests and generate the execution plan. The execution plan takes into account the robot fleet and as such the output of the planning module will be result in the assignment of task(s) to robot(s) in a sequence that minimizes the overall execution time"

## [Question 37](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26588)

### Autorização Utilizadores

> Existe uma questão referente ao acesso ao módulo de visualização 3D, que utilizadores têm permissão para aceder a este módulo? Por outro lado gostávamos de saber se um utilizador pode ter múltiplas roles.

### Answer

"https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26511#p33780

em relação a multiplos roles, nesta fase do projeto não é necessário suportar (será uma adição interessante para futuros sprints)"

## [Question 38](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26611)

### US110

> Relativamente à US110 - como utente do sistema pretendo uma cópia dos meus dos meus dados pessoais - devemos considerar o utente como qualquer utilizador do sistema ou só mesmo os utentes (aluno, docente, funcionario)?

### Answer

"apenas os utentes"

## [Question 39](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26653)

### US100 - Como utente do sistema pretendo retificar/alterar os meus dados

> Que dados pessoais é que o utente pode alterar?

### Answer

"todos à exceção do email que serve para identificar o cliente."

## [Question 40](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26639)

### US500

> Nesta US é pretendido que um Gestor de Tarefas consiga obter a sequência de execução das tarefas aprovadas. Em que é que consiste essa sequência de execução? É suposto mostrar uma lista com todas as tarefas aprovadas com alguma ordem específica?

### Answer

"esse requisito corresponde a obter o resultado do módulo de planeamento."

> Pode explicar de forma mais sucinta em que consiste a 𝘀𝗲𝗾𝘂𝗲̂𝗻𝗰𝗶𝗮 𝗱𝗲 𝗲𝘅𝗲𝗰𝘂𝗰̧𝗮̃𝗼 das tarefas aprovadas/𝗺𝗼́𝗱𝘂𝗹𝗼 𝗱𝗲 𝗽𝗹𝗮𝗻𝗲𝗮𝗺𝗲𝗻𝘁𝗼?

### Answer

módulo de planeamento é o módulo do sistema responsavel pelas funcionalidades de (i) calcular trajetos entre pontos, e (ii) calcular a melhor organização para os robots executarem as tarefas aprovadas.

concetualmente e de forma simplificada, a sequencia de execução vai ser:

t1 t2 t3 t4 t5 t6 t7 t8 t9 t10 t11 t12 t13 t14 t15 t16 t17 t18 t19
R1 Tk12 Tk12
R2 TK45 Tk45 TK45 Tk45 Tk389 Tk389
R3 Tk67 Tk110 Tk110 Tk34 Tk34

em que cada linha representa cada robot da frota e quais as tarefas que vai executar por ordem, e as colunas representam o tempo

## [Question 41](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26663)

### [20] - Como potencial utilizador do sistema pretendo registar-me no sistema.

> No âmbito desta US o objetivo é realizar o registo de um utente no sistema. Este registo irá criar um pedido de registo que, mais tarde será, ou não, aceite por um administrador de sistema.
>
> Em relação a este pedido de registo, para além da informação do utilizador em questão, que outra informação será relevante guardar? (ex: timestamp)

### Answer

"no caso do pedido de registo apenas a data do pedido. se de um ponto de vista tecnico entenderem necessário guardar outra informação não haverá problema.
no caso das aprovações/recusas dos pedidos de registo deve obviamente ser guardada informação sobre que utilizador e quando (data e hora) tomou a decisão"

## [Question 42](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26666)

### US10 - Como administrador pretendo criar um utilizador de sistema indicando as suas permissões

> Em relação a este requisito, podemos presumir que já houve consentimento por parte do utilizador que vai ser registado?

### Answer

"esta funcionalidade apenas permite criar utilizadores de tipo "não utente" para os funcionários da instituição pelo que a aplicação do RGPD e restantes questões de privacidade estão abrangidas pela relação laboral existente"

## [Question 43](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26695)

### US1410

> Relativamente ao caso de uso definido por "seja gerado um plano de atendimento das tarefas indicadas, que indique uma sequência de execução das tarefas, que seja criada através da geração de todas as sequências e escolha a que durar menos tempo.", que tipo de utilizador é designado para operar com esta funcionalidade?

### Answer

"gestor de tarefas"

## [Question 44](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26717)

### US470 / US480 / US490

> Queríamos esclarecer as diferenças entre US470, US480 e US490.
> Na US480 é pedido para consultar as requisições de tarefas ainda não aprovadas
> Na US490 é pedido para pesquisar as requisições de tarefas por estado, por tipo de dispositivo, ou utente.
> A partir desta informação, podem haver diferentes interpretações. Uma das interpretações possíveis é que a listagem da US490 engloba a listagem que precisa de ser desenvolvida na US480, já que na tabela da US490 é possível filtrar os requisitos de tarefas por tarefas ainda não aprovadas. Essa filtragem daria a tabela que é pedida na US480.
>
> Com base nesta resposta (https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26304#p33367) entendemos que irão haver duas tabelas. Uma exclusiva para aprovar ou reprovar tarefas que ainda não foram aprovadas, com os botões "aprovar" e "não aprovar" para cada tarefa, e outra apenas para listar e filtrar todas as tarefas e os vários conceitos relacionados.
>
> Pedíamos que esclarecesse o número de tabelas que pretende que existam, as suas diferenças, e quais permitem a aprovação ou reprovação das tarefas.

### Answer

"Sao duas opções distintas. Uma apenas para aprovar ou recusar as tarefas pendentes de decisão.
A outra opção é para consulta de todas as tarefas do sistema, inclusive histórico."

## [Question 45](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26718)

### US20 e sub US's

> Na Us de registo de um utente na aplicação deve ser apresentado a este a política de privacidade antes ou depois de ele preencher a sua informação? E caso o mesmo não a aceite como devo proceder, aviso que o registo não é possível sem aceitar a política de privacidade e retorno à home page ou pergunto se se quer registar de novo?

### Answer

"No formulário de registo deve ser pedida toda a informação e apresentada uma checkbox para aceitação da política de privacidade. No texto dessa checkbox deve existir um link para a política de privacidade.
O preenchimento da checkbox é obrigatório e se não for preenchido deve ser apresentada uma mensagem"

## [Question 46](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26722)

### US460 - Tarefa de vigilancia

> Foi-nos dito, no contexto de ALGAV (modulo de planeamento), que "Nas tarefas do tipo vigilância ou desinfeção os pontos iniciais e finais de cada tarefa estão sempre no mesmo corredor interno de um piso de um edifício". No entanto, numa resposta anterior "As tarefas de vigilância caracterizam-se por indicar qual o edifício e piso(s)" (https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25045#p31683).
>
> O que é expectável que aconteça?
>
> Podemos considerar a vigilância de vários pisos como tarefas diferentes?

### Answer

" Sim podem considerar as tarefas de vigilância apenas para um piso e o utilizador terá que criar uma requisição para cada piso."

## [Question 47](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26739)

### US609

> Gostaria de saber o que deverá acontecer após ser terminada a visualização da tarefa. Será exibida uma mensagem que chegou ao fim, ou deverá ficar a fazer a mesma tarefa em ciclo?

### Answer

"deverá ser mostrada uma mensagem e o módulo deve voltar ao modo de movimento interativo"

## [Question 48](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26767)

### US612

> Nesta US o pretendido é que apareça a tip flutuante quando o utilizador aponta o cursor do rato para o chão ou é quando este aponta o cursor do rato para a porta que dá acesso à sala, gabinete ou elevador? Além disso, queria saber se é necessário mostrar várias câmaras ao mesmo tempo e se é utilizado o mesmo método em qualquer câmara para exibir a tip flutuante.

### Answer

"a tooltip deve ser mostrada quando o cursor do rato aponta para a porta da sala/elevador. a tooltip deve aparecer no viewport ativo (mas não há problema se aparecer em todos os viewports em simultaneo). se mostrarem a tooltip em mais que um viewport, devem usar o mesmo método em todos"

> _LAST UPDATE: 26/12/2023 12:30H_
