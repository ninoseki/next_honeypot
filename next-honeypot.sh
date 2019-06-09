#!/bin/bash

cd /opt/next-honeypot
bundle exec puma -C config/puma.rb
