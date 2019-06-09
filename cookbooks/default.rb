# frozen_string_literal: true

# install Ruby 2.6
"git build-essential".split.each { |name| package name }

execute "yes | sudo apt-add-repository ppa:brightbox/ruby-ng" do
  not_if "grep ^ /etc/apt/sources.list /etc/apt/sources.list.d/* | grep brightbox-ubuntu-ruby-ng"
end

execute "sudo apt-get update" do
  not_if "dpkg -l ruby2.6"
end

"ruby2.6 ruby2.6-dev ruby-switch".split.each { |name| package name }

execute "sudo ruby-switch --set ruby 2.6" do
  not_if "ruby -v | grep 2.6"
end

execute "gem install bundler" do
  not_if "gem list | grep bundler"
end

user "next-honeypot" do
  home "/home/next-honeypot"
  shell "/bin/bash"
  create_home true
end

git "/opt/next-honeypot" do
  repository "https://github.com/ninoseki/next_honeypot.git"
end

execute "bundle install --path vendor/bundle" do
  cwd "/opt/next-honeypot"
  not_if "bundle | grep installed"
end

directory "/var/log/next-honeypot" do
  owner "next-honeypot"
  group "next-honeypot"
end

remote_file "/etc/systemd/system/next-honeypot.service"
remote_file "/opt/next-honeypot/.env"

execute "sudo chown -R next-honeypot:next-honeypot /opt/next-honeypot"

# start the service
execute "sudo systemctl daemon-reload"
%i(enable start).each do |action|
  service "next-honeypot" do
    action action
  end
end
