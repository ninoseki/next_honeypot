# frozen_string_literal: true

$LOAD_PATH.unshift("#{__dir__}/lib")

require "dotenv/load"

require "next"

def logstash_settings?
  ENV.key?("LOGSTASH_HOST") && ENV.key?("LOGSTASH_PORT")
end

if logstash_settings?
  logger = LogStashLogger.new(type: :tcp, host: ENV["LOGSTASH_HOST"], port: ENV["LOGSTASH_PORT"])
  LogStashLogger.configure do |config|
    config.customize_event do |event|
      event["token"] = ENV["LOGSTASH_TOKEN"] if ENV.key? "LOGSTASH_TOKEN"
    end
  end
else
  logger = LogStashLogger.new(type: :stdout)
end

use Rack::Spy do |config|
  config.logger = logger
end

use Rack::Static, urls: ["/graphics", "/lang", "/style"], root: "public"

run Next::Application.new
