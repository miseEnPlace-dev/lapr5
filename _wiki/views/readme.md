# Views

This document details all the global architectural views of the system.

This views can be used as a foundation to understand the system from a global perspective.

## Level 1

### Logical View

![Level 1 Logical View](level-1/assets/logical-view.svg)

## Level 2

### Logical View

![Level 2 Logical View](level-2/logic-view/assets/logical-view.svg)

### Physical View

For now, there are no specific constraints on the physical view. Bare in mind that this is just one possible implementation. This representation will likely change in the future.

#### Development Environment

In this environment, all the services are running on the same machine. This is the default environment for development.

The database is running on a docker container. The `docker-compose.yml` file is located in the root of the project.

![Dev Level 2 Physical View](level-2/physical-view/assets/dev-physical-view.svg)

#### Production Environment

In this environment, the services are running on different machines, this way we can scale the services independently.

Note that, as mentioned earlier, this is just one possible implementation and there are no specific constraints on the physical view for now.

![Prod Level 2 Physical View](level-2/physical-view/assets/prod-physical-view.svg)

### Implementation View

![Level 2 Implementation View](level-2/implementation-view/assets/implementation-view.svg)

## Level 3

### Logical View

![Level 3 Logical View](level-3/logical-view/assets/logical-view.svg)

### Implementation View

![Level 3 Implementation View](level-3/implementation-view/assets/implemantation-view.svg)

## Use Case Diagram

### Sprint A

![Sprint A Use Case Diagram](assets/ucd-sprint-a.svg)
