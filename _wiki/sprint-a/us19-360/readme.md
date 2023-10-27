# US 19 [360]

|              |                        |
| ------------ | ---------------------- |
| ID           | 19                     |
| Sprint       | A                      |
| Module       | 1.3 - Fleet Management |
| UC           | ARQSI                  |
| Observations | POST                   |

## 1. Requirements

> "As a Fleet Manager, I want to add a new robot with a given type, name, etc."

## 1.1. Client Clarifications

## [Question](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25265)

> Os atributos do robot têm algum tipo de formatação/restrição?

### Answer

"

- código identificativo, obrigatório, alfanumerico, max 30 caracteres, único no sistema

- nickname, obrigatório, obrigatório, alfanumerico, max 30 caracteres, único no sistema

- tipo de robot, obrigatório

- número de série, obrigatório, alfanumerico, max 50 caracteres, único para um dado tipo de robot

- descrição, opcional, alfanumerico, max. 250 caracteres"

## [Question](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25265)

> Ao criar um novo robo, qual o estado dele por defeito, isto é, ativo ou inativo?

### Answer

"ao criar um robot ele fica no estado ativo"

---

## 2. Analysis

### 2.1. Views

All the global views are available in the [views](../../views/readme.md) document.

The views presented here are the ones that are relevant to this user story.

#### Level 1

##### Processes

![Level 1 Processes View](views/level-1/assets/process-view.svg)

---

#### Level 2

##### Processes

![Level 2 Processes View](views/level-2/assets/process-view.svg)

---

#### Level 3

##### Processes

![Level 3 Processes View](views/level-3/assets/process-view.svg)
