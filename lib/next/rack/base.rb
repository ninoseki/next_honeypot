# frozen_string_literal: true

require "base64"

module Rack
  class Base
    private

    # Returns HTTP request information
    #
    # @param [Rack::Request] req
    # @return [String]
    def request_info(req)
      [
        request_line(req),
        request_headers(req),
        request_body(req) || ""
      ].join("\n")
    end

    # Returns Base64 encoded HTTP request information
    #
    # @param [Rack::Request] req
    # @return [String]
    def base64_encoded_request(req)
      Base64.strict_encode64 request_info(req)
    end

    # Returns Rack::Request body
    #
    # @param [Rack::Request] req
    # @return [String]
    def request_body(req)
      body = req.body.read
      req.body.rewind
      body
    end

    # Returns HTTP request-line
    #
    # @param [Rack::Request] req
    # @return [String]
    def request_line(req)
      "#{req.request_method} #{req.url}"
    end

    # Returns headers which starts with "HTTP"
    #
    # @params [Rack::Request] req
    # @return [Array]
    def request_headers(req)
      headers = []
      headers << "Content-Type: #{req.content_type}" if req.content_type
      headers << "Content-Length: #{req.content_length}" if req.content_length.to_i.positive?
      req.env.each do |key, value|
        next unless key.include? "HTTP_"

        parts = key.scan(/^HTTP_([A-Z_]+)/).flatten.first
        new_key = parts.split('_').map do |part|
          part.sub(/(?<=^[A-Z])[A-Z]*/, &:downcase)
        end.join("-")
        headers << "#{new_key}: #{value}"
      end
      headers.sort
    end
  end
end
