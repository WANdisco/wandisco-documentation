---
id: d
title: D
sidebar_label: D
---

## Data Transfer Object (DTO)
An object which transfers data between software application subsystems.

## DConE
WANdisco’s Distributed Coordinated Engine, the software engine underlying replication.
[Read the Whitepaper on our DConE technology](https://www.wandisco.com/resource-library/white-papers/scm/the-distribution-coordination).

## Deterministic State Machine (DSM)
An object whose principle job is obtaining agreements on the ordering of proposals as part of the DConE engine. Each DSM will have a group of nodes assigned to it, compromising of at least two Zones. Each node can have one or more of the Paxos roles (Proposer, Acceptor, Learner).

## Distinguished Name (DN)
Used for unique identification in LDAP.

## Distinguished Node
The distinguished node is used in situations where there is an even number of nodes, a configuration that introduces the risk of a tied vote. The Distinguished Node’s bigger vote ensures that it is not possible for a vote to become tied (also known as a Tiebreaker).
