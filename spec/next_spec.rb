# frozen_string_literal: true

RSpec.describe Next do
  include Rack::Test::Methods

  before do
    @spy_log = StringIO.new
    spy_logger = LogStashLogger.new(type: :io, io: @spy_log)

    mock_app do
      use Rack::Spy do |mw|
        mw.logger = spy_logger
      end
      run Next::Application.new
    end
  end

  context "with GET /" do
    before { get "/" }

    it do
      expect(last_response.status).to eq(302)
    end
  end

  context "with GET /home.asp" do
    before { get "/home.asp" }

    it do
      expect(last_response.status).to eq(200)
    end

    it do
      expect(last_response.body).to include("NEXT-2204N")
    end
  end

  context "with GET /404" do
    before { get "/404" }

    it do
      expect(last_response.status).to eq(404)
    end
  end
end
