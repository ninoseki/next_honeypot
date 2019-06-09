# frozen_string_literal: true

require "erb"
require "logstash-logger"

require "next/version"

require "next/rack/base"
require "next/rack/configuration"
require "next/rack/spy"

module Next
  class Application
    def call(env)
      req = Rack::Request.new(env)
      method = req.request_method
      path = req.path
      host = req.host

      res = if method == "GET" && path == "/"
              erb = ERB.new(File.read(File.expand_path("./templates/index.erb", __dir__)))
              html = erb.result_with_hash(host: host)
              headers = default_headers.merge("Location" => "http://#{host}/home.asp")
              Rack::Response.new(html, 302, headers)
            elsif method == "GET" && path == "/home.asp"
              erb = ERB.new(File.read(File.expand_path("./templates/home.erb", __dir__)))
              html = erb.result_with_hash(host: host)
              Rack::Response.new(html, 200, default_headers)
            else
              html = File.read(File.expand_path("./templates/error.html", __dir__))
              Rack::Response.new(html, 404, default_headers)
            end

      res.finish
    end

    private

    def default_headers
      {
        "Server" => "GoAhead-Webs",
        "Pragma" => "no-cache",
        "Cache-Control" => "no-cache",
        "Content-Type" => "text/html"
      }
    end
  end
end
