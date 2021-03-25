---
id: s
title: S
sidebar_label: S
---

## SHA1
Secure Hash Algorithm 1. This is a 160-bit hash value normally rendered as a 40 digit hexadecimal number. Although originally developed for security purposes, SHA1 is used to ensure data hasn’t changed, for example due to accidental corruption.

## Sideline
A sidelined repository replica is a replica that will no longer get updates from other replicas in the family. The other replicas will not preserve operations for a sidelined replica thereby preventing them from running out of memory. Replicas become sidelined if they are out of communication for an extended amount of time and the number of outstanding agreements exceeds a tunable maximum. Sidelined replicas can be brought back into normal operation via a repair procedure.

## Site
A physical location containing computers where one or more WANdisco replicated products are installed.

## Source
The cluster the data originates from, this is normally on premises but does not have to be. It can also be referred to as the donor.

## SSH
Secure Shell (SSH) is a means of getting secure access to a remote computer. It can be used for authentication.

## SSL
Secure Socket Layer (SSL) is a commonly used encryption protocol.

## Synchronized Stop
A special transaction that will prevent further write transactions from happening. A replicator will process transactions normally up to this special transaction and the node will enter a "stopping" state. This causes all nodes to stop after processing up through the exact same GSN. A Synchronized Stop is typically actioned prior to administrative tasks such as a product upgrade. This transaction requires Unanimous Agreement in order to complete. Even if one of the nodes is not available, the other nodes will enter the stopping state and prevent write transactions. Unanimous Agreement means that all nodes need to be available for a synchronized stop to complete.
