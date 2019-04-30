#!/bin/bash

openssl aes-256-cbc -d -in secretfile.txt.enc -out secretfile_decrypted.txt -pbkdf2 -pass file:id_ed25519

#openssl aes-256-cbc -in secretfile.txt -out secretfile.txt.enc -pbkdf2 -pass file:id_ed25519
