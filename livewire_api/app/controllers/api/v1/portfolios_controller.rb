
class Api::v1::PortfoliosController < ApplicationController
    before_action :authenticate_user

    def index 
        t = "test"
        render json: t
    end
end
