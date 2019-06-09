# frozen_string_literal: true

module Rack
  class Spy < Base
    attr_reader :app
    attr_accessor :logger

    # @param [#call] app
    # @param [Proc] instance_configure
    def initialize(app)
      @app = app
      @logger = self.class.config.logger

      yield(self) if block_given?
    end

    class << self
      # Returns a configuration
      #
      # @param [Proc] global_configure
      # return [Rack::SpyUp::Configuration]
      def config
        @__config ||= Rack::Spy::Configuration.default
        yield(@__config) if block_given?
        @__config
      end
    end

    # @param  [Hash{String => String}] env
    # @return [Array(Integer, Hash, #each)]
    # @see    http://rack.rubyforge.org/doc/SPEC.html
    def call(env)
      req = Rack::Request.new(env)
      status_code, header, body = @app.call(env)

      res = Rack::Response.new(body, status_code, header)

      logger.info access_info(req, res)

      res.finish
    end

    private

    # Returns an access information for logging.
    #
    # @param [Rack::Request] req
    # @param [Rack::Response] res
    # @return [Hash]
    def access_info(req, res)
      info = {
        all: base64_encoded_request(req),
        client_ip: req.env["HTTP_X_FORWARDED_FOR"] || req.env["REMOTE_ADDR"],
        hostname: req.host_with_port,
        request_line: request_line(req),
        status_code: res.status,
        type: "CPG-honey",
        user_agent: req.user_agent,
        version: req.env["HTTP_VERSION"],
      }
      info[:message] = "#{info[:client_ip]} #{info[:hostname]} \"#{info[:request_line]} #{info[:version]}\" #{info[:status_code]}"

      info
    end
  end
end
