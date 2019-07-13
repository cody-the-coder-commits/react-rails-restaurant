require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ToptalRestaurant
  class Application < Rails::Application
  config.load_defaults 5.2

  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*'
      resource '*', 
        headers: :any, 
        expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
        methods: [:get, :post, :options, :patch, :delete]
    end
  end
  end
end