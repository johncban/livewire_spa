module Api
    class ApplicationController < ActionController::API
      include Knock::Authenticable
      #undef_method :current_user
      #before_action :authenticate_user
    end
end