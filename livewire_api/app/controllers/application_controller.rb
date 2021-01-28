class ApplicationController < ActionController::API
    #protect_from_forgery with: :exception
    include Knock::Authenticable
    #before_action :authenticate_user
end
